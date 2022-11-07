import { Style } from "./Style"

export abstract class Node {
	style?: Style.Text & Style.Color & { margin?: Style.Margin }
}
