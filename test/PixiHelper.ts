import { Matrix } from 'pixi.js';
import { FramePart, Symbol } from '../src/common';

/**
 * Adds a few helpful methods to help with PixiJS manipulations.
 */
export class PixiHelper {
	/**
	 * Return a PixiJS Matrix using the parameters of the given object and the scale desired.
	 * @param obj Object containing the necessary parameters of a transform Matrix.
	 * @param scale Scale to apply to the matrix.
	 * @returns A PixiJS Matrix instantiated using the input and the scale.
	 */
	static matrixFromObject(obj: FramePart['transform'], scale = 1) {
		return new Matrix(obj?.a ?? 1, obj?.b ?? 0, obj?.c ?? 0, obj?.d ?? 1, (obj?.tx ?? 0) * scale, (obj?.ty ?? 0) * scale);
	}
}