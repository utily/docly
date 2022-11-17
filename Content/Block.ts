import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import { Node } from "./Node"

export abstract class Block extends Node {
	abstract bounds: Bounds
	abstract getOperations(context: Context): Line[]
	abstract createBounds(): Bounds
}
