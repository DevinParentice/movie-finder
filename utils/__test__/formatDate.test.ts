import formatDate from "../formatDate";

describe("Format date test", () => {
	it("Should turn ISO dates into English strings", () => {
		expect(formatDate("2021-05-02")).toBe("May 2, 2021");
		expect(formatDate("1966-02-27")).toBe("February 27, 1966");
		expect(formatDate("1989-11-15")).toBe("November 15, 1989");
		expect(formatDate("")).toBe("Not yet released");
	});
});
