export default function formatDate(date: string): string {
	if (date) {
		let finalDate = "";
		date = date.replace(/-/g, "/");
		const newDate = new Date(date);
		const month = newDate.toLocaleString("default", { month: "long" });
		finalDate = `${month} ${newDate.getDate()}, ${newDate.getFullYear()}`;
		return finalDate;
	}
	return "Not yet released";
}
