import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const navigate = useNavigate();
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [enderecoEntrega, setEnderecoEntrega] = useState('');
  const [cartaoCompra, setCartaoCompra] = useState('');

  useEffect(() => {
    // Recupere as informações do cliente via token
    const token = localStorage.getItem('token');

    const fetchClienteData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cliente/listar', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Exemplo: recupere as informações dos produtos selecionados
        const produtos = response.data.produtosSelecionados;
        setProdutosSelecionados(produtos);

        // Exemplo: recupere o endereço de entrega e cartão de compra
        const endereco = response.data.endereco;
        const cartao = response.data.cartao;
        setEnderecoEntrega(endereco);
        setCartaoCompra(cartao);
      } catch (error) {
        console.error('Erro ao obter dados do cliente:', error);
      }
    };

    fetchClienteData();
  }, []);

  const handleFinalizarPedido = () => {
    // Lógica para finalizar o pedido

    // Redirecione para a página de sucesso do pedido
    navigate('/');
  };

  return (
    <div>
      <h2>Checkout</h2>

      <h3>Produtos Selecionados:</h3>
      <ul>
        {produtosSelecionados.map((produto) => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>

      <h3>Endereço para Entrega:</h3>
      <p>{enderecoEntrega}</p>

      <h3>Cartão para Compra:</h3>
      <p>{cartaoCompra}</p>

      <button onClick={handleFinalizarPedido}>Finalizar Pedido</button>
    </div>
  );
}
