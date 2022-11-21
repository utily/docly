import { Bounds } from "../Bounds"
import { Context } from "./Context"
import { Operation } from "./Operation"
import { Row } from "./Row"

export class Block extends Operation {
	constructor(public context: Context, public bounds: Bounds, readonly content: string | Row[]) {
		super(context, bounds)
	}
}

/**
 * Så en block kommer in till render
 * REnder tittar vad som finns, kallas render igen på blocket,
 * får då minsre bounds, tittar igen
 * får content, SKRIVER content utifrån bounds,
 *
 */

/**
 * Skapandet:
 * for Paragraf:
 *Will be different. Break into lines might still be useful .

 */
