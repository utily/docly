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

