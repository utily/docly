import { Block } from "./Block"
import { Context } from "./Canvas/Context"
import { Line } from "./Canvas/Line"
import { Inline } from "./Inline"

export class Paragraph extends Block {
	getOperations(context: Context): Line[] {
		throw new Error("Method not implemented.")
	}
	constructor(readonly content: Inline[]) {
		super()
	}
}
// OLD GETTER, NEEDS REWORK
// getOperations(canvas: Operation, options: Options): Operation.Line[] {
// 		options = options.modify(canvas.style.paragraph).modify(this.style)
// 		return this.content.flatMap(c => c.getOperations(canvas, options).map(o => canvas.create("line", [o])))
// 	}
