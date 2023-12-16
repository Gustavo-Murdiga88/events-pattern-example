import { Email } from "observer/email/index";
import { Observer } from "observer/index";
import { Message } from "observer/message/index";

// criação das instâncias;

const notifications = new Observer("Envio de emails");
const messages = new Observer("Envio de mensagens");

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

const email2 = new Email({
	content: "itaque voluptas aut",
	email: "johndoe@johndoe.com",
	title: "sit aspernatur aut odit aut fugit",
	to: "gumjh@example.com",
});

const message2 = new Message({
	contactName: "John Doe",
	number: "123456789",
});

// execução e testes;
notifications.attachEvents(email);
notifications.attachEvents(message);

messages.attachEvents(email2);
messages.attachEvents(message2);

notifications.changeStatus(email, "canDispatch");
notifications.changeStatus(message, "canDispatch");

messages.changeStatus(email2, "canDispatch");
messages.changeStatus(message2, "canDispatch");

notifications.notifyEvents();
notifications.notifyEvents();

messages.notifyEvents();
messages.notifyEvents();

notifications.deleteEvent(email);
notifications.deleteEvent(message);
messages.deleteEvent(email2);
messages.deleteEvent(message2);
