import getGenres from "../getGenres";

describe("Get genres test", () => {
	it("Should turn genre names to their correct IDs", () => {
		expect(getGenres("Action,Comedy,Romance")).toBe("28, 35, 10749");
		expect(getGenres("Documentary")).toBe("99");
		expect(getGenres("TV Movie")).toBe("10770");
		expect(getGenres("Invalid Genres")).toBe("0");
	});
});
