namespace backend.Models;

public class Patient
{
    public int Id { get; set; }
    public string PatientId { get; set; } = "";   // e.g. "PAT-001"
    public string FullName { get; set; } = "";
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Email { get; set; } = "";
    public string InsuranceProvider { get; set; } = "";
    public string InsurancePolicyNumber { get; set; } = "";

    public List<MedicalHistory> MedicalHistories { get; set; } = [];
    public List<Payment> Payments { get; set; } = [];
}

public class MedicalHistory
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public Patient? Patient { get; set; }

    public DateTime VisitDate { get; set; }
    public string Diagnosis { get; set; } = "";
    public string TreatingDoctor { get; set; } = "";
    public string Department { get; set; } = "";
    public string Notes { get; set; } = "";
    public string Prescriptions { get; set; } = "";
}

public class Payment
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public Patient? Patient { get; set; }

    public DateTime PaymentDate { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";   // Paid, Pending, Failed
    public string PaymentMethod { get; set; } = "";
    public string InvoiceNumber { get; set; } = "";
}

// DTOs
public record PatientLookupRequest(string PatientId, string DateOfBirth);

public record PatientSummaryDto(
    string PatientId,
    string FullName,
    string DateOfBirth,
    string Gender,
    string Phone,
    string Email,
    string InsuranceProvider,
    string InsurancePolicyNumber,
    List<MedicalHistoryDto> MedicalHistories,
    List<PaymentDto> Payments
);

public record MedicalHistoryDto(
    string VisitDate,
    string Diagnosis,
    string TreatingDoctor,
    string Department,
    string Notes,
    string Prescriptions
);

public record PaymentDto(
    string PaymentDate,
    decimal Amount,
    string Description,
    string Status,
    string PaymentMethod,
    string InvoiceNumber
);

public record ChatRequest(string Message, List<ChatMessage> History);
public record ChatMessage(string Role, string Content);
public record ChatResponse(string Reply);
