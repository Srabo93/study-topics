import type { TicketEventType } from "./TicketEventType";

export interface IDomainEvents {
  type: TicketEventType;
  readonly aggregateId: string;
  readonly version: number;
}
