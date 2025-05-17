import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bus, Wifi, WifiOff } from "lucide-react";
import type { Trip } from "@/lib/types";

interface TripInfoCardProps {
  trip: Trip;
  currentLocation: { lat: number; lng: number };
  isGpsActive: boolean;
  onToggleGps: (checked: boolean) => void;
}

export function TripInfoCard({
  trip,
  currentLocation,
  isGpsActive,
  onToggleGps,
}: TripInfoCardProps) {
  return (
    <Card className="absolute bottom-4 right-4 z-[1000] shadow-lg w-80">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bus className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="font-semibold">Trip #{trip.id}</h2>
          </div>
          <div className="flex items-center">
            {isGpsActive ? (
              <Wifi className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 mr-2 text-gray-400" />
            )}
            <Switch
              checked={isGpsActive}
              onCheckedChange={onToggleGps}
              aria-label="Toggle GPS"
            />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Latitude:</span>
            <span className="font-mono">{currentLocation.lat.toFixed(6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Longitude:</span>
            <span className="font-mono">{currentLocation.lng.toFixed(6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <span className={isGpsActive ? "text-green-600" : "text-gray-500"}>
              {isGpsActive ? "Tracking" : "Paused"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
