# 🎮 PromoHunter - Caçador de Promoções de Games

## 📝 Sobre o Projeto
O **PromoHunter** é uma aplicação web desenvolvida como requisito para a disciplina de [Nome da Disciplina, ex: Desenvolvimento Web / Programação Web]. 

O sistema tem como objetivo principal resolver um problema comum dos gamers: a dificuldade de encontrar o menor preço de um jogo em meio a tantas lojas digitais (Steam, Epic Games, GOG, etc.). Através do consumo de APIs públicas, o usuário pode pesquisar por jogos e visualizar as melhores promoções do momento de forma unificada e com os preços convertidos para a moeda brasileira (Real).

## ⚙️ Funcionalidades Implementadas

- **Vitrine de Promoções Principais:** Ao carregar o site, o sistema sorteia dinamicamente e exibe 8 das melhores ofertas do momento (com base na avaliação de desconto da API), garantindo que a página sempre tenha novidades ao ser recarregada.
- **Sistema de Busca:** Um campo de pesquisa permite que o usuário digite o nome de qualquer jogo (ex: Cyberpunk, Resident Evil) e receba como resposta o jogo com o preço mais barato disponível.
- **Integração de Imagens (Capas Reais):** O sistema busca a capa oficial do jogo para ilustrar o card, tornando a interface visual e intuitiva.
- **Conversão de Moeda em Tempo Real:** Os preços originais da API são em Dólar (USD). O sistema consome uma API de finanças para pegar a cotação do Dólar Comercial do dia e converter o valor para Reais (BRL).
- **Design Responsivo e Temático:** Interface moderna construída com CSS puro, utilizando um tema escuro com gradientes neon (roxo e azul), inspirado na estética gamer, e que se adapta a telas de celulares e computadores.

## 🛠️ Arquitetura e Tecnologias

O projeto foi construído utilizando as seguintes tecnologias e integrações:

- **HTML5:** Estruturação semântica da página.
- **CSS3:** Estilização, animações, Grid Layout e responsividade.
- **PHP:** Utilizado como base para servir a página (`index.php`) e estruturar o ambiente de backend no servidor local.
- **JavaScript (ES6+):** Responsável pela lógica de negócio no front-end. Utiliza a `Fetch API` para realizar requisições assíncronas (AJAX) e manipulação do DOM para renderizar os cards de jogos dinamicamente.

### 🌐 APIs Públicas Consumidas:

1.  **[CheapShark API](https://apidocs.cheapshark.com/):** API principal do projeto. Responsável por fornecer os dados de jogos, preços, lojas e links de redirecionamento para compra. (API aberta, não requer chave).
2.  **[RAWG Video Games Database](https://rawg.io/apidocs):** Utilizada para buscar as imagens (capas) reais dos jogos, pois a CheapShark fornece apenas dados textuais. (Requer chave de API gratuita).
3.  **[AwesomeAPI (Economia)](https://docs.awesomeapi.com.br/):** Consumida para obter a cotação do Dólar Comercial em tempo real, permitindo a conversão precisa dos preços para Reais. (API aberta).
