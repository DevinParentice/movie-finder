// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import getGenres from "../../utils/getGenres";
import getPeople from "../../utils/getPeople";

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.body);
	let url: string = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=revenue.desc&include_adult=true&page=1`;

	let searchQuery = "";

	async function buildUrl() {
		for (const key of Object.keys(req.body)) {
			if (key === "release-year") {
				searchQuery += `&primary_release_year=${req.body[key]}`;
			} else if (key === "release-year-before") {
				searchQuery += `&primary_release_date.lte=${req.body[key]}-12-31`;
			} else if (key === "release-year-after") {
				searchQuery += `&primary_release_date.gte=${req.body[key]}-1-01`;
			} else if (key === "rating-higher") {
				searchQuery += `&vote_average.gte=${req.body[key]}`;
			} else if (key === "rating-lower") {
				searchQuery += `&vote_average.lte=${req.body[key]}`;
			} else if (key === "genres") {
				searchQuery += `&with_genres=${encodeURIComponent(
					getGenres(req.body[key])
				)}`;
			} else if (key === "directed-by") {
				searchQuery += `&with_crew=${await getPeople(req.body[key])}`;
			} else if (key === "starring") {
				searchQuery += `&with_cast=${await getPeople(req.body[key])}`;
			}
		}
		url += searchQuery;

		console.log(url);
	}

	buildUrl();
	res.status(200).json({ name: "John Doe" });
};
