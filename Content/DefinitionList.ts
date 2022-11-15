import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import { Inline } from "./Inline"

export class DefinitionList extends Inline {
	constructor(readonly content: [string, string]) {
		super()
	}

	getOperations(context: Context): Line[] {
		return [
			context.create(
				"line",
				this.content.map(value => context.create("text", value + "   "))
			),
		]
	}
	createBounds(): Bounds {
		throw new Error("Method not implemented.")
	}
}
