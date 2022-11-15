import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import { DefinitionListType } from "../DefinitionList"
import { Style } from "../Style/index"
import { Block } from "./Block"

export class DefinitionList extends Block {
	style2: Style = {
		page: { size: "a4", margin: { top: 20, left: 20, bottom: 20, right: 20 } },
		fonts: {
			ubuntu: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf",
			ubuntuBold: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf",
		},
		font: { name: "ubuntuBold", size: 20 },
	}
	constructor(readonly content: DefinitionListType) {
		super()
	}
	getOperations(context: Context): Line[] {
		const definitionOperations: Line[] = []
		definitionOperations.push(context.modify(this.style).create("line", [context.create("text", this.content.header)]))

		this.content.values.forEach(key => {
			definitionOperations.push(context.create("line", [context.create("text", key.name)]))
			key.content.forEach(value =>
				definitionOperations.push(
					context.create("line", [context.create("text", "     "), context.create("text", value)])
				)
			)
		})
		return definitionOperations
	}
	createBounds(): Bounds {
		throw new Error("Method not implemented.")
	}
}

// VAd ska definitionslsita vara för datastruktur?

// Term
// 	name
// 	name
// 	name
// term
// 	name
// term
// 	name
