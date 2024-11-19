import React, { useState } from 'react';
import '../styles/servicos.css';

function Servicos() {
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState({
    numero: '',
    id: '',
  });

  const handleAction = async () => {
    try {
      let response;
      switch (action) {
        case 'listarLimpezas':
          response = await fetch('http://localhost:8080/api/servicos/limpeza/listar');
          setResult(await response.json());
          break;

        case 'consultarLimpezas':
          if (!inputData.id) {
            setResult('O ID do funcionário é obrigatório para esta operação.');
            return;
          }
          response = await fetch(
            `http://localhost:8080/api/servicos/limpeza/${inputData.id}`
          );
          setResult(await response.json());
          break;

        case 'adicionarLimpeza':
          if (!inputData.numero || !inputData.id) {
            setResult('Número do quarto e ID do funcionário são obrigatórios.');
            return;
          }
          response = await fetch('http://localhost:8080/api/servicos/limpeza/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              numero: parseInt(inputData.numero, 10),
              id: parseInt(inputData.id, 10),
            }),
          });
          if (response.ok) {
            setResult('Limpeza adicionada com sucesso!');
          } else {
            const errorData = await response.json();
            setResult(`Erro ao adicionar limpeza: ${errorData.message || 'Erro desconhecido.'}`);
          }
          break;

        case 'listarManutencao':
          response = await fetch('http://localhost:8080/api/servicos/manutencao/listar');
          setResult(await response.json());
          break;

        case 'consultarManutencao':
          if (!inputData.id) {
            setResult('O ID do funcionário é obrigatório para esta operação.');
            return;
          }
          response = await fetch(
            `http://localhost:8080/api/servicos/manutencao/${inputData.id}`
          );
          const manutencaoData = await response.json();
          setResult(Array.isArray(manutencaoData) ? manutencaoData : [manutencaoData]);
          break;

        case 'adicionarManutencao':
          if (!inputData.numero || !inputData.id) {
            setResult('Número do quarto e ID do funcionário são obrigatórios.');
            return;
          }
          response = await fetch('http://localhost:8080/api/servicos/manutencao/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              numero: parseInt(inputData.numero, 10),
              id: parseInt(inputData.id, 10),
            }),
          });
          if (response.ok) {
            setResult('Manutenção adicionada com sucesso!');
          } else {
            const errorData = await response.json();
            setResult(`Erro ao adicionar manutenção: ${errorData.message || 'Erro desconhecido.'}`);
          }
          break;

        case 'listarReservas':
          if (!inputData.id) {
            setResult('O ID do recepcionista é obrigatório para esta operação.');
            return;
          }
          response = await fetch(
            `http://localhost:8080/api/servicos/reservas/listar/${inputData.id}`
          );
          const reservas = await response.json();
          setResult(Array.isArray(reservas) ? reservas : [reservas]);
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
    <div className="servicos-container">
      <h2>Gerenciamento de Serviços</h2>
      <div className="servicos-actions">
        <select onChange={(e) => setAction(e.target.value)} value={action}>
          <option value="">Selecione uma ação</option>
          <option value="listarLimpezas">Listar Limpezas</option>
          <option value="consultarLimpezas">Consultar Limpezas por Funcionário</option>
          <option value="adicionarLimpeza">Adicionar Limpeza</option>
          <option value="listarManutencao">Listar Manutenção</option>
          <option value="consultarManutencao">Consultar Manutenção por Funcionário</option>
          <option value="adicionarManutencao">Adicionar Manutenção</option>
          <option value="listarReservas">Listar Reservas por Recepcionista</option>
        </select>

        {['consultarLimpezas', 'consultarManutencao', 'listarReservas'].includes(action) && (
          <input
            type="number"
            placeholder="ID do Funcionário"
            value={inputData.id}
            onChange={(e) => setInputData({ ...inputData, id: e.target.value })}
          />
        )}

        {['adicionarLimpeza', 'adicionarManutencao'].includes(action) && (
          <>
            <input
              type="number"
              placeholder="Número do Quarto"
              value={inputData.numero}
              onChange={(e) => setInputData({ ...inputData, numero: e.target.value })}
            />
            <input
              type="number"
              placeholder="ID do Funcionário"
              value={inputData.id}
              onChange={(e) => setInputData({ ...inputData, id: e.target.value })}
            />
          </>
        )}

        <button onClick={handleAction}>Executar</button>
      </div>
      <h3>Resultados:</h3>
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
  );
}

export default Servicos;
