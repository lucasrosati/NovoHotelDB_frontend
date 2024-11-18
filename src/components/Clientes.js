import React, { useState } from 'react';
import '../styles/clientes.css';

function Clientes() {
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [idCliente, setIdCliente] = useState('');
  const [clienteData, setClienteData] = useState({
    nome: '',
    email: '',
    telefone1: '',
    telefone2: ''
  });

  const handleAction = async () => {
    try {
      switch (action) {
        case 'listar':
          const listarResponse = await fetch('http://localhost:8080/api/clientes/listar');
          const listarData = await listarResponse.json();
          setResult(listarData);
          break;
        case 'cadastrar':
          await fetch('http://localhost:8080/api/clientes/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData)
          });
          setResult('Cliente cadastrado com sucesso!');
          break;
        case 'atualizar':
          await fetch(`http://localhost:8080/api/clientes/atualizar/${idCliente}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData)
          });
          setResult('Cliente atualizado com sucesso!');
          break;
        case 'deletar':
          await fetch(`http://localhost:8080/api/clientes/deletar/${idCliente}`, {
            method: 'DELETE'
          });
          setResult('Cliente deletado com sucesso!');
          break;
        default:
          setResult('Selecione uma ação válida.');
      }
    } catch (error) {
      console.error('Erro ao executar ação:', error);
      setResult('Erro ao executar ação. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="clientes-container">
      <h2>Clientes</h2>
      <div className="clientes-actions">
        <select onChange={(e) => setAction(e.target.value)} value={action}>
          <option value="">Selecione uma opção</option>
          <option value="listar">Listar Clientes</option>
          <option value="cadastrar">Cadastrar Cliente</option>
          <option value="atualizar">Atualizar Cliente</option>
          <option value="deletar">Deletar Cliente</option>
        </select>
        {(action === 'cadastrar' || action === 'atualizar') && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Nome"
              value={clienteData.nome}
              onChange={(e) => setClienteData({ ...clienteData, nome: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={clienteData.email}
              onChange={(e) => setClienteData({ ...clienteData, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telefone 1"
              value={clienteData.telefone1}
              onChange={(e) => setClienteData({ ...clienteData, telefone1: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telefone 2"
              value={clienteData.telefone2}
              onChange={(e) => setClienteData({ ...clienteData, telefone2: e.target.value })}
            />
          </div>
        )}
        {(action === 'atualizar' || action === 'deletar') && (
          <div className="input-group">
            <input
              type="text"
              placeholder="ID do Cliente"
              value={idCliente}
              onChange={(e) => setIdCliente(e.target.value)}
            />
          </div>
        )}
        <button onClick={handleAction}>Executar</button>
      </div>
      <h3>Resultados:</h3>
      {result && typeof result === 'string' ? (
        <p>{result}</p>
      ) : (
        <ul className="result-list">
          {result &&
            result.map((cliente) => (
              <li key={cliente.CPF}>
                {cliente.nome} - {cliente.email} - {cliente.telefone1} - {cliente.telefone2}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Clientes;
