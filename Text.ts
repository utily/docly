import * as pdf from "pdf-lib"
import { Operation } from "./Canvas"
import { Options } from "./Canvas/Options"
import { Inline } from "./Inline"

export class Text extends Inline {
	constructor(readonly value: string, readonly font: pdf.PDFFont) {
		super()
	}
	getOperations(canvas: Operation, options: Options): Operation.Inline[] {
		return canvas.breakIntoLines(this.value, options)
	}
}
