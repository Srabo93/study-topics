import { CounterState } from "./CounterState";
import { CounterIncremented } from "./CounterIncremented";
import { CounterDecremented } from "./CounterDecremented";
import type { DomainEvent } from "./DomainEvents";

export class Counter {
  private state: CounterState;
  private domainEvents: DomainEvent[] = []; // uncommitted only
  private version = 0;
  private aggregateId: string;

  constructor(aggregateId: string, events: DomainEvent[] = []) {
    this.state = new CounterState();
    this.aggregateId = aggregateId;

    events.forEach((e) => {
      this.state.apply(e);
      this.version = e.version;
    });
  }

  increment() {
    const event = new CounterIncremented(this.aggregateId, this.version + 1);
    this.append(event);
  }

  decrement() {
    if (this.state.value === 0) {
      throw new Error("Counter cannot go below zero");
    }

    const event = new CounterDecremented(this.aggregateId, this.version + 1);
    this.append(event);
  }

  getValue() {
    return this.state.value;
  }

  getVersion() {
    return this.version;
  }

  getEvents() {
    return this.domainEvents;
  }

  clearEvents() {
    this.domainEvents = [];
  }

  private append(event: DomainEvent) {
    this.state.apply(event);
    this.version = event.version;
    this.domainEvents.push(event);
  }
}
