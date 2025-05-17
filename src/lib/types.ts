export interface Location {
  lat: number;
  lng: number;
}

export interface Trip {
  id: string;
  currentLocation: Location;
  status: "active" | "completed" | "paused";
}
