/**************************************************
 * file: GradeProfile.ts
 * Coms: grade profile model
 **************************************************/
import { Comment } from '../models/Comment';
export interface GradeProfile {
  _id:string,
  estudio:string,
  localidad:string,
  comments: Comment[],
  graduated: number,
  changed: number,
  average: number,
  abandoned: number
}

/* For example:
 * {
 *      "comments": [],
 *      "graduated": 302,
 *      "average": 5.263943969153895,
 *      "changed": 18,
 *      "abandoned": 203,
 */
