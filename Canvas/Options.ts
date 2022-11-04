import { Style } from "../Style"

export class Options {
	private constructor(readonly font: { readonly name: string; readonly size: number }) {}
	modify(style: Style.Text & Style.Color = {}): Options {
		return new Options(this.font) // TODO: merge in new style
	}
	static create(style: Style) {
		return new Options({ name: style.font?.name ?? "default", size: style.font?.size ?? 12 })
	}
}
