import * as isoly from "isoly"
import { breakTextIntoLines } from "pdf-lib"
import { MetaData } from "../MetaData"
import { Style } from "../Style"
import { Context } from "./Context"
import { Inline as CanvasInline } from "./Inline"
import { Line as CanvasLine } from "./Line"
import { Operation } from "./Operation"
import { Options as CanvasOptions } from "./Options"
import { Text as CanvasText } from "./Text"

export class Canvas {
	get style(): Style {
		return this.context.style
	}
	readonly meta: MetaData = {}
	private constructor(private readonly context: Context) {}

	create(type: "line", content: Canvas.Inline[]): Canvas.Line
	create(type: "text", text: string, options: Canvas.Options): Canvas.Text
	create(type: Operation.Type, ...argument: any[]): Canvas.Operation {
		let result: Canvas.Operation
		switch (type) {
			case "line":
				result = new CanvasLine(argument[0], this.context)
				break
			case "text":
				result = new CanvasText(argument[0], argument[1], this.context)
				break
		}
		return result
	}

	render(content: Canvas.Line[]): void {
		for (const line of content) {
			if (this.context.page.getPosition().y < this.context.margin.bottom) {
				this.context.addNewPage()
			}

			;(line as CanvasLine).render()
		}
	}

	breakIntoLines(textToBreak: string, options: CanvasOptions): Canvas.Text[] {
		const realWidth =
			this.context.page.getWidth() -
			this.context.margin.left -
			(this.context.page.getWidth() - this.context.margin.right)
		console.log(realWidth)

		return breakTextIntoLines(textToBreak, this.context.document.defaultWordBreaks, realWidth, text =>
			this.context.fonts[options.font.name].widthOfTextAtSize(text, options.font.size)
		).map(line => this.create("text", line, options))
	}
	async export(): Promise<Uint8Array> {
		if (this.meta.title)
			this.context.document.setTitle(this.meta.title)
		if (this.meta.author)
			this.context.document.setAuthor(this.meta.author)
		if (this.meta.subject)
			this.context.document.setSubject(this.meta.subject)
		if (this.meta.keywords)
			this.context.document.setKeywords(this.meta.keywords)
		if (this.meta.created)
			this.context.document.setCreationDate(isoly.DateTime.parse(this.meta.created))
		if (this.meta.modified)
			this.context.document.setModificationDate(isoly.DateTime.parse(this.meta.modified))
		return await this.context.document.save()
	}
	static async create(style: Style): Promise<Canvas> {
		// replace fonts with style
		return await new Canvas(await Context.create(style))
	}
}
export namespace Canvas {
	export type Operation = Text | Line
	export type Text = Omit<CanvasText, "render">
	export type Line = Omit<CanvasLine, "render">
	export type Inline = Omit<CanvasInline, "render">
	export type Options = CanvasOptions
	export namespace Options {
		export const create = CanvasOptions.create
	}
}
