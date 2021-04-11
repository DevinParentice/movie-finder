export default async function getPeople(name: string) {
	const res = await fetch(
		`http://api.tmdb.org/3/search/person?api_key=${
			process.env.API_KEY
		}&query=${encodeURIComponent(name)}`
	);

	const result = await res.json();
	if (result.results[0].id) {
		return result.results[0].id;
	}

	return "";
}
