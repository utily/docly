import { Bounds } from "../Bounds"
import { Margin } from "../Margin"
import { Size } from "../Size"

export interface Page {
	size?: "a4"
	margin?: Margin
}

export namespace Page {
	export function getBounds(page: Page): Bounds {
		let size: Size
		switch (page.size) {
			default:
			case "a4":
				size = { width: 550, height: 800 }
				break
		}
		return Bounds.reduce(Bounds.fromSize(size), page.margin)
	}
}
