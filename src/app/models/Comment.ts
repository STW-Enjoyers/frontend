/**************************************************
 * file: Comment.ts
 * Coms: comment model
 **************************************************/
import {Response} from './Response';
export interface Comment {
  username: string,
  upvotes: number,
  upvotedUsers: string[],
  visible: boolean,
  status:string,
  body: string,
  responses: Response[],
  _id: string
  date: Date
}
