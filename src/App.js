import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Financeiro from './components/Financeiro';
import Clientes from './components/Clientes';
import Quartos from './components/Quartos';
import Servicos from './components/Servicos';
import Funcionarios from './components/Funcionarios';
import Reservas from './components/Reservas';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NovoHotel Management</h1>
        <Router>
          <nav>
            <ul>
              <li><Link to="/financeiro">Financeiro</Link></li>
              <li><Link to="/clientes">Clientes</Link></li>
              <li><Link to="/quartos">Quartos</Link></li>
              <li><Link to="/servicos">Serviços</Link></li>
              <li><Link to="/funcionarios">Funcionários</Link></li>
              <li><Link to="/reservas">Reservas</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/quartos" element={<Quartos />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/reservas" element={<Reservas />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
