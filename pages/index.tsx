import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
	const selectNames = ["select1", "select2"];
	const [options] = useState([
		{
			name: "directed by",
			value: "directed-by",
		},
		{
			name: "starring",
			value: "starring",
		},
		{
			name: "with the genre",
			value: "genre",
		},
		{
			name: "released in the year",
			value: "release-year",
		},
		{
			name: "released before the year",
			value: "release-year-before",
		},
		{
			name: "released after the year",
			value: "release-year-after",
		},
		{
			name: "with a rating higher than",
			value: "rating-higher",
		},
		{
			name: "with a rating lower than",
			value: "rating-lower",
		},
	]);

	const [chosenOptions, setChosenOptions] = useState({});

	const isChosenByOther = (optionValue: string, selectName: string) => {
		for (let key in chosenOptions) {
			if (key !== selectName) {
				if (chosenOptions[key] === optionValue) {
					return true;
				}
			}
		}
		return false;
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setChosenOptions({ ...chosenOptions, [e.target.name]: e.target.value });
	};

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
				{selectNames.map((name, index) => {
					return (
						<div>
							<select
								name={name}
								key={index}
								onChange={handleChange}
								value={chosenOptions[name] || ""}
								required={index === 0}
							>
								<option value="" disabled={chosenOptions[name]}>
									Choose a parameter...
								</option>
								{options
									.filter(({ value }) => !isChosenByOther(value, name))
									.map(({ name, value }, oIndex) => (
										<option value={value} key={oIndex}>
											{name}
										</option>
									))}
							</select>
							<input
								type="text"
								required={index === 0}
								name={"input-" + ++index}
							/>
						</div>
					);
				})}
				<br />
				<input type="submit" value="Search" />
			</form>
		</div>
	);
}
