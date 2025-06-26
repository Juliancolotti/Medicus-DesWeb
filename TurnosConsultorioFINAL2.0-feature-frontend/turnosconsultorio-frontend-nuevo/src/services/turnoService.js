import axios from "axios";

const API_URL = "http://localhost:5054/api/Turno";

export const getTurnos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearTurno = async (turno) => {
  const response = await axios.post(API_URL, {
    pacienteId: turno.pacienteId,
    fecha: turno.fecha,
    hora: turno.hora,
    descripcion: turno.descripcion || "",
  });
  return response.data;
};

export const eliminarTurno = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const obtenerTurno = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const actualizarTurno = async (id, turno) => {
  await axios.put(`${API_URL}/${id}`, {
    pacienteId: turno.pacienteId,
    fecha: turno.fecha,
    hora: turno.hora,
    descripcion: turno.descripcion,
  });
};
