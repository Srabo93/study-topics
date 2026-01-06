import type { CounterEventType } from "./CounterEventType";

export interface DomainEvent {
  readonly type: CounterEventType;
  readonly aggregateId: string;
  readonly version: number;
  readonly occurredAt: Date;
}
