import React, { useState } from 'react';
import '../styles/clientes.css'; // Certifique-se de que o arquivo de estilo exista e esteja ajustado

function Clientes() {
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [cpfCliente, setCpfCliente] = useState('');
  const [enderecoData, setEnderecoData] = useState({
    rua: '',
    bairro: '',
    numero: '',
    cep: '',
  });
  const [clienteData, setClienteData] = useState({
    nome: '',
    email: '',
    telefone1: '',
    telefone2: '',
    cpf: '',
  });

  const handleAction = async () => {
    try {
      let response;
      switch (action) {
        case 'listar':
          response = await fetch('http://localhost:8080/api/clientes/listar');
          const clientesData = await response.json();
          setResult(clientesData);
          break;
        case 'cadastrar':
          response = await fetch('http://localhost:8080/api/clientes/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData),
          });
          if (response.ok) {
            setResult('Cliente cadastrado com sucesso!');
          } else {
            setResult('Erro ao cadastrar cliente.');
          }
          break;
        case 'cadastrarEndereco':
          // Transformar os campos de endereço em JSON
          const enderecoJson = {
            Rua: enderecoData.rua,
            Bairro: enderecoData.bairro,
            Numero: enderecoData.numero,
            Cep: enderecoData.cep,
          };

          response = await fetch(
            `http://localhost:8080/api/clientes/cadastro/endereco/${cpfCliente}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(enderecoJson),
            }
          );
          if (response.ok) {
            setResult('Endereço cadastrado com sucesso!');
          } else {
            setResult('Erro ao cadastrar endereço.');
          }
          break;
        default:
          setResult('Selecione uma ação válida.');
          break;
      }
    } catch (error) {
      console.error('Erro ao executar ação:', error);
      setResult('Erro ao realizar a ação. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="clientes-container">
      <h2>Gerenciamento de Clientes</h2>
      <div className="clientes-actions">
        <select onChange={(e) => setAction(e.target.value)} value={action}>
          <option value="">Selecione uma ação</option>
          <option value="listar">Listar Clientes</option>
          <option value="cadastrar">Cadastrar Cliente</option>
          <option value="cadastrarEndereco">Cadastrar Endereço</option>
        </select>
        {action === 'cadastrar' && (
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
            <input
              type="text"
              placeholder="CPF"
              value={clienteData.cpf}
              onChange={(e) => setClienteData({ ...clienteData, cpf: e.target.value })}
            />
          </div>
        )}
        {action === 'cadastrarEndereco' && (
          <div className="input-group">
            <input
              type="text"
              placeholder="CPF do Cliente"
              value={cpfCliente}
              onChange={(e) => setCpfCliente(e.target.value)}
            />
            <input
              type="text"
              placeholder="Rua"
              value={enderecoData.rua}
              onChange={(e) => setEnderecoData({ ...enderecoData, rua: e.target.value })}
            />
            <input
              type="text"
              placeholder="Bairro"
              value={enderecoData.bairro}
              onChange={(e) => setEnderecoData({ ...enderecoData, bairro: e.target.value })}
            />
            <input
              type="text"
              placeholder="Número"
              value={enderecoData.numero}
              onChange={(e) => setEnderecoData({ ...enderecoData, numero: e.target.value })}
            />
            <input
              type="text"
              placeholder="CEP"
              value={enderecoData.cep}
              onChange={(e) => setEnderecoData({ ...enderecoData, cep: e.target.value })}
            />
          </div>
        )}
        <button onClick={handleAction}>Executar</button>
      </div>
      <h3>Resultados:</h3>
      {result && typeof result === 'string' ? (
        <p>{result}</p>
      ) : (
        <table className="result-table">
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone 1</th>
              <th>Telefone 2</th>
              <th>Rua</th>
              <th>Bairro</th>
              <th>Número</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              result.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.CPF}</td>
                  <td>{cliente.Nome}</td>
                  <td>{cliente.Email}</td>
                  <td>{cliente.TELEFONE1}</td>
                  <td>{cliente.TELEFONE2 || 'N/A'}</td>
                  <td>{cliente.Rua || 'N/A'}</td>
                  <td>{cliente.Bairro || 'N/A'}</td>
                  <td>{cliente.Numero || 'N/A'}</td>
                  <td>{cliente.Cep || 'N/A'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Clientes;
