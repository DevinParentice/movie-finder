export default function formatDate(date: string): string {
	let finalDate = "";
	const newDate = new Date(date);
	const month = newDate.toLocaleString("default", { month: "long" });
	finalDate = `${month} ${newDate.getDay()}, ${newDate.getFullYear()}`;
	return finalDate;
}
