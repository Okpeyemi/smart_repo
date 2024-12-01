"use client";

import Background from "@/components/Background";
import Boutton from "@/components/Boutton";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import NewVisitor from "@/components/NewVisitor";
import Toast from "@/components/Toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getUsers } from "@/services/api";
import React, { useState } from "react";

const page = () => {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSecondPresence, setIsSecondPresence] = useState(false);
  const [isUsager, setIsUsager] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);

  const checkTheNumber = () => {
    setLoading(true);
    setError(null);
    setCheckNumber(true);
  };

  const verificationIsTrue = () => {
    setCheckNumber(false);
    fetchUsers();
  };

  const verificationIsFalse = () => {
    setCheckNumber(false);
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      const theUser = data.find(
        (user: { telephone: any }) => user.telephone === number
      );
      if (theUser) {
        console.log(theUser.status);
        if (theUser.status === "usager") {
          setIsUsager(true);
        } else {
          setIsSecondPresence(true);
        }
      } else {
        setIsNew(true);
      }
    } catch (error) {
      setError(
        "Une erreur est survenue lors de la récupération des utilisateurs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Background />
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col w-[80%] h-[80%] bg-[#C7ECFF] rounded-[30px] p-5 opacity-[81%] justify-between items-center py-[72px]">
          <Logo />
          <h1 className="text-[64px] font-bold">Entrez votre contact</h1>
          <Input
            placeholder="22901XXXXXXXX"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Boutton
              className="bg-[#0077FF] cursor-pointer"
              text={loading ? "Chargement..." : "Suivant"}
              onClick={checkTheNumber}
            />
          </div>
        </div>
      </div>

      {isSecondPresence && (
        <Toast
          title="Félicitation !!!"
          desription={`Vous êtes maintenant un usager du scop. Voici votre nouveau mot de passe:`}
          pin="E6y"
          link="/usager"
        />
      )}

      {isUsager && (
        <Toast
          title="Oh Oh !!!"
          desription={`Vous êtes déjà un usager. Veuillez s'il vous plaît entrer au SCOP en tant que usager.`}
          link="/usager"
        />
      )}

      {checkNumber && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Vérification du numéro ...</AlertDialogTitle>
              <AlertDialogDescription>
                {`Est-ce que le ${number} est bien votre numéro ?`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={verificationIsFalse}>
                Non
              </AlertDialogCancel>
              <AlertDialogAction onClick={verificationIsTrue}>
                Oui
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {isNew && (
        <NewVisitor number={number} />
      )}
    </div>
  );
};

export default page;
