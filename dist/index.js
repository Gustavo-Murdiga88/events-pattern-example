"use strict";

// src/core/entity.ts
var Entity = class {
  props;
  constructor(props) {
    this.props = props;
  }
};

// src/observer/observer-root.ts
var Observer = class {
  events = [];
  eventRootName;
  constructor(eventRootName) {
    this.eventRootName = eventRootName;
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
var Email = class extends Entity {
  name = "email-event";
  constructor(props) {
    super(props);
  }
  notify(eventRoot) {
    console.log({
      email: this.props.email,
      content: this.props.content,
      title: this.props.title,
      to: this.props.to,
      eventRootName: eventRoot.eventRootName
    });
  }
};
var EmailObservers = class extends Observer {
  constructor(rootName) {
    super(rootName);
  }
};

// src/observer/messages.ts
var Message = class extends Entity {
  name = "event-message";
  constructor(props) {
    super(props);
  }
  notify(eventRoot) {
    console.log({
      number: this.props.number,
      contactName: this.props.contactName,
      eventRootName: eventRoot.eventRootName
    });
  }
};
var MessagesObservers = class extends Observer {
  constructor(rootName) {
    super(rootName);
  }
};

// src/observer/index.ts
var notifications = new EmailObservers("send-emails");
var messages = new MessagesObservers("send-messages");
var email = new Email({
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
