import { Bounds } from "../Bounds"
import { Block as OperationBlock } from "../Canvas/Block"
import { Context } from "../Canvas/Context"
import { Block } from "./Block"

export class Paragraph extends Block {
	offset = 10
	constructor(readonly content: string, readonly bounds: Bounds) {
		super()
	}
	getOperations(context: Context): OperationBlock {
		const paragraphOperations = context.breakIntoLines(this.content, this.bounds)

		const newHeight = paragraphOperations.reduce((height, row) => row.bounds.height + height, 0)
		const newBounds = { ...this.bounds, height: newHeight }

		const blockToRender: OperationBlock = new OperationBlock(context, newBounds, paragraphOperations)
		return blockToRender
	}
	createBounds(): Bounds {
		throw new Error("Method not implemented.")
	}
}
/**
 * insert Margins on each side of ends,
 *
 */
