import "isomorphic-fetch"
import { toMatchFile } from "jest-file-snapshot"
import path from "path"
import { DefinitionList } from "../DefinitionList"
import { Paragraph } from "../Paragraph"
import { Style } from "../Style"
import { Operation } from "./index"

expect.extend({ toMatchFile })

describe("docly.Operation", () => {
	it("simple", async () => {
		const style: Style = {
			page: { size: "a4" },
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

		const defTest: DefinitionList = new DefinitionList(["author", "Tobias Liljeblad"])

		const canvas = await Operation.create(style)

		const options = Operation.Options.create(style)

		const lineArray: Operation.Line[] = []

		const newText =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis elit nec enim egestas pellentesque. Duis odio erat, ultrices sit amet pellentesque non, euismod sed quam. Pellentesque eu ligula elementum, aliquet risus non, porta magna. Quisque tincidunt ex in nulla tempus, vel pharetra quam mattis. Sed nec quam semper, rutrum tortor vulputate, aliquet risus. Vestibulum nec porttitor orci. Phasellus pulvinar, ipsum sed tristique suscipit, sem lorem interdum leo, nec pellentesque dolor dui a lorem. Etiam sit amet sem sit amet ipsum consequat pellentesque vitae tempor mi. Pellentesque laoreet lobortis sapien ut placerat. In sed neque nibh. Aenean a scelerisque diam. Aliquam tempor efficitur turpis, quis interdum enim commodo a. Nam euismod, elit vel tincidunt ultricies, nulla justo facilisis massa, sed ullamcorper erat enim et purus. Vivamus imperdiet nibh a lectus suscipit hendrerit id ac velit. Pellentesque non ligula ac tellus imperdiet accumsan. "
		for (const textLine of canvas.breakIntoLines(newText, options)) {
			lineArray.push(canvas.create("line", [textLine]))
		}

		// const paragraph: Paragraph = new Paragraph(newText)

		canvas.render(defTest.getOperations(canvas, options.modify()))
		canvas.render(lineArray)

		canvas.meta.title = "The Power of Attraction"

		expect(await canvas.export()).toMatchFile(path.join(__dirname, "test", "simple.pdf"))
		expect(canvas.meta.title).toBe("The Power of Attraction")
	})
})
