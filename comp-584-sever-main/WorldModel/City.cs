using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WorldModel;

[Table("city")]
public partial class City
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("countryid")]
    public int Countryid { get; set; }

    [Column("name")]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Column("lat")]
    public decimal Lat { get; set; }

    [Column("long")]
    public decimal Long { get; set; }

    [Column("population")]
    public int Population { get; set; }

    [ForeignKey("Countryid")]
    public virtual Country Country { get; set; } = null!;
}
