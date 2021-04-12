import { withRouter, NextRouter } from "next/router";
import Image from "next/image";
import React, { useEffect } from "react";

interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

class SearchResults extends React.Component<MyComponentProps, any> {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			pageNumber: 1,
			totalPages: 500,
			results: [],
		};
	}

	handleScroll = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		if (bottom) {
			if (this.state.pageNumber === this.state.totalPages) {
				window.removeEventListener("scroll", this.handleScroll);
			} else {
				this.fetchResults();
			}
		}
	};

	async componentDidMount() {
		this.fetchResults();
		window.addEventListener("scroll", this.handleScroll, {
			passive: true,
		});
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	async fetchResults() {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=revenue.desc&include_adult=true&include_video=false&page=${this.state.pageNumber}&${this.props.router.query.query}`;
		const res = await fetch(url);
		const data = await res.json();

		this.setState({
			results: this.state.results.concat(data.results),
			pageNumber: data.page + 1,
			totalPages: data.total_pages,
			loading: false,
		});
	}

	render() {
		if (this.state.loading) {
			return <div>Loading...</div>;
		}

		if (!this.state.results.length) {
			return <div>Search returned no results.</div>;
		}

		return (
			<div>
				{this.state.results.map((result) => (
					<div key={result.id}>
						<div>
							{result.poster_path ? (
								<img
									src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${result.poster_path}`}
									alt=""
								/>
							) : (
								<Image
									src="/NoPoster.png"
									alt="No Poster Found"
									width="220"
									height="330"
								/>
							)}
						</div>
						<div>
							<h2>{result.title}</h2>
						</div>
						<div>
							<p>{result.overview}</p>
						</div>
						<div>
							<p>Released: {result.release_date}</p>
						</div>
						<div>
							<p>Rating: {result.vote_average}/10</p>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default withRouter(SearchResults);
