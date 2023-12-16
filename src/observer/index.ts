export interface IEventRoot {
	events: IEvent[]; // eslint-disable-line
}

export interface IEvent {
	name: string;
	status: "added" | "canDispatch" | "not attach";
	notify(entity: IEventRoot): void;
}

export class Observer implements IEventRoot {
	events: IEvent[] = [];

	eventRootName: string;

	constructor(eventRootName: string) {
		this.eventRootName = eventRootName;
	}

	notifyEvents(): void {
		this.events.forEach((event) => {
			if (event.status === "canDispatch") event.notify(this);
		});
	}

	changeStatus(
		event: IEvent,
		status: "added" | "canDispatch" | "not attach",
	): void {
		const eventIndex = this.events.indexOf(event);

		if (eventIndex === -1) {
			console.log(
				`this ${event.name} not found and not has possible change this state`,
			);
			return;
		}

		const olderEvent = event.status;
		this.events[eventIndex].status = status;
		console.log(`this ${event.name} has changed of ${olderEvent} to ${status}`);
	}

	attachEvents(event: IEvent): void {
		const eventIncluded = this.events.includes(event);

		if (eventIncluded) {
			return;
		}

		event.status = "added";
		this.events.push(event);
		console.log(`this ${event.name} successfully attached`);
	}

	deleteEvent(event: IEvent): void {
		const indexEvent = this.events.indexOf(event);

		if (indexEvent === -1) {
			console.log(`event not found`);
		}

		this.events.splice(indexEvent, 1);
		console.log(`this event ${event.name} successfully deleted`);
	}
}
