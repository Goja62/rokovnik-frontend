import { TelefonType } from "./TelefonType";

export default class KontaktType {
    kontaktId?: number
    email?: string;
    prezime?: string;
    ime?: string;
    adresa?: string;
    mesto?: string;
    datumRodjenja?: string;
    korisnikId?: number;
    telefoni?: TelefonType[];
}