// Váriaveis
let cotacaoDolar = 5.00; 
const RAWG_API_KEY = "02fad11ce45c402c8f7e3ccfa622bdae";

const lojas = {
    "1": "Steam", "2": "GamersGate", "3": "GreenManGaming", "7": "GOG",
    "8": "Origin", "11": "Humble Store", "13": "Uplay", "15": "Fanatical",
    "21": "WinGameStore", "23": "GameBillet", "24": "Voidu", "25": "Epic Games",
    "27": "Gamesplanet", "28": "Gamesload", "29": "2Game", "30": "IndieGala",
    "31": "Blizzard", "33": "DLGamer", "34": "Noctre", "35": "DreamGame"
};

async function buscarCotacao() {
    try {
        const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
        const dados = await resposta.json();
        cotacaoDolar = parseFloat(dados.USDBRL.bid);
    } catch (erro) {
        console.error("Erro na cotação, usando valor fixo.", erro);
    }
}

function formatarPreco(valorEmDolar) {
    if (valorEmDolar == 0) return "Grátis";
    let valor = parseFloat(valorEmDolar);
    if (Number.isInteger(valor) && valor >= 100) {
        valor = valor / 100;
    }
    const valorEmReal = valor * cotacaoDolar;
    return "R$ " + valorEmReal.toFixed(2).replace('.', ',');
}

async function buscarImagemJogo(nome) {
    try {
        const termo = encodeURIComponent(nome.trim());
        const resposta = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${termo}&page_size=1`);
        const dados = await resposta.json();
        
        if (dados.results && dados.results.length > 0) {
            const jogoEncontrado = dados.results[0];
            return jogoEncontrado.background_image || "https://via.placeholder.com/300x150/1a0b2e/9d4edd?text=Sem+Foto";
        }
        return "https://via.placeholder.com/300x150/1a0b2e/9d4edd?text=Sem+Foto";
    } catch (erro) {
        return "https://via.placeholder.com/300x150/1a0b2e/9d4edd?text=Sem+Foto";
    }
}

// html do card
async function criarCardJogo(nome, precoAntigo, precoNovo, link, idLoja) {
    let htmlPrecoAntigo = "";
    if (precoAntigo && parseFloat(precoAntigo) > 0 && parseFloat(precoNovo) < parseFloat(precoAntigo)) {
        htmlPrecoAntigo = `<span class="preco-antigo">${formatarPreco(precoAntigo)}</span>`;
    }

    // Se não tiver ID da loja, busca o link
    let idFinal = idLoja;
    if (!idFinal && link.includes('dealID=')) {
        try {
            const dealId = link.split('dealID=')[1].split('&')[0];
            // retorna a loja
            const res = await fetch(`https://www.cheapshark.com/api/1.0/deals?id=${dealId}`);
            const dealData = await res.json();
            if (dealData.gameInfo && dealData.gameInfo.storeID) {
                idFinal = dealData.gameInfo.storeID;
            }
        } catch (e) {
            console.error("Erro ao buscar detalhes da loja.");
        }
    }

    const nomeLoja = idFinal ? (lojas[idFinal] || "Loja Parceira") : "Ver na loja";
    const urlImagem = await buscarImagemJogo(nome);

    return `
        <div class="card">
            <div class="capa-jogo">
                <img src="${urlImagem}" alt="${nome}" loading="lazy">
            </div>
            <h3>${nome}</h3>
            <p class="loja-info">Disponível em: <strong>${nomeLoja}</strong></p>
            <div class="preco-container">
                ${htmlPrecoAntigo}
                <span class="preco-novo">${formatarPreco(precoNovo)}</span>
            </div>
            <a href="${link}" target="_blank" class="btn-loja">Ver Oferta</a>
        </div>
    `;
}

// embaralhar array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// carregar promoções principais
async function carregarPromocoes() {
    const gridPromocoes = document.getElementById('grid-promocoes');
    await buscarCotacao();

    try {
        // busca promoções e seleciona 8
        const url = `https://www.cheapshark.com/api/1.0/deals?storeID=1,25,7&upperPrice=100&sortBy=Deal%20Rating&pageSize=50`;
        
        const resposta = await fetch(url);
        let dados = await resposta.json();

        if (dados.length === 0) {
            gridPromocoes.innerHTML = `<p class="mensagem-erro">Nenhuma promoção encontrada.</p>`;
            return;
        }

        // Sorteia 8 jogos aleatórios da lista de 50
        dados = shuffle(dados).slice(0, 8);

        gridPromocoes.innerHTML = "";
        const cardsHTML = await Promise.all(dados.map(async jogo => {
            const linkLoja = "https://www.cheapshark.com/redirect?dealID=" + jogo.dealID;
            return await criarCardJogo(jogo.title, jogo.normalPrice, jogo.salePrice, linkLoja, jogo.storeID);
        }));
        
        gridPromocoes.innerHTML = cardsHTML.join('');

    } catch (erro) {
        gridPromocoes.innerHTML = `<p class="mensagem-erro">Erro ao carregar promoções.</p>`;
        console.error(erro);
    }
}

// buscar o jogo digitado
document.getElementById('form-busca').addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const termoBusca = document.getElementById('input-busca').value;
    const secaoResultados = document.getElementById('resultados');
    const tituloResultados = document.getElementById('titulo-resultados');
    const gridResultados = document.getElementById('grid-resultados');

    secaoResultados.style.display = 'block';
    tituloResultados.innerText = `Resultados para: "${termoBusca}"`;
    gridResultados.innerHTML = `<p class="loading">Buscando...</p>`;

    try {
        const url = "https://www.cheapshark.com/api/1.0/games?title=" + encodeURIComponent(termoBusca) + "&rand=" + new Date().getTime();
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.length === 0) {
            gridResultados.innerHTML = `<p class="mensagem-erro">Nenhum jogo encontrado com esse nome.</p>`;
            return;
        }

        gridResultados.innerHTML = "";
        const cardsHTML = [];
        let contador = 0;
        
        for (let jogo of dados) {
            if (contador >= 8) break;
            const linkLoja = "https://www.cheapshark.com/redirect?dealID=" + jogo.cheapestDealID;
            // Passa null no ID, mas o criarCardJogo busca no link
            const card = await criarCardJogo(jogo.external, null, jogo.cheapest, linkLoja, null);
            cardsHTML.push(card);
            contador++;
        }

        gridResultados.innerHTML = cardsHTML.join('');
        secaoResultados.scrollIntoView({ behavior: 'smooth' });

    } catch (erro) {
        gridResultados.innerHTML = `<p class="mensagem-erro">Erro ao buscar o jogo.</p>`;
        console.error(erro);
    }
});

// Inicia
carregarPromocoes();