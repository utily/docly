import * as pdf from "pdf-lib"
import { Context } from "./Canvas/Context"
// import { Operation } from "./Canvas/Operation"
import { Inline } from "./Inline"

export class Emphasize extends Inline {
	getOperations(context: Context): void {
		throw new Error("Method not implemented.")
	}

	constructor(readonly content: Inline[], readonly font: pdf.PDFFont) {
		super()
	}
}
