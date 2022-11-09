import { Context } from "./Context"
import { Inline } from "./Inline"
import { Operation } from "./Operation"

export class Line extends Operation {
	constructor(context: Context, readonly line: readonly Inline[]) {
		super(
			context,
			line.reduce((r, o) => ({ width: r.width + o.size.width, height: Math.max(r.height, o.size.height) }), {
				width: 0,
				height: 0,
			})
		)
	}
}
