import axios from "axios";

const API_URL = "http://localhost:5054/api/Paciente";

export const getPacientes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearPaciente = async (paciente) => {
  await axios.post(API_URL, paciente);
};

export const eliminarPaciente = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const obtenerPaciente = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const actualizarPaciente = async (id, paciente) => {
  await axios.put(`${API_URL}/${id}`, paciente);
};
