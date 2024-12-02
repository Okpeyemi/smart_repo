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
} from "@/components/ui/alert-dialog";
import { getUserMotif, getUsers, postAuth, putOut } from "@/services/api";
import React, { useState } from "react";

const page = () => {
  const [number, setNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNotPresent, setIsNotPresent] = useState(false);
  const [isUsager, setIsUsager] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [userId, setUserId] = useState(0);

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
        if (theUser.status === "usager") {
          setIsUsager(true);
        } else {
          try {
            const response = await getUserMotif(theUser.id);
            const userLastPresence = response[response.length - 1];
            if (userLastPresence.departure_date === null) {
              try {
                const response = await putOut(theUser.id);
                console.log("Sortie enregistré avec succèss :", response);
                window.location.href = "/goodbye";
              } catch (error) {
                setError(
                  "Une erreur est survenue lors de l'authentification de l'usager."
                );
              } finally {
                setLoading(false);
              }
            } else {
              setIsNotPresent(true);
            }
          } catch (error) {}
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

  const outGoing = async () => {
    try {
      const response = await postAuth(number, pin);
      console.log("Usager authentifié avec succès :", response);
      setNumber("");
      setPin("");
      try {
        const response = await getUserMotif(userId);
        const userLastPresence = response[response.length - 1];
        if (userLastPresence.departure_date === null) {
          try {
            console.log(userId);
            const response = await putOut(userId);
            console.log("Sortie enregistré avec succèss :", response);
            window.location.href = "/goodbye";
          } catch (error) {
            setError(
              "Une erreur est survenue lors de l'authentification de l'usager."
            );
          } finally {
            setLoading(false);
          }
        } else {
          setIsNotPresent(true);
        }
      } catch (error) {}
    } catch (error) {
      setError(
        "Une erreur est survenue lors de l'authentification de l'usager."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Background />
      {isUsager ? (
        <>
          <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex flex-col w-[80%] h-[80%] bg-[#C7ECFF] rounded-[30px] p-5 opacity-[81%] justify-between items-center py-[72px]">
              <Logo />
              <h1 className="text-[64px] font-bold">Entrez votre pin</h1>
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
                  onClick={outGoing}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex flex-col w-[80%] h-[80%] bg-[#C7ECFF] rounded-[30px] p-5 opacity-[81%] justify-between items-center py-[72px]">
              <Logo />
              <h1 className="text-[64px] font-bold text-center">Une <span className="text-[#FF0000]">Sortie</span> ? </h1>
              <h2 className="text-[54px]">Entrez votre contact</h2>
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
        </>
      )}

      {isNotPresent && (
        <Toast
          title="Oh Oh !!!"
          desription={`Vous n'êtes pas encore entré dans le SCOP. Veuillez s'il vous plaît entrez dans Le SCOP.`}
          link="/entree"
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

      {isNew && <NewVisitor number={number} />}
    </div>
  );
};

export default page;
