interface Cell {
	data: string | undefined
}
interface Row {
	cells: Cell[]
}
export interface Table {
	header: Row
	body: Row[]
	footer?: Row[]
}

/**
 * For every column
 * create line( with text[columnt[i].data{i}])
 */
