/**
 *
 * @description Vector
 *
 * @author C. M. de Picciotto <cmdepicciotto@gmail.com>
 *
 * {@link https://www.youtube.com/watch?v=nzyOCd9FcCA&ab_channel=RaduMariescu-Istodor}
 *
 */
export default class Vector {
    /**
     *
     * @type {Number}
     *
     */
    x;

    /**
     *
     * @type {Number}
     *
     */
    y;

    /**
     *
     * Constructor
     *
     * @param {Number} x
     * @param {Number} y
     *
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * Get direction (angle)
     *
     * @returns {Number}
     *
     */
    getDirection() {
        return Math.atan2(this.y, this.x);
    }

    /**
     *
     * Set direction (angle)
     *
     * @param {Number} angle
     *
     * @returns {Number}
     *
     */
    setDirection(angle) {
        this.#updateCoordinates(angle, this.getMagnitude());
    }

    /**
     *
     * Get magnitude
     *
     * @returns {Number}
     *
     */
    getMagnitude() {
        return Math.hypot(this.x, this.y);
    }

    /**
     *
     * Set magnitude
     *
     * @param {Number} magnitude
     *
     * @returns {Number}
     *
     */
    setMagnitude(magnitude) {
        this.#updateCoordinates(this.getDirection(), magnitude);
    }

    /**
     *
     * Add
     *
     * @param {Vector} vector
     *
     * @returns {Vector}
     *
     * @note Return a new instance to have a similar behaviour of an operator overloading implementation
     *
     */
    add(vector) {
        return this._create(this.x + vector.x, this.y + vector.y);
    }

    /**
     *
     * Subtract
     *
     * @param {Vector} vector
     *
     * @returns {Vector}
     *
     * @note Return a new instance to have a similar behaviour of an operator overloading implementation
     *
     */
    subtract(vector) {
        return this._create(this.x - vector.x, this.y - vector.y);
    }

    /**
     *
     * Scale
     *
     * @param {Number} scalar
     *
     * @returns {Vector}
     *
     * @note Return a new instance to have a similar behaviour of an operator overloading implementation
     *
     */
    scale(scalar) {
        return this._create(this.x * scalar, this.y * scalar);
    }

    /**
     *
     * Normalize
     *
     * @returns {Vector}
     *
     * @note Return a new instance to have a similar behaviour of an operator overloading implementation
     *
     */
    normalize() {
        return this.scale(1/this.getMagnitude());
    }

    /**
     *
     * Dot product
     *
     * @param {Vector} vector
     *
     * @returns {Number}
     *
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     *
     * Factory method. Create
     *
     * @param {Number} x
     * @param {Number} y
     *
     * @returns {Vector}
     *
     */
    _create(x, y) {
        return new Vector(x, y);
    }

    /**
     *
     * Update coordinates
     *
     * @returns {void}
     *
     */
    #updateCoordinates(direction, magnitude) {
        this.x = Math.cos(direction) * magnitude;
        this.y = Math.sin(direction) * magnitude;
    }
}