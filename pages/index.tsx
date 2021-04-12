import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Options from "../components/Options";

export default function Home() {
	const router = useRouter();

	const submitForm = async (e) => {
		e.preventDefault();
		const formData = {
			[e.target.select0.value]: e.target.input0.value,
			...(e.target.select1.value && {
				[e.target.select1.value]: e.target.input1.value,
			}),
			...(e.target.select2.value && {
				[e.target.select2.value]: e.target.input2.value,
			}),
			...(e.target.select3.value && {
				[e.target.select3.value]: e.target.input3.value,
			}),
			...(e.target.select4.value && {
				[e.target.select4.value]: e.target.input4.value,
			}),
			...(e.target.select5.value && {
				[e.target.select5.value]: e.target.input5.value,
			}),
			...(e.target.select6.value && {
				[e.target.select6.value]: e.target.input6.value,
			}),
			...(e.target.select7.value && {
				[e.target.select7.value]: e.target.input7.value,
			}),
			...(e.target.select8.value && {
				[e.target.select8.value]: e.target.input8.value,
			}),
		};

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
