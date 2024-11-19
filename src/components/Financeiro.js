import React, { useState } from 'react';
import '../styles/financeiro.css';

function Financeiro() {
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [inputData, setInputData] = useState({
    idReserva: '',
    idPagamento: '',
    idNota: '',
  });

  const handleAction = async () => {
    try {
      let response;
      switch (action) {
        case 'listarPagamentos':
          response = await fetch('http://localhost:8080/api/pagamento/listar');
          if (response.ok) {
            setResult(await response.json());
          } else {
            setResult('Erro ao listar pagamentos.');
          }
          break;

        case 'consultarPagamento':
          if (!inputData.idPagamento) {
            setResult('O ID do pagamento é obrigatório.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/pagamento/${inputData.idPagamento}`);
          if (response.ok) {
            setResult(await response.json());
          } else {
            setResult('Erro ao consultar pagamento. Verifique o ID informado.');
          }
          break;

        case 'confirmarPagamento':
          if (!inputData.idReserva) {
            setResult('O ID da reserva é obrigatório.');
            return;
          }
          response = await fetch(
            `http://localhost:8080/api/pagamento/confirmar/${inputData.idReserva}`,
            {
              method: 'PUT',
            }
          );
          if (response.ok) {
            setResult('Pagamento confirmado com sucesso!');
          } else {
            const errorData = await response.json();
            setResult(`Erro ao confirmar pagamento: ${errorData.message || 'Erro desconhecido.'}`);
          }
          break;

        case 'listarNotas':
          response = await fetch('http://localhost:8080/api/notas/listar');
          if (response.ok) {
            const notasData = await response.json();
            setResult(
              notasData.map((nota) => ({
                Código: nota.Codigo,
                Valor: nota.Valor,
                CNPJ: nota.CNPJ_Hotel, // Mantém o nome da coluna como está
                'ID Reserva': nota.fk_ReservaClienteRecepcionistaQuarto_id_reserva,
              }))
            );
          } else {
            setResult('Erro ao listar notas.');
          }
          break;
        
        case 'consultarNota':
          if (!inputData.idNota) {
            setResult('O ID da nota é obrigatório.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/notas/${inputData.idNota}`);
          if (response.ok) {
            const nota = await response.json();
            setResult([
              {
                Código: nota.Codigo,
                Valor: nota.Valor,
                CNPJ: nota.CNPJ_Hotel, // Mantém o nome da coluna como está
                'ID Reserva': nota.fk_ReservaClienteRecepcionistaQuarto_id_reserva,
              },
            ]);
          } else {
            setResult('Erro ao consultar nota. Verifique o ID informado.');
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
    <div className="financeiro-container">
      <h2>Gerenciamento Financeiro</h2>
      <div className="financeiro-actions">
        <select
          className="dropdown-menu"
          onChange={(e) => setAction(e.target.value)}
          value={action}
        >
          <option value="">Selecione uma ação</option>
          <option value="listarPagamentos">Listar Pagamentos</option>
          <option value="consultarPagamento">Consultar Pagamento</option>
          <option value="confirmarPagamento">Confirmar Pagamento</option>
          <option value="listarNotas">Listar Notas</option>
          <option value="consultarNota">Consultar Nota</option>
        </select>

        {action === 'consultarPagamento' && (
          <input
            type="text"
            placeholder="ID do Pagamento"
            value={inputData.idPagamento}
            onChange={(e) => setInputData({ ...inputData, idPagamento: e.target.value })}
          />
        )}

        {action === 'confirmarPagamento' && (
          <input
            type="text"
            placeholder="ID da Reserva"
            value={inputData.idReserva}
            onChange={(e) => setInputData({ ...inputData, idReserva: e.target.value })}
          />
        )}

        {action === 'consultarNota' && (
          <input
            type="text"
            placeholder="ID da Nota"
            value={inputData.idNota}
            onChange={(e) => setInputData({ ...inputData, idNota: e.target.value })}
          />
        )}

        <button className="executar-button" onClick={handleAction}>
          Executar
        </button>
      </div>
      <h3>Resultados:</h3>
      {result && typeof result === 'string' ? (
        <p>{result}</p>
      ) : result && typeof result === 'object' && !Array.isArray(result) ? (
        <div className="result-wrapper">
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
        </div>
      ) : result && Array.isArray(result) ? (
        <div className="result-wrapper">
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
        </div>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
}

export default Financeiro;
