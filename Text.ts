import * as pdf from "pdf-lib"
import { Context } from "./Canvas/Context"
import { Inline } from "./Inline"

export class Text extends Inline {
	getOperations(context: Context): void {
		throw new Error("Method not implemented.")
	}
	constructor(readonly value: string, readonly font: pdf.PDFFont) {
		super()
	}
}
