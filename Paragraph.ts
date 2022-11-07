import { Block } from "./Block"
import { Canvas } from "./Canvas"
import { Options } from "./Canvas/Options"
import { Inline } from "./Inline"

export class Paragraph extends Block {
	constructor(readonly content: Inline[]) {
		super()
	}
	getOperations(canvas: Canvas, options: Options): Canvas.Line[] {
		options = options.modify(canvas.style.paragraph).modify(this.style)
		return this.content.flatMap(c => c.getOperations(canvas, options).map(o => canvas.create("line", [o])))
	}
}
