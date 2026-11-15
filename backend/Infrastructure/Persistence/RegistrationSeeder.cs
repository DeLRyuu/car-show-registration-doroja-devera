namespace Infrastructure.Persistence;

using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public static class RegistrationSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Registrations.AnyAsync()) return;

        string[] names =
        {
            "Juan Dela Cruz", "Maria Santos", "Ana Reyes", "Pedro Garcia", "Liza Mendoza",
            "Carlo Bautista", "Ana Villanueva", "Jose Ramos", "Grace Aquino", "Mark Lim",
            "Rico Navarro", "Bea Fernandez", "Paolo Castillo", "Janine Flores", "Dennis Tan",
            "Karla Domingo", "Ramon Cruz", "Sofia Morales", "Luis Pascual", "Nina Torres",
            "Aldrin Salazar", "Cathy Ocampo", "Joel Mercado", "Tessa Rivera", "Vince Gonzales"
        };

        string[] cars =
        {
            "Toyota Supra MK4", "Nissan Skyline R34", "Honda Civic EK", "Mazda RX-7 FD",
            "Subaru WRX STI", "Mitsubishi Lancer Evo", "Ford Mustang GT", "Toyota AE86"
        };

        var types = Enum.GetValues<RegistrationType>();      // 3 values
        var statuses = Enum.GetValues<RegistrationStatus>(); // 4 values
        var now = DateTime.UtcNow;
        var list = new List<Registration>();

        for (var i = 0; i < 25; i++)
        {
            var type = types[i % 3];
            var fee = RegistrationFees.For(type);
            var paid = ((i / 3) % 3) switch
            {
                0 => 0m,                     // Unpaid
                1 => Math.Round(fee / 2, 2), // Partial
                _ => fee                     // Paid
            };

            list.Add(new Registration
            {
                Id = Guid.NewGuid(),
                RegistrationNumber = $"CS27-{i + 1:D4}",
                RegistrationDate = now.AddHours(-(26 - i)),
                ParticipantName = names[i],
                ContactNumber = $"0917{1000000 + i * 137:D7}",
                Email = $"{names[i].Split(' ')[0].ToLower()}{i + 1}@example.com",
                Address = $"{100 + i} Rizal St., Sorsogon City",
                CarMakeModel = cars[i % cars.Length],
                PlateNumber = $"SEED {i + 1:D3}",
                RegistrationType = type,
                Status = statuses[i % 4],
                RegistrationFee = fee,
                AmountPaid = paid
            });
        }

        db.Registrations.AddRange(list);
        await db.SaveChangesAsync();
    }
}