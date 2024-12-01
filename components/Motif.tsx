import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postMotif } from "@/services/api";
import { useState } from "react";

type MotifProps = {
    userId: number,
}

const Motif: React.FC<MotifProps> = ({ userId }) => {
    const [motif, setMotif] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await postMotif(userId, motif);
            console.log("Motif enregistré avec succès :", response);
            window.location.href = "/welcome";
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du motif :", error);
        }
    }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[40px]">Motif</DialogTitle>
          <DialogDescription className="text-[20px]">
          Choisissez votre motif d'entrer.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 py-2">
        <div className="flex flex-col gap-4 w-full">
            <Select name="age" value={motif} onValueChange={setMotif}>
              <SelectTrigger className="w-full h-[50px] text-[20px] rounded-[18px]">
                <SelectValue placeholder="Select un motif" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="TechIMA">TechIMA</SelectItem>
                  <SelectItem value="TinIMA">TinIMA</SelectItem>
                  <SelectItem value="X-Tech Lab">X-Tech Lab</SelectItem>
                  <SelectItem value="Restaurant">Restaurant</SelectItem>
                  <SelectItem value="Toilette">Toilette</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full bg-[#0004FF] p-7 mt-5 rounded-[18px] hover:bg-blue-500 text-[20px]" onClick={handleSubmit}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Motif;
