import { Entity } from "@/core/entity";
import { IObserver, Observer } from "./observer-root";

type EmailProps = {
	email: string;
	to: string;
	content: string;
	title: string;
};

export class Email extends Entity<EmailProps> implements IObserver {
	name = "email-event";

	constructor(props: EmailProps) {
		super(props);
	}

	notify(): void {
		console.log({
			email: this.props.email,
			content: this.props.content,
			title: this.props.title,
			to: this.props.to,
		});
	}
}

export class EmailObservers extends Observer {}
