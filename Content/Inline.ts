import { Bounds } from "../Bounds"
import { Context } from "../Canvas/Context"
import { Line } from "../Canvas/Line"
import { Node } from "./Node"

export abstract class Inline extends Node {
	abstract getOperations(context: Context): Line[]
	abstract createBounds(): Bounds
}
