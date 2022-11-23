import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import * as structure from "../Datastructure"
import { Style } from "../Style/"
import { Block } from "./Block"
export class Table extends Block {
	styleHeader: Style = {
		page: { size: "a4", margin: { top: 20, left: 20, bottom: 20, right: 20 } },
		fonts: {
			ubuntu: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf",
			ubuntuBold: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf",
		},
		font: { name: "ubuntuBold", size: 20 },
	}
	styleBold: Style = {
		page: { size: "a4", margin: { top: 20, left: 20, bottom: 20, right: 20 } },
		fonts: {
			ubuntu: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf",
			ubuntuBold: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf",
		},
		font: { name: "ubuntuBold", size: 12 },
	}
	constructor(readonly tableData: structure.Table, readonly bounds: Bounds) {
		super()
	}
	getOperations(context: Context): Line[] {
		const columnWidth = (this.bounds.width - this.bounds.left) / this.tableData.header.cells.length

		const indents = this.tableData.header.cells.reduce<number[]>(
			(prev, _, index) => (prev.push(columnWidth * (index + 1)), prev),
			[]
		)

		const headerContext = context.modify(this.styleHeader)
		const columnHeadContext = context.modify(this.styleBold)

		const returnArray: Line[] = []

		returnArray.push(headerContext.create("line", [headerContext.create("text", "New Table")]))
		returnArray.push(
			columnHeadContext.create(
				"line",
				this.tableData.header.cells.map((cell, i) =>
					cell.data
						? columnHeadContext.create("text", cell.data, indents[i])
						: columnHeadContext.create("text", "undefined", indents[i])
				)
			)
		)

		const newArray = this.tableData.body.map((row, i) =>
			context.create(
				"line",
				row.cells.map((cell, ii) =>
					cell.data ? context.create("text", cell.data, indents[ii]) : context.create("text", "undefined", indents[ii])
				)
			)
		)

		// returnArray.push(
		// 	...newArray[0].values
		// 		.map((_, colIndex) => newArray.map(row => row.values[colIndex]))
		// 		.map(column => context.create("line", [...column]))
		// )
		returnArray.push(...newArray)

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

// const interval = (this.bounds.width - this.bounds.left) / this.tableData.columns.length

// const margins = this.tableData.columns.reduce<number[]>((prev, _, i) => (prev.push(i * interval), prev), [])
// console.log(margins)

// const headerContext = context.modify(this.styleBold)
// const returnArray: Line[] = []
// returnArray.push(headerContext.create("line", [headerContext.create("text", this.tableData.name)]))
