
import { useParams } from 'react-router-dom';
import Title from './../components/Title/index';


function Sobre() {
  const { name } = useParams();

  return (
    <div>
      <Title
        title={"Sobre a nossa empresa de cinema"}
        text={"Saiba mais sobre nós e nossos serviços"} />

      <p>Olá {name}, bem-vindo à nossa empresa de cinema!</p>

      <p>Aqui na nossa empresa, temos o compromisso de proporcionar a você a melhor experiência em cinema possível. Temos diversas salas de cinema equipadas com as mais avançadas tecnologias de projeção e som, garantindo uma imersão total nos filmes que exibimos.</p>

      <p>Além disso, estamos sempre trazendo os lançamentos mais aguardados do cinema para que você possa assistir em primeira mão. Temos também promoções especiais para que você possa aproveitar ainda mais a sua visita ao cinema.</p>

      <p>Estamos localizados em vários pontos da cidade, tornando mais fácil para você encontrar um cinema da nossa empresa próximo a você. Não perca tempo e venha conferir os melhores filmes em cartaz!</p>
    </div>
  )
}

export default Sobre;