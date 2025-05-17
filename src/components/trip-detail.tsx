import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Crosshair } from "lucide-react";
import type { Trip } from "@/lib/types";
import "leaflet/dist/leaflet.css";
import { busIcon } from "./busIcon";
import { io, Socket } from "socket.io-client";
import { TripInfoCard } from "./trip-info-card";
import { API_BASE } from "@/lib/api";
interface TripDetailProps {
  trip: Trip;
  onBack: () => void;
}

function MapUpdater({
  center,
  shouldUpdate,
}: {
  center: [number, number];
  shouldUpdate: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (shouldUpdate) {
      map.setView(center, map.getZoom());
    }
  }, [center, shouldUpdate, map]);

  return null;
}

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function TripDetail({ trip, onBack }: TripDetailProps) {
  const [currentLocation, setCurrentLocation] = useState(trip.currentLocation);
  const [isGpsActive, setIsGpsActive] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);
  const [shouldCenterMap, setShouldCenterMap] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(API_BASE); // Replace with your deployed URL if needed
    socketRef.current = socket;

    if (isGpsActive) {
      socket.emit("join-trip", trip.id);
    }

    const updateHandler = ({
      tripId,
      lat,
      lng,
    }: {
      tripId: string;
      lat: number;
      lng: number;
    }) => {
      if (tripId === trip.id && isGpsActive) {
        setCurrentLocation({ lat, lng });
      }
    };

    socket.on("location-update", updateHandler); // on receiving websocket responses back it calls the updateHandler func. that receives the formatted Data

    return () => {
      socket.emit("leave-trip", trip.id);
      socket.off("location-update", updateHandler);
      socket.disconnect();
    };
  }, [trip.id, isGpsActive]);

  const handleGpsToggle = (checked: boolean) => {
    setIsGpsActive(checked);
  };

  const handleCenterClick = () => {
    setShouldCenterMap(true);
    setTimeout(() => setShouldCenterMap(false), 200);
  };

  return (
    <div className="h-screen relative">
      <div className="h-full w-full">
        {typeof window !== "undefined" && (
          <MapContainer
            center={[currentLocation.lat, currentLocation.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            whenReady={() => setIsMapReady(true)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {isMapReady && (
              <>
                <MapResizer />
                <Marker
                  position={[currentLocation.lat, currentLocation.lng]}
                  icon={busIcon}
                />
                <MapUpdater
                  center={[currentLocation.lat, currentLocation.lng]}
                  shouldUpdate={shouldCenterMap}
                />
              </>
            )}
          </MapContainer>
        )}
      </div>

      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Trips
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-[1000]">
        <Button variant="outline" onClick={handleCenterClick}>
          <Crosshair className="h-4 w-4 mr-2" />
          Center Map
        </Button>
      </div>

      <TripInfoCard
        trip={trip}
        currentLocation={currentLocation}
        isGpsActive={isGpsActive}
        onToggleGps={handleGpsToggle}
      />
    </div>
  );
}
