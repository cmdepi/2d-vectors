/**
 *
 * @description Coordinate system
 *
 * @author C. M. de Picciotto <cmdepicciotto@gmail.com>
 *
 * {@link https://www.youtube.com/watch?v=nzyOCd9FcCA&ab_channel=RaduMariescu-Istodor}
 *
 */
export default class CoordinateSystem {
    /**
     *
     * @type {CanvasRenderingContext2D}
     *
     */
    #context;

    /**
     *
     * @type {GraphicVectorRenderer}
     *
     */
    #vectorRenderer;

    /**
     *
     * @type {Number}
     *
     */
    #originX;

    /**
     *
     * @type {Number}
     *
     */
    #originY;

    /**
     *
     * @type {String}
     *
     */
    #axisColor;

    /**
     *
     * @type {Number}
     *
     */
    #axisWidth;

    /**
     *
     * @type {[]}
     *
     */
    #axisDashStyle;

    /**
     *
     * @type {GraphicVector[]}
     *
     */
    #vectors = []

    /**
     *
     * Constructor
     *
     * @param {CanvasRenderingContext2D} context
     * @param {GraphicVectorRenderer}    vectorRenderer
     * @param {Number}                   originX
     * @param {Number}                   originY
     * @param {String}                   axisColor
     * @param {Number}                   axisWidth
     * @param {[]}                       axisDashStyle
     *
     * @note The class uses to render vectors is implemented as a constructor parameter just to allow the use of different alternatives of vector renderers (DI pattern)
     *
     */
    constructor(context, vectorRenderer, originX, originY, axisColor = 'red', axisWidth = 2, axisDashStyle = [5, 4]) {
        this.#context        = context;
        this.#vectorRenderer = vectorRenderer;
        this.#originX        = originX;
        this.#originY        = originY;
        this.#axisColor      = axisColor;
        this.#axisWidth      = axisWidth;
        this.#axisDashStyle  = axisDashStyle;
        this.#setup();
    }

    /**
     *
     * Add vectors
     *
     * @param {GraphicVector[]} vectors
     *
     * @returns {void}
     *
     */
    addVectors(vectors) {
        this.#vectors = vectors;
    }

    /**
     *
     * Draw
     *
     * @returns {void}
     *
     */
    draw() {
        /**
         *
         * @note Clear canvas
         *
         */
        this.#context.clearRect(-this.#originX, -this.#originY, this.#context.canvas.width, this.#context.canvas.height);

        /**
         *
         * @note Draw coordinate system
         *
         */
        this.#drawCoordinateSystem();

        /**
         *
         * @note Draw vectors
         *
         */
        this.#drawVectors();
    }

    /**
     *
     * Draw vectors
     *
     * @returns {void}
     *
     */
    #drawVectors() {
        this.#vectors.forEach(vector => this.#vectorRenderer.render(vector));
    }

    /**
     *
     * Draw coordinate system
     *
     * @returns {void}
     *
     */
    #drawCoordinateSystem() {
        /**
         *
         * @note Init path
         *
         */
        this.#context.beginPath();

        /**
         *
         * @note Draw x-axis
         *
         */
        this.#context.moveTo(-this.#originX,0);
        this.#context.lineTo(this.#context.canvas.width - this.#originX,0);

        /**
         *
         * @note Draw y-axis
         *
         */
        this.#context.moveTo(0, -this.#originY);
        this.#context.lineTo(0,this.#context.canvas.height - this.#originY);

        /**
         *
         * @note Draw
         *
         */
        this.#context.strokeStyle = this.#axisColor;
        this.#context.lineWidth   = this.#axisWidth;
        this.#context.setLineDash(this.#axisDashStyle);
        this.#context.stroke();
        this.#context.setLineDash([]);
    }

    /**
     *
     * Setup coordinate system
     *
     * @returns {void}
     *
     */
    #setup() {
        this.#context.translate(this.#originX, this.#originY);
    }
}