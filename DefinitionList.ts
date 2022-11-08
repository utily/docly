import { Block } from "./Block"
import { Inline } from "./Inline"
import { Operation } from "./Operation"

export class DefinitionList extends Block {
	constructor(private content: [Inline[], Inline[]][]) {
		super()
	}
	getOperations(canvas: Operation, options: Operation.Options): Operation.Line[] {
		return this.content.content.map(object => canvas.create("line", [canvas.create("text", object, options)]))
	}
}
