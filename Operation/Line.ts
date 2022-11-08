import { Operation } from "./Base"
import { Context } from "./Context"
import { Inline } from "./Inline"

export class Line extends Operation {
	constructor(readonly line: readonly Inline[], context: Context) {
		super(
			context,
			line.reduce((r, o) => ({ width: r.width + o.size.width, height: Math.max(r.height, o.size.height) }), {
				width: 0,
				height: 0,
			})
		)
	}
	render(page: Page): [number, number] {
		const start = this.context.page.getPosition()
		for (const operator of this.line) {
			operator.render(page)
			this.context.page.moveRight(operator.size.width)
		}
		return [start.x, start.y - this.size.height]
	}
}
