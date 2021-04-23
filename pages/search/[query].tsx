// Import React
import React from "react";

// Import Next.js libraries
import { withRouter, NextRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

// Import React Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Import utility files
import submitSearch from "../../utils/submitSearch";
import formatDate from "../../utils/formatDate";

// Import SCSS modules
import styles from "../../styles/modules/Query.module.scss";

interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

class SearchResults extends React.Component<MyComponentProps, any> {
	// Set component's state
	constructor(props) {
		super(props);

		this.state = {
			pageNumber: 1,
			totalPages: 500,
			url: "",
			results: props.results,
			sortBy: "popularity.desc",
		};
	}

	// Everytime the user scrolls, check to see if they hit the bottom of the page. If so, load more results
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

	// Add EventListener to watch users scrolling
	async componentDidMount() {
		window.addEventListener("scroll", this.handleScroll, {
			passive: true,
		});
	}

	// Remove EventListener when component unmounts
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	// Change how the results are sorted when the user selects an option from the dropdown menu
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

	// Fetch the new page of results when user scrolls down to the bottom of the page
	async fetchResults() {
		this.setState({ pageNumber: this.state.pageNumber + 1 });

		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=${this.state.sortBy}&include_adult=false&include_video=false&page=${this.state.pageNumber}&${this.props.router.query.query}`;
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
				{/* Add appropriate items to <head> element  */}
				<Head>
					<title>Movie Magic - Search</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta
						name="description"
						content="Movie Magic is the new way to search for the movies you are looking for."
					/>
				</Head>
				<div className={styles.content_wrapper}>
					<Header />
					<div className={styles.select_container}>
						<select
							name="sort"
							id="sort"
							onChange={this.changeSort}
							defaultValue={this.state.sortBy}
							className={styles.sort_select}
						>
							<optgroup label="Popularity">
								<option value="popularity.desc">Popularity Descending</option>
								<option value="popularity.asc">Popularity Ascending</option>
							</optgroup>
							<optgroup label="Release Date">
								<option value="primary_release_date.desc">
									Release Date Descending
								</option>
								<option value="primary_release_date.asc">
									Release Date Ascending
								</option>
							</optgroup>
							<optgroup label="Revenue">
								<option value="revenue.desc">Revenue Descending</option>
								<option value="revenue.asc">Revenue Ascending</option>
							</optgroup>
							<optgroup label="Ratings">
								<option value="vote_average.desc">
									Average Rating Descending
								</option>
								<option value="vote_average.asc">
									Average Rating Ascending
								</option>
								<option value="vote_count.desc">Rating Count Descending</option>
								<option value="vote_count.asc">Rating Count Descending</option>
							</optgroup>
						</select>
					</div>
					<div className={styles.search_results}>
						{/* Iterate over all of the results to display them */}
						{this.state.results.map((result) => (
							<section
								key={result.id + result.vote_count}
								className={styles.movie_result}
							>
								<div className={styles.movie_result_poster}>
									<Link href={`/movie/${result.id}`}>
										<a>
											{/* Check to see if the API has a poster available */}
											{result.poster_path ? (
												<img
													src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${result.poster_path}`}
													alt={`${result.title} Poster`}
													className={styles.movie_poster}
												/>
											) : (
												<div className={styles.no_poster_container}>
													<img
														src="/NoPoster.png"
														alt="No Poster Found"
														className={styles.movie_poster}
													/>
												</div>
											)}
										</a>
									</Link>
								</div>
								<div className={styles.movie_result_details}>
									<div>
										<Link href={`/movie/${result.id}`}>
											<a>
												<h2>{result.title}</h2>
											</a>
										</Link>
										<p>Released: {formatDate(result.release_date)}</p>
										<p>
											Rating: {result.vote_average}{" "}
											<img
												src="/star256.png"
												alt="Star icon"
												className={styles.gold_star}
											/>
										</p>
									</div>
								</div>
							</section>
						))}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	// Fetch data from API and pass it to React component
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=$1&${query.query}`;
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
