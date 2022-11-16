export interface Table {
	name: string
	columns: { data: string[] }[]
}

interface Cell {
	data: string
}
interface Row {
	cells: Cell[]
}
export interface Table {
	header: Row[]
	body: Row[]
	footer?: Row[]
}

/**
 * For every column
 * create line( with text[columnt[i].data{i}])
 */
