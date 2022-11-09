import * as pdf from "pdf-lib"
import { Operation } from "./Canvas"
import { Options } from "./Canvas/Options"
import { Inline } from "./Inline"

export class Emphasize extends Inline {
	constructor(readonly content: Inline[], readonly font: pdf.PDFFont) {
		super()
	}
	getOperations(canvas: Operation, options: Options): Operation.Inline[] {
		throw new Error("Method not implemented.")
	}
}
