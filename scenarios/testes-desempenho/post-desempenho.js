import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const SLEEP_DURATION = 0.1;

export let options = {
    vus: 3, // Número de usuários virtuais
    stages: [
        { duration: '10s', target: 5 },  
        { duration: '20s', target: 30 },  
        { duration: '10s', target: 40 },  
        { duration: '10s', target: 0 }, 
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], 
    },
    teardownTimeout: '60s',
};

export function handleSummary(data) {
    return {
        "summaryTestesDesempenho.html": htmlReport(data),
    };
}

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts'; 
    const requestBody = JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    let apiResponse = http.post(url, requestBody, params); 

  
    check(apiResponse, {
        'Status 201': (r) => r.status === 201,
        'Retornou o post': (r) => r.json().title === 'foo',
    });

    console.log(`Response: ${JSON.stringify(apiResponse.json())}`);
    sleep(SLEEP_DURATION); 
}
