export default function getGenres(genre: string): string {
	const genres = [
		{ id: 28, name: "action" },
		{ id: 12, name: "adventure" },
		{ id: 16, name: "animation" },
		{ id: 35, name: "comedy" },
		{ id: 80, name: "crime" },
		{ id: 99, name: "documentary" },
		{ id: 18, name: "drama" },
		{ id: 10751, name: "family" },
		{ id: 14, name: "fantasy" },
		{ id: 36, name: "history" },
		{ id: 27, name: "horror" },
		{ id: 10402, name: "music" },
		{ id: 9648, name: "mystery" },
		{ id: 10749, name: "romance" },
		{ id: 878, name: "science siction" },
		{ id: 10770, name: "tv movie" },
		{ id: 53, name: "thriller" },
		{ id: 10752, name: "war" },
		{ id: 37, name: "western" },
	];
	const genreList: string[] = genre.toLowerCase().split(" ");
	let idList: string = "";

	for (const g of genreList) {
		for (const element of genres) {
			if (element.name === g) {
				idList += `${element.id}, `;
			}
		}
	}

	idList = idList.slice(0, -2);

	if (idList === "") {
		return "0";
	}
	return idList;
}
