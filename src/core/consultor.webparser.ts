import { IConsultorWebParser } from "../types/consultor.interfaces";
import { info_estudiante, info_contacto, info_tiempo_rendimiento, info_inscripciones_asistencia, info_ultimos_pagos, info_resultado_parcial, info_habilitacion_actual, info_resultado_evaluacion_final, info_calificaciones, info_materia_pendiente, info_extension, info_horario_clase, info_horario_docente, info_libros_reservas, info_libros_prestamo } from "../types/consultor.types";

export class ConsultorWebParser implements IConsultorWebParser{

    public constructor(){

    }
    public async get_info_estudiante(): Promise<info_estudiante> {
        throw new Error("Method not implemented.");
    }
    public async get_info_contacto(): Promise<info_contacto> {
        throw new Error("Method not implemented.");
    }
    public async get_info_tiempo_rendimiento(): Promise<info_tiempo_rendimiento> {
        throw new Error("Method not implemented.");
    }
    public async get_info_inscipciones_asistencia(): Promise<info_inscripciones_asistencia[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_ultimos_pagos(): Promise<info_ultimos_pagos[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_resultados_parciales(): Promise<info_resultado_parcial[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_habilitaciones_actuales(): Promise<info_habilitacion_actual[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_resultados_evaluaciones_finales(): Promise<info_resultado_evaluacion_final[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_calificaciones(): Promise<info_calificaciones[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_materia_pendiente(): Promise<info_materia_pendiente[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_extension(): Promise<info_extension[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_horario_clase(): Promise<info_horario_clase[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_horario_docente(): Promise<info_horario_docente[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_libros_reservas(): Promise<info_libros_reservas[]> {
        throw new Error("Method not implemented.");
    }
    public async get_info_libros_prestamos(): Promise<info_libros_prestamo[]> {
        throw new Error("Method not implemented.");
    }
    public async parse(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}