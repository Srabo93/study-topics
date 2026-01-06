import { CounterEventType } from "./CounterEventType";
import type { DomainEvent } from "./DomainEvents";

export class CounterState {
  public value = 0;

  apply(event: DomainEvent) {
    if (event.type === CounterEventType.Incremented) {
      this.value += 1;
    }
    if (event.type === CounterEventType.Decremented) {
      this.value -= 1;
    }
  }
}
