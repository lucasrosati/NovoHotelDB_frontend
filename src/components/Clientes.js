import React, { useState } from 'react';
import '../styles/clientes.css';

function Clientes() {
  const [action, setAction] = useState('');
  const [result, setResult] = useState(null);
  const [cpf, setCpf] = useState('');
  const [clienteData, setClienteData] = useState({
    nome: '',
    email: '',
    telefone1: '',
    telefone2: '',
  });
  const [enderecoData, setEnderecoData] = useState({
    rua: '',
    numero: '',
    bairro: '',
    cep: '',
  });
  const [pagamentoData, setPagamentoData] = useState({
    numero: '',
    cvv: '',
    vencimento: '',
    tipo: '',
  });

  const handleAction = async () => {
    try {
      let response;
      switch (action) {
        case 'listar':
          response = await fetch('http://localhost:8080/api/clientes/listar');
          if (response.ok) {
            setResult(await response.json());
          } else {
            setResult('Erro ao listar clientes.');
          }
          break;

        case 'cadastrarPessoa':
          if (!cpf || !clienteData.nome || !clienteData.email || !clienteData.telefone1) {
            setResult('Preencha todos os campos obrigatórios para cadastrar uma pessoa.');
            return;
          }
          response = await fetch('http://localhost:8080/api/clientes/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, ...clienteData }),
          });
          setResult(response.ok ? 'Cliente cadastrado com sucesso!' : 'Erro ao cadastrar cliente.');
          break;

        case 'cadastrarEndereco':
          if (!cpf || !enderecoData.rua || !enderecoData.numero || !enderecoData.bairro || !enderecoData.cep) {
            setResult('Preencha todos os campos obrigatórios para cadastrar o endereço.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/clientes/cadastro/endereco/${cpf}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enderecoData),
          });
          setResult(response.ok ? 'Endereço cadastrado com sucesso!' : 'Erro ao cadastrar endereço.');
          break;

        case 'excluirCliente':
          if (!cpf) {
            setResult('O CPF é obrigatório para excluir o cliente.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/clientes/excluir/${cpf}`, {
            method: 'DELETE',
          });
          setResult(response.ok ? 'Cliente excluído com sucesso!' : 'Erro ao excluir cliente.');
          break;

        case 'buscarCliente':
          if (!cpf) {
            setResult('O CPF é obrigatório para buscar o cliente.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/clientes/buscar/${cpf}`);
          setResult(response.ok ? await response.json() : 'Erro ao buscar cliente.');
          break;

        case 'atualizarCliente':
          if (!cpf || !clienteData.email || !clienteData.telefone1) {
            setResult('Preencha todos os campos obrigatórios para atualizar o cliente.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/clientes/atualizar/${cpf}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData),
          });
          setResult(response.ok ? 'Cliente atualizado com sucesso!' : 'Erro ao atualizar cliente.');
          break;

        case 'atualizarEndereco':
          if (!cpf || !enderecoData.rua || !enderecoData.numero || !enderecoData.bairro || !enderecoData.cep) {
            setResult('Preencha todos os campos obrigatórios para atualizar o endereço.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/clientes/atualizar/endereco/${cpf}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enderecoData),
          });
          setResult(response.ok ? 'Endereço atualizado com sucesso!' : 'Erro ao atualizar endereço.');
          break;

        case 'cadastrarPagamento':
          if (!cpf || !pagamentoData.numero || !pagamentoData.cvv || !pagamentoData.vencimento || !pagamentoData.tipo) {
            setResult('Preencha todos os campos obrigatórios para cadastrar o pagamento.');
            return;
          }
          response = await fetch(`http://localhost:8080/api/clientes/cadastro/pagamento/${cpf}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pagamentoData),
          });
          setResult(response.ok ? 'Pagamento cadastrado com sucesso!' : 'Erro ao cadastrar pagamento.');
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
        <select
          className="dropdown-menu"
          onChange={(e) => setAction(e.target.value)}
          value={action}
        >
          <option value="">Selecione uma ação</option>
          <option value="listar">Listar Clientes</option>
          <option value="cadastrarPessoa">Cadastrar Pessoa</option>
          <option value="cadastrarEndereco">Cadastrar Endereço</option>
          <option value="excluirCliente">Excluir Cliente</option>
          <option value="buscarCliente">Buscar Cliente</option>
          <option value="atualizarCliente">Atualizar Cliente</option>
          <option value="atualizarEndereco">Atualizar Endereço</option>
          <option value="cadastrarPagamento">Cadastrar Pagamento</option>
        </select>

        <div className="input-group">
          {['cadastrarPessoa', 'atualizarCliente', 'cadastrarEndereco', 'atualizarEndereco', 'cadastrarPagamento', 'excluirCliente', 'buscarCliente'].includes(action) && (
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          )}

          {['cadastrarPessoa', 'atualizarCliente'].includes(action) && (
            <>
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
            </>
          )}

          {['cadastrarEndereco', 'atualizarEndereco'].includes(action) && (
            <>
              <input
                type="text"
                placeholder="Rua"
                value={enderecoData.rua}
                onChange={(e) => setEnderecoData({ ...enderecoData, rua: e.target.value })}
              />
              <input
                type="text"
                placeholder="Número"
                value={enderecoData.numero}
                onChange={(e) => setEnderecoData({ ...enderecoData, numero: e.target.value })}
              />
              <input
                type="text"
                placeholder="Bairro"
                value={enderecoData.bairro}
                onChange={(e) => setEnderecoData({ ...enderecoData, bairro: e.target.value })}
              />
              <input
                type="text"
                placeholder="CEP"
                value={enderecoData.cep}
                onChange={(e) => setEnderecoData({ ...enderecoData, cep: e.target.value })}
              />
            </>
          )}

          {action === 'cadastrarPagamento' && (
            <>
              <input
                type="text"
                placeholder="Número do Cartão"
                value={pagamentoData.numero}
                onChange={(e) => setPagamentoData({ ...pagamentoData, numero: e.target.value })}
              />
              <input
                type="text"
                placeholder="CVV"
                value={pagamentoData.cvv}
                onChange={(e) => setPagamentoData({ ...pagamentoData, cvv: e.target.value })}
              />
              <input
                type="text"
                placeholder="Vencimento"
                value={pagamentoData.vencimento}
                onChange={(e) => setPagamentoData({ ...pagamentoData, vencimento: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tipo"
                value={pagamentoData.tipo}
                onChange={(e) => setPagamentoData({ ...pagamentoData, tipo: e.target.value })}
              />
            </>
          )}
        </div>

        <button className="executar-button" onClick={handleAction}>
          Executar
        </button>
      </div>

      <h3>Resultados:</h3>
      {result && typeof result === 'string' ? (
        <p>{result}</p>
      ) : (
        result &&
        Array.isArray(result) && (
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
        )
      )}
    </div>
  );
}

export default Clientes;
