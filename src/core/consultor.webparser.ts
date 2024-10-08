//import cheerio, {CheerioAPI, Element } from "cheerio";
import * as cheerio from 'cheerio';
import { IConsultorWebParser } from "../types/consultor.interfaces";
import { info_estudiante, info_contacto, info_tiempo_rendimiento,
     info_inscripciones_asistencia, info_ultimos_pagos, info_resultado_parcial, 
     info_habilitacion_actual, info_resultado_evaluacion_final, info_calificaciones, 
     info_materia_pendiente, info_extension, info_horario_clase, info_horario_docente, 
     info_libros_reservas, info_libros_prestamo } from "../types/consultor.types";
import { TableContent, TableContentObjects } from "../types/tablecontent.types";

export class ConsultorWebParser implements IConsultorWebParser{
    private selector: cheerio.CheerioAPI;

    private inscripciones: info_inscripciones_asistencia[]; 
    private ultimos_pagos: info_ultimos_pagos[] ;  
    private resultado_parciales: info_resultado_parcial[];
    private habilitaciones: info_habilitacion_actual[];
    private finales: info_resultado_evaluacion_final[];
    private calificaciones: info_calificaciones[];
    private materias_pendienetes: info_materia_pendiente[];
    private extensiones: info_extension[];
    private horario_clases: info_horario_clase[]; 
    private horario_docentes: info_horario_docente[];
    private libros_reservas: info_libros_reservas[];
    private libros_prestamo: info_libros_prestamo[];
    private table_map = {
        info_inscripciones_asistencia: 'table1', 
        info_ultimos_pagos: 'table2', 
        info_resultado_parcial: 'table3', 
        info_habilitacion_actual: 'table4', 
        info_resultado_evaluacion_final: 'table5', 
        info_calificaciones: 'table6', 
        info_materia_pendiente: 'table7', 
        info_extension: 'table8', 
        info_horario_clase: 'table9', 
        info_horario_docente: 'table10', 
        info_libro_reservas: 'table11', 
        info_libro_prestamo: 'table12'
        
    }
    constructor(htmlinput: string){
        this.inscripciones = [];
        this.ultimos_pagos = [];
        this.resultado_parciales = [];
        this.habilitaciones = [];
        this.finales = [];
        this.calificaciones = [];
        this.materias_pendienetes = [];
        this.extensiones = [];
        this.horario_clases = [];
        this.horario_docentes = [];
        this.libros_reservas = [];
        this.libros_prestamo = [];
        this.selector = cheerio.load(htmlinput);

    }

    private load_info<T>(rows: string[][], mapFunc: (row: string[]) => T, targetArray: T[]) {
        for (const row of rows) {
            targetArray.push(mapFunc(row));
        }
    }

    private mapToInscripcionesAsistencia(row: string[]): info_inscripciones_asistencia {
        return {
            materia: row[0], 
            fecha_inscripto: row[1], 
            validez: row[2], 
            grupo: row[3], 
            porc_asistencias: row[4]
        };
    }
    

    private mapToInfo_ultimos_pagos(row: string[]): info_ultimos_pagos{
        return {
            arancel: row[0], 
            vencimiento: row[1], 
            fecha_pago: row[2], 
            importe: row[3], 
            situacion: row[4]
        }
    }

    private mapToInfo_resultado_parciales(row: string[]): info_resultado_parcial{

        return {
            materia: row[0], 
            primera_parcial: row[1], 
            segunda_parcial: row[2], 
            trabajo_practico: row[3], 
            trabajo_laboratorio: row[4], 
            evaluacion: row[5]
        }
    }

    private mapToInfo_habilitaciones(row: string[]): info_habilitacion_actual{
        return {
            materia: row[0], 
            bonificacion: row[1], 
            vencimiento: row[2], 
            periodo: row[3]
        }
    }

    private mapToInfo_resultado_evaluacion_finales(row: string[]): info_resultado_evaluacion_final{

        return {
            materia: row[0], 
            fecha: row[1], 
            final: row[2], 
            bonificacion: row[3], 
            total: row[4], 
            nota: row[5]
        }
    }

    private mapToInfo_calificaciones(row: string[]): info_calificaciones{
        return {
            materia: row[0], 
            semestre: row[1], 
            fecha: row[2], 
            nota: row[3], 
            acta: row[4]
        }
    }

