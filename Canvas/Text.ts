import { Context } from "./Context"
import { Inline } from "./Inline"

export class Text extends Inline {
	constructor(public context: Context, readonly value: string, readonly indentation?: number) {
		super(context, context.measure(value))
	}

	getValue(): string {
		return this.value
	}
}
