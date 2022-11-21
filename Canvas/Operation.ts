import { Bounds } from "../Bounds"
import { Context } from "./Context"

export abstract class Operation {
	constructor(protected readonly context: Context, readonly bounds: Readonly<Bounds>) {}
}
