/**************************************************
 * file: GradeInfo.ts
 * Coms: GradeInfo model
 **************************************************/
export interface GradeCommented {
  idCarrera: string,
  estudio: string,
  commentCount: number
}

export interface GradeConflictive {
  idCarrera: string,
  estudio: string,
  deletedCount: number
}