    private mapToInfo_materia_pendiente(row: string[]): info_materia_pendiente{
        return {
            materia: row[0], 
            semestre: row[1], 
            correlatividad: row[2]
        }
    }

    private mapToInfo_extension(row: string[]): info_extension{
        return {
            carrera: row[0], 
            actividad: row[1], 
            tipo_actividad: row[2], 
            maxima: row[3], 
            cantidad: row[4], 
            horas: row[5]
        }
    }

    private mapToInfo_horario_clase(row: string[]): info_horario_clase{
        return {
            carrera: row[0], 
            materia: row[1], 
            grupo: row[2], 
            dia: row[3], 
            horario: row[4], 
            programa_estudio: row[5]
        }
    }
    private mapToInfo_horario_docente(row: string[]): info_horario_docente{
        return {
            carrera: row[0], 
            materia: row[1], 
            grupo: row[2], 
            dia: row[3], 
            horario: row[4], 
            programa_estudio: row[5]
        }
    }
    private mapToInfo_libros_reserva(row: string[]): info_libros_reservas{
        return {
                libro: row[0],
                reserva: row[1], 
                disponible: row[2], 
                estado: row[3]
        }
    }
        
    private mapToInfo_libros_prestamo(row: string[]): info_libros_prestamo{
        return {
            libro: row[0],
            prestamo: row[1], 
            devolver: row[2], 
            estado: row[3]
    }
    }


    private handleBykeyCases(key: string, rows:string[][]){
        switch(key){
            case this.table_map.info_inscripciones_asistencia:
                this.load_info(rows, this.mapToInscripcionesAsistencia, this.inscripciones);
                break;
            case this.table_map.info_ultimos_pagos:
                this.load_info(rows, this.mapToInfo_ultimos_pagos, this.ultimos_pagos);
                break;
            case this.table_map.info_resultado_parcial:  
                this.load_info(rows, this.mapToInfo_resultado_parciales, this.resultado_parciales);
                break;
            case this.table_map.info_habilitacion_actual:
                this.load_info(rows, this.mapToInfo_habilitaciones, this.habilitaciones);
                break; 
            case this.table_map.info_resultado_evaluacion_final: 
                this.load_info(rows, this.mapToInfo_resultado_evaluacion_finales, this.finales);
                break;
            case this.table_map.info_calificaciones: 
                this.load_info(rows, this.mapToInfo_calificaciones, this.calificaciones);
                break;
            case this.table_map.info_materia_pendiente: 
                this.load_info(rows, this.mapToInfo_materia_pendiente, this.materias_pendienetes);
                break;
            case this.table_map.info_extension: 
                this.load_info(rows, this.mapToInfo_extension, this.extensiones);
                break;
            case this.table_map.info_horario_clase: 
                this.load_info(rows, this.mapToInfo_horario_clase, this.horario_clases);
                break;
            case this.table_map.info_horario_docente: 
                this.load_info(rows, this.mapToInfo_horario_docente, this.horario_docentes);
                break;
            case this.table_map.info_libro_reservas: 
                this.load_info(rows, this.mapToInfo_libros_reserva, this.libros_reservas);
                break;
            case this.table_map.info_libro_prestamo:
                this.load_info(rows, this.mapToInfo_libros_prestamo, this.libros_prestamo);
                break;
            default:
                throw new Error('fatal error, no case detected');
        }
    }

    

    public async get_info_estudiante(): Promise<info_estudiante> {
        const h3Text = this.selector('div.col-sm-7 > h3').text();
        let result:info_estudiante = {
            cedula_nombre_apellido: h3Text
        }   
        return result;
    }

