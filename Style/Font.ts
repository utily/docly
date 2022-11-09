export interface Font {
	name?: string
	size?: number
}

export namespace Font {
	export function merge(style: Font | undefined, changes: Font | undefined): Font | undefined {
		return !style ? changes : !changes ? style : { ...style, ...changes }
	}
}
