import { he } from "isoly/dist/CountryCode/Name"
import * as pdf from "pdf-lib"
import { Bounds } from "../Bounds"
import { Size } from "../Datastructure/Size"
import { Style } from "../Style"
import { Block } from "./Block"
import { Operation } from "./Operation"
import { Row } from "./Row"
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
	create(type: "row", bounds: Bounds, content: Block[]): Row
	create(type: "block", bounds: Bounds, text: string | Row[]): Block
	create(type: Type, ...argument: any[]): Operation {
		let result: Operation
		switch (type) {
			case "row":
				result = new Row(this, argument[0], argument[1]) //Something going wrong here, not taking the bounds
				break
			case "block":
				result = new Block(this, argument[0], argument[1])
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
	breakIntoLines(text: string, bounds: Bounds): Row[] {
		return pdf
			.breakTextIntoLines(text, [...this.wordBreaks], bounds.width, text =>
				this.options.font.widthOfTextAtSize(text, this.options.size)
			)
			.map(text => {
				const updatedSize = this.measure(text)
				const updatedBounds: Bounds = { ...bounds, width: updatedSize.width, height: updatedSize.height }
				return this.create("block", updatedBounds, text)
			})
			.map(block => this.create("row", block.bounds, [block]))
	}
}
