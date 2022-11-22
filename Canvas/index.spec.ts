import "isomorphic-fetch"
import { toMatchFile } from "jest-file-snapshot"
import path from "path"
import { Bounds } from "../Bounds"
import { DefinitionList } from "../Content/DefinitionList"
import { Paragraph } from "../Content/Paragraph"
import { Table } from "../Content/Table"
import * as structure from "../Datastructure"
import { Style } from "../Style"
import { Canvas } from "./index"

expect.extend({ toMatchFile })

describe("docly.Operation", () => {
	const style: Style = {
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

	const style2: Style = {
		page: { size: "a4", margin: { top: 20, left: 20, bottom: 20, right: 20 } },
		fonts: {
			ubuntu: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf",
			ubuntuBold: "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf",
		},
		font: { name: "ubuntuBold", size: 20 },
	}

	const definitionListInvoices: structure.DefinitionList = {
		header: "Invoices",
		values: [
			{ name: "AbraCadabra AB", content: ["Ett", "Två", "tre"] },
			{ name: "Bahuuuba AB", content: ["fyra", "fem", "sex"] },
		],
	}

	const testTable: structure.Table = {
		header: {
			cells: [
				{ data: "Name" },
				{ data: "Car" },
				{ data: "Colour" },
				{ data: "Football Team" },
				{ data: "Football Team" },
				{ data: "Football Team" },
			],
		},
		body: [
			{ cells: [{ data: "Tobias" }, { data: "Alexandra" }, { data: "Ellenor" }, { data: "William" }] },
			{ cells: [{ data: "Saab" }, { data: "Volvo" }, { data: "Brio" }, { data: "Brio" }] },
			{ cells: [{ data: "Green" }, { data: "Blue" }, { data: "Pink" }, { data: "Orange" }] },
			{ cells: [{ data: "Arsenal" }, { data: "Arsenal" }, { data: "Arsenal" }, { data: "Arsenal" }] },
			{ cells: [{ data: "Arsenal" }, { data: "Arsenal" }, { data: "Arsenal" }, { data: "Arsenal" }] },
			{ cells: [{ data: "Arsenal" }, { data: "Arsenal" }, { data: "Arsenal" }, { data: "Arsenal" }] },
		],
	}

	const newText =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis elit nec enim egestas pellentesque. Duis odio erat, ultrices sit amet pellentesque non, euismod sed quam. Pellentesque eu ligula elementum, aliquet risus non, porta magna. Quisque tincidunt ex in nulla tempus, vel pharetra quam mattis. Sed nec quam semper, rutrum tortor vulputate, aliquet risus. Vestibulum nec porttitor orci. Phasellus pulvinar, ipsum sed tristique suscipit, sem lorem interdum leo, nec pellentesque dolor dui a lorem. Etiam sit amet sem sit amet ipsum consequat pellentesque vitae tempor mi. Pellentesque laoreet lobortis sapien ut placerat. In sed neque nibh. Aenean a scelerisque diam. Aliquam tempor efficitur turpis, quis interdum enim commodo a. Nam euismod, elit vel tincidunt ultricies, nulla justo facilisis massa, sed ullamcorper erat enim et purus. Vivamus imperdiet nibh a lectus suscipit hendrerit id ac velit. Pellentesque non ligula ac tellus imperdiet accumsan. "

	it("simple", async () => {
		const canvas = await Canvas.create(style)

		canvas.render([new Paragraph(newText, canvas.pageBounds).getOperations(canvas.context)])
		// canvas.render(new Paragraph(newText, canvas.bounds).getOperations(canvas.context.modify(style2)))
		// canvas.render(new Paragraph(newText, canvas.bounds).getOperations(canvas.context.modify(style)))
		// canvas.render(new DefinitionList(definitionListInvoices).getOperations(canvas.context))
		// canvas.render(new Table(testTable, canvas.bounds).getOperations(canvas.context))
		expect(await canvas.export({ title: "The Power of Attraction" })).toMatchFile(
			path.join(__dirname, "test", "simple.pdf")
		)
	})

	// it("breaking text", async () => {
	// 	const canvas = await Canvas.create(style)

	// 	const renderHeight = canvas.context
	// 		.breakIntoLines(newText, canvas.bounds)
	// 		.reduce((totalHeight, textHeight) => totalHeight + textHeight.size.height, 0)
	// 	const text = canvas.context.create("text", newText)
	// 	const textHeight = Math.floor(text.size.width / canvas.bounds.width) * text.size.height

	// 	expect(renderHeight).toBeGreaterThanOrEqual(textHeight)
	// })

	// it("pagination", async () => {
	// 	const canvas = await Canvas.create(style)
	// 	const result = canvas.context
	// 		.breakIntoLines(newText, canvas.bounds)
	// 		.map(line => canvas.context.create("line", [line]))

	// 	canvas.render(result)

	// 	const height: number = result.reduce((current, next) => current + next.size.height, 0)

	// 	const pages = Math.floor(height / canvas.bounds.height) + 1

	// 	expect(pages).toBe(canvas.document.getPageCount())
	// })
})
