import { useRouter } from "next/router";
import React from "react";

export default function SearchResults() {
	const router = useRouter();
	let url: string = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=revenue.desc&include_adult=true&page=1`;

	return <div>{router.query.query}</div>;
}
