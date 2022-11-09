import { Operation } from "./Canvas"
import { Node } from "./Node"

export abstract class Inline extends Node {
	abstract getOperations(canvas: Operation, options: Operation.Options): Operation.Inline[]
}
