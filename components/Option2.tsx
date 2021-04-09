import React from "react";

export default function Option2() {
	return (
		<div>
			<select name="select2">
				<option label=" "></option>
				<option value="directed-by">directed by</option>
				<option value="starring">starring</option>
				<option value="genre">with the genre</option>
				<option value="release-year">released in the year</option>
				<option value="release-decade">released in the decade</option>
			</select>
			<input type="text" name="input2" />
		</div>
	);
}
