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

const animedb = require("./db/anime.json");
//const characterdb = require("./data/character.json");

const app = express();

const PORT = process.env.PORT || 5000;

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

	.get('about', (req, res) => res.render("pages/about", {req: req}))
	.get('author', (req, res) => res.render("pages/author", {req: req}))

	.get('/a/', (req, res) => res.render("pages/animelist", {req: req}))
	.get('/a/all', (req, res) => res.render("pages/anime_all", {req: req}))
	.get('/a/random', (req, res) => res.redirect(`/a/${randomAnimeID()}`))
	.get('/a/:id', (req, res) => {
		const a = animedb.filter(a => a.id == req.params.id)[0];
		(typeof a !== "undefined") ?
			res.render("pages/anime", {anime: a, req: req}) :
			res.sendStatus(404);
	})

	//.get('/c/', (req, res) => res.send("Error: Characters database is NOT implemented yet!"))

	.use((req, res, next) => {
		res.status(404).render("pages/404", {req: req})
	})

	.listen(PORT, () => console.log(`AnimeList -- Listening on ${PORT}`));


/**
 * Get a random anime id from `animedb`
 * 
 * @returns {Number}
 */
function randomAnimeID ()
{
	return animedb[Math.floor(Math.random() * animedb.length)].id;
}