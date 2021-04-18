import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Options from "../components/Options";
import submitSearch from "../utils/submitSearch";

export default function Home() {
	const router = useRouter();

	const submitForm = async (e) => {
		const result = await submitSearch(e);
		router.push(`/search/${result.apiUrl}`);
	};

	return (
		<div className="App">
			<Head>
				<title>Movie Finder</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<h1>Find your movie:</h1>
			<form onSubmit={submitForm} autoComplete="off">
				<p>Find movies</p>
				<Options />
				<br />
				<input type="submit" value="Search" />
			</form>
		</div>
	);
}
