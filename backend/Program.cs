using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();

// SQLite — file-based, no install needed
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=healthcare_poc.db"));

// CORS — allow React dev server
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// Auto-migrate and seed on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();   // Creates DB + tables without needing migrations
    await SeedService.SeedAsync(db);
}

app.UseCors();
app.UseAuthorization();
app.MapControllers();

Console.WriteLine("HealthCare Support API running on http://localhost:5000");
Console.WriteLine("Demo patients: PAT-001 (DOB: 1985-03-14), PAT-002 (DOB: 1992-07-28), PAT-003 (DOB: 1978-11-05)");

app.Run();
