interface Bound {
	x: number
	y: number
	width: number
	height: number
}

interface Row {
	blocks: Block[]
	heightOffset: number // pre calculated from previous rows highest block. 0 if first row
}

interface Content {
	text: string
}

interface Block {
	bound: Bound
	content: Content | Row[]
	constructor: (blocks: Block[] | content) => void
}

function draw(content: Content, bound: Bound) {
	console.log(content.text)
}

function render(blocks: Block[], bound: Bound) {
	for (const block of blocks) {
		const x = block.bound.x
		if (Array.isArray(block.content)) {
			for (const row of block.content) {
				const y = block.bound.y + row.heightOffset
				render(row.blocks, { x: x, y: y, width: block.bound.width, height: block.bound.height })
			}
		} else {
			draw(block.content, bound)
		}
	}
}
