import * as pdf from "pdf-lib"
import { Context } from "./Context"
import { Inline } from "./Inline"
import { Options } from "./Options"

export class Text extends Inline {
	private readonly font: pdf.PDFFont
	private readonly maxWidth: number = 400
	constructor(readonly value: string, readonly options: Readonly<Options>, context: Context) {
		const font = context.fonts[options.font.name] // TODO: add font weight and varian to name
		super(context, {
			width: font.widthOfTextAtSize(value, options.font.size),
			height: font.heightAtSize(options.font.size),
		})
		this.font = font
	}
	breakIntoLines(): Text[] {
		return pdf
			.breakTextIntoLines(this.value, [" ", "-"], this.maxWidth, t =>
				this.font.widthOfTextAtSize(t, this.options.font.size)
			)
			.map(value => new Text(value, this.options, this.context))
	}
	render(): void {
		this.context.page.drawText(this.value, {
			size: this.options.font.size,
			lineHeight: this.options.font.size,
			font: this.font,
		})
	}
}
