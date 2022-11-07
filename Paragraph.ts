import { Block } from "./Block"
import { Canvas } from "./Canvas"
import { Options } from "./Canvas/Options"
import { Inline } from "./Inline"

export class Paragraph extends Block {
	constructor(readonly content: Inline[]) {
		super()
	}
	getOperations(canvas: Canvas, options: Options): Canvas.Line[] {
		throw new Error("Method not implemented.")
	}
}
