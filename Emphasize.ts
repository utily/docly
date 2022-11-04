import * as pdf from "pdf-lib"
import { Canvas } from "./Canvas"
import { Options } from "./Canvas/Options"
import { Inline } from "./Inline"

export class Emphasize extends Inline {
	constructor(readonly content: Inline[], readonly font: pdf.PDFFont) {
		super()
	}
	getOperations(canvas: Canvas, options: Options): Canvas.Inline[] {
		throw new Error("Method not implemented.")
	}
}
