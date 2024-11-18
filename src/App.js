import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Financeiro from './components/Financeiro';
import Clientes from './components/Clientes';
import Quartos from './components/Quartos'; // Importa o componente Quartos

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
                <Link to="/quartos">Quartos</Link> {/* Adiciona Quartos ao menu */}
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/quartos" element={<Quartos />} /> {/* Define a rota para Quartos */}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
