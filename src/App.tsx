import { useEffect, useState } from "react";
import TripList from "@/components/trip-list";
import TripDetail from "@/components/trip-detail";
import type { Trip } from "@/lib/types";

export default function App() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  useEffect(() => {
    console.log(selectedTrip);
  }, [selectedTrip]);

  const handleBackToTrips = () => {
    setSelectedTrip(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {selectedTrip ? (
        <TripDetail trip={selectedTrip} onBack={handleBackToTrips} />
      ) : (
        <TripList onSelectTrip={handleSelectTrip} />
      )}
    </main>
  );
}
