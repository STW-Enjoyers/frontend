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

export interface CheckComment {
  type: string,
  username: string,
  body: string,
  commentId: string,
  responseId: string,
  degreeId: string
}
