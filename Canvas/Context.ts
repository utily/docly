import * as pdf from "pdf-lib"
import { Bounds } from "../Bounds"
import { Size } from "../Size"
import { Style } from "../Style"
import { Inline } from "./Inline"
import { Line } from "./Line"
import { Operation } from "./Operation"
import { Text } from "./Text"
import { Type } from "./Type"

export class Context {
	readonly options: Required<Pick<pdf.PDFPageDrawTextOptions, "size" | "font">> & pdf.PDFPageDrawTextOptions

	constructor(
		readonly fonts: Record<string, pdf.PDFFont>,
		readonly wordBreaks: readonly string[],
		readonly style: Readonly<Style.Block> | undefined
	) {
		this.options = {
			size: this.style?.font?.size ?? 12,
			font: this.fonts[this.style?.font?.name ?? "default"],
		}
	}
	modify(style: Readonly<Style.Block> = {}): Context {
		return new Context(this.fonts, this.wordBreaks, Style.Block.merge(this.style, style))
	}
	create(type: "line", content: Inline[]): Line
	create(type: "text", text: string): Text
	create(type: Type, ...argument: any[]): Operation {
		let result: Operation
		switch (type) {
			case "line":
				result = new Line(this, argument[0])
				break
			case "text":
				result = new Text(this, argument[0])
				break
		}
		return result
	}
	measure(text: string): Size {
		return {
			width: this.options.font.widthOfTextAtSize(text, this.options.size),
			height: this.options.font.heightAtSize(this.options.size),
		}
	}
	breakIntoLines(text: string, bounds: Bounds, indentation = 0): Text[] {
		// Bounds.width not working properly
		return pdf
			.breakTextIntoLines(text, [...this.wordBreaks], bounds.width, text =>
				this.options.font.widthOfTextAtSize(text, this.options.size)
			)
			.map(text => this.create("text", text))
	}
}
