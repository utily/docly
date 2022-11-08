import { Block } from "./Block"
import { Canvas } from "./Canvas"
import { Definition } from "./models/Definition"

export class DefinitionList extends Block {
	constructor(private content: Definition) {
		super()
		
	}
	getOperations(canvas: Canvas, options: Canvas.Options): Canvas.Line[] {
		throw new Error("Method not implemented.")
	}
}
