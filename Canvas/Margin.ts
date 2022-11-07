import { Page } from "../Style/Page"
import { Context } from "./Context"

export class Margin {
	top: number
	bottom: number
	left: number
	right: number
	constructor(private readonly pageOptions: Page, private readonly page: Context) {
		this.top = this.pageOptions.margin?.top
			? page.page.getHeight() - this.pageOptions.margin?.top
			: this.page.page.getHeight() - 30
		this.bottom = this.pageOptions.margin?.bottom ? this.pageOptions.margin?.bottom : 30
		this.left = this.pageOptions.margin?.left ? this.pageOptions.margin?.left : 25
		this.right = this.pageOptions.margin?.left
			? this.page.page.getWidth() - this.pageOptions.margin?.left
			: this.page.page.getWidth() - 25
	}
}
