import { Entity } from "./entity/index";

interface IEventProps {
	cb(entity?: Entity): void;
}

interface IEvent extends IEventProps {
	name: string;
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
		console.log(`this ${name} successfully added`);
	}

	dispatch(name: string, entity?: Entity): void {
		const events = this.events.filter(
			(ev) => ev.name === name && ev.status === "canDispatch",
		);

		if (!events.length) {
			console.log(`event ${name} not found`);
		}

		events.forEach((event) => {
			event.cb(entity);
		});
	}

	unsubscribe(event: IEvent): void {
		const indexEvent = this.events.indexOf(event);

		if (indexEvent === -1) {
			console.log(`this even ${event.name} not found`);
			return;
		}

		this.events.splice(indexEvent, 1);
	}
}

type PhoneProps = {
	number: string;
	userName: string;
};

class Phone extends Entity<PhoneProps> {
	constructor({ number, userName }: PhoneProps) {
		super({ number, userName });
	}
}
class SendMessage implements IEventProps {
	cb(entity?: Entity<PhoneProps>): void {
		console.log(
			`hello ${entity?.props.userName} your number is ${entity?.props.number} we are very happy to see you there`,
		);
	}
}

const myPhone = new Phone({
	number: "123456789",
	userName: "john",
});

const sendMessage = new SendMessage();
const eventRoot = new EventRoot();
eventRoot.subscribe({
	name: SendMessage.name,
	cb: sendMessage.cb,
	status: "canDispatch",
});

eventRoot.dispatch(SendMessage.name, myPhone);
