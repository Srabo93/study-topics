export enum TicketEventType {
  TicketInitialized = "TicketInitialized",
  TicketUpdated = "TicketUpdated",
  TicketEscalated = "TicketEscalated",
  TicketClosed = "TicketClosed",
}

export type TicketInitialized = {
  type: TicketEventType.TicketInitialized;
  aggregateId: string;
  version: 0;
};

export type TicketUpdated = {
  type: TicketEventType.TicketUpdated;
  aggregateId: string;
  version: number;
  description: string;
};

export type TicketEscalated = {
  type: TicketEventType.TicketEscalated;
  aggregateId: string;
  version: number;
};

export type TicketClosed = {
  type: TicketEventType.TicketClosed;
  aggregateId: string;
  version: number;
};

export type TicketEvent =
  | TicketInitialized
  | TicketUpdated
  | TicketEscalated
  | TicketClosed;
