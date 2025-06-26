using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

public class Turno
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("PacienteId")]
    [Required]
    public string PacienteId { get; set; } = string.Empty;

    [BsonElement("Fecha")]
    [Required]
    [DataType(DataType.Date)]
    public DateTime Fecha { get; set; }

    [BsonElement("Hora")]
    [Required]
    public string Hora { get; set; } = string.Empty; 

    [BsonElement("Descripcion")]
    public string? Descripcion { get; set; }
}
