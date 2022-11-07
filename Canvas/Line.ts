import { Context } from "./Context"
import { Inline } from "./Inline"
import { Operation } from "./Operation"

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
	render(): void {
		const start = this.context.page.getPosition()
		for (const operator of this.line) {
			operator.render()
			this.context.page.moveRight(operator.size.width)
		}
		this.context.page.moveTo(start.x, start.y - this.size.height)
	}
}
