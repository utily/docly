import { Bounds } from "../Bounds"
import { Size } from "../Datastructure"
import { Context } from "./Context"

export abstract class Operation {
	constructor(protected readonly context: Context, readonly bounds: Readonly<Bounds>) {}
}
