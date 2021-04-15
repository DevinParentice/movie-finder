import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Options from "../components/Options";

export default function Home() {
	const router = useRouter();

	const submitForm = async (e) => {
		e.preventDefault();
		const arr = [...e.target.elements].slice(0, -2);
		let formData = {};
		for (let i = 0; i < arr.length; i += 2) {
			formData[arr[i].value] = arr[i + 1].value;
		}
		const res = await fetch("/api/search", {
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		const result = await res.json();
		router.push(`/search/${result.apiUrl}`);
	};

	return (
		<div className="App">
			<Head>
				<title>Movie Finder</title>
			</Head>
			<h1>Find your movie:</h1>
			<form onSubmit={submitForm}>
				<p>Find movies</p>
				<Options />
				<br />
				<input type="submit" value="Search" />
			</form>
		</div>
	);
}
