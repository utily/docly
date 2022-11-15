import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
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
	getOperations(context: Context): Line[] {
		const ads = context.breakIntoLines(this.content, this.bounds).map(line => context.create("line", [line]))
		ads.unshift(context.create("line", [context.create("text", " ")]))
		ads.push(context.create("line", [context.create("text", " ")]))

		return ads
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
