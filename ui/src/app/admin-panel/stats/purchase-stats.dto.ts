type TicketStats = {
  price: number,
  row: number,
  seat: number,
  session: {
    title: string,
    startAt: Date,
    filmId: string,
    hall: number
  }
}

export type PurchaseStatsDto = {
  username: string,
  dealtAt: Date,
  tickets: TicketStats[]
}
