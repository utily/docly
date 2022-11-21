import { Bounds } from "../Bounds"
import { Block as OperationBlock } from "../Canvas/Block"
import { Context } from "../Canvas/Context"
import { Block } from "./Block"

export class Paragraph extends Block {
	/*
	Need to take a text, style it with new context, return it to canvas?
	Bounds?! Does it need to be on every

	What does a paragraph need?
	* Bounds (Internal)
	* Style
	*	Content
	* Block elements, has margins around and takes full width (Bound width.)
	*/

	constructor(readonly content: string, readonly bounds: Bounds) {
		super()
	}
	getOperations(context: Context): OperationBlock {
		const paragraphOperations = context.breakIntoLines(this.content, this.bounds)

		const newHeight = paragraphOperations.reduce((height, row) => row.bounds.height + height, 0)
		const newBounds = { ...this.bounds, height: newHeight }
		const blockToSend: OperationBlock = new OperationBlock(context, newBounds, paragraphOperations)
		return blockToSend
	}
	createBounds(): Bounds {
		throw new Error("Method not implemented.")
	}
}

// OLD GETTER, NEEDS REWORK
// getOperations(canvas: Operation, options: Options): Operation.Line[] {
// 		options = options.modify(canvas.style.paragraph).modify(this.style)
// 		return this.content.flatMap(c => c.getOperations(canvas, options).map(o => canvas.create("line", [o])))
// 	}
