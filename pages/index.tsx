import Head from "next/head";
import Option1 from "../components/Option1";

export default function Home() {
	return (
		<div>
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
				<Option1 />
				<br />
				<input type="submit" value="Search" />
			</form>
		</div>
	);
}
