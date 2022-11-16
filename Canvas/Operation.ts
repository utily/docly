import { Size } from "../Datastructure/Size"
import { Context } from "./Context"

export abstract class Operation {
	constructor(protected readonly context: Context, readonly size: Readonly<Size>) {}
}
