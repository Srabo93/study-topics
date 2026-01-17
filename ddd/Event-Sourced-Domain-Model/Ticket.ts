import type { Command } from "./Command";
import type { IDomainEvents } from "./IDomainEvent";
import { TicketEventType, type TicketEvent } from "./TicketEventType";
import { TicketState } from "./TicketState";

export class Ticket {
  private _domainEvents: IDomainEvents[] = [];
  private _state: TicketState;

  constructor(events: IDomainEvents[]) {
    this._state = new TicketState();
    events.forEach((event) => {
      this.append(event);
    });
  }

  private append(event: IDomainEvents) {
    this._domainEvents.push(event);
  }

  execute(cmd: Command) {
    const event = this.handlers[cmd.type](cmd as any);
    this._state.apply(event);
    this.append(event);
  }

  private handlers: {
    [K in Command["type"]]: (
      event: Extract<Command, { type: K }>,
    ) => TicketEvent;
  } = {
    InitializeTicket: (cmd) => ({
      type: TicketEventType.TicketInitialized,
      aggregateId: cmd.ticketId,
      version: 0,
    }),
    UpdateTicket: (cmd) => ({
      type: TicketEventType.TicketUpdated,
      aggregateId: this._state.ticketId,
      version: this._state.version + 1,
      description: cmd.description,
    }),
    EscalateTicket: (cmd) => {
      if (this._state.isEscalated) throw new Error("Ticket already escalated");
      return {
        type: TicketEventType.TicketEscalated,
        aggregateId: this._state.ticketId,
        version: this._state.version + 1,
      };
    },
    CloseTicket: (cmd) => {
      if (this._state.isClosed) throw new Error("Ticket already closed");
      return {
        type: TicketEventType.TicketClosed,
        aggregateId: this._state.ticketId,
        version: this._state.version + 1,
      };
    },
  };
}
