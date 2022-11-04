import { Block } from "./Block"
import { Canvas } from "./Canvas"
import { Options } from "./Canvas/Options"

export class Table extends Block {
	getOperations(canvas: Canvas, options: Options): Canvas.Line[] {
		throw new Error("Method not implemented.")
	}
}
