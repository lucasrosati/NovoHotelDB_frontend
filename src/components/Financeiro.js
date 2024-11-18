import React, { useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/financeiro.css';


const Financeiro = () => {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
    const [idConsulta, setIdConsulta] = useState('');
    const [resultado, setResultado] = useState([]);
    const [erro, setErro] = useState('');

    const handleConsultar = async () => {
        try {
            setErro('');
            setResultado([]);
            if (opcaoSelecionada === 'listarPagamentos') {
                const response = await api.get('/pagamento/listar');
                setResultado(response.data);
            } else if (opcaoSelecionada === 'listarNotas') {
                const response = await api.get('/notas/listar');
                setResultado(response.data);
            } else if (opcaoSelecionada === 'consultarPagamento') {
                if (!idConsulta) throw new Error('Informe o ID do pagamento.');
                const response = await api.get(`/pagamento/${idConsulta}`);
                setResultado([response.data]); // Colocando em array para renderização consistente
            } else if (opcaoSelecionada === 'consultarNota') {
                if (!idConsulta) throw new Error('Informe o ID da nota.');
                const response = await api.get(`/notas/${idConsulta}`);
                setResultado([response.data]); // Colocando em array para renderização consistente
            }
        } catch (error) {
            console.error('Erro ao realizar consulta:', error);
            setErro('Erro ao realizar a consulta. Verifique os dados ou tente novamente.');
        }
    };

    return (
        <div>
            <h1>Financeiro</h1>
            <label htmlFor="opcoes">Selecione uma opção:</label>
            <select
                id="opcoes"
                value={opcaoSelecionada}
                onChange={(e) => setOpcaoSelecionada(e.target.value)}
            >
                <option value="">-- Escolha uma opção --</option>
                <option value="listarPagamentos">Listar todos os pagamentos</option>
                <option value="listarNotas">Listar todas as notas</option>
                <option value="consultarPagamento">Consultar pagamento específico</option>
                <option value="consultarNota">Consultar nota específica</option>
            </select>

            {(opcaoSelecionada === 'consultarPagamento' || opcaoSelecionada === 'consultarNota') && (
                <div>
                    <label htmlFor="idConsulta">
                        Informe o ID {opcaoSelecionada === 'consultarPagamento' ? 'do pagamento' : 'da nota'}:
                    </label>
                    <input
                        id="idConsulta"
                        type="text"
                        value={idConsulta}
                        onChange={(e) => setIdConsulta(e.target.value)}
                    />
                </div>
            )}

            <button onClick={handleConsultar}>Consultar</button>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <div>
                <h3>Resultados:</h3>
                {resultado.length === 0 ? (
                    <p>Nenhum resultado encontrado.</p>
                ) : (
                    <ul>
                        {resultado.map((item, index) => (
                            <li key={index}>
                                {opcaoSelecionada.includes('Pagamento') ? (
                                    <>
                                        <p>ID: {item.Pagamento_PK}</p>
                                        <p>Status: {item.Status}</p>
                                        <p>Valor: {item.Valor}</p>
                                        <p>Data: {item.Data}</p>
                                    </>
                                ) : (
                                    <>
                                        <p>Código: {item.Codigo}</p>
                                        <p>Valor: {item.Valor}</p>
                                        <p>CNPJ: {item.CNPJ_Hotel}</p>
                                        <p>Reserva ID: {item.fk_ReservaClienteRecepcionistaQuarto_id_reserva}</p>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Financeiro;
