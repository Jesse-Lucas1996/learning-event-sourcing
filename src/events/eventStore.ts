import { EventEmitter } from 'events';

class EventStore {
  private static instance: EventStore;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
  }

  static getInstance() {
    if (!EventStore.instance) {
      EventStore.instance = new EventStore();
    }
    return EventStore.instance;
  }

  publish(eventType: string, eventData: any) {
    this.eventEmitter.emit(eventType, eventData);
  }

  subscribe(eventType: string, handler: (data: any) => void) {
    this.eventEmitter.on(eventType, handler);
  }
}

export default EventStore;
