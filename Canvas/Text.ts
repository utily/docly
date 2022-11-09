import { Context } from "./Context"
import { Inline } from "./Inline"

export class Text extends Inline {
	constructor(context: Context, readonly value: string) {
		super(context, context.measure(value))
	}
}
