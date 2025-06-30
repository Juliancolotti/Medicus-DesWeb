using Microsoft.AspNetCore.Mvc;
using TurnosConsultorioMonolitico.Models;
using TurnosConsultorioMonolitico.Services;


namespace TurnosConsultorioMonolitico.Controllers
{
    public class PacienteController : Controller
    {
        private readonly PacienteService _pacienteService;

        public PacienteController(PacienteService pacienteService)
        {
            _pacienteService = pacienteService;
        }

        public IActionResult Index()
        {
            var pacientes = _pacienteService.Get();
            return View(pacientes);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Paciente paciente)
        {
            if (ModelState.IsValid)
            {
                _pacienteService.Create(paciente);
                return RedirectToAction(nameof(Index));
            }

            return View(paciente);
        }

        // GET: Paciente/Edit/5
        [HttpGet]
        public IActionResult Edit(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            var paciente = _pacienteService.Get(id);
            if (paciente == null)
                return NotFound();

            return View(paciente);
        }



        // POST: Paciente/Edit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Paciente paciente)
        {
            if (!ModelState.IsValid)
            {
                return View(paciente);
            }

            var existente = _pacienteService.Get(paciente.Id);
            if (existente == null)
            {
                return NotFound();
            }

            _pacienteService.Update(paciente.Id, paciente);
            return RedirectToAction(nameof(Index));
        }



        public IActionResult Delete(string id)
        {
            var paciente = _pacienteService.Get(id);
            if (paciente == null) return NotFound();
            return View(paciente);
        }

        [HttpPost]
        public IActionResult DeletePost(string id)
        {
            _pacienteService.Delete(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
