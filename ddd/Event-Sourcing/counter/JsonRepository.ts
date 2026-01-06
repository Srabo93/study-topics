import { fileURLToPath } from "bun";
import path from "path";
import type { DomainEvent } from "./DomainEvents";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "db.json");

export class JsonRepository {
  static async persist(events: DomainEvent[]) {
    if (events.length === 0) return;

    const existing = await this.getAllEvents();
    const aggregateId = events[0]?.aggregateId;
    const lastStoredVersion = Math.max(
      0,
      ...existing
        .filter((e) => e.aggregateId === aggregateId)
        .map((e) => e.version),
    );

    if (events[0]?.version !== lastStoredVersion + 1) {
      throw new Error("Concurrency conflict detected");
    }

    const all = [...existing, ...events];
    await Bun.write(filePath, JSON.stringify(all, null, 2));
  }

  static async getAllEvents(): Promise<DomainEvent[]> {
    try {
      const file = Bun.file(filePath);
      if (!(await file.exists())) {
        return [];
      }
      return (await file.json()) as DomainEvent[];
    } catch {
      return [];
    }
  }

  static async getEventsForAggregate(
    aggregateId: string,
  ): Promise<DomainEvent[]> {
    const events = await this.getAllEvents();

    return events
      .filter((e) => e.aggregateId === aggregateId)
      .sort((a, b) => a.version - b.version);
  }
}
