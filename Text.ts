import * as pdf from "pdf-lib"
import { Inline } from "./Inline"
import { Operation } from "./Operation"
import { Options } from "./Operation/Options"

export class Text extends Inline {
	constructor(readonly value: string, readonly font: pdf.PDFFont) {
		super()
	}
	getOperations(canvas: Operation, options: Options): Operation.Inline[] {
		return canvas.breakIntoLines(this.value, options)
	}
}
