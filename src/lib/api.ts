import axios from "axios";

export const API_BASE = "https://bus-tracker-assignment.onrender.com";
// export const API_BASE = "http://localhost:3000";

export const fetchTrips = async () => {
  const response = await axios.get(`${API_BASE}/trips`);
  return response.data;
};

export const createTrip = async (trip: {
  id: string;
  lat: number;
  lng: number;
}) => {
  const response = await axios.post(`${API_BASE}/trips`, {
    id: trip.id,
    currentLocation: {
      lat: trip.lat,
      lng: trip.lng,
    },
  });
  console.log("Create trip was called");
  return response.data;
};
