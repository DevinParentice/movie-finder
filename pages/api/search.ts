// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import getGenres from "../../utils/getGenres";
import getPeople from "../../utils/getPeople";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let searchQuery: string = "";

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
				const castID: string = await getPeople(req.body[key]);
				if (castID !== "") {
					searchQuery += `&with_crew=${castID}`;
				}
			} else if (key === "starring") {
				const actorID: string = await getPeople(req.body[key]);
				if (actorID !== "") {
					searchQuery += `&with_crew=${actorID}`;
				}
			}
		}
		console.log(searchQuery);
		searchQuery = searchQuery.substring(1);
		res.status(200).json({ apiUrl: searchQuery });
	}

	await buildUrl();
};
