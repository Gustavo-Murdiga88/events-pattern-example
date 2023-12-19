export interface IObserverRoot {
	events: IObserver[]; // eslint-disable-line
}

export interface IObserver {
	name: string;
	notify(entity: IObserverRoot): void;
}

export class Observer implements IObserverRoot {
	events: IObserver[] = [];

	constructor() {}

	notify(): void {
		if (this.events.length === 0) {
			console.log("you no have a observers subscribed");
		}

		this.events.forEach((event) => {
			event.notify(this);
		});
	}

	attach(event: IObserver): void {
		const eventIncluded = this.events.includes(event);

		if (eventIncluded) {
			return;
		}

		this.events.push(event);
	}

	delete(event: IObserver): void {
		const indexEvent = this.events.indexOf(event);

		if (indexEvent === -1) {
			console.log(`event not found`);
		}

		this.events.splice(indexEvent, 1);
	}
}
