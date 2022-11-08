import { Size } from "../Size"
import { Context } from "./Context"

export abstract class Operation {
	constructor(protected readonly context: Context, readonly size: Readonly<Size>) {}
	abstract render(): [number, number]
}

export namespace Operation {
	export type Type = "text" | "line"
}
