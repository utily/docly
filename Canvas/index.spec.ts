import "isomorphic-fetch"
import { toMatchFile } from "jest-file-snapshot"
import path from "path"
import { Style } from "../Style"
import { Canvas } from "./index"
expect.extend({ toMatchFile })

describe("docly.Operation", () => {
	it.skip("simple", async () => {
		const style: Style = {
			page: { size: "a4", margins: { top: 200, bottom: 25, left: 100, right: 25 } },
			fonts: { ubuntu: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf" },
			font: { name: "ubuntu", size: 10 },
			header: {
				font: { size: 16 },
			},
			emphasize: {
				font: { weight: "bold" },
			},
		}

		const canvas = await Canvas.create(style)
		const options = Canvas.Options.create(style)
		canvas.render([
			canvas.create("line", [canvas.create("text", "Header", options.modify(style.header))]),
			canvas.create("line", [
				canvas.create("text", "This is the power of Attraction1. ", options.modify(style.paragraph)),
				canvas.create("text", "This is the power of Attraction2. ", options.modify(style.paragraph)),
				canvas.create("text", "This is the power of Attraction3. ", options.modify(style.paragraph)),
				canvas.create("text", "This is the power of Attraction4.", options.modify(style.paragraph)),
			]),
			canvas.create("line", [
				canvas.create("text", "This is supposed to be the text that comes first.", options.modify(style.paragraph)),
			]),
			canvas.create("line", [
				canvas.create("text", "This is supposed to be the text that comes last.", options.modify(style.paragraph)),
			]),
			canvas.create("line", [
				canvas.create(
					"text",
					"This is supposed to be the text that comes last for real.",
					options.modify(style.paragraph)
				),
			]),
		])

		canvas.meta.title = "The Power of Attraction"

		expect(await canvas.export()).toMatchFile(path.join(__dirname, "test", "simple.pdf"))
	})
})
