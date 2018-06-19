/*!
 * AnimeList
 * My local MAL Client (MyAnimeList.net) 
 * 
 * Author: MizoPro
 * Licensed under the MIT License
 * 
 */

/**
 * Module dependencies
 */

const express = require("express");
const path = require("path");

/**
 * Local modules and databases
 */

//const config = require("./lib/config.js");
const db = require("./lib/db.js");
const animedb = new db.AnimeCollection(...require("./db/anime.json")).sortByTitle();
//const characterdb = new db.CharacterCollection(...require("./db/character.json")).sortByName();

/**
 * Local variables and constants
 */

const app = express();

const PORT = process.env.PORT || 5000;

const ANIME_TYPES = {
	1: 'TV', 
	2: 'OVA', 
	3: 'Movie', 
	4: 'ONA', 
	5: 'Special', 
	6: 'Music'
};

const config = {

	TITLES_PER_PAGE: 50

};

/*
 * App metadata
 */

app.locals.title = "AnimeList";
app.locals.description = "A lightweight local anime tracker";
app.locals.author = {
	name: "MizoPro",
	email: "hmzblhdjahmd@gmail.com",
	github: "https://mizopro.github.io", 
	twitter: "https://twitter.com/MizoPro", 
	myanimelist: "https://myanimelist.net/profile/MizoPro"
};
app.locals.animedb = animedb; // For easy DB access
app.locals.ANIME_TYPES = [].map.call(Object.keys(ANIME_TYPES), t => ({
	id: t, 
	name: ANIME_TYPES[t].toLowerCase(), 
	displayName: ANIME_TYPES[t]
}));

app
	.use(express.static(path.join(__dirname, 'public')))

	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')

	.get('/', (req, res) => res.render("pages/index", {
		req: req
	}))

	.get('/about', (req, res) => res.render("pages/about", {
		req: req
	}))
	.get('/author', (req, res) => res.render("pages/author", {
		req: req
	}))

	.get('/a/', (req, res) => res.render("pages/anime_index", {
		req: req
	}))

	.get(/^\/a\/all(?:\/(tv|ova|movie|ona|special|music))?$/i, (req, res) =>
		res.render("pages/anime_all", animePagination(req))
	)

	.get(/^\/a\/top(?:\/(tv|ova|movie|ona|special|music))?$/i, (req, res) =>
		res.render("pages/anime_all", animePagination(req, 'sortByScore'))
	)

	.get(/^\/a\/random(?:\/(tv|ova|movie|ona|special|music))?/i, (req, res) =>
		res.redirect(`/a/${animedb.getRandomId((req.params[0]) ? (anime) => {
			return anime.type.toLowerCase() === req.params[0].toLowerCase();
		} : null)}`)
	)

	.get('/a/:id', (req, res) => {
		const a = animedb.findById(req.params.id);
		(a) ?
		res.render("pages/anime", {
				anime: a,
				req: req
			}):
			render404(req, res);
	})

	//.get('/c/', (req, res) => res.status(404).send("Characters database is NOT implemented yet!"))

	.use(render404)

	.listen(PORT, () => console.log(`AnimeList -- Listening on ${PORT}`));

/**
 * Capitalize a string
 * 
 * @returns {String}
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


/**
 * Anime collection pagination 
 * 
 * @param {Object} req
 * @param {String|Function} sort
 * @returns {Object}
 */
function animePagination(req, sort) {
	let page = (!isNaN(req.query.page) && req.query.page > 0) ? req.query.page * 1 : 1,
		end = page * config.TITLES_PER_PAGE,
		start = end - config.TITLES_PER_PAGE;
	let filtered = (req.params[0]) ?
		animedb.filterByType(req.params[0]) :
		animedb;
	if (typeof sort === "string")
		filtered = filtered[sort]() || filtered;
	else if (typeof sort === "function")
		filtered = filtered.sort(sort);
	let sliced = filtered.slice(start, end);
	let total = Math.floor(filtered.length / config.TITLES_PER_PAGE),
		next = (page !== total) ? page + 1 : null,
		prev = (page !== 1) ? page - 1 : null;
	return {
		req: req,
		animedb: sliced,
		pagination: {
			current: page,
			total: total,
			prev: prev,
			next: next
		}
	};
}

/**
 * Render 404 Page
 * 
 * @param {Object} req
 * @param {Object} res
 */
function render404(req, res) {
	res.status(404).render("pages/404", {
		req: req
	});
}