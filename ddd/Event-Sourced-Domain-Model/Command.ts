export type InitializeTicket = { type: "InitializeTicket"; ticketId: string };
export type UpdateTicket = { type: "UpdateTicket"; description: string };
export type EscalateTicket = { type: "EscalateTicket" };
export type CloseTicket = { type: "CloseTicket" };

export type Command =
  | InitializeTicket
  | UpdateTicket
  | EscalateTicket
  | CloseTicket;
