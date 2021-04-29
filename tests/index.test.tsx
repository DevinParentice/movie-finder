import { render, screen } from "@testing-library/react";

import Home from "../pages/index";

describe("Should render the app without crashing", () => {
	it("Renders the home page properly", () => {
		render(<Home />);
		expect(
			screen.getByRole("heading", { name: "Movie Magic" })
		).toBeInTheDocument();
	});
});
