// Selecionando os elementos HTML
const temperaturaElement = document.getElementById('temperatura');
const humidadeElement = document.getElementById('humidade');
const qualidadeArElement = document.getElementById('qualidade-ar');

// Função para simular dados (substituir por uma função que busca dados reais)
function obterDadosClima() {
  const temperatura = Math.floor(Math.random() * 30) + 10; // Temperatura entre 10°C e 39°C
  const humidade = Math.floor(Math.random() * 100);
  const qualidadeAr = Math.floor(Math.random() * 5); // Valor aleatório para qualidade do ar

  return { temperatura, humidade, qualidadeAr };
}

// Função para atualizar os elementos HTML com os novos dados
function atualizarDados(dados) {
  temperaturaElement.textContent = `${dados.temperatura} °C`;
  humidadeElement.textContent = `${dados.humidade} %`;
  qualidadeArElement.textContent = dados.qualidadeAr;

  // Atualizar o gráfico (implementação da função gerarGraficoTemperatura)
  // ...
}

// Função para gerar o gráfico (Exemplo usando Chart.js)
function gerarGraficoTemperatura(dados) {
  // ... (código do gráfico, utilizando os dados.temperatura)
}

// Chamar as funções para inicializar e atualizar os dados
function iniciar() {
  const dados = obterDadosClima();
  atualizarDados(dados);
  gerarGraficoTemperatura(dados);

  // Atualizar os dados periodicamente (ajuste o intervalo conforme necessário)
  setInterval(atualizarDados, 5000); // Atualiza a cada 5 segundos
}

// Chamar a função de inicialização quando a página carregar
window.onload = iniciar;