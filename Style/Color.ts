export interface Color {
	color?: [number, number, number]
	opacity?: number
}

export namespace Color {
	export function merge(style: Color | undefined, changes: Color | undefined): Color | undefined {
		return !style
			? changes
			: !changes
			? style
			: (({ color, opacity }) =>
					color && opacity ? { color, opacity } : color ? { color } : opacity != undefined ? { opacity } : undefined)({
					color: changes.color ?? style.color,
					opacity: changes.opacity ?? style.opacity,
			  })
	}
}
