import { info_calificaciones, info_contacto, info_estudiante, info_extension, info_habilitacion_actual, info_horario_clase, info_horario_docente, info_inscripciones_asistencia, info_libros_prestamo, info_libros_reservas, info_materia_pendiente, info_resultado_evaluacion_final, info_resultado_parcial, info_tiempo_rendimiento, info_ultimos_pagos } from "./consultor.types";
import { TableContentObjects } from "./tablecontent.types";


export interface IConsultorWebScraper {
    scrape(): Promise<string>; 
}
export interface IConsultorWebParser {
    get_info_estudiante():Promise<info_estudiante>;
    get_info_contacto():Promise<info_contacto>;
    get_info_tiempo_rendimiento():Promise<info_tiempo_rendimiento>;
    get_info_inscipciones_asistencia(): Promise<info_inscripciones_asistencia[]>;
    get_info_ultimos_pagos():Promise<info_ultimos_pagos[]>;
    get_info_resultados_parciales(): Promise<info_resultado_parcial[]>;
    get_info_habilitaciones_actuales(): Promise<info_habilitacion_actual[]>;
    get_info_resultados_evaluaciones_finales(): Promise<info_resultado_evaluacion_final[]>;
    get_info_calificaciones(): Promise<info_calificaciones[]>;
    get_info_materia_pendiente(): Promise<info_materia_pendiente[]>;
    get_info_extension(): Promise<info_extension[]>;
    get_info_horario_clase(): Promise<info_horario_clase[]>;
    get_info_horario_docente(): Promise<info_horario_docente[]>;
    get_info_libros_reservas(): Promise<info_libros_reservas[]>;
    get_info_libros_prestamos(): Promise<info_libros_prestamo[]>;
    parse():Promise<void>;
}

export interface IConsultorWebTableProcessor {
    process(): Promise<TableContentObjects>;
}