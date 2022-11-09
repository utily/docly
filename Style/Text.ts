import { Font } from "./Font"

export interface Text {
	font?: Font
}

export namespace Text {
	export function merge(style: Text | undefined, changes: Text | undefined): Text | undefined {
		const font = Font.merge(style?.font, changes?.font)
		return !style ? changes : !changes ? style : font && { font }
	}
}
