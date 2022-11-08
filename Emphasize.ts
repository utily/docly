import * as pdf from "pdf-lib"
import { Inline } from "./Inline"
import { Operation } from "./Operation"
import { Options } from "./Operation/Options"

export class Emphasize extends Inline {
	constructor(readonly content: Inline[], readonly font: pdf.PDFFont) {
		super()
	}
	getOperations(canvas: Operation, options: Options): Operation.Inline[] {
		throw new Error("Method not implemented.")
	}
}
