import { Canvas } from "./Canvas"
import { Node } from "./Node"

export abstract class Inline extends Node {
	abstract getOperations(canvas: Canvas, options: Canvas.Options): Canvas.Inline[]
}
