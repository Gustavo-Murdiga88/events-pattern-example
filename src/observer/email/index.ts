import { Entity } from "observer/entity/index";
import { IEvent, Observer } from "observer/index";

type EmailProps = {
	email: string;
	to: string;
	content: string;
	title: string;
};

export class Email extends Entity<EmailProps> implements IEvent {
	status: "added" | "canDispatch" | "not attach";

	name = "email-event";

	constructor(props: EmailProps) {
		super(props);
		this.status = "not attach";
	}

	notify(eventRoot: Observer): void {
		console.log(
			`this event has send from ${this.props.email} to ${this.props.to} with content ${this.props.content} and title ${this.props.title}\nby ${eventRoot.eventRootName}`,
		);
	}
}
