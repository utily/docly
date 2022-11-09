import { Block } from "./Block"
import { Operation } from "./Canvas"
import { MetaData } from "./MetaData"
import { Style } from "./Style"

export class Document {
	constructor(readonly content: Block[], readonly meta: Readonly<MetaData>) {}
	async render(style: Style): Promise<Uint8Array> {
		const result = await Operation.create(style)
		const options = Operation.Options.create(style)
		for (const block of this.content)
			result.render(block.getOperations(result, options))
		return await result.export()
	}
}
