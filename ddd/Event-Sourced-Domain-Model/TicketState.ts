import type { TicketEvent } from "./TicketEventType";

export class TicketState {
  public ticketId!: string;
  public version!: number;
  public isEscalated!: boolean;
  public isClosed!: boolean;

  private handlers: {
    [K in TicketEvent["type"]]: (
      event: Extract<TicketEvent, { type: K }>,
    ) => void;
  } = {
    TicketInitialized: (e) => {
      this.ticketId = e.aggregateId;
      this.version = e.version;
    },

    TicketUpdated: (e) => {
      this.version = e.version;
    },

    TicketEscalated: (e) => {
      this.isEscalated = true;
      this.version = e.version;
    },

    TicketClosed: (e) => {
      this.isClosed = true;
      this.version = e.version;
    },
  };

  apply(event: TicketEvent) {
    this.handlers[event.type](event as any);
  }
}
