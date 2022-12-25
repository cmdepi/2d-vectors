/**
 *
 * @description Graphic vector
 *
 * @author C. M. de Picciotto <cmdepicciotto@gmail.com>
 *
 * @note It is a vector implementation for graphical purposes
 * @note It is added tail information to be able to locate the vector in different places around the coordinate system
 *
 * {@link https://www.youtube.com/watch?v=nzyOCd9FcCA&ab_channel=RaduMariescu-Istodor}
 *
 */
import Vector from '../../vector.js'

export default class GraphicVector extends Vector {
    /**
     *
     * @type {Number}
     *
     */
    tailX;

    /**
     *
     * @type {Number}
     *
     */
    tailY;

    /**
     *
     * @type {String}
     *
     */
    color;

    /**
     *
     * Constructor
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} tailX
     * @param {Number} tailY
     * @param {String} color
     *
     */
    constructor(x, y, tailX = 0, tailY = 0, color = 'white') {
        super(x, y);
        this.tailX = tailX;
        this.tailY = tailY;
        this.color = color;
    }

    /**
     *
     * Move to vector tail
     *
     * @param {GraphicVector} vector
     *
     * @returns {void}
     *
     * @todo Analyze if it is more descriptive to include/use the vector add operation to define the new tip coordinates
     *
     */
    moveToTail(vector) {
        this.tailX  = vector.x;
        this.tailY  = vector.y;
        this.x     += vector.x;
        this.y     += vector.y;
    }

    /**
     *
     * Factory method. Create
     *
     * @param {Number} x
     * @param {Number} y
     *
     * @returns {GraphicVector}
     *
     */
    _create(x, y) {
        return new GraphicVector(x, y);
    }
}