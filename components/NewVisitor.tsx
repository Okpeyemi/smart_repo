import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { postUsers } from "@/services/api";
import Motif from "./Motif";

type NewVisitorProps = {
  number: string;
};

const NewVisitor: React.FC<NewVisitorProps> = ({ number }) => {
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  let telephone = number;
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState("");
  const [profil, setProfil] = useState("");
  const [status, setStatus] = useState("visiteur");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const [addMotif, setAddMotif] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom || !prenoms || !age || !sexe || !profil) {
      setError("Tous les champs sont obligatoires!");
      return;
    }

    const userData = {
      nom,
      prenoms,
      telephone,
      email,
      age,
      sexe,
      profil,
      status,
    };

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await postUsers(userData);

      console.log("Utilisateur enregistré avec succès :", response);
      setSuccess(true);
      setNom("");
      setPrenoms("");
      telephone = "";
      setEmail("");
      setAge("");
      setSexe("");
      setProfil("");
      setStatus("");
      setUserId(response.id)
      setOpenDialog(false);
      setAddMotif(true);
    } catch (error) {
      setError("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-[40px]">Enregistrement</DialogTitle>
            <DialogDescription className="text-[20px]">
              Veuillez s'il vous plaît remplir ces champs pour vous enregistrez
              au SCOP.
            </DialogDescription>
            {error && <p className="error text-red-500">{error}</p>}
            {success && (
              <p className="success text-green-500">
                Utilisateur enregistré avec succès !
              </p>
            )}
          </DialogHeader>
          <div className="flex gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4 w-full">
              <Label htmlFor="nom" className="text-[20px]">
                Nom
              </Label>
              <Input
                id="nom"
                placeholder="DOE"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="col-span-4 h-[50px] px-5"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 w-full">
              <Label htmlFor="prenoms" className="text-[20px]">
                Prénoms
              </Label>
              <Input
                id="prenoms"
                placeholder="John"
                value={prenoms}
                onChange={(e) => setPrenoms(e.target.value)}
                className="col-span-4 h-[50px] px-5"
              />
            </div>
          </div>
          <div className="flex gap-4 py-2">
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="age" className="text-[20px]">
                Âge
              </Label>
              <Select name="age" value={age} onValueChange={setAge}>
                <SelectTrigger className="w-full h-[50px] text-[20px] rounded-[18px]">
                  <SelectValue placeholder="Select une tranche d'âge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0-18">0-18</SelectItem>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="25-40">25-40</SelectItem>
                    <SelectItem value="40-60">40-60</SelectItem>
                    <SelectItem value="60+">60+</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="sexe" className="text-[20px]">
                Sexe
              </Label>
              <Select name="sexe" value={sexe} onValueChange={setSexe}>
                <SelectTrigger className="w-full h-[50px] text-[20px] rounded-[18px]">
                  <SelectValue placeholder="Select un sexe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Masculin">Masculin</SelectItem>
                    <SelectItem value="Feminin">Feminin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Label htmlFor="profil" className="text-[20px]">
                Profil
              </Label>
              <Select name="profil" value={profil} onValueChange={setProfil}>
                <SelectTrigger className="w-full h-[50px] text-[20px] rounded-[18px]">
                  <SelectValue placeholder="Select un profil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Étudiant">Étudiant</SelectItem>
                    <SelectItem value="Enseignant">Enseignant</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex w-full">
            <Button
              type="submit"
              className="w-full p-7 mt-5 text-[20px] rounded-[18px] bg-[#FF0000] hover:bg-red-400"
              onClick={handleClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="w-full p-7 mt-5 text-[20px] rounded-[18px] bg-[#0004FF] hover:bg-blue-500"
              onClick={handleSubmit}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {addMotif && (
        <Motif userId={userId} />
      )}
    </div>
  );
};

export default NewVisitor;
