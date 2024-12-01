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
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
        throw error;
    }
}

export const postMotif = async (userId: number, motif: string) => {
    try {
        const response = await api.post(`scop/entries/${userId}`, {
            motif: motif,
        });
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du motif :", error);
        throw error;
    }
}

// export const getMotif = async ()

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
}