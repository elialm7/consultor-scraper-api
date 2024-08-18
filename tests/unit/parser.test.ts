import { IConsultorWebParser } from '../../src/types/consultor.interfaces';
import { info_estudiante } from '../../src/types/consultor.types';
import { ConsultorWebParser } from './../../src/core/consultor.webparser';
import * as utils from './utils';

const path_to_resources = "tests/resources";
let html_data: string;
let webparser: IConsultorWebParser; 
describe("Tests del Web Parser",  ()=>{
    beforeAll(async ()=>{
         html_data = utils.read_File(`${path_to_resources}/consultor_html_data.txt`);
         webparser = new ConsultorWebParser(html_data);
    });
    it("Debe parsear la cabecera del estudiante ", async ()=>{
        await webparser.parse();
        let cabecera: info_estudiante = await webparser.get_info_estudiante();
        let resultado_esperado = JSON.parse(utils.read_File(`${path_to_resources}/info_cabecera_estudiante.json`));
        expect(cabecera).toEqual(resultado_esperado);
    });
});