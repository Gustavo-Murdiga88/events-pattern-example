import { Entity } from "@/core/entity";
import { IObserver, Observer } from "./observer-root";

type MessageProps = {
	number: string;
	contactName: string;
};

export class Message extends Entity<MessageProps> implements IObserver {
	name = "event-message";

	constructor(props: MessageProps) {
		super(props);
	}

	notify(): void {
		console.log({
			number: this.props.number,
			contactName: this.props.contactName,
		});
	}
}

export class MessagesObservers extends Observer {}
