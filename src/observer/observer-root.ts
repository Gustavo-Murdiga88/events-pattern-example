export interface IEventRoot {
	events: IEvent[]; // eslint-disable-line
}

export interface IEvent {
	name: string;
	notify(entity: IEventRoot): void;
}

export class Observer implements IEventRoot {
	events: IEvent[] = [];

	eventRootName: string;

	constructor(eventRootName: string) {
		this.eventRootName = eventRootName;
	}

	notify(): void {
		if (this.events.length === 0) {
			console.log("you no have a observers subscribed");
		}

		this.events.forEach((event) => {
			event.notify(this);
		});
	}

	attach(event: IEvent): void {
		const eventIncluded = this.events.includes(event);

		if (eventIncluded) {
			return;
		}

		this.events.push(event);
	}

	delete(event: IEvent): void {
		const indexEvent = this.events.indexOf(event);

		if (indexEvent === -1) {
			console.log(`event not found`);
		}

		this.events.splice(indexEvent, 1);
	}
}
