import { EventRoot } from "../events/event-root";

let sut: EventRoot;

describe("events", () => {
	beforeEach(() => {
		sut = new EventRoot();
	});

	it("Should be able to create an event", () => {
		sut.subscribe({
			name: "some-event",
			cb: () => {
				console.log("event create");
			},
			status: "added",
		});

		expect(sut.events.length).toBe(1);
	});

	it("Should be able execute an event", () => {
		const spy = vi.fn(() => {});

		sut.subscribe({ name: "some-event", status: "added", cb: spy });

		sut.changeStatus("some-event", "canDispatch");

		expect(sut.events).toStrictEqual([
			expect.objectContaining({
				status: "canDispatch",
			}),
		]);

		sut.dispatch("some-event");

		expect(spy).toHaveBeenCalledOnce();

		sut.unsubscribe("some-event");
		expect(sut.events.length).toEqual(0);
	});

	it("should be able remove a event after dispatch", () => {
		const spy = vi.fn(() => {});

		sut.subscribe({ name: "some-event", status: "added", cb: spy });

		sut.changeStatus("some-event", "canDispatch");

		sut.dispatch("some-event");

		sut.unsubscribe("some-event");
		expect(sut.events.length).toEqual(0);
	});

	it("Should be not able execute an event with status equal added", () => {
		const spy = vi.fn(() => {});

		sut.subscribe({ name: "some-event", status: "added", cb: spy });

		sut.dispatch("some-event");

		expect(spy).toHaveBeenCalledTimes(0);
		expect(sut.events.length).toEqual(1);
	});

	it("Should be able execute an event with status equal canDispatch", () => {
		const spy = vi.fn(() => {});
		const spy2 = vi.fn(() => {});

		sut.subscribe({ name: "some-event", status: "added", cb: spy });
		sut.subscribe({ name: "some-event-2", status: "added", cb: spy2 });

		sut.changeStatus("some-event", "canDispatch");
		sut.dispatch("some-event");

		expect(spy).toHaveBeenCalled();
		expect(spy2).toHaveBeenCalledTimes(0);

		sut.unsubscribe("some-event");
		expect(sut.events.length).toEqual(1);
		expect(sut.events).toStrictEqual([
			expect.objectContaining({
				name: "some-event-2",
			}),
		]);
	});
});
