"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bus, Plus, MapPin, Loader2 } from "lucide-react";
import TripCard from "./trip-card";
import { motion } from "framer-motion";
import type { Trip } from "@/lib/types";
import { fetchTrips, createTrip } from "@/lib/api";
import CreateTripModal from "./craeteTrip";

interface TripListProps {
  onSelectTrip: (trip: Trip) => void;
}

export default function TripList({ onSelectTrip }: TripListProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true);
      try {
        const data = await fetchTrips();
        setTrips(data);
      } catch (error) {
        console.error("Failed to load trips:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTrips();
  }, []);

  const handleCreateTrip = async (tripData: {
    id: string;
    lat: number;
    lng: number;
  }) => {
    setCreating(true);
    try {
      const newTrip = await createTrip(tripData);
      setTrips((prev) => [...prev, newTrip]);
    } catch (error) {
      console.error("Failed to create trip:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <CreateTripModal
        open={modalOpen}
        setOpen={setModalOpen}
        onCreate={handleCreateTrip}
      />

      <motion.div
        className="flex flex-col md:flex-row h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "tween",
          ease: "easeInOut",
          delay: 0.1,
        }}
      >
        {/* Left Sidebar */}
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            type: "tween",
            ease: "easeInOut",
            delay: 0.7,
          }}
          className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white p-4 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Trip List</h1>
            <Button onClick={() => setModalOpen(true)} disabled={creating}>
              {creating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              New Trip
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="mb-2">pinging render server to start</span>
                <span className="mb-2">please hold on est. 30sec</span>
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Bus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No trips available</p>
              <p className="text-sm mt-2">Create a new trip to get started</p>
            </div>
          ) : (
            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <TripCard trip={trip} onSelectTrip={onSelectTrip} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="hidden md:flex md:w-2/3 lg:w-3/4 bg-gray-100 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="text-center max-w-md p-8"
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "tween",
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-2">
              Select a Trip to Track
            </h2>
            <p className="text-gray-500">
              Choose a trip from the list to view its real-time location on the
              map.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
