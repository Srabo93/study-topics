import { Counter } from "./Counter";
import { JsonRepository } from "./JsonRepository";

const counterId = "counter-1";
let counter;

try {
  const events = await JsonRepository.getEventsForAggregate(counterId);
  if (events.length <= 0) {
    counter = new Counter(counterId);
  }
  counter = new Counter(counterId, events);
} catch (error) {
  throw error;
}

counter.increment();
counter.increment();
counter.decrement();

try {
  await JsonRepository.persist(counter.getEvents());
  counter.clearEvents();
  const events = await JsonRepository.getEventsForAggregate(counterId);
  counter = new Counter(counterId, events);
} catch (error) {
  throw error;
}
counter.increment();
counter.increment();
counter.increment();

try {
  await JsonRepository.persist(counter.getEvents());
  counter.clearEvents();
  const events = await JsonRepository.getEventsForAggregate(counterId);
  counter = new Counter(counterId, events);
} catch (error) {
  throw error;
}
counter.decrement();
counter.decrement();
counter.increment();

try {
  await JsonRepository.persist(counter.getEvents());
  counter.clearEvents();
  const events = await JsonRepository.getEventsForAggregate(counterId);
  counter = new Counter(counterId, events);
} catch (error) {
  throw error;
}

counter.increment();
counter.increment();
counter.decrement();

try {
  await JsonRepository.persist(counter.getEvents());
  counter.clearEvents();
  const events = await JsonRepository.getEventsForAggregate(counterId);
  counter = new Counter(counterId, events);
} catch (error) {
  throw error;
}
