import { Entity } from "@/core/entity";

type PhoneProps = {
	number: string;
	userName: string;
};

export class Phone extends Entity<PhoneProps> {
	constructor({ number, userName }: PhoneProps) {
		super({ number, userName });
	}
}
export class SendMessage {
	static sendMessage(entity?: Phone): void {
		console.log("phone", {
			number: entity?.props.number,
			userName: entity?.props.userName,
		});
	}
}
