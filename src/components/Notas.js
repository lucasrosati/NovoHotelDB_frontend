import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const Notas = () => {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        const fetchNotas = async () => {
            try {
                const response = await api.get('/notas/listar');
                console.log('Notas recebidas:', response.data);
                setNotas(response.data);
            } catch (error) {
                console.error('Erro ao buscar notas:', error);
            }
        };

        fetchNotas();
    }, []);

    return (
        <div>
            <h2>Lista de Notas</h2>
            {notas.length === 0 ? (
                <p>Nenhuma nota encontrada.</p>
            ) : (
                <ul>
                    {notas.map((nota) => (
                        <li key={nota.Codigo}>
                            Código: {nota.Codigo} - Valor: {nota.Valor} - CNPJ: {nota.CNPJ_Hotel}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notas;