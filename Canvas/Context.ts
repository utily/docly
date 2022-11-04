import fontkit from "@pdf-lib/fontkit"
import fetch from "isomorphic-fetch"
import * as pdf from "pdf-lib"
import { Style } from "../Style"
import { Margin } from "./Margin"

export class Context {
	page: pdf.PDFPage
	margin: Margin
	private constructor(
		readonly document: pdf.PDFDocument,
		readonly style: Style,
		readonly fonts: Record<string, pdf.PDFFont>
	) {
		this.page = this.document.addPage()
		this.margin = new Margin(style.page, this)

		this.page.moveTo(this.margin.left, this.margin.top)
		console.log(this.page.getPosition())
	}

	public addPage() {
		this.page = this.document.addPage()
		this.document.defaultWordBreaks
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
		return new Context(document, style, fonts)
	}
}
