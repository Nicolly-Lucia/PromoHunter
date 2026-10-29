<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PromoHunter - Caçador de Promoções</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <div class="logo">Promo<span>Hunter</span></div>
        <nav>
            <ul>
                <li><a href="#">Início</a></li>
                <li><a href="#promocoes">Promoções Principais</a></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        
        <section class="search-section">
            <h2>Encontre o melhor preço!</h2>
            <p>Pesquise por qualquer jogo e descubra onde ele está mais barato.</p>
            
            <form class="search-form" id="form-busca">
                <input type="text" id="input-busca" name="busca" placeholder="Ex: Cyberpunk, Elden Ring, GTA V..." required>
                <button type="submit">CONSULTAR</button>
            </form>
        </section>

        <section id="resultados" style="display: none;">
            <h2 class="section-title" id="titulo-resultados">Resultados</h2>
            <div class="grid-jogos" id="grid-resultados"></div>
        </section>

        <section id="promocoes">
            <h2 class="section-title">Promoções Principais</h2>
            <p style="margin-bottom: 20px; color: #aaa;">Os melhores descontos do momento nas maiores lojas.</p>
            
            <div class="grid-jogos" id="grid-promocoes">
                <p class="loading">Carregando promoções...</p>
            </div>
        </section>

    </div>
<p style="
    color: #ff9e00; 
    font-size: 0.9em; 
    font-weight: bold; 
    text-align: center; 
    max-width: 800px; 
    margin: -20px auto 30px auto; 
    padding: 0 15px;
    line-height: 1.4;
">
    Aviso: Os valores em Reais são estimativas baseadas no Dólar Comercial americano. Os preços em lojas do Brasil podem sofrer variações regionais. Sempre confirme o valor na loja de destino.
</p>
    <script src="script.js"></script>
</body>
</html>