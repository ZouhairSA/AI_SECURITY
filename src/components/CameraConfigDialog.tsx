
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "@/lib/camera-service";
import { Trash2, Pen } from "lucide-react";

interface CameraConfigDialogProps {
  camera: Camera | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: Camera) => void;
  onDelete: (id: string) => void;
}

export function CameraConfigDialog({ camera, open, onClose, onSave, onDelete }: CameraConfigDialogProps) {
  const [name, setName] = useState(camera?.name || "");
  const [location, setLocation] = useState(camera?.location || "");
  const [streamUrl, setStreamUrl] = useState(camera?.streamUrl || "");

  // Met à jour l'état local si une nouvelle caméra arrive en props
  React.useEffect(() => {
    setName(camera?.name || "");
    setLocation(camera?.location || "");
    setStreamUrl(camera?.streamUrl || "");
  }, [camera]);

  const handleSave = () => {
    if (!camera) return;
    onSave({
      ...camera,
      name: name.trim(),
      location: location.trim(),
      streamUrl: streamUrl.trim(),
    });
    onClose();
  };

  const handleDelete = () => {
    if (camera) {
      onDelete(camera.id);
      onClose();
    }
  };

  if (!camera) return null;

  return (
    <Dialog open={open} onOpenChange={v => v ? undefined : onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Pen className="inline-block mr-2" />
            Modifier la caméra
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1">Nom</label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1">Localisation</label>
            <Input value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs mb-1">URL du flux vidéo</label>
            <Input value={streamUrl} onChange={e => setStreamUrl(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="mt-4 flex justify-between">
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-1 h-4 w-4" /> Supprimer
          </Button>
          <div>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">Annuler</Button>
            </DialogClose>
            <Button onClick={handleSave}>Enregistrer</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
