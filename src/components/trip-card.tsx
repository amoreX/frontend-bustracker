import { Bus, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Trip } from "@/lib/types";

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
}

export default function TripCard({ trip, onSelectTrip }: TripCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg flex items-center">
          <Bus className="h-5 w-5 mr-2 text-gray-500" />
          Trip #{trip.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {trip.currentLocation.lat.toFixed(4)},{" "}
            {trip.currentLocation.lng.toFixed(4)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTrip(trip)}
          >
            Track Trip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
