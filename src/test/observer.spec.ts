import { IObserver, Observer } from "@/observer/observer-root";

let sut: Observer;
describe("observer", () => {
	beforeEach(() => {
		sut = new Observer();
	});

	it("should be able add an new observer", () => {
		const observer: IObserver = {
			name: "gm-user",
			notify: () => {},
		};

		sut.attach(observer);
		expect(sut.events).toHaveLength(1);
	});

	it("should be able a notify an observer", () => {
		const observer: IObserver = {
			name: "gm-user",
			notify: () => {},
		};

		const spy = vi.spyOn(observer, "notify");
		sut.attach(observer);
		sut.notify();

		expect(spy).toHaveBeenCalledOnce();
	});

	it("should be able a notify more observers", () => {
		const observer: IObserver = {
			name: "gm-user",
			notify: () => {},
		};
		const observer2: IObserver = {
			name: "gm-user2",
			notify: () => {},
		};

		const spy = vi.spyOn(observer, "notify");
		const spy2 = vi.spyOn(observer2, "notify");

		sut.attach(observer);
		sut.attach(observer2);
		sut.notify();

		expect(spy).toHaveBeenCalledOnce();
		expect(spy2).toHaveBeenCalledOnce();
	});

	it("should be able notify a some observer more than once", () => {
		const observer: IObserver = {
			name: "gm-user",
			notify: () => {},
		};

		const spy = vi.spyOn(observer, "notify");
		sut.attach(observer);
		sut.notify();
		sut.notify();
		sut.notify();
		sut.notify();

		expect(spy).toHaveBeenCalledTimes(4);
	});

	it("should be able delete an observer", () => {
		const observer: IObserver = {
			name: "gm-user",
			notify: () => {},
		};

		const spy = vi.spyOn(observer, "notify");
		sut.attach(observer);
		sut.notify();

		expect(spy).toHaveBeenCalledOnce();

		sut.delete(observer);
		expect(sut.events).toHaveLength(0);
	});
});
