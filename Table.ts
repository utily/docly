import { Block } from "./Block"
import { Context } from "./Canvas/Context"
import { Line } from "./Canvas/Line"

export class Table extends Block {
	getOperations(context: Context): Line[] {
		throw new Error("Method not implemented.")
	}
	constructor() {
		super()
	}
}
