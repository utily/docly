import { Block } from "./Block"
import { Inline } from "./Inline"
import { Operation } from "./Operation"
import { Options } from "./Operation/Options"

export class Paragraph extends Block {
	constructor(readonly content: Inline[]) {
		super()
	}
	getOperations(canvas: Operation, options: Options): Operation.Line[] {
		options = options.modify(canvas.style.paragraph).modify(this.style)
		return this.content.flatMap(c => c.getOperations(canvas, options).map(o => canvas.create("line", [o])))
	}
}
