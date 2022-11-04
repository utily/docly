import { Context } from "./Context"
import { Size } from "./Size"

export abstract class Operation {
	constructor(protected readonly context: Context, readonly size: Readonly<Size>) {}
	abstract render(): void
}

export namespace Operation {
	export type Type = "text" | "line"
}
