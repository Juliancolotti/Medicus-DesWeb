using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TurnosConsultorioMonolitico.Models
{
    public class Turno
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [Required(ErrorMessage = "Debe seleccionar un paciente.")]
        [Display(Name = "Paciente")]
        public string PacienteId { get; set; } = string.Empty;

        [BsonElement("Fecha")]
        [Required(ErrorMessage = "La fecha del turno es obligatoria.")]
        [DataType(DataType.Date)]
        public DateTime Fecha { get; set; }

        [BsonElement("Hora")]
        [Required(ErrorMessage = "La hora del turno es obligatoria.")]
        [DataType(DataType.Time)]
        public TimeSpan Hora { get; set; }

        [NotMapped]
        public string NombrePaciente { get; set; } = string.Empty;
    }
}
