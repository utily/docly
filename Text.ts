import * as pdf from "pdf-lib"
import { Canvas } from "./Canvas"
import { Options } from "./Canvas/Options"
import { Inline } from "./Inline"

export class Text extends Inline {
	constructor(readonly value: string, readonly font: pdf.PDFFont) {
		super()
	}
	getOperations(canvas: Canvas, options: Options): Canvas.Inline[] {
		canvas.create("text", this.value, options)
		throw new Error("Method not implemented.")
	}
}
