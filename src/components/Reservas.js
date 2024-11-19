import React, { useState } from 'react';
import '../styles/reservas.css';

function Reservas() {
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState({
    idReserva: '',
    fk_Quarto_Numero: '',
    fk_Recepcionista_fk_Funcionario_Id_Funcionario: '',
    fk_Cliente_fk_Pessoa_CPF: '',
    Check_in: '',
    Check_out: '',
  });

  const handleAction = async () => {
    try {
      let response;
      switch (action) {
        case 'listarReservas':
          response = await fetch('http://localhost:8080/api/reservas/listar');
          setResult(await response.json());
          break;

        case 'checarStatus':
          if (!inputData.idReserva) {
            setResult('O ID da reserva é obrigatório.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/reservas/${inputData.idReserva}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            const data = await response.json();
            setResult(data);
          } else {
            setResult('Erro ao buscar status da reserva.');
          }
          break;

        case 'cancelarReserva':
          if (!inputData.idReserva) {
            setResult('O ID da reserva é obrigatório.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/reservas/cancelar/${inputData.idReserva}`, {
            method: 'DELETE',
          });
          setResult(response.ok ? 'Reserva cancelada com sucesso!' : 'Erro ao cancelar reserva.');
          break;

        case 'efetuarReserva':
          response = await fetch('http://localhost:8080/api/reservas/efetuar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fk_Quarto_Numero: parseInt(inputData.fk_Quarto_Numero, 10),
              fk_Recepcionista_fk_Funcionario_Id_Funcionario: parseInt(
                inputData.fk_Recepcionista_fk_Funcionario_Id_Funcionario,
                10
              ),
              fk_Cliente_fk_Pessoa_CPF: inputData.fk_Cliente_fk_Pessoa_CPF,
              Check_in: inputData.Check_in,
              Check_out: inputData.Check_out,
            }),
          });
          setResult(response.ok ? 'Reserva efetuada com sucesso!' : 'Erro ao efetuar reserva.');
          break;

        case 'atualizarReserva':
          if (!inputData.idReserva) {
            setResult('O ID da reserva é obrigatório.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/reservas/atualizar/${inputData.idReserva}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fk_Quarto_Numero: parseInt(inputData.fk_Quarto_Numero, 10),
              Check_in: inputData.Check_in,
              Check_out: inputData.Check_out,
            }),
          });
          setResult(response.ok ? 'Reserva atualizada com sucesso!' : 'Erro ao atualizar reserva.');
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
    <div className="reservas-container">
      <h2>Gerenciamento de Reservas</h2>
      <div className="reservas-actions">
        <select onChange={(e) => setAction(e.target.value)} value={action}>
          <option value="">Selecione uma ação</option>
          <option value="listarReservas">Listar Reservas</option>
          <option value="checarStatus">Checar Status</option>
          <option value="cancelarReserva">Cancelar Reserva</option>
          <option value="efetuarReserva">Efetuar Reserva</option>
          <option value="atualizarReserva">Atualizar Reserva</option>
        </select>

        {['checarStatus', 'cancelarReserva', 'atualizarReserva'].includes(action) && (
          <input
            type="text"
            placeholder="ID da Reserva"
            value={inputData.idReserva}
            onChange={(e) => setInputData({ ...inputData, idReserva: e.target.value })}
          />
        )}

        {['efetuarReserva', 'atualizarReserva'].includes(action) && (
          <>
            <input
              type="text"
              placeholder="Número do Quarto"
              value={inputData.fk_Quarto_Numero}
              onChange={(e) => setInputData({ ...inputData, fk_Quarto_Numero: e.target.value })}
            />
            {action === 'efetuarReserva' && (
              <>
                <input
                  type="text"
                  placeholder="ID do Recepcionista"
                  value={inputData.fk_Recepcionista_fk_Funcionario_Id_Funcionario}
                  onChange={(e) =>
                    setInputData({ ...inputData, fk_Recepcionista_fk_Funcionario_Id_Funcionario: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="CPF do Cliente"
                  value={inputData.fk_Cliente_fk_Pessoa_CPF}
                  onChange={(e) => setInputData({ ...inputData, fk_Cliente_fk_Pessoa_CPF: e.target.value })}
                />
              </>
            )}
            <input
              type="date"
              placeholder="Check-in"
              value={inputData.Check_in}
              onChange={(e) => setInputData({ ...inputData, Check_in: e.target.value })}
            />
            <input
              type="date"
              placeholder="Check-out"
              value={inputData.Check_out}
              onChange={(e) => setInputData({ ...inputData, Check_out: e.target.value })}
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
      ) : result && typeof result === 'object' ? (
        <table className="result-table">
          <thead>
            <tr>
              {Object.keys(result).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(result).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
}

export default Reservas;
