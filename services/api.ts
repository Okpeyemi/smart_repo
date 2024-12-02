import Motif from "@/components/Motif";
import { API_URL } from "@/server/server";
import axios from "axios";

const api = axios.create({
  baseURL: `${API_URL}`,
});

export const getUsers = async () => {
  try {
    const response = await api.get("users");
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts:", error);
    throw error;
  }
};

export const postUsers = async (user: {
  nom: string;
  prenoms: string;
  telephone: string;
  email: string;
  age: string;
  sexe: string;
  profil: string;
  status: string;
}) => {
  try {
    const response = await api.post("users", {
      user: {
        nom: user.nom,
        prenoms: user.prenoms,
        telephone: user.telephone,
        email: user.email,
        age: user.age,
        sexe: user.sexe,
        profil: user.profil,
        status: user.status,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    throw error;
  }
};

export const postMotif = async (userId?: number, motif?: string) => {
  try {
    const response = await api.post(`scop/entries/${userId}`, {
      motif: motif,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du motif :", error);
    throw error;
  }
};

export const putOut = async (userId: number) => {
    try {
        const response = await api.put(`scop/outgoings/${userId}`)
        return response.data.data
    } catch (error) {
      console.error("Erreur lors de la sortie d'un utilisateur")
    }
}

export const getUserMotif = async (userId: number, motif?: string) => {
  try {
    const response = await api.get(`presences`);
    const data = response.data.data;
    const userPresences = data.filter(
      (presence: { user_id: number }) => presence.user_id === userId
    );
    // const userPresences = data.filter(
    //     (presence: {user_id: number; arrival_date: string | null; departure_date: string | null}) => presence.user_id === userId && presence.arrival_date === null && presence.departure_date === null
    // );
    // const lastUserPresences = userPresences[userPresences.length - 1];
    // if (lastUserPresences.arrival_date === null) {
    //   try {
    //     const response = await postMotif(userId, motif);
    //     console.log(response);
    //   } catch (error) {
    //     console.error("Erreur lors de l'enregistrement du motif :", error);
    //     throw error;
    //   }
    // } else {
    //     try
    // }
    return userPresences;
  } catch (error) {
    console.error("Erreur lors de la récupération des motifs :", error);
    throw error;
  }
};

export const postAuth = async (telephone: string, pin: string) => {
  try {
    const response = await api.post(`auth/authenticate`, {
      telephone: telephone,
      pin: pin,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de l'entrer de l'usager :", error);
    throw error;
  }
};
