/*!
 * db.js
 * database managment tool
 * @author MizoPro
 */

const util = require("./util");

module.exports = class Database {
	constructor(data) {
		this.data = data.map((elem, i) => {
			elem.id = util.hashCode(i);
			if (typeof elem.desc === "undefined") elem.desc = "";
			elem.type = util.type(elem.type);
			elem.genres = (elem.genres) ? util.genres(elem.genres) : [];
			if (typeof elem.score === "undefined") elem.score = util.NA;
			return elem;
		});
	}
	find(param, value) {
		return this.data.filter((elem) => (elem[param] == value));
	}
	findById(i) {
		if (isNaN(i)) throw new Exception("param `id` must be a number");
		return this.data[ util.unhashCode(i) ] || null;
	}
	get series() {
		return this.data.filter(util.isTV);
	}
	get movies() {
		return this.data.filter(util.isMovie);
	}
	get ovas() {
		return this.data.filter(util.isOVA);
	}
	get onas() {
		return this.data.filter(util.isONA);
	}
	get music() {
		return this.data.filter(util.isMusic);
	}
};