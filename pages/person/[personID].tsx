import React from "react";
import { withRouter, NextRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import formatDate from "../../utils/formatDate";

interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}
class PersonPage extends React.Component<MyComponentProps, any> {
	constructor(props) {
		super(props);

		this.state = {
			person: props.person,
			credits: props.credits,
			creditsDisplay: props.creditsDisplay,
		};
	}

	render() {
		return (
			<div>
				<div className="movie-details">
					{this.state.person.profile_path ? (
						<img
							src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.state.person.profile_path}`}
							alt={`${this.state.person.title} Poster`}
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
					<div className="person-details">
						<h1>{this.state.person.name}</h1>
						<h2>Born {formatDate(this.state.person.birthday)}</h2>
						<p>{this.state.person.biography}</p>
					</div>
				</div>
				<div>
					<ul className="content-selector">
						<li
							onClick={() => {
								this.setState({ creditsDisplay: this.state.credits.cast });
							}}
						>
							Acted In
						</li>
						<li
							onClick={() => {
								this.setState({ creditsDisplay: this.state.credits.crew });
							}}
						>
							Worked On
						</li>
					</ul>
				</div>
				<div>
					{this.state.creditsDisplay.map((role, index) => {
						if (role.character) {
							return (
								<Link href={`/movie/${role.id}`} key={index}>
									<a className="person-link">
										<p>
											{role.title} - {role.character}
										</p>
									</a>
								</Link>
							);
						} else {
							return (
								<Link href={`/movie/${role.id}`} key={index}>
									<a className="person-link">
										<p>
											{role.title} - {role.job}
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
	const personUrl = `https://api.themoviedb.org/3/person/${query.personID}?api_key=${process.env.API_KEY}&language=en-US`;
	const res1 = await fetch(personUrl);
	const person = await res1.json();

	const url = `https://api.themoviedb.org/3/person/${query.personID}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`;
	const res2 = await fetch(url);
	const credits = await res2.json();
	let creditsDisplay = [];
	if (credits.cast.length >= credits.crew.length) {
		creditsDisplay = credits.cast;
	} else {
		creditsDisplay = credits.crew;
	}

	return {
		props: {
			person,
			credits,
			creditsDisplay,
		},
	};
};

export default withRouter(PersonPage);
