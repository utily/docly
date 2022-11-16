import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import * as structure from "../Datastructure/"
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
	constructor(readonly content: structure.DefinitionList) {
		super()
	}
	getOperations(context: Context): Line[] {
		const definitionOperations: Line[] = []

		const headerContext: Context = context.modify(this.style2)
		definitionOperations.push(headerContext.create("line", [headerContext.create("text", this.content.header)]))

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
