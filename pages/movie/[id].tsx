import React from "react";
import { useRouter } from "next/router";

export default function id() {
	const router = useRouter();

	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
}
