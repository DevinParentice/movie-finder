import React from "react";
import { withRouter, NextRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import formatDate from "../../utils/formatDate";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});
interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}
class MoviePage extends React.Component<MyComponentProps, any> {
	constructor(props) {
		super(props);

		this.state = {
			movie: props.movie,
			people: props.people,
			peopleDisplay: props.peopleDisplay,
			loading: true,
		};
	}
	formatGenres() {
		let genres = "";
		this.state.movie.genres &&
			this.state.movie.genres.map((genre) => {
				genres += `${genre.name}, `;
			});
		return genres.slice(0, -2);
	}

	render() {
		return (
			<div>
				<div className="movie-details">
					{this.state.movie.poster_path ? (
						<img
							src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.state.movie.poster_path}`}
							alt={`${this.state.movie.title} Poster`}
							className="movie-poster-lg"
						/>
					) : (
						<Image
							src="/NoPoster.png"
							alt="No Poster Found"
							width="220"
							height="330"
							className="movie-poster-lg"
						/>
					)}
					<div>
						<h1>{this.state.movie.title}</h1>
						<h2>Released {formatDate(this.state.movie.release_date)}</h2>
						{this.state.people.crew &&
							this.state.people.crew.map((castMember) => {
								if (castMember.job === "Director") {
									return (
										<h2 key={castMember.credit_id}>
											Directed by {castMember.name}
										</h2>
									);
								}
							})}
						<div>
							<h3>{this.formatGenres()}</h3>
						</div>
						<h4>Rating: {this.state.movie.vote_average}/10</h4>
						<h4>{this.state.movie.tagline}</h4>
						<p>{this.state.movie.overview}</p>
						<p>Runtime: {this.state.movie.runtime} minutes</p>
						<p>
							Budget: {formatter.format(this.state.movie.budget).slice(0, -3)}
							<br />
							Revenue: {formatter.format(this.state.movie.revenue).slice(0, -3)}
						</p>
					</div>
				</div>

				<div>
					<ul className="content-selector">
						<li
							onClick={() => {
								this.setState({ peopleDisplay: this.state.people.cast });
							}}
						>
							Cast
						</li>
						<li
							onClick={() => {
								this.setState({ peopleDisplay: this.state.people.crew });
							}}
						>
							Crew
						</li>
					</ul>
				</div>
				<div>
					{this.state.peopleDisplay &&
						this.state.peopleDisplay.map((person, index) => {
							if (person.character) {
								return (
									<Link href={`/person/${person.id}`} key={index}>
										<a className="person-link">
											<p>
												{person.name} - {person.character}
											</p>
										</a>
									</Link>
								);
							} else {
								return (
									<Link href={`/person/${person.id}`} key={index}>
										<a className="person-link">
											<p>
												{person.name} - {person.job}
											</p>
										</a>
									</Link>
								);
							}
						})}
				</div>
			</div>
		);
	}
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const movieUrl = `https://api.themoviedb.org/3/movie/${query.movieID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
	const res1 = await fetch(movieUrl);
	const movie = await res1.json();

	const peopleUrl = `https://api.themoviedb.org/3/movie/${query.movieID}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
	const res2 = await fetch(peopleUrl);
	const people = await res2.json();

	const peopleDisplay = people.cast;

	return {
		props: {
			movie,
			people,
			peopleDisplay,
		},
	};
};

export default withRouter(MoviePage);
