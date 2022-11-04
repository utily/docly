import { Page } from "../Style/Page"
import { Context } from "./Context"

export class Margin {
	top: number
	bottom: number
	left: number
	right: number
	constructor(private readonly pageOptions: Page, private readonly page: Context) {
		this.top = this.pageOptions.margins ? page.page.getHeight() - this.pageOptions.margins?.top : 750
		this.bottom = this.pageOptions.margins?.bottom ? this.pageOptions.margins?.bottom : 30
		this.left = this.pageOptions.margins?.left ? this.pageOptions.margins?.left : 25
		this.right = this.pageOptions.margins ? this.page.page.getWidth() - this.pageOptions.margins?.left : 400

		console.log("top: " + this.top)
		console.log("Bottom: " + this.bottom)
	}
}
