import { Equipe } from "./equipe-model"

export interface Horario {
    id?: string,
    equipe?: Equipe,
    dia_semana?: string,
    horario_inicio?: string,
    horario_fim?: string,
    local?: string,
    valor_horario?: number,
    valor_pagamento?: number,
    valor_diaria?: number
}