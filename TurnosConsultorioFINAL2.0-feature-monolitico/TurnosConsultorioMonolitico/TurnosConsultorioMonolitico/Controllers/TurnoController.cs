using Microsoft.AspNetCore.Mvc;
using TurnosConsultorioMonolitico.Models;
using TurnosConsultorioMonolitico.Services;


namespace TurnosConsultorioMonolitico.Controllers
{
    public class TurnoController : Controller
    {
        private readonly TurnoService _turnoService;
        private readonly PacienteService _pacienteService;

        public TurnoController(TurnoService turnoService, PacienteService pacienteService)
        {
            _turnoService = turnoService;
            _pacienteService = pacienteService;
        }

        // GET: Turno
        public IActionResult Index()
        {
            var turnos = _turnoService.Get();

            foreach (var turno in turnos)
            {
                var paciente = _pacienteService.Get(turno.PacienteId);
                turno.NombrePaciente = paciente != null ? $"{paciente.Nombre} {paciente.Apellido}" : "Paciente eliminado";
            }

            return View(turnos);
        }

        // GET: Turno/Create
        public IActionResult Create()
        {
            ViewBag.Pacientes = _pacienteService.Get(); // Combo de pacientes
            return View();
        }

        // POST: Turno/Create
        [HttpPost]
        public IActionResult Create(Turno turno)
        {
            Console.WriteLine("📨 POST recibido:");
            Console.WriteLine($"PacienteId: {turno.PacienteId}, Fecha: {turno.Fecha}, Hora: {turno.Hora}");

            if (!ModelState.IsValid)
            {
                Console.WriteLine("❌ ModelState inválido:");
                foreach (var state in ModelState)
                {
                    foreach (var error in state.Value.Errors)
                    {
                        Console.WriteLine($" - Campo: {state.Key}, Error: {error.ErrorMessage}");
                    }
                }

                ViewBag.Pacientes = _pacienteService.Get(); // Recargar combo
                return View(turno);
            }

            Console.WriteLine("✅ Turno válido → guardando...");
            _turnoService.Create(turno);
            return RedirectToAction(nameof(Index));
        }

        // GET: Turno/Edit/id
        public IActionResult Edit(string id)
        {
            var turno = _turnoService.Get(id);
            if (turno == null) return NotFound();

            ViewBag.Pacientes = _pacienteService.Get(); // Para mostrar el combo de pacientes
            return View(turno);
        }

        // POST: Turno/Edit/id
        [HttpPost]
        public IActionResult Edit(string id, Turno turno)
        {
            if (ModelState.IsValid)
            {
                _turnoService.Update(id, turno);
                return RedirectToAction(nameof(Index));
            }

            ViewBag.Pacientes = _pacienteService.Get(); // Volver a cargar si hay error
            return View(turno);
        }

        // GET: Turno/Delete/5
        public IActionResult Delete(string id)
        {
            var turno = _turnoService.Get(id);
            if (turno == null) return NotFound();

            var paciente = _pacienteService.Get(turno.PacienteId);
            turno.NombrePaciente = paciente != null ? $"{paciente.Nombre} {paciente.Apellido}" : "Paciente eliminado";

            return View(turno);
        }

        // POST: Turno/Delete/5
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(string id)
        {
            _turnoService.Delete(id);
            return RedirectToAction(nameof(Index));
        }


    }
}
