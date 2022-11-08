import { Margin as StyleMargin } from "../Margin"
import { Color as StyleColor } from "./Color"
import { Page as StylePage } from "./Page"
import { Text as StyleText } from "./Text"

export interface Style extends Style.Color, Style.Text {
	page: Style.Page
	fonts: Record<string, string>
	paragraph?: Style.Text & Style.Color & { margin?: Style.Margin }
	emphasize?: Style.Text & Style.Color & { margin?: Style.Margin }
	header?: Style.Text & Style.Color & { margin?: Style.Margin }
}

export namespace Style {
	export type Color = StyleColor
	export type Margin = StyleMargin
	export type Page = StylePage
	export const Page = StylePage
	export type Text = StyleText
}
