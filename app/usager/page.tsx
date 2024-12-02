"use client";

import Background from "@/components/Background";
import Boutton from "@/components/Boutton";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import Motif from "@/components/Motif";
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
} from "@/components/ui/alert-dialog";
import { getUserMotif, getUsers, postAuth } from "@/services/api";
import React, { useState } from "react";

const page = () => {
  const [number, setNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [motif, setMotif] = useState(false);
  const [isNotUsager, setIsNotUsager] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isEnter, setIsEnter] = useState(false);

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
        setUserId(theUser.id);
        if (theUser.status === "visiteur") {
          setIsNotUsager(true);
        } else {
          try {
            const response = await postAuth(number, pin);
            console.log("Usager authentifié avec succès :", response);
            setNumber("");
            setPin("");
            // setMotif(true);
            const secondResponse = await getUserMotif(theUser.id);
            const userLastPresence = secondResponse[secondResponse.length - 1];

            if (
              userLastPresence.arrival_date === null &&
              userLastPresence.departure_date === null
            ) {
              setMotif(true);
            } else if (
              userLastPresence.arrival_date !== null &&
              userLastPresence.departure_date === null
            ) {
              setIsEnter(true);
            } else if (
              userLastPresence.arrival_date !== null &&
              userLastPresence.departure_date !== null
            ) {
              setMotif(true);
            }
          } catch (error) {
            setError(
              "Une erreur est survenue lors de l'authentification de l'usager."
            );
          } finally {
            setLoading(false);
          }
        }
      } else {
        setIsNotUsager(true);
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
          <h1 className="text-[64px] font-bold text-center">
            Une <span className="text-[#0077FF]">Entrée</span> ?{" "}
          </h1>
          <h2 className="text-[44px]">Saisissez votre Contact et PIN</h2>
          <Input
            placeholder="22901XXXXXXXX"
            value={number}
            type="tel"
            onChange={(e) => setNumber(e.target.value)}
          />
          <Input
            placeholder="***"
            value={pin}
            type="text"
            onChange={(e) => setPin(e.target.value)}
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

      {isNotUsager && (
        <Toast
          title="Oh Oh !!!"
          desription={`Vous n'êtes pas un usager. Veuillez s'il vous plaît entrer au SCOP en tant que visiteur.`}
          link="/visiteur"
        />
      )}

      {isEnter && (
        <Toast
          title="Oh Oh !!!"
          desription={`Vous êtes déjà entrer au SCOP.`}
          link="/sortie"
        />
      )}

      {checkNumber && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[30px]">
                Vérification du numéro ...
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[20px]">
                {`Est-ce que le ${number} est bien votre numéro ?`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex w-full justify-center items-center">
              <AlertDialogCancel
                onClick={verificationIsFalse}
                className="w-full bg-[#FF0000] p-7 items-center justify-center rounded-[18px] hover:bg-red-400 text-[20px] text-white hover:text-white"
              >
                Non
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={verificationIsTrue}
                className="w-full bg-[#0004FF] p-7 items-center justify-center rounded-[18px] hover:bg-blue-500 text-[20px]"
              >
                Oui
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {motif && <Motif userId={userId} />}
    </div>
  );
};

export default page;
