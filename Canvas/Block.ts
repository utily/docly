import { Bounds } from "../Bounds"
import { Context } from "./Context"
import { Operation } from "./Operation"

export class Block extends Operation {
	constructor(public context: Context, bounds: Bounds) {
		super(context, { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height })
	}
}
