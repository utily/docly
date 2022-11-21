import * as isoly from "isoly"
import fontkit from "@pdf-lib/fontkit"
import fetch from "isomorphic-fetch"
import * as pdf from "pdf-lib"
import { Bounds } from "../Bounds"
import { MetaData } from "../Datastructure/MetaData"
import { Style } from "../Style"
import { Block } from "./Block"
import { Context } from "./Context"

export class Canvas {
	currentPageBounds: Bounds
	private constructor(
		public context: Context,
		readonly document: pdf.PDFDocument,
		private page: pdf.PDFPage,
		readonly pageBounds: Bounds
	) {
		this.currentPageBounds = { ...pageBounds }
	}

	setContext(context: Context) {
		this.context = context
	}

	render(blocks: Block[]): void {
		for (const block of blocks) {
			// Add page break!
			block.bounds = { ...block.bounds, left: this.pageBounds.left, top: this.pageBounds.top }
			if (Array.isArray(block.content)) {
				for (const row of block.content) {
					row.bounds = { ...row.bounds, left: block.bounds.left, top: block.bounds.top - row.bounds.height }
					this.render(row.blocks) //Somelock is not iterable??
				}
			} else {
				this.page.drawText(block.content, { x: block.bounds.left, y: block.bounds.top })
				this.pageBounds.top = this.pageBounds.top - block.bounds.height
			}
		}
	}

	private reset() {
		this.page = this.document.addPage()
		this.currentPageBounds = { ...this.pageBounds }
		this.page.moveTo(this.currentPageBounds.left, this.currentPageBounds.height)
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
