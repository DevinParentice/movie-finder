import React from "react";
import { withRouter, NextRouter } from "next/router";
import { GetServerSideProps } from "next";
import formatDate from "../../utils/formatDate";
import styles from "../../styles/modules/Person.module.scss";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
			active: props.active,
		};
	}

	render() {
		return (
			<div>
				<div className={styles.content_wrapper}>
					<Header />
					<div className={styles.movie_details}>
						<div className={styles.poster_container}>
							{this.state.person.profile_path ? (
								<img
									src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${this.state.person.profile_path}`}
									alt={`Picture of ${this.state.person.title}`}
									className="movie-poster-lg"
								/>
							) : (
								<img
									src="/NoPerson.png"
									alt={`No Picture of ${this.state.person.title}`}
									className="movie-poster-lg"
								/>
							)}
							<div className={styles.name_container}>
								<h1>{this.state.person.name}</h1>
								<h2>Born {formatDate(this.state.person.birthday)}</h2>
							</div>
						</div>
						<div className={styles.person_overview}>
							<p>{this.state.person.biography}</p>
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
						{this.state.creditsDisplay.map((role, index) => {
							if (role.hasOwnProperty("character")) {
								return (
									<div className={styles.card} key={index}>
										<a href={`/movie/${role.id}`} className="person-link">
											{role.poster_path ? (
												<div className={styles.no_poster_container}>
													<img
														src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${role.poster_path}`}
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
								{
									console.log("wooo");
								}
								return (
									<div className={styles.card} key={index}>
										<a href={`/movie/${role.id}`} className="person-link">
											{role.poster_path ? (
												<div className={styles.no_poster_container}>
													<img
														src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${role.poster_path}`}
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
	const personUrl = `https://api.themoviedb.org/3/person/${query.personID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
	const res1 = await fetch(personUrl);
	const person = await res1.json();

	const url = `https://api.themoviedb.org/3/person/${query.personID}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
	const res2 = await fetch(url);
	const credits = await res2.json();
	let creditsDisplay = [];
	let active = "";
	if (credits.cast.length >= credits.crew.length) {
		creditsDisplay = credits.cast;
		active = "Cast";
	} else {
		creditsDisplay = credits.crew;
		active = "Crew";
	}
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
