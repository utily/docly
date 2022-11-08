import fontkit from "@pdf-lib/fontkit"
import fetch from "isomorphic-fetch"
import * as pdf from "pdf-lib"
import { Bounds } from "../Bounds"
import { Margin } from "../Margin"
import { Style } from "../Style"

export class Context {
	get document(): pdf.PDFDocument {
		return this.global.document
	}
	get page(): pdf.PDFPage {
		return this.global.page
	}
	set page(value: pdf.PDFPage) {
		this.global.page = value
	}
	get fonts(): Record<string, pdf.PDFFont> {
		return this.global.fonts
	}
	private constructor(
		private global: {
			readonly document: pdf.PDFDocument
			readonly fonts: Record<string, pdf.PDFFont>
			page: pdf.PDFPage
		},
		readonly bounds: Readonly<Bounds>,
		readonly style: Style
	) {
		this.movePointer(this.bounds.left, this.bounds.top)
	}

	addNewPage() {
		this.page = this.document.addPage()
		this.movePointer(this.bounds.left, this.style.page.margin?.top ?? 0)
	}

	private movePointer(x: number, y: number) {
		this.page.moveTo(x, y)
	}
	reduce(margin: Margin): Context {
		return new Context(this.global, Bounds.reduce(this.bounds, margin), this.style)
	}

	setStyle(style: Style): Context {
		return new Context(this.global, this.bounds, style)
	}

	static async create(style: Style): Promise<Context> {
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
		return new Context({ document, fonts, page: document.addPage() }, Style.Page.getBounds(style.page), style)
	}
}
