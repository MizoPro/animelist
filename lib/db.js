/*!
 * db.js
 * database managment tool
 * @author MizoPro
 */

/**
 * An Array of anime objects
 * 
 */
class AnimeCollection extends Array
{
	constructor (...db)
	{
		super(...db);
	}

	findById (id)
	{
		return this.filter(anime => anime.id === parseInt(id))[0] || null;
	}

	filterByType (type)
	{
		type = type.toLowerCase();
		const filtered = this.filter(anime => anime.type.toLowerCase() == type);
		return filtered;
	}

	getRandomId (filter)
	{
		return this.getRandom(filter).id;
	}

	getRandom (filter)
	{
		const collection = (typeof filter === "function") ? this.filter(filter) : this;
		return collection[Math.floor(Math.random() * collection.length)];
	}

	sortByTitle()
	{
		return this.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
	}

	sortByScore()
	{
		return this.sort((a, b) => {
			const x = a.score.value, y = b.score.value;
			return (x && y ? (x === y ? a.title.toLowerCase().localeCompare(b.title.toLowerCase()) : y - x ) : (x ? -1 : (y ? 1 : 0)));
		});
	}

	get tv ()
	{
		return this.filterByType('tv');
	}

	get ova ()
	{
		return this.filterByType('ova');
	}

	get movie ()
	{
		return this.filterByType('movie');
	}

	get ona ()
	{
		return this.filterByType('ona');
	}

	get special ()
	{
		return this.filterByType('special');
	}

	get music ()
	{
		return this.filterByType('music');
	}

}

/**
 * Module exports
 * @api public
 */

module.exports.AnimeCollection = AnimeCollection;