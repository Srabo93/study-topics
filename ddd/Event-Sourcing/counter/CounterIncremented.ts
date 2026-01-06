import { CounterEventType } from "./CounterEventType";
import type { DomainEvent } from "./DomainEvents";

export class CounterIncremented implements DomainEvent {
  readonly type = CounterEventType.Incremented;
  readonly occurredAt = new Date();
  constructor(
    readonly aggregateId: string,
    readonly version: number,
  ) {}
}
