import { Style } from "../Style"

export class Options {
	private constructor(readonly font: { readonly name: string; readonly size: number }, readonly margin: Style.Margin) {}
	modify(style: Style.Text & Style.Color & { margin?: Style.Margin } = {}): Options {
		return new Options(
			style.font?.name && style.font.size ? { name: style.font.name, size: style.font.size } : this.font,
			style.margin ?? { left: 0, right: 0, top: 0, bottom: 0 }
		)
	}

	static create(style: Style) {
		return new Options(
			{ name: style.font?.name ?? "default", size: style.font?.size ?? 12 },
			{ left: 0, right: 0, top: 0, bottom: 0 }
		)
	}
}
