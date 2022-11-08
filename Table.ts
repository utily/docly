import { Block } from "./Block"
import { TableModel } from "./models/Table"
import { Operation } from "./Operation"
import { Options } from "./Operation/Options"

export class Table extends Block {
	constructor(private readonly table: TableModel) {
		super()
	}
	getOperations(canvas: Operation, options: Options): Operation.Line[] {
		// const intervall = canvas.context.page.getWidth() / this.table.headers.length

		throw new Error("Method not implemented.")
	}
}
