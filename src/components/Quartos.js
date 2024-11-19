import React, { useState } from 'react';
import '../styles/quartos.css'; // Certifique-se de que o estilo está corretamente importado

function Quartos() {
  const [action, setAction] = useState('');
  const [numeroQuarto, setNumeroQuarto] = useState('');
  const [result, setResult] = useState(null);

  const handleAction = async () => {
    try {
      let response;
      switch (action) {
        case 'listar':
          response = await fetch('http://localhost:8080/api/quartos/listar');
          const quartosData = await response.json();
          setResult(
            quartosData.map((quarto) => ({
              'Número do Quarto': quarto.Numero,
              Status: quarto.Status === 0 ? 'Disponível' : 'Ocupado',
              Tipo: quarto.Tipo,
            }))
          );
          break;

        case 'consultar':
          response = await fetch(`http://localhost:8080/api/quartos/consultar/${numeroQuarto}`);
          const quartoData = await response.json();
          setResult([
            {
              'Número do Quarto': quartoData.Numero,
              Status: quartoData.Status === 0 ? 'Disponível' : 'Ocupado',
              Tipo: quartoData.Tipo,
            },
          ]);
          break;

        case 'reservas':
          response = await fetch(`http://localhost:8080/api/quartos/reservas/${numeroQuarto}`);
          const reservasData = await response.json();
          setResult(
            reservasData.map((reserva) => ({
              'Número do Quarto': reserva.fk_Quarto_Numero,
              'Check-in': reserva.Check_In,
              'Check-out': reserva.Check_Out,
            }))
          );
          break;
          

        case 'liberar':
          response = await fetch(`http://localhost:8080/api/quartos/liberar/${numeroQuarto}`, {
            method: 'PUT',
          });
          if (response.ok) {
            setResult([{ Mensagem: 'Quarto liberado com sucesso!' }]);
          } else {
            setResult([{ Mensagem: 'Erro ao liberar o quarto.' }]);
          }
          break;

        default:
          setResult([{ Mensagem: 'Selecione uma ação válida.' }]);
          break;
      }
    } catch (error) {
      console.error('Erro ao executar ação:', error);
      setResult([{ Mensagem: 'Erro ao realizar a ação. Verifique os dados e tente novamente.' }]);
    }
  };

  return (
    <div className="quartos-container">
      <h2 className="quartos-header">Gerenciamento de Quartos</h2>
      <div className="quartos-actions">
        <select
          className="dropdown-menu"
          onChange={(e) => setAction(e.target.value)}
          value={action}
        >
          <option value="">Selecione uma ação</option>
          <option value="listar">Listar Quartos</option>
          <option value="consultar">Consultar Status do Quarto</option>
          <option value="reservas">Verificar Reservas</option>
          <option value="liberar">Liberar Quarto</option>
        </select>
        {(action === 'consultar' || action === 'liberar' || action === 'reservas') && (
          <input
            className="input-field"
            type="text"
            placeholder="Número do Quarto"
            value={numeroQuarto}
            onChange={(e) => setNumeroQuarto(e.target.value)}
          />
        )}
        <button className="executar-button" onClick={handleAction}>
          Executar
        </button>
      </div>
      <h3 className="result-header">Resultados:</h3>
      <div className="result-wrapper">
        {result && result.length > 0 ? (
          <table className="result-table">
            <thead>
              <tr>
                {Object.keys(result[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
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

export default Quartos;
