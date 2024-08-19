import { IConsultorWebParser } from '../../src/types/consultor.interfaces';
import { info_contacto, info_estudiante, info_tiempo_rendimiento } from '../../src/types/consultor.types';
import { ConsultorWebParser } from './../../src/core/consultor.webparser';
import * as utils from './utils';

const path_to_resources = "tests/resources";
let html_data: string;
let webparser: IConsultorWebParser; 
describe("Tests del Web Parser",  ()=>{
    beforeEach(async ()=>{
         html_data = utils.read_File(`${path_to_resources}/consultor_html_data.txt`);
         webparser = new ConsultorWebParser(html_data);
    });
    it("Debe parsear la cabecera del estudiante ", async ()=>{
        await webparser.parse();
        let cabecera: info_estudiante = await webparser.get_info_estudiante();
        let resultado_esperado = utils.parse_json(`${path_to_resources}/info_cabecera_estudiante.json`);
        expect(cabecera).toEqual(resultado_esperado);
    });

    it("Debe parsear la informacion de contacto", async ()=>{
        await webparser.parse();
        let info_contacto: info_contacto = await webparser.get_info_contacto();
        let resultado_esperado = utils.parse_json(`${path_to_resources}/info_contacto_estudiante.json`);
        expect(info_contacto).toEqual(resultado_esperado);
    });

    it("Debe parsear el tiempo y rendimiento del estudiante", async ()=>{
        await webparser.parse();
        let info_rendimiento:info_tiempo_rendimiento = await webparser.get_info_tiempo_rendimiento();
        let resultado_esperado = utils.parse_json(`${path_to_resources}/info_rendimiento_estudiante.json`);
        expect(info_rendimiento).toEqual(resultado_esperado);
    });


});