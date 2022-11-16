import * as isoly from "isoly"

export interface MetaData {
	title?: string
	author?: string
	subject?: string
	keywords?: string[]
	created?: isoly.DateTime
	modified?: isoly.DateTime
}
