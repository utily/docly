import { Bounds } from "../Bounds"
import { Block } from "./Block"
import { Context } from "./Context"
import { Operation } from "./Operation"
export class Row extends Operation {
	constructor(public context: Context, public bounds: Bounds, readonly blocks: Block[]) {
		super(context, bounds)
	}
}
