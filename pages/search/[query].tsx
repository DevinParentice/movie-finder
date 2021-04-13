import { withRouter, NextRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Options from "../../components/Options";

interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

class SearchResults extends React.Component<MyComponentProps, any> {
	constructor(props) {
		super(props);

		this.state = {
			pageNumber: 1,
			totalPages: 500,
			results: props.results,
			sortBy: "popularity.desc",
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
		window.addEventListener("scroll", this.handleScroll, {
			passive: true,
		});
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	changeSort = (e) => {
		e.preventDefault();
		this.setState(
			{
				sortBy: e.target.value,
				pageNumber: 1,
				results: [],
			},
			() => {
				this.fetchResults();
			}
		);
	};

	submitForm = async (e) => {};

	async fetchResults() {
		this.setState({ pageNumber: this.state.pageNumber + 1 });

		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=${this.state.sortBy}&include_adult=false&include_video=false&page=${this.state.pageNumber}&${this.props.router.query.query}`;
		const res = await fetch(url);
		const data = await res.json();
		this.setState({
			results: this.state.results.concat(data.results),
			totalPages: data.total_pages,
		});
	}

	render() {
		if (!this.state.results.length) {
			return <div>Search returned no results.</div>;
		}

		return (
			<div>
				<form onSubmit={this.submitForm}>
					<p>Find movies</p>
					<Options />
					<br />
					<input type="submit" value="Search" />
				</form>
				<select
					name="sort"
					id="sort"
					onChange={this.changeSort}
					defaultValue={this.state.sortBy}
				>
					<option value="popularity.desc">Popularity Descending</option>
					<option value="popularity.asc">Popularity Ascending</option>
					<option value="primary_release_date.desc">
						Release Date Descending
					</option>
					<option value="primary_release_date.asc">
						Release Date Ascending
					</option>
					<option value="vote_average.desc">Average Rating Descending</option>
					<option value="vote_average.asc">Average Rating Ascending</option>
				</select>
				{this.state.results.map((result) => (
					<div key={result.id + result.vote_count}>
						<div>
							<Link href={`/movie/${result.id}`}>
								<a>
									{result.poster_path ? (
										<img
											src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${result.poster_path}`}
											alt={`${result.title} Poster`}
											className="movie-poster"
										/>
									) : (
										<Image
											src="/NoPoster.png"
											alt="No Poster Found"
											width="220"
											height="330"
											className="movie-poster"
										/>
									)}
								</a>
							</Link>
						</div>
						<div>
							<Link href={`/movie/${result.id}`}>
								<a>
									<h2>{result.title}</h2>
								</a>
							</Link>
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=$1&${query.query}`;
	const res = await fetch(url);
	const data = await res.json();
	const results = data.results;
	return {
		props: {
			results,
		},
	};
};

export default withRouter(SearchResults);
