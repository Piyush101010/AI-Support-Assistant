using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController(IConfiguration config, IHttpClientFactory httpClientFactory) : ControllerBase
{
    private const string SystemPrompt = """
        You are a helpful support assistant for the HealthCare Central Dashboard.

        ### Core Modules
        - Patient Management: Search patients by ID or name, view demographics, insurance info, visit history.
        - Eligibility & Benefits (RTE): Real-time insurance eligibility checks via EDI 270/271. Results in 3-5 seconds.
        - Appointments: Calendar view for scheduling, rescheduling, cancelling appointments.
        - Billing & Payments: Invoice generation, payment tracking (UPI, Credit Card, Insurance, Cash), status: Paid/Pending/Failed.
        - Reports: Daily collections, department-wise revenue, pending insurance claims. Export to PDF or Excel.
        - Payer Management: Manage insurance payers, update eligibility endpoints.

        ### Common How-To Answers
        - Search a patient: Patient Management tab, enter Patient ID (PAT-XXX) or name, click Search.
        - Check eligibility: Eligibility & Benefits tab, enter Patient ID, select payer, click Check Eligibility.
        - Generate a report: Reports tab, select type, set date range, click Generate, then Export.
        - Update payment status: Billing tab, find invoice, click status badge, select new status, confirm.
        - Add appointment: Appointments tab, click + New, select patient/doctor/time, Save.
        - Login issues: Use hospital AD credentials. Password reset: IT helpdesk ext. 1001.
        - Slow loading: Clear browser cache (Ctrl+Shift+Del), use Chrome or Edge.
        - Missing data: Dashboard syncs every 5 minutes. If stale over 30 min, raise a ticket.

        Answer only questions about this dashboard. Be concise. For anything else say: I can only help with the HealthCare Central Dashboard.
        """;

    [HttpPost("message")]
    public async Task<IActionResult> Message([FromBody] ChatRequest request)
    {
        var apiKey = config["Anthropic:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey) || apiKey == "YOUR_API_KEY_HERE")
            return BadRequest(new { error = "Claude API key not configured. Add it to appsettings.json under Anthropic:ApiKey." });

        if (string.IsNullOrWhiteSpace(request.Message))
            return BadRequest(new { error = "Message cannot be empty." });

        try
        {
            var messages = new List<object>();
            foreach (var h in request.History ?? [])
                messages.Add(new { role = h.Role, content = h.Content });
            messages.Add(new { role = "user", content = request.Message });

            var payload = new
            {
                model = "claude-3-haiku-20240307",
                max_tokens = 1024,
                system = SystemPrompt,
                messages
            };

            var http = httpClientFactory.CreateClient();
            http.DefaultRequestHeaders.Clear();
            http.DefaultRequestHeaders.Add("x-api-key", apiKey);
            http.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");
            http.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await http.PostAsync("https://api.anthropic.com/v1/messages", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, new { error = $"Anthropic API error: {responseBody}" });

            using var doc = JsonDocument.Parse(responseBody);
            var reply = doc.RootElement
                .GetProperty("content")[0]
                .GetProperty("text")
                .GetString() ?? "Sorry, I could not generate a response.";

            return Ok(new ChatResponse(reply));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"AI service error: {ex.Message}" });
        }
    }
}