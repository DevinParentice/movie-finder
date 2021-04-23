// Import React
import React from "react";

// Import Next.js libraries
import { withRouter, NextRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";

// Import components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Import utility files
import formatDate from "../../utils/formatDate";

// Import SCSS modules
import styles from "../../styles/modules/Person.module.scss";

interface WithRouterProps {
	router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}
class PersonPage extends React.Component<MyComponentProps, any> {
	// Set component's state
	constructor(props) {
		super(props);

		this.state = {
			person: props.person,
			credits: props.credits,
			creditsDisplay: props.creditsDisplay,
			active: props.active,
		};
	}

	render() {
		return (
			<div>
				{/* Add appropriate items to <head> element  */}
				<Head>
					<title>Movie Magic - {this.state.person.name}</title>
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
					<div className={styles.movie_details}>
						<div className={styles.poster_container}>
							<div className={styles.top_container}>
								{this.state.person.profile_path ? (
									<img
										src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.state.person.profile_path}`}
										alt={`Picture of ${this.state.person.name}`}
										className="movie-poster-lg"
									/>
								) : (
									<img
										src="/NoPerson.png"
										alt={`No Picture of ${this.state.person.name}`}
										className="movie-poster-lg"
									/>
								)}
								<div className={styles.name_container}>
									<h1>{this.state.person.name}</h1>
									<h2>Born {formatDate(this.state.person.birthday)}</h2>
								</div>
							</div>
							{this.state.person.biography ? (
								<div className={styles.person_overview}>
									<h2 className={styles.overview_header}>Overview:</h2>
									<p>{this.state.person.biography}</p>
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
					<div className={styles.people_selector}>
						<ul className={styles.content_selector}>
							<li
								onClick={() => {
									this.setState({
										creditsDisplay: this.state.credits.cast,
										active: "Cast",
									});
								}}
								className={this.state.active === "Cast" ? styles.active : ""}
							>
								Acted In
							</li>
							<li
								onClick={() => {
									this.setState({
										creditsDisplay: this.state.credits.crew,
										active: "Crew",
									});
								}}
								className={this.state.active === "Crew" ? styles.active : ""}
							>
								Worked On
							</li>
						</ul>
					</div>
					<div className={styles.card_container}>
						{/* Iterate over each role and display it as a card */}
						{this.state.creditsDisplay.map((role, index) => {
							if (role.hasOwnProperty("character")) {
								return (
									<div className={styles.card} key={index}>
										<a href={`/movie/${role.id}`} className="person-link">
											{role.poster_path ? (
												<div className={styles.no_poster_container}>
													<img
														src={`https://www.themoviedb.org/t/p/w220_and_h330_bestv2${role.poster_path}`}
														alt={`Poster of ${role.name}`}
													/>
												</div>
											) : (
												<div className={styles.no_poster_container}>
													<img src="/NoPoster.png" alt="No Poster Found" />
												</div>
											)}
											{role.character ? (
												<div className={styles.name_container}>
													<p className={styles.card_name}>
														{role.original_title}
													</p>

													<p className={styles.card_character}>
														{role.character}
													</p>
												</div>
											) : (
												<div className={styles.name_container}>
													<p className={styles.card_name}>
														{role.original_title}
													</p>

													<p className={styles.card_character}>
														Role not found
													</p>
												</div>
											)}
										</a>
									</div>
								);
							} else {
								return (
									<div className={styles.card} key={index}>
										<a href={`/movie/${role.id}`} className="person-link">
											{role.poster_path ? (
												<div className={styles.no_poster_container}>
													<img
														src={`https://www.themoviedb.org/t/p/w220_and_h330_bestv2${role.poster_path}`}
														alt={`Poster of ${role.name}`}
													/>
												</div>
											) : (
												<div className={styles.no_poster_container}>
													<img src="/NoPoster.png" alt="No Poster Found" />
												</div>
											)}
											<div className={styles.name_container}>
												<p className={styles.card_name}>
													{role.original_title}
												</p>
												<p className={styles.card_character}>{role.job}</p>
											</div>
										</a>
									</div>
								);
							}
						})}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	// Fetch person's information from API
	const personUrl = `https://api.themoviedb.org/3/person/${query.personID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
	const res1 = await fetch(personUrl);
	const person = await res1.json();

	// Fetch what the person has starred in and/or worked on from API
	const url = `https://api.themoviedb.org/3/person/${query.personID}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
	const res2 = await fetch(url);
	const credits = await res2.json();
	let creditsDisplay = [];
	let active = "";

	// If the person has worked on more movies than starred in, set the default display to show that
	if (credits.cast.length >= credits.crew.length) {
		creditsDisplay = credits.cast;
		active = "Cast";
	} else {
		creditsDisplay = credits.crew;
		active = "Crew";
	}

	// Pass API results to component's props
	return {
		props: {
			person,
			credits,
			creditsDisplay,
			active,
		},
	};
};

export default withRouter(PersonPage);