    public async get_info_contacto(): Promise<info_contacto> {
        const correo = this.selector('label[for="datos_email"]')
        .parent()
        .next()
        .text()
        .trim();
      const tel = this.selector('label[for="datos_telefono"]')
        .parent()
        .next()
        .text()
        .trim();
      const cel = this.selector('label[for="datos_celular"]')
        .parent()
        .next()
        .text()
        .trim();

        let result:info_contacto = {
            email: correo,
            telefono_particular:tel,
            celular:cel 
        }
        return result;
    }
    public async get_info_tiempo_rendimiento(): Promise<info_tiempo_rendimiento> {
        const Pcarrera = this.selector('td:contains("Carrera...:")').next().text().trim();
        const PfechaIngreso = this.selector('td:contains("Fecha de Ingreso...:")').next().text().trim();
        const PfechaEgreso = this.selector('td:contains("Fecha Estimada de Egreso...:")').next().text().trim();
        const Ppromedio = this.selector('td:contains("Promedio...:")').next().text().trim();
        const PmateriasAprobadas = this.selector('td:contains("Total Materias Aprobadas...:")').next().text().trim();
        const PmateriasReprobadas = this.selector('td:contains("Total Materias Reprobadas...:")').next().text().trim();
        const PporcentajeReprobadas = this.selector('td:contains("Porcentaje Materias Reprobadas...:")').next().text().trim();
        const PbeneficiarioLey = this.selector('td:contains("Beneficiario/a de la ley 6628/2020")').text().trim();
        const Pfoto = this.selector('img[NAME="tiimagen"]').attr('src') as string;

        let result: info_tiempo_rendimiento = {
           carrera:Pcarrera, 
           fecha_ingreso:PfechaIngreso, 
           fecha_estimada_egreso: PfechaEgreso, 
           promedio: Ppromedio, 
           total_materias_aprobada: PmateriasAprobadas, 
           total_materias_reprobadas: PmateriasReprobadas, 
           porcentaje_materias_reprobadas: PporcentajeReprobadas, 
           status_arancel_cero: PbeneficiarioLey, 
           foto_estudiante: Pfoto
        }
        return result;;
    }
    public async get_info_inscipciones_asistencia(): Promise<info_inscripciones_asistencia[]> {
       return this.inscripciones;
    }
    public async get_info_ultimos_pagos(): Promise<info_ultimos_pagos[]> {
        return this.ultimos_pagos;
    }
    public async get_info_resultados_parciales(): Promise<info_resultado_parcial[]> {
        return this.resultado_parciales;
    }
    public async get_info_habilitaciones_actuales(): Promise<info_habilitacion_actual[]> {
        return this.habilitaciones;
    }
    public async get_info_resultados_evaluaciones_finales(): Promise<info_resultado_evaluacion_final[]> {
        return this.finales;
    }
    public async get_info_calificaciones(): Promise<info_calificaciones[]> {
        return this.calificaciones;
    }
    public async get_info_materia_pendiente(): Promise<info_materia_pendiente[]> {
        return this.materias_pendienetes;
    }
    public async get_info_extension(): Promise<info_extension[]> {
       return this.extensiones;
    }
    public async get_info_horario_clase(): Promise<info_horario_clase[]> {
        return this.horario_clases;
    }
    public async get_info_horario_docente(): Promise<info_horario_docente[]> {
        return this.horario_docentes;
    }
    public async get_info_libros_reservas(): Promise<info_libros_reservas[]> {
       return this.libros_reservas;
    }
    public async get_info_libros_prestamos(): Promise<info_libros_prestamo[]> {
       return this.libros_prestamo;
    }
    public async parse(): Promise<void> {
        const contents: TableContentObjects =  this.process();
        for(const key in contents){
            if(contents.hasOwnProperty(key)){
                const tablecontent:TableContent = contents[key];
                this.handleBykeyCases(key, tablecontent.rows);
            }
        }
    }

    private extractConsultorTables(table: any): TableContent {
        const headers: string[] = [];
        const rows: string[][] = [];
        this.selector(table).find("tr").each((rowIndex, row) => {
          const cells: string[] = [];
          this.selector(row).find("th, td").each((_, cell) => {
            const $cell = this.selector(cell);
            const text = $cell.text().trim();
            const $anchor = $cell.find('a');
            if ($anchor.length > 0 && $anchor.attr('href')) {
              const link = $anchor.attr('href')!;
              cells.push(`${link}`);
            } else {
              cells.push(text);
            }
          });
      
          if (rowIndex === 0) {
            headers.push(...cells);
          } else {
            rows.push(cells);
          }
        });
      
        return { headers, rows };
      }
    private process(): TableContentObjects{
        const tablesobjs: TableContentObjects = {};
        this.selector('table').each((index, table) => {
            if(index>1){
                let offset = (index-2)+1;
                let tableContent : TableContent;
                tableContent = this.extractConsultorTables(table);
                if(index === 7 || index === 8){
                  if(tableContent.rows.length > 0){
                    tableContent.headers = tableContent.rows.shift()!;
                  }
                }
                if(index === 10){
                    tableContent = this.extractConsultorTables(table);
                }
                tablesobjs[`table${offset}`] = tableContent;
                
            }
          
        });
        return tablesobjs;
    }
}