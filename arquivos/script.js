// Selecionando os elementos HTML
const temperaturaElement = document.getElementById('temperatura');
const humidadeElement = document.getElementById('humidade');
const qualidadeArElement = document.getElementById('qualidade-ar');
const dataElement = document.getElementById('data');
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

let currentDate = new Date();
let dateRange = Array.from({length: 7}, (_, i) => {
    let date = new Date();
    date.setDate(currentDate.getDate() - 3 + i);
    return date;
});

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function obterDadosClima(date) {
    // Simulação de dados para a data específica
    const temperatura = Math.floor(Math.random() * 30) + 10; // Temperatura entre 10°C e 39°C
    const humidade = Math.floor(Math.random() * 100);
    const qualidadeAr = Math.floor(Math.random() * 5); // Valor aleatório para qualidade do ar

    return { temperatura, humidade, qualidadeAr };
}

function atualizarDados(dados, date) {
    dataElement.textContent = formatDate(date);
    temperaturaElement.textContent = `${dados.temperatura} °C`;
    humidadeElement.textContent = `${dados.humidade} %`;
    qualidadeArElement.textContent = dados.qualidadeAr;

    gerarGraficoTemperatura();
}

function gerarGraficoTemperatura() {
    graficoTemperatura.data.labels = dateRange.map(date => formatDate(date));
    graficoTemperatura.data.datasets[0].data = dateRange.map(date => obterDadosClima(date).temperatura);

    graficoTemperatura.update();
}

function mudarData(direcao) {
    currentDate.setDate(currentDate.getDate() + direcao);
    dateRange = Array.from({length: 7}, (_, i) => {
        let date = new Date();
        date.setDate(currentDate.getDate() - 3 + i);
        return date;
    });
    atualizarDados(obterDadosClima(currentDate), currentDate);
}

document.getElementById('data-anterior').addEventListener('click', () => mudarData(-1));
document.getElementById('data-proximo').addEventListener('click', () => mudarData(1));

// Inicializa com os dados do dia atual
atualizarDados(obterDadosClima(currentDate), currentDate);
