import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import CrearEvento from './components/crearEventos';
import VerEventos from './components/verEventos';

const App: React.FC = () => {
  return (
      <Router>
      <Routes>
          <Route path="/creareventos" element={<CrearEvento />} />
          <Route path="/eventos" element={<VerEventos />} />
        </Routes>
      </Router>
  );
};

export default App
