import * as isoly from "isoly"
import { MetaData } from "../MetaData"
import { Style } from "../Style"
import { Context } from "./Context"
import { Inline as CanvasInline } from "./Inline"
import { Line as CanvasLine } from "./Line"
import { Operation } from "./Operation"
import { Options as CanvasOptions } from "./Options"
import { Text as CanvasText } from "./Text"

export class Canvas {
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

	async render(content: Canvas.Line[]): Promise<void> {
		let length = 0
		for (const line of content) {
			length += line.size.height
			if (length > this.context.page.getSize().height) {
				this.context.addPage()
				length = 0
			}
			await (line as CanvasLine).render()
		}
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
