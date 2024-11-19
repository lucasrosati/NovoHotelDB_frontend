import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Financeiro from './components/Financeiro';
import Clientes from './components/Clientes';
import Quartos from './components/Quartos';
import Servicos from './components/Servicos'; // Importa o componente Serviços

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bem-vindo ao NovoHotel Frontend</h1>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/financeiro">Financeiro</Link>
              </li>
              <li>
                <Link to="/clientes">Clientes</Link>
              </li>
              <li>
                <Link to="/quartos">Quartos</Link>
              </li>
              <li>
                <Link to="/servicos">Serviços</Link> {/* Link para Serviços */}
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/quartos" element={<Quartos />} />
            <Route path="/servicos" element={<Servicos />} /> {/* Rota para Serviços */}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
