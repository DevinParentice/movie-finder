import React, { useState } from "react";

export default function Options() {
	const selectNames = [
		"select0",
		"select1",
		"select2",
		"select3",
		"select4",
		"select5",
		"select6",
		"select7",
	];
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

	return (
		<div>
			{selectNames.map((name, index) => {
				return (
					<div
						id={`parameter-${index}`}
						key={`parameter-${index}`}
						hidden={index !== 0}
					>
						<select
							name={name}
							id={`select-${index}`}
							onChange={(e) => {
								setChosenOptions({
									...chosenOptions,
									[e.target.name]: e.target.value,
								});
								if (document.getElementById(`parameter-${index + 1}`)) {
									document
										.getElementById(`parameter-${index + 1}`)
										.removeAttribute("hidden");
								}
							}}
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
							name={`input-${index}`}
							type="text"
							required={index === 0}
							className="search-options"
						/>
					</div>
				);
			})}
		</div>
	);
}
