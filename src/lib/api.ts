import axios from "axios";

export const API_BASE = "https://bus-tracker-assignment.onrender.com";

export const fetchTrips = async () => {
  const response = await axios.get(`${API_BASE}/trips`);
  return response.data;
};

export const createTrip = async () => {
  const response = await axios.post(`${API_BASE}/trips`);
  return response.data;
};
