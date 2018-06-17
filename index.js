/*!
 * AnimeList
 * My local MAL Client (MyAnimeList.net) 
 * 
 * Author: MizoPro
 * Licensed under the MIT License
 * 
 */

/*
 * Module dependencies
 */

const express = require("express");
const path = require("path");

/*
 * Local Database
 */

const db = require("./lib/db.js");
const animedb = new db.AnimeCollection( ...require("./db/anime.json").sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())) );
//const characterdb = require("./data/character.json");

const app = express();

const PORT = process.env.PORT || 5000;

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
	github: "https://mizopro.github.io"
};
app.locals.animedb = animedb; // For easy DB access

app
	.use(express.static(path.join(__dirname, 'public')))

	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')

	.get('/', (req, res) => res.render("pages/index", {req: req}))

	.get('/about', (req, res) => res.render("pages/about", {req: req}))
	.get('/author', (req, res) => res.render("pages/author", {req: req}))

	.get('/a/', (req, res) => res.render("pages/anime_index", {req: req}))
	.get(/^\/a\/all(?:\/(tv|ova|movie|ona|special|music))?$/i, (req, res) =>
		res.render("pages/anime_all", {
			req: req,
			animedb: (req.params[0]) ? animedb.filterByType(req.params[0]) : animedb, 
			pagination: {}
		})
	)

	.get(/^\/a\/top(?:\/(tv|ova|movie|ona|special|music))?$/i, (req, res) => {
		let page = (!isNaN(req.query.page) && req.query.page > 0) ? req.query.page * 1 : 1,
			end = page * config.TITLES_PER_PAGE, 
			start = end - config.TITLES_PER_PAGE;
		let sorted = (req.params[0] ? animedb.filterByType(req.params[0]) : animedb)
			.sortByScore();
		let sliced = sorted.slice(start, end);
		let total = Math.floor(sorted.length / config.TITLES_PER_PAGE), 
			next = (page !== total) ? page + 1 : null, 
			prev = (page !== 1) ? page - 1 : null;
		
		res.render("pages/anime_all", {
			req: req,
			animedb: sliced, 
			pagination: {
				current: page, 
				total: total, 
				prev: prev, 
				next: next
			}
		})
	})

	.get(/^\/a\/random(?:\/(tv|ova|movie|ona|special|music))?/i, (req, res) => 
		res.redirect(`/a/${animedb.getRandomId((req.params[0]) ? function (anime) {
			return anime.type.toLowerCase() === req.params[0].toLowerCase();
		} : null)}`)
	)

	.get('/a/:id', (req, res) => {
		const a = animedb.findById(req.params.id);
		(a) ?
			res.render("pages/anime", {anime: a, req: req}) :
			render404(req, res);
	})

	//.get('/c/', (req, res) => res.status(404).send("Characters database is NOT implemented yet!"))

	.use(render404)

	.listen(PORT, () => console.log(`AnimeList -- Listening on ${PORT}`));


/**
 * Render 404 Page
 * 
 * @returns {Number}
 */
function render404 (req, res)
{
	res.status(404).render("pages/404", {req: req});
}
