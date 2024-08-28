import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ConsultorWebScraper } from '../../core/consultor.webscraper';
import { ConsultorWebParser } from '../../core/consultor.webparser';
import { info_estudiante, info_contacto, info_tiempo_rendimiento, info_inscripciones_asistencia, info_ultimos_pagos, info_resultado_parcial, info_habilitacion_actual, info_resultado_evaluacion_final, info_calificaciones, info_materia_pendiente, info_extension, info_horario_clase, info_horario_docente, info_libros_reservas, info_libros_prestamo } from '../../types/consultor.types';
import { ScraperException } from '../../error/scraper.error';
const router = Router();

router.get("/api/",  async(req, res)=>{
    const {cedula, pass} = req.body; 
    if(!cedula || !pass){
        return res.status(StatusCodes.BAD_REQUEST).send({error: "La cedula/pass no fue dado"});
    }
    try{
        const scraper = new ConsultorWebScraper(cedula as string, pass as string);
        const consultor_data = await scraper.scrape();
        const parser = new ConsultorWebParser(consultor_data);
        await parser.parse();
        const info_estudiante_cabecera: info_estudiante = await parser.get_info_estudiante();
        const info_estudiante_contacto: info_contacto = await parser.get_info_contacto();
        const info_estudiante_rendimiento: info_tiempo_rendimiento = await parser.get_info_tiempo_rendimiento();

        const info_estudiante_inscripciones: info_inscripciones_asistencia[] = await parser.get_info_inscipciones_asistencia();
        const info_estudiante_pagos: info_ultimos_pagos[] = await parser.get_info_ultimos_pagos();
        const info_estudiante_parciales: info_resultado_parcial[] = await parser.get_info_resultados_parciales();
        const info_estudiante_habilitacion: info_habilitacion_actual[] = await parser.get_info_habilitaciones_actuales();
        const info_estudiante_evaluacion_final: info_resultado_evaluacion_final[] = await parser.get_info_resultados_evaluaciones_finales();
        const info_estudiante_calificaciones:info_calificaciones[] = await parser.get_info_calificaciones();
        const info_estudiante_materia_pendiente: info_materia_pendiente[] = await parser.get_info_materia_pendiente();
        const info_estudiante_extension: info_extension[] = await parser.get_info_extension();
        const info_estudiante_horario_clase:info_horario_clase[] = await parser.get_info_horario_clase();
        const info_estudiante_horario_docente: info_horario_docente[] = await parser.get_info_horario_docente();
        const info_estudiante_libros_reservas: info_libros_reservas[] = await parser.get_info_libros_reservas();
        const info_estudiante_libros_prestamos: info_libros_prestamo[] = await parser.get_info_libros_prestamos();
        return res.status(StatusCodes.OK).json(
            {
                info_cabecera: info_estudiante_cabecera, 
                info_contacto: info_estudiante_contacto, 
                info_rendimiento: info_estudiante_rendimiento, 
                info_inscripciones: info_estudiante_inscripciones, 
                info_pagos: info_estudiante_pagos, 
                info_parciales: info_estudiante_parciales, 
                info_habilitaciones: info_estudiante_habilitacion, 
                info_finales: info_estudiante_evaluacion_final, 
                info_calificaciones: info_estudiante_calificaciones, 
                info_materias_pendientes: info_estudiante_materia_pendiente, 
                info_extensiones: info_estudiante_extension, 
                info_horario_clase: info_estudiante_horario_clase, 
                info_horario_docente: info_estudiante_horario_docente, 
                info_libros_reservas: info_estudiante_libros_reservas, 
                info_libros_prestamos: info_estudiante_libros_prestamos 
            }
        );
    }catch(error){
        if(error instanceof ScraperException){
            return res.status(StatusCodes.BAD_REQUEST).send({error: (error as ScraperException).message});
        }
    }
    
});

export { router };
