import * as pdf from "pdf-lib"
import { Bounds } from "../Bounds"
import { Context } from "./Context"

export class Canvas {
	context
	page
	bounds

	private static instance: Canvas
	private document: pdf.PDFDocument
	constructor() {}

	public static getCanvas(): Canvas {
		if (!Canvas.instance) {
			Canvas.instance = new Canvas()
		}
		return this.instance
	}
}
