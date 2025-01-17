import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const SLEEP_DURATION = 0.1;

export let options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 30 },
        { duration: '10s', target: 40 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
    teardownTimeout: '60s',
};

export function handleSummary(data) {
    return {
        "summaryTestesCarga.html": htmlReport(data),
    };
}

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts'; 

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
  
    const apiResponse = http.get(url, params); 

    check(apiResponse, {
        'Status 200': (r) => r.status === 200,
        'Retornou posts': (r) => Array.isArray(r.json()) && r.json().length > 0, 
    });

    console.log(JSON.stringify(apiResponse));
    
    sleep(SLEEP_DURATION);
}
