/**************************************************
 * file: Response.ts
 * Coms: response model
 **************************************************/
export interface Response {
  username: string,
  upvotes: number,
  upvotedUsers: string[],
  visible:boolean,
  status:string,
  body: string,
  commentId:string,
  _id:string,
  date: string
}
