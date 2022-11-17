import { Block } from "./Block"
import { Context } from "./Context"
import { Operation } from "./Operation"
import { Text } from "./Text"

export class Line extends Block {
	constructor(context: Context, readonly values: readonly Text[]) {
		super(
			context,
			values.reduce((r, o) => ({ width: r.width + o.size.width, height: Math.max(r.height, o.size.height) }), {
				width: 0,
				height: 0,
			})
		)
	}
}
