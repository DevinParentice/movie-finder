import Head from "next/head";
import React from "react";
import Options from "../components/Options";

export default function Home() {
	return (
		<div className="App">
			<Head>
				<title>Movie Finder</title>
			</Head>
			<h1>Find your movie:</h1>
			<form method="POST">
				<label htmlFor="amount">Find </label>
				<select name="amount">
					<option value="all">all</option>
					<option value="one">one</option>
					<option value="ten">ten</option>
				</select>
				<p className="movies-text">&nbsp;movie(s)</p>
				<br />
				<Options />
				<br />
				<input type="submit" value="Search" />
			</form>
		</div>
	);
}
