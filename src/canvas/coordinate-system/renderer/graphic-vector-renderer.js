/**
 *
 * @description Vector renderer
 *
 * @author C. M. de Picciotto <cmdepicciotto@gmail.com>
 *
 * {@link https://www.youtube.com/watch?v=nzyOCd9FcCA&ab_channel=RaduMariescu-Istodor}
 *
 */
import GraphicVector from '../graphic-vector.js'

export default class GraphicVectorRenderer {
    /**
     *
     * @type {CanvasRenderingContext2D}
     *
     */
    #context;

    /**
     *
     * @type {Number}
     *
     */
    #arrowSize;

    /**
     *
     * Constructor
     *
     * @param {CanvasRenderingContext2D} context
     * @param {Number}                   arrowSize
     *
     */
    constructor(context, arrowSize= 20) {
        this.#context   = context;
        this.#arrowSize = arrowSize;
    }

    /**
     *
     * Render
     *
     * @param {GraphicVector} vector
     *
     * @returns {void}
     *
     */
    render(vector) {
        /**
         *
         * @note Create left & right arrow components
         *
         */
        const vectorDir  = vector.getDirection();
        const leftArrow  = this.#createArrowComponent(vector, vectorDir + Math.PI * 0.8);
        const rightArrow = this.#createArrowComponent(vector, vectorDir - Math.PI * 0.8);

        /**
         *
         * @note Draw arrow
         *
         */
        this.#context.save();
        this.#context.strokeStyle = vector.color;
        this.#context.fillStyle   = vector.color;
        this.#context.beginPath();
        this.#context.moveTo(vector.tailX, vector.tailY);
        this.#context.lineTo(vector.x, vector.y);
        this.#context.moveTo(vector.x, vector.y);
        this.#context.lineTo(leftArrow.x,leftArrow.y);
        this.#context.lineTo(rightArrow.x,rightArrow.y);
        this.#context.closePath();
        this.#context.stroke();
        this.#context.fill();
        this.#context.restore();
    }

    /**
     *
     * Create arrow component
     *
     * @param {GraphicVector} vector
     * @param {Number}        direction
     *
     * @returns {Vector}
     *
     */
    #createArrowComponent(vector, direction) {
        const arrowComponent = new GraphicVector(vector.x, vector.y);
        arrowComponent.setDirection(direction);
        arrowComponent.setMagnitude(this.#arrowSize/2);
        return vector.add(arrowComponent);
    }
}