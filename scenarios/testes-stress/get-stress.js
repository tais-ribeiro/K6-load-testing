import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const SLEEP_DURATION = 0.1;

export let options = {
    vus: 100,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<500'], 
    },
    teardownTimeout: '60s',
};

export function handleSummary(data) {
    return {
        "summaryTestesEstresse.html": htmlReport(data),
    };
}

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts'; 
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let apiResponse = http.get(url, params);

   
    check(apiResponse, {
        'Status 200': (r) => r.status === 200,
        'Número de posts': (r) => r.json().length > 0, 
    });

    console.log(`Response: ${JSON.stringify(apiResponse.json())}`);
    sleep(SLEEP_DURATION); 
}
