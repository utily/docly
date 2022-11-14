import { Bounds } from "../Bounds"
import { Canvas } from "../Canvas/Canvas"
import { Line } from "../Canvas/Line"
import { Node } from "./Node"

export abstract class Block extends Node {
	abstract getOperations(canvas: Canvas): Line[]
	abstract createBounds(): Bounds
}
