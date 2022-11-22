import { Bounds } from "../Bounds"
import { Block as OperationBlock } from "../Canvas/Block"
import { Context } from "../Canvas/Context"
import { Node } from "./Node"

export abstract class Block extends Node {
	abstract bounds: Bounds
	abstract offset: number
	abstract getOperations(context: Context): OperationBlock
	abstract createBounds(): Bounds
}
