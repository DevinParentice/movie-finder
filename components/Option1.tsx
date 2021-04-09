import React, { useState } from "react";
import Option2 from "./Option2";

export default function Option1() {
	const [showSecond, setShowSecond] = useState<boolean>();
	const showSecondAction = () => setShowSecond(true);

	return (
		<div>
			<select required name="select1" onChange={showSecondAction}>
				<option label=" "></option>
				<option value="directed-by">directed by</option>
				<option value="starring">starring</option>
				<option value="genre">with the genre</option>
				<option value="release-year">released in the year</option>
				<option value="release-decade">released in the decade</option>
			</select>
			<input required type="text" name="input1" />
			<p className="movies-text">,</p>
			{showSecond ? <Option2 /> : null}
		</div>
	);
}
