import { Block } from "./Block"
import { Operation } from "./Canvas"

export class Header extends Block {
	getOperations(canvas: Operation, options: Operation.Options): Operation.Line[] {
		throw new Error("Method not implemented.")
	}
}
