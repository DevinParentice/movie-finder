export default async function getPeople(name: string) {
	const res = await fetch(
		`http://api.tmdb.org/3/search/person?api_key=${
			process.env.API_KEY
		}&query=${encodeURIComponent(name.toLowerCase())}`
	);

	const result = await res.json();
	if (typeof result.results[0] !== "undefined") {
		return result.results[0].id;
	}

	return "";
}
