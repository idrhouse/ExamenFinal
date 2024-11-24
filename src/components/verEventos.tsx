import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchEventos } from '../hooks/verEventos';

const VerEventos: React.FC = () => {
  const { eventos, loading, error } = useFetchEventos();

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Eventos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Final</th>
            <th>Tipo de Evento</th>
            <th>Sala</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(evento => (
            <tr key={evento.id}>
              <td>{evento.name}</td>
              <td>{new Date(evento.date).toLocaleDateString()}</td>
              <td>{evento.horaInicio}</td>
              <td>{evento.horaFinal}</td>
              <td>{evento.tipoEventoName}</td>
              <td>{evento.salaName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/creareventos">
        <button>Ir Crear Evento</button>
      </Link>
    </div>
  );
};

export default VerEventos;
