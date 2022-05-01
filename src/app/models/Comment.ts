/**************************************************
 * file: Comment.ts
 * Coms: comment model
 **************************************************/
import {Response} from './Response';
export interface Comment {
  author: string,
  text: string,
  upVotes: number,
  responses: Response[],
  isUpVoted: boolean
}
