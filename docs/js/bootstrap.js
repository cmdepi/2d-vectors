/**
 *
 * @description Bootstrap
 *
 * @author C. M. de Picciotto <cmdepicciotto@gmail.com>
 *
 * {@link https://www.youtube.com/watch?v=nzyOCd9FcCA&ab_channel=RaduMariescu-Istodor}
 *
 */
import GraphicVector         from 'https://cdn.jsdelivr.net/gh/cmdepi/2d-vectors@master/src/canvas/coordinate-system/graphic-vector.js';
import GraphicVectorRenderer from 'https://cdn.jsdelivr.net/gh/cmdepi/2d-vectors@master/src/canvas/coordinate-system/renderer/graphic-vector-renderer.js';
import CoordinateSystem      from 'https://cdn.jsdelivr.net/gh/cmdepi/2d-vectors@master/src/canvas/coordinate-system.js';

export default class Bootstrap {
    /**
     *
     * @type {HTMLCanvasElement}
     *
     */
    #canvas;

    /**
     *
     * @type {GraphicVector}
     *
     */
    #point;

    /**
     *
     * @type {GraphicVector}
     *
     */
    #G;

    /**
     *
     * @type {CanvasRenderingContext2D}
     *
     */
    #context;

    /**
     *
     * @type {Object}
     *
     */
    #offset;

    /**
     *
     * @type {CoordinateSystem}
     *
     */
    #coordinateSystem;

    /**
     *
     * @type {GraphicVector[]}
     *
     */
    #vectors;

    /**
     *
     * Constructor
     *
     * @param {HTMLCanvasElement} canvas
     *
     */
    constructor(canvas) {
        this.#canvas = canvas;
        this.#initSampleVectors();
        this.#initOffset();
        this.#initContext();
        this.#initCoordinateSystem();
        this.#initEvents();
    }

    /**
     *
     * Run
     *
     * @returns {void}
     *
     */
    run() {
        /**
         *
         * @note Init vectors to render
         *
         */
        this.#vectors = [];

        /**
         *
         * @note Add vectors
         *
         */
        const resultAdd = this.#add()

        /**
         *
         * @note Subtract vectors
         *
         */
        this.#subtract()

        /**
         *
         * @note Subtract vectors. Move result to subtrahend tail
         *
         */
        this.#subtract().moveToTail(this.#G);

        /**
         *
         * @note Scale vector
         *
         */
        this.#scale();

        /**
         *
         * @note Add init vectors
         *
         */
        this.#vectors.push(this.#point);
        this.#vectors.push(this.#G);

        /**
         *
         * @note Draw coordinate system
         *
         */
        this.#drawCoordinateSystem();

        /**
         *
         * @note Draw parallelogram rule
         *
         */
        this.#drawParallelogram(resultAdd);
    }

    /**
     *
     * Add
     *
     * @returns {GraphicVector}
     *
     */
    #add() {
        const resultAdd = this.#point.add(this.#G);
        this.#addVector(resultAdd);
        return resultAdd;
    }

    /**
     *
     * Subtract
     *
     * @returns {GraphicVector}
     *
     */
    #subtract() {
        /**
         *
         * @note Subtract vectors
         *
         */
        const resultSub = this.#point.subtract(this.#G);
        this.#addVector(resultSub);
        return resultSub;
    }

    /**
     *
     * Scale
     *
     * @returns {GraphicVector}
     *
     */
    #scale() {
        const resultSub = this.#subtract();
        const scaledSub = resultSub.normalize().scale(50);
        this.#addVector(scaledSub);
        return scaledSub;
    }

    /**
     *
     * Draw coordinate system
     *
     * @returns {void}
     *
     */
    #drawCoordinateSystem() {
        this.#coordinateSystem.addVectors(this.#vectors);
        this.#coordinateSystem.draw();
    }

    /**
     *
     * Draw parallelogram rule
     *
     * @param {GraphicVector} resultAdd
     *
     * @returns {void}
     *
     */
    #drawParallelogram(resultAdd) {
        this.#context.beginPath();
        this.#context.setLineDash([3,3]);
        this.#context.moveTo(this.#G.x, this.#G.y);
        this.#context.lineTo(resultAdd.x,resultAdd.y);
        this.#context.lineTo(this.#point.x, this.#point.y);
        this.#context.stroke();
        this.#context.setLineDash([]);
    }

    /**
     *
     * Init sample vectors to run examples
     *
     * @returns void
     *
     */
    #initSampleVectors() {
        this.#point = new GraphicVector(90, 120);
        this.#G     = new GraphicVector(20, 50);
    }

    /**
     *
     * Init offset
     *
     * @returns {void}
     *
     */
    #initOffset() {
        this.#offset = {
            x: this.#canvas.width/2,
            y: this.#canvas.height/2
        }
    }

    /**
     *
     * Init context
     *
     * @returns {void}
     *
     */
    #initContext() {
        this.#context = this.#canvas.getContext("2d");
    }

    /**
     *
     * Init coordinate system
     *
     * @returns {void}
     *
     */
    #initCoordinateSystem() {
        /**
         *
         * @note Init coordinate system
         *
         */
        const vectorRenderer   = new GraphicVectorRenderer(this.#context);
        this.#coordinateSystem = new CoordinateSystem(this.#context, vectorRenderer, this.#offset.x, this.#offset.y);
    }

    /**
     *
     * Init events
     *
     * @returns {void}
     *
     */
    #initEvents() {
        document.onmousemove = (event) => {
            this.#point.x = event.x - this.#offset.x;
            this.#point.y = event.y - this.#offset.y;
            this.run();
        }
    }

    /**
     *
     * Add vector
     *
     * @param {GraphicVector} vector
     *
     * @returns {void}
     *
     */
    #addVector(vector) {
        vector.color = 'red';
        this.#vectors.push(vector);
    }
}