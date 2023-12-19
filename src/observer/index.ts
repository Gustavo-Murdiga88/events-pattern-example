import { Email, EmailObservers } from "./email";
import { Message, MessagesObservers } from "./messages";

const notifications = new EmailObservers();
const messages = new MessagesObservers();

const email = new Email({
	content: "itaque voluptas aut",
	email: "johndoe@johndoe.com",
	title: "sit aspernatur aut odit aut fugit",
	to: "gumjh@example.com",
});

const message = new Message({
	contactName: "John Doe",
	number: "123456789",
});

notifications.attach(email);
messages.attach(message);

notifications.notify();
messages.notify();

notifications.delete(email);
messages.delete(message);

notifications.notify();
messages.notify();
