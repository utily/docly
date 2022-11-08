import { Margin } from "./Margin"
import { Size } from "./Size"

export interface Bounds {
	left: number
	top: number
	width: number
	height: number
}

export namespace Bounds {
	export function fromSize(size: Size): Bounds {
		return { left: 0, top: 0, ...size }
	}
	export function reduce(bounds: Bounds, margin: Margin | undefined): Bounds {
		return {
			left: bounds.left + (margin?.left ?? 0),
			top: bounds.top + (margin?.top ?? 0),
			width: bounds.width - (margin?.left ?? 0) - (margin?.right ?? 0),
			height: bounds.height - (margin?.top ?? 0) - (margin?.bottom ?? 0),
		}
	}
}
