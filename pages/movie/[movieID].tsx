import React from "react";
import { withRouter, NextRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import formatDate from "../../utils/formatDate";

interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}
class MoviePage extends React.Component<MyComponentProps, any> {
	constructor(props) {
		super(props);

		this.state = {
			movie: {},
			people: {},
			peopleDisplay: {},
			loading: true,
		};
	}

	async componentDidMount() {
		await this.fetchMovie();
		await this.fetchCast();
	}

	async fetchMovie() {
		const url = `https://api.themoviedb.org/3/movie/${this.props.router.query.movieID}?api_key=${process.env.API_KEY}`;
		const res = await fetch(url);
		const data = await res.json();
		this.setState({ movie: data });
	}

	async fetchCast() {
		const url = `https://api.themoviedb.org/3/movie/${this.props.router.query.movieID}/credits?api_key=${process.env.API_KEY}`;
		const res = await fetch(url);
		const data = await res.json();
		this.setState({ people: data, peopleDisplay: data.cast, loading: false });
	}

	formatGenres() {
		let genres = "";
		this.state.movie.genres.map((genre) => {
			genres += `${genre.name}, `;
		});
		return genres.slice(0, -2);
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					<h1>Loading...</h1>
				</div>
			);
		}

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
						{this.state.people.crew.map((castMember) => {
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
						<h4>{this.state.movie.tagline}</h4>
						<p>{this.state.movie.overview}</p>
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
					{this.state.peopleDisplay.map((person, index) => {
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

export default withRouter(MoviePage);
