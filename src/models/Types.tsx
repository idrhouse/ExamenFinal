export interface Sala {
    id: number;
    name: string;
    }

export interface TipoEvento {
    id: number;
    name: string;
    }

export interface Evento {
    id: number;
    name: string;
    date: string;
    horaInicio: string;
    horaFinal: string;
    tipoEventoId: number,
    salaId: number,
    }

export interface EventoExtendido extends Evento {
        tipoEventoName: string;
        salaName: string;
      }