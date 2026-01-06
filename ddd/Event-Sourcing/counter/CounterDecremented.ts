import { CounterEventType } from "./CounterEventType";
import type { DomainEvent } from "./DomainEvents";

export class CounterDecremented implements DomainEvent {
  readonly type = CounterEventType.Decremented;
  readonly occurredAt = new Date();
  constructor(
    public readonly aggregateId: string,
    public readonly version: number,
  ) {}
}
