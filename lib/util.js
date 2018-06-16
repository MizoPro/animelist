/*!
 * util.js
 * utility and enumeration helper module
 * @{author} MizoPro
 */

const TYPES = [
	"TV Series",
	"Movie",
	"OVA",
	"ONA",
	"Music"
];

const GENRES = {
	1: "Action",
	2: "Adventure",
	3: "Cars",
	4: "Comedy",
	5: "Demons",
	6: "Drama",
	7: "Dementia",
	8: "Ecchi",
	9: "Fantasy",
	10: "Game",
	11: "Harem",
	12: "Hentai",
	13: "Historical",
	14: "Horror",
	15: "Josei",
	16: "Kids",
	17: "Magic",
	18: "Martial Arts",
	19: "Mecha",
	20: "Military",
	21: "Music",
	22: "Mystery",
	23: "Parody",
	24: "Police",
	25: "Psychological",
	26: "Romance",
	27: "Samurai",
	28: "School",
	29: "Sci-Fi",
	30: "Seinen",
	31: "Shoujo",
	32: "Shoujo Ai",
	33: "Shounen",
	34: "Shounen Ai",
	35: "Slice-of-Life",
	36: "Space",
	37: "Sports",
	38: "Super Power",
	39: "Supernatural",
	40: "Thriller",
	41: "Vampire",
	42: "Yaoi",
	43: "Yuri"
};

const NA = "Unkown";

function _isType(i, a) {
	a = a.type || a;
	return (typeof a === "string") ?
		a == TYPES[i] : a === i;
}

module.exports = {

	/**
	 * Anime type enumeration
	 * based on MyAnimeList.
	 * @param t index of type
	 * @return {String} title of type
	 */
	type: (t) => {
		return (typeof t === "string") ?
			t :
			TYPES[t] || NA;
	},

	/**
	 * Anime genre enumeration
	 * based on MyAnimeList.
	 * @param g index of genre
	 * @return {String} title of genre
	 */
	genre: (g) => {
		return (typeof g === "string") ?
			g :
			GENRES[g] || NA;
	},

	/**
	 * Genres enumeration helper
	 * @param gs array of genres's indices
	 * @return {Array} genres' titles
	 */
	genres: (gs) => {
		return gs.map((g) => module.exports.genre(g));
	},

	/**
	 * Is anime of type `TV`
	 * @param a anime object or a type
	 * @return {Boolean} true if type is `TV`, otherwise false
	 */
	isTV: (a) => _isType(0, a),

	/**
	 * Is anime of type `MOVIE`
	 * @param a anime object or a type
	 * @return {Boolean} true if type is `MOVIE`, otherwise false
	 */
	isMovie: (a) => _isType(1, a),

	/**
	 * Is anime of type `OVA`
	 * @param a anime object or a type
	 * @return {Boolean} true if type is `OVA`, otherwise false
	 */
	isOVA: (a) => _isType(2, a),

	/**
	 * Is anime of type `ONA`
	 * @param a anime object or a type
	 * @return {Boolean} true if type is `ONA`, otherwise false
	 */
	isONA: (a) => _isType(3, a),

	/**
	 * Is anime of type `MUSIC`
	 * @param a anime object or a type
	 * @return {Boolean} true if type is `MUSIC`, otherwise false
	 */
	isMusic: (a) => _isType(4, a),

	/**
	 * Hash a number to a unique `id`
	 * used in `db.Database` class
	 * to identify elements
	 * @param n {Number} number to hash
	 * @return {Number} hash result
	 */
	hashCode: (n) => {
		return n + 1;
	},

	/**
	 * Unhash an already hashed code
	 * the inverse of `hashCode` function
	 * @param n {Number} hash code
	 * @return {Number} original number
	 */
	unhashCode: (n) => {
		return n - 1;
	},

	/**
	 * `Unkown` constant
	 */
	NA: NA
};