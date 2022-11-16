import { Margin } from "../Datastructure/Margin"
import { Color } from "./Color"
import { Text } from "./Text"

export interface Block extends Color, Text {
	margin?: Margin
}

export namespace Block {
	export function merge(style: Block | undefined, changes: Block | undefined): Block | undefined {
		return !style
			? changes
			: !changes
			? style
			: (({ margin, ...rest }) => (margin ? { margin, ...rest } : rest))({
					margin: changes.margin ?? style.margin,
					...Color.merge(style, changes),
					...Text.merge(style, changes),
			  })
	}
}
