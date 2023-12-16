export class Entity<T = unknown> {
	props: T;

	constructor(props: T) {
		this.props = props;
	}
}
