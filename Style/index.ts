import { Margin as StyleMargin } from "../Datastructure/Margin"
import { Block as StyleBlock } from "./Block"
import { Color as StyleColor } from "./Color"
import { Page as StylePage } from "./Page"
import { Text as StyleText } from "./Text"

export interface Style extends Style.Color, Style.Text {
	page: Style.Page
	fonts: Record<string, string>
	paragraph?: Style.Block
	emphasize?: Style.Block
	header?: Style.Block
}

export namespace Style {
	export type Block = StyleBlock
	export const Block = StyleBlock
	export type Color = StyleColor
	export type Margin = StyleMargin
	export type Page = StylePage
	export const Page = StylePage
	export type Text = StyleText
}
