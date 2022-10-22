const _HublField = require('./_HublField');
const { transformDataToJson } = require('../../src/lib/FieldTransformer')

module.exports = class Group extends _HublField {


    /**
     * Return group as JSON. Used in Transform process.
	 * @private
     */
	toJSON() {
		this.data.children = transformDataToJson(this.data.children)
        return this.data
    }

}
