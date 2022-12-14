import { Status } from "./status.enum";

export interface ResponseLogin {
    nome: string;
    celular: string;
    time: string;
    status: Status;
    auth: string;
}

export interface ResponseLoginToken {
    token: string;
}