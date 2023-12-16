interface IEvent {
	name: string;
	cb(): void;
	status: "added" | "canDispatch";
}

interface IEventRoot {
	events: IEvent[];
}

export class EventRoot implements IEventRoot {
	events: IEvent[] = [];

	subscribe({ cb, name, status }: IEvent): void {
		const contains = this.events.find((event) => event.name === name);

		if (contains) {
			console.log(`event ${name} already exists`);
			return;
		}

		this.events.push({
			cb,
			name,
			status,
		});
	}

	dispatch(name: string): void {
		const events = this.events.filter(
			(ev) => ev.name === name && ev.status === "canDispatch",
		);

		if (!events.length) {
			console.log(`event ${name} not found`);
		}

		events.forEach((event) => {
			event.cb();
		});
	}

	unsubscribe(name: string): void {
		const indexEvent = this.events.findIndex((event) => event.name === name);

		if (indexEvent === -1) {
			console.log(`this even ${name} not found`);
			return;
		}

		this.events.splice(indexEvent, 1);
	}

	changeStatus(name: string, status: IEvent["status"]) {
		const indexEvent = this.events.findIndex((event) => event.name === name);

		if (indexEvent === -1) {
			console.log(`this event ${name} not found`);
			return;
		}

		this.events[indexEvent].status = status;
	}
}
