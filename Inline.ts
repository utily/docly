import { Node } from "./Node"
import { Operation } from "./Operation"

export abstract class Inline extends Node {
	abstract getOperations(canvas: Operation, options: Operation.Options): Operation.Inline[]
}
