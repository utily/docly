import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import { Block } from "./Block"

export class Paragraph extends Block {
	/*
	Need to take a text, style it with new context, return it to canvas? 
	Bounds?! Does it need to be on every 
	*/
	bounds: Bounds
	constructor(readonly content: string) {
		super()
	}
	getOperations(context: Context): Line[] {
		context.breakIntoLines(content)
	}
}

// OLD GETTER, NEEDS REWORK
// getOperations(canvas: Operation, options: Options): Operation.Line[] {
// 		options = options.modify(canvas.style.paragraph).modify(this.style)
// 		return this.content.flatMap(c => c.getOperations(canvas, options).map(o => canvas.create("line", [o])))
// 	}
