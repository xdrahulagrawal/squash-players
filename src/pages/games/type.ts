export interface GameForm {
  venue_id: number;
  to_user_id: number;
  from_score: number;
  to_score: number;
  private_note: string;
  public_comments: string;
  type: string;
  game_datetime: string;
}



export interface GameFormTable extends GameForm {
  id: number
}
