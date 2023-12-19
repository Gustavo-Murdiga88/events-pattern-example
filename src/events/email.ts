import { Entity } from "@/core/entity";

type EmailProps = {
	title: string;
	user: string;
	from: string;
	to: string;
	content: string;
	date: Date;
};

export class Email extends Entity<EmailProps> {
	constructor({ from, to, content, date, title, user }: EmailProps) {
		super({ from, to, content, date, title, user });
	}
}

export class SendEmail {
	static sendEmail(entity: Email): void {
		console.log("email", {
			title: entity.props.title,
			user: entity.props.user,
			from: entity.props.from,
			to: entity.props.to,
			content: entity.props.content,
			date: entity.props.date,
		});
	}
}
