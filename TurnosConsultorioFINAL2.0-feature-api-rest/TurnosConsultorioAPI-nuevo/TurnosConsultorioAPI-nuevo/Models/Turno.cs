using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TurnosConsultorioAPI_nuevo.Models
{
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
        [DataType(DataType.Time)]
        public TimeSpan Hora { get; set; }

        [BsonElement("Descripcion")]
        public string? Descripcion { get; set; }

    }
}
