import { Block } from "./Block"
import { Operation } from "./Operation"

export class Header extends Block {
	getOperations(canvas: Operation, options: Operation.Options): Operation.Line[] {
		throw new Error("Method not implemented.")
	}
}
