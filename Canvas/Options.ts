import { Style } from "../Style"

export class Options {
	private constructor(readonly font: { readonly name: string; readonly size: number }) {}
	modify(style: Style.Text & Style.Color = {}): Options {
		if (style.font?.name && style.font.size) {
			const newFont = { name: style.font.name, size: style.font.size }
			return new Options(newFont)
		} else {
			return new Options(this.font)
		}

		// TODO: merge in new style
	}
	static create(style: Style) {
		return new Options({ name: style.font?.name ?? "default", size: style.font?.size ?? 12 })
	}
}
