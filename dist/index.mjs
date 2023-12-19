// src/core/entity.ts
var Entity = class {
  props;
  constructor(props) {
    this.props = props;
  }
};

// src/events/email.ts
var Email = class extends Entity {
  constructor({ from, to, content, date, title, user }) {
    super({ from, to, content, date, title, user });
  }
};
var SendEmail = class {
  static sendEmail(entity) {
    console.log("email", {
      title: entity.props.title,
      user: entity.props.user,
      from: entity.props.from,
      to: entity.props.to,
      content: entity.props.content,
      date: entity.props.date
    });
  }
};

// src/events/event-root.ts
var EventRoot = class {
  events = [];
  subscribe({ cb, name, status }) {
    const contains = this.events.find((event) => event.name === name);
    if (contains) {
      console.log(`event ${name} already exists`);
      return;
    }
    this.events.push({
      cb,
      name,
      status
    });
  }
  dispatch(name) {
    const events = this.events.filter(
      (ev) => ev.name === name && ev.status === "canDispatch"
    );
    if (!events.length) {
      console.log(`event ${name} not found`);
    }
    events.forEach((event) => {
      event.cb();
    });
  }
  unsubscribe(name) {
    const indexEvent = this.events.findIndex((event) => event.name === name);
    if (indexEvent === -1) {
      console.log(`this even ${name} not found`);
      return;
    }
    this.events.splice(indexEvent, 1);
  }
  changeStatus(name, status) {
    const indexEvent = this.events.findIndex((event) => event.name === name);
    if (indexEvent === -1) {
      console.log(`this event ${name} not found`);
      return;
    }
    this.events[indexEvent].status = status;
  }
};

// src/events/messages.ts
var Phone = class extends Entity {
  constructor({ number, userName }) {
    super({ number, userName });
  }
};
var SendMessage = class {
  static sendMessage(entity) {
    console.log("phone", {
      number: entity?.props.number,
      userName: entity?.props.userName
    });
  }
};

// src/events/index.ts
var eventRoot = new EventRoot();
var myPhone = new Phone({
  number: "123456789",
  userName: "john"
});
var myEmail = new Email({
  content: "Vero cum adipisci beatae voluptate voluptas.",
  date: /* @__PURE__ */ new Date(),
  from: "johndoe@johndoe.com",
  title: "Hi dear this is johndoe",
  to: "johndoe@johndoe.com",
  user: "Gustavinho"
});
eventRoot.subscribe({
  name: SendMessage.name,
  cb: () => {
    SendMessage.sendMessage(myPhone);
  },
  status: "added"
});
eventRoot.subscribe({
  cb: () => {
    SendEmail.sendEmail(myEmail);
  },
  name: SendEmail.name,
  status: "added"
});
eventRoot.changeStatus(SendMessage.name, "canDispatch");
eventRoot.changeStatus(SendEmail.name, "canDispatch");
eventRoot.dispatch(SendMessage.name);
eventRoot.dispatch(SendEmail.name);
eventRoot.unsubscribe(SendMessage.name);
eventRoot.unsubscribe(SendEmail.name);

// src/observer/observer-root.ts
var Observer = class {
  events = [];
  constructor() {
  }
  notify() {
    if (this.events.length === 0) {
      console.log("you no have a observers subscribed");
    }
    this.events.forEach((event) => {
      event.notify(this);
    });
  }
  attach(event) {
    const eventIncluded = this.events.includes(event);
    if (eventIncluded) {
      return;
    }
    this.events.push(event);
  }
  delete(event) {
    const indexEvent = this.events.indexOf(event);
    if (indexEvent === -1) {
      console.log(`event not found`);
    }
    this.events.splice(indexEvent, 1);
  }
};

// src/observer/email.ts
var Email2 = class extends Entity {
  name = "email-event";
  constructor(props) {
    super(props);
  }
  notify() {
    console.log({
      email: this.props.email,
      content: this.props.content,
      title: this.props.title,
      to: this.props.to
    });
  }
};
var EmailObservers = class extends Observer {
};

// src/observer/messages.ts
var Message = class extends Entity {
  name = "event-message";
  constructor(props) {
    super(props);
  }
  notify() {
    console.log({
      number: this.props.number,
      contactName: this.props.contactName
    });
  }
};
var MessagesObservers = class extends Observer {
};

// src/observer/index.ts
var notifications = new EmailObservers();
var messages = new MessagesObservers();
var email = new Email2({
  content: "itaque voluptas aut",
  email: "johndoe@johndoe.com",
  title: "sit aspernatur aut odit aut fugit",
  to: "gumjh@example.com"
});
var message = new Message({
  contactName: "John Doe",
  number: "123456789"
});
notifications.attach(email);
messages.attach(message);
notifications.notify();
messages.notify();
notifications.delete(email);
messages.delete(message);
notifications.notify();
messages.notify();
