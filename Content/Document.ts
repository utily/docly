import { Canvas } from "../Canvas/Canvas"
import { Style } from "../Style"

export class Document {
	canvas: Canvas
	style: Style
	constructor() {
		this.style = {
			page: { size: "a4", margin: { top: 20, left: 20, bottom: 20, right: 20 } },
			fonts: {
				ubuntu: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf",
				ubuntuBold: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf",
			},
			font: { name: "ubuntu", size: 10 },
			header: {
				font: { name: "ubuntu", size: 16 },
			},
			emphasize: {
				font: { name: "ubuntuBold", size: 10 },
			},
			paragraph: { font: { name: "ubuntu", size: 10 } },
		}

		this.createCanvas()
	}

	async createCanvas() {
		this.canvas = await Canvas.create(this.style)
	}

	takeInput(string: string) {
		//What structure will come here?
	}
}
