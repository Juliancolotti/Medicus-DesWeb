using Microsoft.Extensions.Options;
using TurnosConsultorioAPI_nuevo.Config;
using TurnosConsultorioAPI_nuevo.Models;
using MongoDB.Driver;

namespace TurnosConsultorioAPI_nuevo.Services
{
    public class PacienteService
    {
        private readonly IMongoCollection<Paciente> _pacientes;

        public PacienteService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _pacientes = database.GetCollection<Paciente>("Pacientes");
        }

        public List<Paciente> Get() => _pacientes.Find(p => true).ToList();
        public Paciente Get(string id) => _pacientes.Find(p => p.Id == id).FirstOrDefault();
        public void Create(Paciente paciente) => _pacientes.InsertOne(paciente);
        public void Update(string id, Paciente paciente)
        {
            paciente.Id = id; // Reforzás que use el ID correcto de la URL
            _pacientes.ReplaceOne(p => p.Id == id, paciente);
        }

        public void Delete(string id) => _pacientes.DeleteOne(p => p.Id == id);
    }
}
