import { Context } from "./Canvas/Context"
import { Node } from "./Node"

export abstract class Inline extends Node {
	abstract getOperations(context: Context): void
}
