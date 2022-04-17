/**************************************************
 * file: Grade.ts
 * Coms: grade model
 **************************************************/
export interface Grade {
  nota: number;
  centro: string;
  estudio: string;
  localidad: string;
  cupo: string;
  curso: number;
  id: string;
}

/* For example:
 * {
 *     "nota": 5,
 *     "centro": "Escuela Universitaria de Enfermería de Teruel",
 *     "estudio": "Grado: Enfermería",
 *     "localidad": "Teruel",
 *     "cupo": "Deportistas de alto rendimiento (g)",
 *     "curso": 2021,
 *     "id": "1dd0e2fa5c771e4361d80388965df172"
 *   },
 */
