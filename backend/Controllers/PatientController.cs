using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientController(AppDbContext db) : ControllerBase
{
    [HttpPost("lookup")]
    public async Task<IActionResult> Lookup([FromBody] PatientLookupRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.PatientId) || string.IsNullOrWhiteSpace(request.DateOfBirth))
            return BadRequest(new { error = "Patient ID and Date of Birth are required." });

        if (!DateTime.TryParse(request.DateOfBirth, out var dob))
            return BadRequest(new { error = "Invalid Date of Birth format." });

        var patient = await db.Patients
            .Include(p => p.MedicalHistories)
            .Include(p => p.Payments)
            .FirstOrDefaultAsync(p =>
                p.PatientId == request.PatientId.Trim().ToUpper() &&
                p.DateOfBirth.Date == dob.Date);

        if (patient == null)
            return NotFound(new { error = "No patient found with the provided ID and Date of Birth." });

        var result = new PatientSummaryDto(
            patient.PatientId,
            patient.FullName,
            patient.DateOfBirth.ToString("yyyy-MM-dd"),
            patient.Gender,
            patient.Phone,
            patient.Email,
            patient.InsuranceProvider,
            patient.InsurancePolicyNumber,
            patient.MedicalHistories
                .OrderByDescending(m => m.VisitDate)
                .Select(m => new MedicalHistoryDto(
                    m.VisitDate.ToString("dd MMM yyyy"),
                    m.Diagnosis,
                    m.TreatingDoctor,
                    m.Department,
                    m.Notes,
                    m.Prescriptions))
                .ToList(),
            patient.Payments
                .OrderByDescending(p => p.PaymentDate)
                .Select(p => new PaymentDto(
                    p.PaymentDate.ToString("dd MMM yyyy"),
                    p.Amount,
                    p.Description,
                    p.Status,
                    p.PaymentMethod,
                    p.InvoiceNumber))
                .ToList()
        );

        return Ok(result);
    }
}
