/**
 *
 * @description Vector
 *
 * @author C. M. de Picciotto <cmdepicciotto@gmail.com>
 *
 * {@link https://www.youtube.com/watch?v=nzyOCd9FcCA&ab_channel=RaduMariescu-Istodor}
 *
 * @todo Add the possibility to define the vector with its polar coordinates. In this case, the polar and cartesian coordinates will be properties of the vector so, it will be important to consider that a change in one of these properties will cause a change in the other properties (for example, if a new direction is defined, the cartesian coordinates should also be updated)
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
     * @public
     *
     */
    getDirection() {
        return Math.atan2(this.y, this.x);
    }

    /**
     *
     * Get magnitude
     *
     * @returns {Number}
     *
     * @public
     *
     */
    getMagnitude() {
        return Math.hypot(this.x, this.y);
    }

    /**
     *
     * Add
     *
     * @param {Vector} vector
     *
     * @returns void
     *
     * @public
     *
     * @note Maybe, it is much more practical to return a new instance of the vector when performing the operation (as would happen if it is implemented as operator overloading), but I feel like it's not as descriptive as updating the current instance
     *
     */
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    /**
     *
     * Subtract
     *
     * @param {Vector} vector
     *
     * @returns void
     *
     * @note Maybe, it is much more practical to return a new instance of the vector when performing the operation (as would happen if it is implemented as operator overloading), but I feel like it's not as descriptive as updating the current instance
     *
     */
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    /**
     *
     * Scale
     *
     * @param {Number} scalar
     *
     * @returns {void}
     *
     * @note Maybe, it is much more practical to return a new instance of the vector when performing the operation (as would happen if it is implemented as operator overloading), but I feel like it's not as descriptive as updating the current instance
     *
     */
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    /**
     *
     * Normalize
     *
     * @returns {void}
     *
     * @note Maybe, it is much more practical to return a new instance of the vector when performing the operation (as would happen if it is implemented as operator overloading), but I feel like it's not as descriptive as updating the current instance
     *
     */
    normalize() {
        this.scale(1/this.getMagnitude());
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
}