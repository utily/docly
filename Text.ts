import * as pdf from "pdf-lib"
import { Canvas } from "./Canvas"
import { Options } from "./Canvas/Options"
import { Inline } from "./Inline"

export class Text extends Inline {
	constructor(readonly value: string, readonly font: pdf.PDFFont) {
		super()
	}
	getOperations(canvas: Canvas, options: Options): Canvas.Inline[] {
		return canvas.breakIntoLines(this.value, options)
	}
}
