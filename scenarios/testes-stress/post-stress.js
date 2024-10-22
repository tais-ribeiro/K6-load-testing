import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
const SLEEP_DURATION = 0.1;
/*
* Execução de Teste de stress
* O teste já inicia com o número de VU alto
* Duração define o tempo limite que deverá executar os testes
*/

export let options = {
	vus: 100, //virtual users
  duration: '60s',

  // Tempo limite para função de teardown
  teardownTimeout: '60s',
};

//Relatório
export function handleSummary(data) {
    return {
      "summaryTestesStress.html": htmlReport(data),
    };
  }

export default function () {
    //ARRANGE
	var url = '/api'; 
    var params = {
    headers: {
    'Content-Type': 'application/json',
	    'Authorization': 'Bearer',
    },
  };
  
//group('API Contrato', function () {
  //ACT
  let contratoAPIResponse = http.get(url, params);
  //ASSERT
  check(contratoAPIResponse, {
      'Status 200': (r) => r.status === 200,
      'nomeCliente': (r) => r.json().nomeCliente ===  'USUÁRIO TESTE' 
    });
    //console.log(JSON.stringify(contratoAPIResponse))
	  sleep(SLEEP_DURATION);


}
