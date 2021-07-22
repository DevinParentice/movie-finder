export default async function submitSearch(e) {
	e.preventDefault();
	const arr = [...e.target.elements].slice(0, -2);
	let formData = {};
	for (let i = 0; i < arr.length; i += 2) {
		if (formData[arr[i].value]) {
			formData[arr[i].value] += `,${arr[i + 1].value}`;
		} else {
			formData[arr[i].value] = arr[i + 1].value;
		}
	}
	const res = await fetch("/api/search", {
		body: JSON.stringify(formData),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const result = await res.json();
	return result;
}
