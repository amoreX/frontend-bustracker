import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

function CreateTripModal({
  open,
  setOpen,
  onCreate,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  onCreate: (trip: { id: string; lat: number; lng: number }) => void;
}) {
  const [tripId, setTripId] = useState(`T-${Math.floor(Math.random() * 1000)}`);
  const [lat, setLat] = useState(40.7128);
  const [lng, setLng] = useState(-74.006);

  const handleSubmit = () => {
    onCreate({ id: tripId, lat, lng });
    setOpen(false);
  };

  const setDummy = () => {
    setLat(40.7128);
    setLng(-74.006);
  };

  const setAutogenId = () => {
    setTripId(`T-${Math.floor(Math.random() * 1000)}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
            placeholder="Trip ID"
          />
          <Input
            type="number"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            placeholder="Latitude"
          />
          <Input
            type="number"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={setAutogenId}>
              Auto ID
            </Button>
            <Button variant="outline" onClick={setDummy}>
              Use Dummy Coords
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTripModal;
