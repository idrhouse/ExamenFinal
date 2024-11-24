import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Evento } from '../models/Types';
import { useFetchTipoEventosYSalas } from '../hooks/verEventos';
import { AxiosError } from 'axios';

const CrearEvento: React.FC = () => {
  const { tipoEventos, salas, loading, error } = useFetchTipoEventosYSalas();
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [horaInicio, setHoraInicio] = useState<string>('');
  const [horaFinal, setHoraFinal] = useState<string>('');
  const [selectedTipoEvento, setSelectedTipoEvento] = useState<number | null>(null);
  const [selectedSala, setSelectedSala] = useState<number | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTipoEvento === null || selectedSala === null) {
      console.error('TipoEvento or Sala not selected');
      return;
    }

    const newEvento: Omit<Evento, 'id'> = {
      name,
      date,
      horaInicio,
      horaFinal,
      tipoEventoId: selectedTipoEvento,
      salaId: selectedSala,
    };

    try {
      const createdEvento = await api.createEvento(newEvento);
      console.log('Evento creado:', createdEvento);
      alert('Registro agregado con éxito');
      setBackendError(null); 
    } catch (error) {
      console.error('Error creating evento:', error);
      if (error instanceof AxiosError && error.response) {
        setBackendError(error.response.data);
      } else {
        setBackendError('Error creando el evento');
      }
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="crear-evento-container">
      <form className="crear-evento-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="horaInicio">Hora Inicio:</label>
          <input
            type="time"
            id="horaInicio"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="horaFinal">Hora Final:</label>
          <input
            type="time"
            id="horaFinal"
            value={horaFinal}
            onChange={(e) => setHoraFinal(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoEvento">Tipo de Evento:</label>
          <select
            id="tipoEvento"
            value={selectedTipoEvento ?? ''}
            onChange={(e) => setSelectedTipoEvento(Number(e.target.value))}
            required
          >
            <option value="" disabled>Seleccione un tipo de evento</option>
            {tipoEventos.map(tipoEvento => (
              <option key={tipoEvento.id} value={tipoEvento.id}>{tipoEvento.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sala">Sala:</label>
          <select
            id="sala"
            value={selectedSala ?? ''}
            onChange={(e) => setSelectedSala(Number(e.target.value))}
            required
          >
            <option value="" disabled>Seleccione una sala</option>
            {salas.map(sala => (
              <option key={sala.id} value={sala.id}>{sala.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Agregar a DB</button>        
      </form>
      <Link to="/eventos">
        <button className="link-button">Ir A Eventos</button>
      </Link>
      {backendError && <p className="error-message">{backendError}</p>}
    </div>
  );
};

export default CrearEvento;