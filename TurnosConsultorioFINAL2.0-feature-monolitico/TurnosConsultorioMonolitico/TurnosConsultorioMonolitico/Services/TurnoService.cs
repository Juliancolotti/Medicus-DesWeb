using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TurnosConsultorioMonolitico.Models;
using TurnosConsultorioMonolitico.Config;


namespace TurnosConsultorioMonolitico.Services
{
    public class TurnoService
    {
        private readonly IMongoCollection<Turno> _turnos;

        public TurnoService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _turnos = database.GetCollection<Turno>("Turnos");
        }

        public List<Turno> Get() => _turnos.Find(t => true).ToList();

        public Turno Get(string id) => _turnos.Find(t => t.Id == id).FirstOrDefault();

        public void Create(Turno turno) => _turnos.InsertOne(turno);

        public void Update(string id, Turno turno) =>
            _turnos.ReplaceOne(t => t.Id == id, turno);

        public void Delete(string id) => _turnos.DeleteOne(t => t.Id == id);
    }
}
