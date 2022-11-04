import { Canvas } from "./Canvas"
import { Node } from "./Node"

export abstract class Block extends Node {
	abstract getOperations(canvas: Canvas, options: Canvas.Options): Canvas.Line[]
}
