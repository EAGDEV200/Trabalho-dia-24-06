import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../services/api';

function Cadastro() {
  const [codigo, setCodigo] = useState('');
  const [imagem, setImagem] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cartaoNome, setCartaoNome] = useState('');
  const [cartaoNumero, setCartaoNumero] = useState('');
  const [cartaoCvc, setCartaoCvc] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar as validações necessárias aqui antes de enviar os dados
    if (cartaoNumero.length !== 20) {
      alert('Número do Cartão deve conter exatamente 20 dígitos.');
      return;
    }

    if (cartaoCvc.length !== 3) {
      alert('CVC deve conter exatamente 3 dígitos.');
      return;
    }

    try {
      // Criar um objeto FormData para enviar a imagem
      const formData = new FormData();
      formData.append('imagem', imagem);

      // Adicionar os demais campos ao objeto FormData
      formData.append('codigo', codigo);
      formData.append('nomeCompleto', nomeCompleto);
      formData.append('endereco', endereco);
      formData.append('telefone', telefone);
      formData.append('cpf', cpf);
      formData.append('cartaoCredito.nome', cartaoNome);
      formData.append('cartaoCredito.numero', cartaoNumero);
      formData.append('cartaoCredito.cvc', cartaoCvc);
      formData.append('email', email);
      formData.append('senha', senha);

      // Enviar os dados para o servidor
      await api.post('/cliente/cadastrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirecionar para a página desejada após o cadastro
      navigate('/pagina-desejada');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div>
        <h1>Cadastro</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="codigo">
            <Form.Label>Código:</Form.Label>
            <Form.Control type="number" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="imagem">
            <Form.Label>Imagem:</Form.Label>
            <Form.Control type="file" onChange={handleImagemChange} />
          </Form.Group>

          <Form.Group controlId="nomeCompleto">
            <Form.Label>Nome Completo:</Form.Label>
            <Form.Control type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="endereco">
            <Form.Label>Endereço:</Form.Label>
            <Form.Control type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="telefone">
            <Form.Label>Telefone:</Form.Label>
            <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="cpf">
            <Form.Label>CPF:</Form.Label>
            <Form.Control type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="cartaoNome">
            <Form.Label>Nome no Cartão:</Form.Label>
            <Form.Control type="text" value={cartaoNome} onChange={(e) => setCartaoNome(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="cartaoNumero">
            <Form.Label>Número do Cartão:</Form.Label>
            <Form.Control type="text" value={cartaoNumero} onChange={(e) => setCartaoNumero(e.target.value)} required maxLength={20} />
          </Form.Group>

          <Form.Group controlId="cartaoCvc">
            <Form.Label>CVC:</Form.Label>
            <Form.Control type="password" value={cartaoCvc} onChange={(e) => setCartaoCvc(e.target.value)} required maxLength={3} />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="senha">
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit">Cadastrar</Button>
        </Form>
      </div>
    </div>
  );
}

export default Cadastro;
