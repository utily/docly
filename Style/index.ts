import { Color as StyleColor } from "./Color"
import { Page as StylePage } from "./Page"
import { Text as StyleText } from "./Text"

export interface Style extends Style.Color, Style.Text {
	page: Style.Page
	fonts: Record<string, string>
	paragraph?: Style.Text & Style.Color
	emphasize?: Style.Text & Style.Color
	header?: Style.Text & Style.Color
}

export namespace Style {
	export type Color = StyleColor
	export type Page = StylePage
	export type Text = StyleText
}
