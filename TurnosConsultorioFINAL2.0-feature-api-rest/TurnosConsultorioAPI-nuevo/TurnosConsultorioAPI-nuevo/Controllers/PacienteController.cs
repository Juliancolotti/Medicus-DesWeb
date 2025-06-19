using Microsoft.AspNetCore.Mvc;
using TurnosConsultorioAPI_nuevo.Models;
using TurnosConsultorioAPI_nuevo.Services;

namespace TurnosConsultorioAPI_nuevo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly PacienteService _service;

        public PacienteController(PacienteService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Paciente>> Get() => _service.Get();

        [HttpGet("{id}")]
        public ActionResult<Paciente> Get(string id)
        {
            var paciente = _service.Get(id);
            if (paciente == null) return NotFound();
            return paciente;
        }

        [HttpPost]
        public IActionResult Post(Paciente paciente)
        {
            _service.Create(paciente);
            return CreatedAtAction(nameof(Get), new { id = paciente.Id }, paciente);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, Paciente paciente)
        {
            var existing = _service.Get(id);
            if (existing == null) return NotFound();

            _service.Update(id, paciente);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var existing = _service.Get(id);
            if (existing == null) return NotFound();

            _service.Delete(id);
            return NoContent();
        }
    }
}
