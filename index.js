import postContratos from "./scenarios/api-contrato-test-carga.js";
import {group, sleep} from 'k6';

export default () => {
    group('Endpoint api-contrato', () => {
        postContratos();
    });

    sleep(1);

}