export default async function getPeople(names: string) {
	let nameList: string[] = names.toLowerCase().split(",");
	nameList = nameList.map((string) => string.trim());
	let idList: string = "";

	for (const name of nameList) {
		const res = await fetch(
			`http://api.tmdb.org/3/search/person?api_key=${
				process.env.NEXT_PUBLIC_API_KEY
			}&query=${encodeURIComponent(name.toLowerCase())}`
		);

		const result = await res.json();
		if (typeof result.results[0] !== "undefined") {
			idList += `${result.results[0].id}, `;
		}
	}

	if (idList !== "") {
		return idList.slice(0, -2);
	}
	return "";
}
