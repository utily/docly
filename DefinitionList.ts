import { Block } from "./Block"
import { Canvas } from "./Canvas"

export class DefinitionList extends Block {
	getOperations(canvas: Canvas, options: Canvas.Options): Canvas.Line[] {
		throw new Error("Method not implemented.")
	}
}
