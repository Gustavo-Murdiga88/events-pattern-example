import { Entity } from "observer/entity/index";
import { IEvent, Observer } from "observer/index";

type MessageProps = {
	number: string;
	contactName: string;
};

export class Message extends Entity<MessageProps> implements IEvent {
	status: "added" | "canDispatch" | "not attach";

	name = "event-message";

	constructor(props: MessageProps) {
		super(props);
		this.status = "not attach";
	}

	notify(eventRoot: Observer): void {
		console.log(
			`this message has send to ${this.props.number} from ${this.props.contactName} by ${eventRoot.eventRootName}`,
		);
	}
}
