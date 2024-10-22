# K6-load-testing

Este repositório contém scripts de teste de carga, estresse e desempenho desenvolvidos com k6. Os testes são projetados para avaliar a robustez e a escalabilidade de APIs, simulando múltiplos usuários virtuais e diferentes cenários de carga.

## Estrutura do Projeto

- **Testes de Carga**: Scripts que simulam o comportamento de usuários reais para medir a capacidade do sistema em lidar com cargas variáveis.
- **Testes de Estresse**: Scripts que forçam o sistema a seus limites para identificar o ponto de falha.
- **Testes de Desempenho**: Avaliações detalhadas para medir o tempo de resposta e a eficiência do sistema sob diferentes condições de carga.

## Como Executar os Testes

1. **Instalação**: Certifique-se de ter o k6 instalado em sua máquina. [Instruções de instalação](https://k6.io/docs/getting-started/installation/).
2. **Execução dos Testes**: Use o seguinte comando para executar um teste:

   ```bash
   k6 run <nome_do_arquivo>.js
