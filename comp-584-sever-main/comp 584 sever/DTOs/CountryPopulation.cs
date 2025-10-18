using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WorldModel;

namespace comp_584_sever.DTOs
{
    public class CountryPopulation
    {
        public required int Id { get; set; }
        public required string Name { get; set; }

        public required string Iso2 { get; set; }

        public required string Iso3 { get; set; }

        public required decimal Population { get; set; }
    }
}