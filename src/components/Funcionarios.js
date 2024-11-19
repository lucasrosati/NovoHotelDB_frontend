import React, { useState } from 'react';
import '../styles/funcionarios.css'; // Importa o CSS correto para Funcionarios.js

function Funcionarios() {
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState({
    cpf: '',
    nome: '',
    email: '',
    telefone1: '',
    telefone2: '',
    numero: '',
    rua: '',
    bairro: '',
    cep: '',
    gerente_id: '',
    gerenciado_id: '',
  });

  const handleAction = async () => {
    try {
      let response;
      switch (action) {
        case 'listarFuncionarios':
          response = await fetch('http://localhost:8080/api/funcionarios/listar');
          setResult(await response.json());
          break;

        case 'listarCamareiras':
          response = await fetch('http://localhost:8080/api/funcionarios/camareira');
          setResult(await response.json());
          break;

        case 'listarServicosGerais':
          response = await fetch('http://localhost:8080/api/funcionarios/servicosgerais');
          setResult(await response.json());
          break;

        case 'listarRecepcionistas':
          response = await fetch('http://localhost:8080/api/funcionarios/recepcionista');
          setResult(await response.json());
          break;

        case 'cadastrarCamareira':
          response = await fetch('http://localhost:8080/api/funcionarios/cadastrar/camareira', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cpf: inputData.cpf,
              nome: inputData.nome,
              email: inputData.email,
              telefone1: inputData.telefone1,
              telefone2: inputData.telefone2,
            }),
          });
          setResult(response.ok ? 'Camareira cadastrada com sucesso!' : 'Erro ao cadastrar camareira.');
          break;

        case 'cadastrarServicosGerais':
          response = await fetch('http://localhost:8080/api/funcionarios/cadastrar/servicosgerais', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cpf: inputData.cpf,
              nome: inputData.nome,
              email: inputData.email,
              telefone1: inputData.telefone1,
              telefone2: inputData.telefone2,
            }),
          });
          setResult(response.ok ? 'Funcionário de Serviços Gerais cadastrado com sucesso!' : 'Erro ao cadastrar funcionário.');
          break;

        case 'cadastrarRecepcionista':
          response = await fetch('http://localhost:8080/api/funcionarios/cadastrar/recepcionista', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cpf: inputData.cpf,
              nome: inputData.nome,
              email: inputData.email,
              telefone1: inputData.telefone1,
              telefone2: inputData.telefone2,
            }),
          });
          setResult(response.ok ? 'Recepcionista cadastrada com sucesso!' : 'Erro ao cadastrar recepcionista.');
          break;

        case 'cadastrarEndereco':
          response = await fetch(`http://localhost:8080/api/funcionarios/cadastro/endereco/${inputData.cpf}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Rua: inputData.rua,
              Numero: inputData.numero,
              Bairro: inputData.bairro,
              Cep: inputData.cep,
              fk_Pessoa_CPF: inputData.cpf,
            }),
          });
          setResult(response.ok ? 'Endereço cadastrado com sucesso!' : 'Erro ao cadastrar endereço.');
          break;

        case 'atualizarEndereco':
          response = await fetch(`http://localhost:8080/api/funcionarios/atualizar/endereco/${inputData.cpf}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Rua: inputData.rua,
              Numero: inputData.numero,
              Bairro: inputData.bairro,
              Cep: inputData.cep,
              fk_Pessoa_CPF: inputData.cpf,
            }),
          });
          setResult(response.ok ? 'Endereço atualizado com sucesso!' : 'Erro ao atualizar endereço.');
          break;

        case 'adicionarGerente':
          response = await fetch('http://localhost:8080/api/funcionarios/adicionar/gerente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              gerente_id: inputData.gerente_id,
              gerenciado_id: inputData.gerenciado_id,
            }),
          });
          setResult(response.ok ? 'Gerente adicionado com sucesso!' : 'Erro ao adicionar gerente.');
          break;

        case 'listarGerentes':
          response = await fetch('http://localhost:8080/api/funcionarios/listar/gerentes');
          setResult(await response.json());
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
    <div className="funcionarios-container">
      <h2>Gerenciamento de Funcionários</h2>
      <div className="funcionarios-actions">
        <select className="dropdown-menu" onChange={(e) => setAction(e.target.value)} value={action}>
          <option value="">Selecione uma ação</option>
          <option value="listarFuncionarios">Listar Funcionários</option>
          <option value="listarCamareiras">Listar Camareiras</option>
          <option value="listarServicosGerais">Listar Funcionários de Serviços Gerais</option>
          <option value="listarRecepcionistas">Listar Recepcionistas</option>
          <option value="cadastrarCamareira">Cadastrar Camareira</option>
          <option value="cadastrarServicosGerais">Cadastrar Funcionário de Serviços Gerais</option>
          <option value="cadastrarRecepcionista">Cadastrar Recepcionista</option>
          <option value="cadastrarEndereco">Cadastrar Endereço</option>
          <option value="atualizarEndereco">Atualizar Endereço</option>
          <option value="adicionarGerente">Adicionar Gerente</option>
          <option value="listarGerentes">Listar Gerentes</option>
        </select>

        {action.includes('cadastrar') || action === 'atualizarEndereco' ? (
          <>
            <input
              type="text"
              placeholder="CPF"
              value={inputData.cpf}
              onChange={(e) => setInputData({ ...inputData, cpf: e.target.value })}
            />
            {action !== 'cadastrarEndereco' && action !== 'atualizarEndereco' && (
              <>
                <input
                  type="text"
                  placeholder="Nome"
                  value={inputData.nome}
                  onChange={(e) => setInputData({ ...inputData, nome: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={inputData.email}
                  onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Telefone 1"
                  value={inputData.telefone1}
                  onChange={(e) => setInputData({ ...inputData, telefone1: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Telefone 2"
                  value={inputData.telefone2}
                  onChange={(e) => setInputData({ ...inputData, telefone2: e.target.value })}
                />
              </>
            )}
            {(action === 'cadastrarEndereco' || action === 'atualizarEndereco') && (
              <>
                <input
                  type="text"
                  placeholder="Rua"
                  value={inputData.rua}
                  onChange={(e) => setInputData({ ...inputData, rua: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Número"
                  value={inputData.numero}
                  onChange={(e) => setInputData({ ...inputData, numero: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={inputData.bairro}
                  onChange={(e) => setInputData({ ...inputData, bairro: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="CEP"
                  value={inputData.cep}
                  onChange={(e) => setInputData({ ...inputData, cep: e.target.value })}
                />
              </>
            )}
          </>
        ) : action === 'adicionarGerente' ? (
          <>
            <input
              type="text"
              placeholder="ID do Gerente"
              value={inputData.gerente_id}
              onChange={(e) => setInputData({ ...inputData, gerente_id: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID Gerenciado"
              value={inputData.gerenciado_id}
              onChange={(e) => setInputData({ ...inputData, gerenciado_id: e.target.value })}
            />
          </>
        ) : null}

        <button className="executar-button" onClick={handleAction}>
          Executar
        </button>
      </div>
      <h3>Resultados:</h3>
      <div className="result-wrapper">
        {result && typeof result === 'string' ? (
          <p>{result}</p>
        ) : result && Array.isArray(result) ? (
          <table className="result-table">
            <thead>
              <tr>
                {Object.keys(result[0] || {}).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, subIndex) => (
                    <td key={subIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Funcionarios;
