import { Entity } from "core/entity";
import { IEvent, Observer } from "./observer-root";

type MessageProps = {
	number: string;
	contactName: string;
};

export class Message extends Entity<MessageProps> implements IEvent {
	name = "event-message";

	constructor(props: MessageProps) {
		super(props);
	}

	notify(eventRoot: Observer): void {
		console.log({
			number: this.props.number,
			contactName: this.props.contactName,
			eventRootName: eventRoot.eventRootName,
		});
	}
}

export class MessagesObservers extends Observer {
	constructor(rootName: string) {
		super(rootName);
	}
}
