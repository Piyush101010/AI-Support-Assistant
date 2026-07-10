using backend.Data;
using backend.Models;

namespace backend.Services;

public static class SeedService
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (db.Patients.Any()) return;

        var patients = new List<Patient>
        {
            new()
            {
                PatientId = "PAT-001",
                FullName = "Aarav Sharma",
                DateOfBirth = new DateTime(1985, 3, 14),
                Gender = "Male",
                Phone = "+91-9876543210",
                Email = "aarav.sharma@email.com",
                InsuranceProvider = "Star Health Insurance",
                InsurancePolicyNumber = "STH-20245678",
                MedicalHistories =
                [
                    new()
                    {
                        VisitDate = new DateTime(2024, 1, 10),
                        Diagnosis = "Type 2 Diabetes - Initial Diagnosis",
                        TreatingDoctor = "Dr. Meera Pillai",
                        Department = "Endocrinology",
                        Notes = "HbA1c: 8.2%. Patient advised lifestyle modifications.",
                        Prescriptions = "Metformin 500mg twice daily, Glipizide 5mg once daily"
                    },
                    new()
                    {
                        VisitDate = new DateTime(2024, 4, 22),
                        Diagnosis = "Type 2 Diabetes - Follow-up",
                        TreatingDoctor = "Dr. Meera Pillai",
                        Department = "Endocrinology",
                        Notes = "HbA1c improved to 7.1%. Continue current medication.",
                        Prescriptions = "Metformin 500mg twice daily"
                    },
                    new()
                    {
                        VisitDate = new DateTime(2024, 9, 5),
                        Diagnosis = "Hypertension - Stage 1",
                        TreatingDoctor = "Dr. Rajesh Kumar",
                        Department = "Cardiology",
                        Notes = "BP: 148/92. ECG normal. Low-sodium diet recommended.",
                        Prescriptions = "Amlodipine 5mg once daily"
                    }
                ],
                Payments =
                [
                    new()
                    {
                        PaymentDate = new DateTime(2024, 1, 10),
                        Amount = 1500.00m,
                        Description = "Endocrinology Consultation + Lab Tests",
                        Status = "Paid",
                        PaymentMethod = "UPI",
                        InvoiceNumber = "INV-2024-0042"
                    },
                    new()
                    {
                        PaymentDate = new DateTime(2024, 4, 22),
                        Amount = 800.00m,
                        Description = "Follow-up Consultation",
                        Status = "Paid",
                        PaymentMethod = "Credit Card",
                        InvoiceNumber = "INV-2024-0218"
                    },
                    new()
                    {
                        PaymentDate = new DateTime(2024, 9, 5),
                        Amount = 2200.00m,
                        Description = "Cardiology Consultation + ECG",
                        Status = "Paid",
                        PaymentMethod = "Insurance",
                        InvoiceNumber = "INV-2024-0541"
                    },
                    new()
                    {
                        PaymentDate = new DateTime(2024, 11, 15),
                        Amount = 950.00m,
                        Description = "Quarterly Lab Tests",
                        Status = "Pending",
                        PaymentMethod = "—",
                        InvoiceNumber = "INV-2024-0689"
                    }
                ]
            },
            new()
            {
                PatientId = "PAT-002",
                FullName = "Priya Nair",
                DateOfBirth = new DateTime(1992, 7, 28),
                Gender = "Female",
                Phone = "+91-9123456789",
                Email = "priya.nair@email.com",
                InsuranceProvider = "HDFC ERGO Health",
                InsurancePolicyNumber = "HDE-99112233",
                MedicalHistories =
                [
                    new()
                    {
                        VisitDate = new DateTime(2024, 2, 14),
                        Diagnosis = "Migraine with Aura",
                        TreatingDoctor = "Dr. Sunita Rao",
                        Department = "Neurology",
                        Notes = "Frequent episodes (~3/month). MRI Brain: No structural abnormality.",
                        Prescriptions = "Sumatriptan 50mg (as needed), Propranolol 40mg once daily"
                    },
                    new()
                    {
                        VisitDate = new DateTime(2024, 6, 3),
                        Diagnosis = "Iron Deficiency Anaemia",
                        TreatingDoctor = "Dr. Anand Mehta",
                        Department = "General Medicine",
                        Notes = "Hb: 9.2 g/dL. Ferritin low. Dietary counselling given.",
                        Prescriptions = "Ferrous Sulphate 200mg twice daily, Vitamin C 500mg"
                    }
                ],
                Payments =
                [
                    new()
                    {
                        PaymentDate = new DateTime(2024, 2, 14),
                        Amount = 3500.00m,
                        Description = "Neurology Consultation + MRI",
                        Status = "Paid",
                        PaymentMethod = "Insurance",
                        InvoiceNumber = "INV-2024-0091"
                    },
                    new()
                    {
                        PaymentDate = new DateTime(2024, 6, 3),
                        Amount = 600.00m,
                        Description = "General Medicine Consultation + CBC",
                        Status = "Paid",
                        PaymentMethod = "Cash",
                        InvoiceNumber = "INV-2024-0312"
                    },
                    new()
                    {
                        PaymentDate = new DateTime(2024, 10, 20),
                        Amount = 1200.00m,
                        Description = "Neurology Follow-up + EEG",
                        Status = "Failed",
                        PaymentMethod = "Credit Card",
                        InvoiceNumber = "INV-2024-0598"
                    }
                ]
            },
            new()
            {
                PatientId = "PAT-003",
                FullName = "Kiran Desai",
                DateOfBirth = new DateTime(1978, 11, 5),
                Gender = "Male",
                Phone = "+91-9988776655",
                Email = "kiran.desai@email.com",
                InsuranceProvider = "Bajaj Allianz Health",
                InsurancePolicyNumber = "BAH-44556677",
                MedicalHistories =
                [
                    new()
                    {
                        VisitDate = new DateTime(2023, 12, 1),
                        Diagnosis = "Lumbar Disc Herniation - L4/L5",
                        TreatingDoctor = "Dr. Vikram Singh",
                        Department = "Orthopaedics",
                        Notes = "MRI confirms herniation. Conservative management preferred.",
                        Prescriptions = "Ibuprofen 400mg thrice daily, Physiotherapy 3x/week"
                    },
                    new()
                    {
                        VisitDate = new DateTime(2024, 3, 18),
                        Diagnosis = "Lumbar Disc Herniation - Post Physiotherapy Review",
                        TreatingDoctor = "Dr. Vikram Singh",
                        Department = "Orthopaedics",
                        Notes = "Significant improvement. Pain reduced 70%. Continue exercises.",
                        Prescriptions = "Diclofenac gel (topical, as needed)"
                    },
                    new()
                    {
                        VisitDate = new DateTime(2024, 8, 12),
                        Diagnosis = "Asthma - Mild Persistent",
                        TreatingDoctor = "Dr. Kavitha Iyer",
                        Department = "Pulmonology",
                        Notes = "Spirometry: FEV1 78%. Triggered by dust and cold air.",
                        Prescriptions = "Salbutamol inhaler (rescue), Budesonide inhaler (daily)"
                    }
                ],
                Payments =
                [
                    new()
                    {
                        PaymentDate = new DateTime(2023, 12, 1),
                        Amount = 4200.00m,
                        Description = "Orthopaedics Consultation + MRI Lumbar",
                        Status = "Paid",
                        PaymentMethod = "Insurance",
                        InvoiceNumber = "INV-2023-0988"
                    },
                    new()
                    {
                        PaymentDate = new DateTime(2024, 3, 18),
                        Amount = 700.00m,
                        Description = "Review Consultation",
                        Status = "Paid",
                        PaymentMethod = "UPI",
                        InvoiceNumber = "INV-2024-0155"
                    },
                    new()
                    {
                        PaymentDate = new DateTime(2024, 8, 12),
                        Amount = 1800.00m,
                        Description = "Pulmonology Consultation + Spirometry",
                        Status = "Paid",
                        PaymentMethod = "Credit Card",
                        InvoiceNumber = "INV-2024-0476"
                    }
                ]
            }
        };

        db.Patients.AddRange(patients);
        await db.SaveChangesAsync();
        Console.WriteLine("✅ Database seeded with 3 demo patients: PAT-001, PAT-002, PAT-003");
    }
}
