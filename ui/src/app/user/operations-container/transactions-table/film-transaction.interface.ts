export interface FilmTransaction {
  sessionId: string;
  filmTitle: string;
  boughtAt: Date;
  sessionStartAt: Date;
  quantity: number;
  totalPrice: number;
}
