import { Block } from "./Block"
import { Canvas } from "./Canvas"
import { Options } from "./Canvas/Options"
import { TableModel } from "./models/Table"

export class Table extends Block {
	constructor(private readonly table: TableModel) {
		super()
	}
	getOperations(canvas: Canvas, options: Options): Canvas.Line[] {
		// const intervall = canvas.context.page.getWidth() / this.table.headers.length

		throw new Error("Method not implemented.")
	}
}
