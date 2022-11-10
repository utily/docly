import * as isoly from "isoly"
import fontkit from "@pdf-lib/fontkit"
import fetch from "isomorphic-fetch"
import * as pdf from "pdf-lib"
import { Bounds } from "../Bounds"
import { MetaData } from "../MetaData"
import { Style } from "../Style"
import { Context } from "./Context"
import { Line } from "./Line"

export class Canvas {
	private constructor(
		readonly context: Context,
		readonly document: pdf.PDFDocument,
		private page: pdf.PDFPage,
		readonly bounds: Bounds
	) {}

	movePointer(x: number, y: number) {
		this.page.moveTo(x, y)
	}
	render(content: Line[]): void {
		if (this.bounds.height < 0) this.page = this.document.addPage()
		// TODO: draw text & update bounds
		// Bounds are tied to the page, need to update to original bounds when pagination happens.
		// Tie them with page?

		this.movePointer(20, 700)
		for (const line of content) {
			for (const text of line.values) {
				//Send options to text, for the text. this we can use to have dynamic text styles.
				this.page.drawText(text.value, { size: 10 })
				this.page.moveDown(text.size.height) // Refactor?
			}
		}
	}

	async export(meta: MetaData): Promise<Uint8Array> {
		if (meta.title) this.document.setTitle(meta.title)
		if (meta.author) this.document.setAuthor(meta.author)
		if (meta.subject) this.document.setSubject(meta.subject)
		if (meta.keywords) this.document.setKeywords(meta.keywords)
		if (meta.created) this.document.setCreationDate(isoly.DateTime.parse(meta.created))
		if (meta.modified) this.document.setModificationDate(isoly.DateTime.parse(meta.modified))
		return await this.document.save()
	}
	static async create(style: Style): Promise<Canvas> {
		const document = await pdf.PDFDocument.create()
		document.registerFontkit(fontkit)

		const fonts = Object.fromEntries(
			await Promise.all(
				Object.entries(style.fonts).map(
					async ([name, url]): Promise<[string, pdf.PDFFont]> => [
						name,
						await document.embedFont(await fetch(url).then(r => r.arrayBuffer())),
					]
				)
			)
		)
		return new Canvas(
			new Context(fonts, document.defaultWordBreaks, style),
			document,
			document.addPage(),
			Style.Page.getBounds(style.page)
		)
	}
}
