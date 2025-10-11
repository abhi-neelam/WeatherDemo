using comp_584_sever.data;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Globalization;
using WorldModel;

namespace comp_584_sever.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController(DatabasedContext context, IHostEnvironment environment) : ControllerBase
    {
        string _pathName = Path.Combine(environment.ContentRootPath, "data/worldcities.csv");

        [HttpPost("Countries")]
        public async Task<ActionResult> PostCountries()
        {
            Dictionary<string, Country> countries = await context.Countries.AsNoTracking().
                ToDictionaryAsync(c => c.Name, StringComparer.OrdinalIgnoreCase);
            CsvConfiguration config = new(CultureInfo.InvariantCulture) { 
                HasHeaderRecord = true, HeaderValidated = null 
            };

            using StreamReader reader = new(_pathName);
            using CsvReader csv = new(reader, config);
            List<DatabasedCSV> records = csv.GetRecords<DatabasedCSV>().ToList();

            foreach (DatabasedCSV record in records) {
                if (!countries.ContainsKey(record.country)) {
                    Country country = new() {
                        Name = record.country,
                        Iso2 = record.iso2,
                        Iso3 = record.iso3
                    };
                    countries.Add(country.Name, country);
                    await context.Countries.AddAsync(country);
                }
            }
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("Cities")]
        public async Task<ActionResult> PostCities()
        {
            Dictionary<string, Country> countries = await context.Countries.AsNoTracking().
                ToDictionaryAsync(c => c.Name, StringComparer.OrdinalIgnoreCase);
            CsvConfiguration config = new(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                HeaderValidated = null
            };

            using StreamReader reader = new(_pathName);
            using CsvReader csv = new(reader, config);
            List<DatabasedCSV> records = csv.GetRecords<DatabasedCSV>().ToList();

            int cityCount = 0;
            foreach (DatabasedCSV record in records)
            {
                if (record.population.HasValue)
                {
                    City city = new()
                    {
                        Name = record.city_ascii,
                        Lat = (int)record.lat,
                        Long = (int)record.lng,
                        Population = (int)record.population.Value,
                        Countryid = countries[record.country].Id
                    };
                    cityCount++;
                    await context.Cities.AddAsync(city);
                }
            }

            await context.SaveChangesAsync();
            return new JsonResult(cityCount);
        }
    }
}
