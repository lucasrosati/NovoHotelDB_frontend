import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const Pagamentos = () => {
    const [pagamentos, setPagamentos] = useState([]);

    useEffect(() => {
        const fetchPagamentos = async () => {
            try {
                const response = await api.get('/pagamento/listar');
                console.log('Pagamentos recebidos:', response.data); // Debug
                setPagamentos(response.data);
            } catch (error) {
                console.error('Erro ao buscar pagamentos:', error);
            }
        };

        fetchPagamentos();
    }, []);

    return (
        <div>
            <h2>Lista de Pagamentos</h2>
            {pagamentos.length === 0 ? (
                <p>Nenhum pagamento encontrado.</p>
            ) : (
                <ul>
                    {pagamentos.map((pagamento) => (
                        <li key={pagamento.Pagamento_PK}>
                            {pagamento.Status} - {pagamento.Valor} - {pagamento.Data}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Pagamentos;
