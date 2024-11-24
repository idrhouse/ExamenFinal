import { useState, useEffect } from 'react';
import api from '../services/api';
import { Evento, Sala, TipoEvento, EventoExtendido } from '../models/Types';

export const useFetchEventos = () => {
  const [eventos, setEventos] = useState<EventoExtendido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventosData, tipoEventosData, salasData] = await Promise.all([
          api.getEventos(),
          api.getTipoEventos(),
          api.getSalas()
        ]);

        const eventosExtendidos = eventosData.map((evento: Evento) => {
          const tipoEvento = tipoEventosData.find(te => te.id === evento.tipoEventoId);
          const sala = salasData.find(s => s.id === evento.salaId);
          return {
            ...evento,
            tipoEventoName: tipoEvento ? tipoEvento.name : 'Desconocido',
            salaName: sala ? sala.name : 'Desconocido'
          };
        });

        setEventos(eventosExtendidos);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { eventos, loading, error };
};

export const useFetchTipoEventosYSalas = () => {
  const [tipoEventos, setTipoEventos] = useState<TipoEvento[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipoEventosData, salasData] = await Promise.all([api.getTipoEventos(), api.getSalas()]);
        setTipoEventos(tipoEventosData);
        setSalas(salasData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tipoEventos, salas, loading, error };
};
