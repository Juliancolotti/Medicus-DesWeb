using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TurnosConsultorioMonolitico.Config;
using TurnosConsultorioMonolitico.Models;


namespace TurnosConsultorioMonolitico.Services
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

        public void Create(Paciente paciente)
        {
            Console.WriteLine("Guardando paciente: " + paciente.Nombre + " - " + paciente.DNI);
            _pacientes.InsertOne(paciente);
        }


        public void Update(string id, Paciente paciente) =>
    _pacientes.ReplaceOne(p => p.Id == id, paciente);


        public void Delete(string id) => _pacientes.DeleteOne(p => p.Id == id);
    }
}
