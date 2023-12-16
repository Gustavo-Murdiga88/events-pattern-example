import { Entity } from "core/entity";
import { IEvent, Observer } from "./observer-root";

type EmailProps = {
	email: string;
	to: string;
	content: string;
	title: string;
};

export class Email extends Entity<EmailProps> implements IEvent {
	name = "email-event";

	constructor(props: EmailProps) {
		super(props);
	}

	notify(eventRoot: Observer): void {
		console.log({
			email: this.props.email,
			content: this.props.content,
			title: this.props.title,
			to: this.props.to,
			eventRootName: eventRoot.eventRootName,
		});
	}
}

export class EmailObservers extends Observer {
	constructor(rootName: string) {
		super(rootName);
	}
}
