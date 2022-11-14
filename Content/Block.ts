import { Canvas } from "./Canvas"
import { Node } from "./Node"

export abstract class Block extends Node {
	abstract getOperations(context: Canvas.Context): Canvas.Line[]
}
