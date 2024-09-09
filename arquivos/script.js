// Selecionando os elementos HTML
const temperaturaElement = document.getElementById('temperatura');
const humidadeElement = document.getElementById('humidade');
const qualidadeArElement = document.getElementById('qualidade-ar');
const ctx = document.getElementById('graficoTemperatura').getContext('2d');

// Inicializando o gráfico
let graficoTemperatura = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Labels para o eixo X
        datasets: [{
            label: 'Temperatura (°C)',
            data: [], // Dados para o gráfico
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

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

    // Atualizar o gráfico
    gerarGraficoTemperatura(dados);
}

// Função para gerar o gráfico
function gerarGraficoTemperatura(dados) {
    // Adicionar dados ao gráfico
    graficoTemperatura.data.labels.push(new Date().toLocaleTimeString()); // Adiciona a hora atual como label
    graficoTemperatura.data.datasets[0].data.push(dados.temperatura); // Adiciona a temperatura ao gráfico

    // Manter o gráfico visível sem ocupar muito espaço
    if (graficoTemperatura.data.labels.length > 10) { // Exemplo para exibir apenas os últimos 10 pontos
        graficoTemperatura.data.labels.shift(); // Remove o primeiro label
        graficoTemperatura.data.datasets[0].data.shift(); // Remove o primeiro dado
    }

    graficoTemperatura.update(); // Atualiza o gráfico
}

// Chamar as funções para inicializar e atualizar os dados
function iniciar() {
    const dados = obterDadosClima();
    atualizarDados(dados);

    // Atualizar os dados periodicamente (ajuste o intervalo conforme necessário)
    setInterval(() => {
        const novosDados = obterDadosClima();
        atualizarDados(novosDados);
    }, 5000); // Atualiza a cada 5 segundos
}

// Chamar a função de inicialização quando a página carregar
window.onload = iniciar;
