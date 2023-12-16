import { Email, SendEmail } from "./email";
import { EventRoot } from "./event-root";
import { Phone, SendMessage } from "./messages";

const eventRoot = new EventRoot();

const myPhone = new Phone({
	number: "123456789",
	userName: "john",
});

const myEmail = new Email({
	content: "Vero cum adipisci beatae voluptate voluptas.",
	date: new Date(),
	from: "johndoe@johndoe.com",
	title: "Hi dear this is johndoe",
	to: "johndoe@johndoe.com",
	user: "Gustavinho",
});

eventRoot.subscribe({
	name: SendMessage.name,
	cb: () => {
		SendMessage.sendMessage(myPhone);
	},
	status: "added",
});

eventRoot.subscribe({
	cb: () => {
		SendEmail.sendEmail(myEmail);
	},
	name: SendEmail.name,
	status: "added",
});

eventRoot.changeStatus(SendMessage.name, "canDispatch");
eventRoot.changeStatus(SendEmail.name, "canDispatch");
eventRoot.dispatch(SendMessage.name);
eventRoot.dispatch(SendEmail.name);
eventRoot.unsubscribe(SendMessage.name);
eventRoot.unsubscribe(SendEmail.name);
