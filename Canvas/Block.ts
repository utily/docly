import { Bounds } from "../Bounds"
import { Size } from "../Datastructure"
import { Context } from "./Context"
import { Operation } from "./Operation"

export class Block extends Operation {
	constructor(public context: Context, bounds: Bounds) {
		super(context, { width: bounds.width, height: bounds.height })
	}
}
