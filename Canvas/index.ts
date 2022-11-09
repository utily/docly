import { Canvas as Implementation } from "./Canvas"
import { Context as CanvasContext } from "./Context"
import { Inline as CanvasInline } from "./Inline"
import { Line as CanvasLine } from "./Line"
import { Text as CanvasText } from "./Text"

export type Canvas = Implementation
export const Canvas = Implementation

export namespace Canvas {
	export type Context = CanvasContext
	export type Operation = Text | Line
	export type Text = CanvasText
	export type Line = CanvasLine
	export type Inline = CanvasInline
}
