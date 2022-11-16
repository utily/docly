import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import { Text } from "../Canvas/Text"
import * as structure from "../Datastructure"
import { Style } from "../Style/"
import { Block } from "./Block"
export class Table extends Block {
	styleBold: Style = {
		page: { size: "a4", margin: { top: 20, left: 20, bottom: 20, right: 20 } },
		fonts: {
			ubuntu: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf",
			ubuntuBold: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf",
		},
		font: { name: "ubuntuBold", size: 20 },
	}
	constructor(readonly tableData: structure.Table, readonly bounds: Bounds) {
		super()
	}
	getOperations(context: Context): Line[] {
		const interval = (this.bounds.width - this.bounds.left) / this.tableData.columns.length

		const margins = this.tableData.columns.reduce<number[]>((prev, _, i) => (prev.push(i * interval), prev), [])
		console.log(margins)

		const headerContext = context.modify(this.styleBold)
		const returnArray: Line[] = []
		returnArray.push(headerContext.create("line", [headerContext.create("text", this.tableData.name)]))

		for (let i = 0; i < this.tableData.columns.length; i++) {
			const textArray: Text[] = []
			for (let ii = 0; ii < this.tableData.columns.length; ii++) {
				textArray.push(context.create("text", this.tableData.columns[ii].data[i], margins[ii]))
			}
			returnArray.push(context.create("line", textArray))
		}

		return returnArray
	}
	createBounds(): Bounds {
		throw new Error("Method not implemented.")
	}
}

/**
 * Think about datastrcuture
 *
 */
