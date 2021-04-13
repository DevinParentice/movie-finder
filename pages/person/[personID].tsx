import React from "react";
import { withRouter, NextRouter } from "next/router";
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
			person: {},
			credits: {},
			loading: true,
		};
	}

	async componentDidMount() {
		await this.fetchPerson();
		await this.fetchCredits();
	}

	async fetchPerson() {
		const url = `https://api.themoviedb.org/3/person/${this.props.router.query.personID}?api_key=${process.env.API_KEY}&language=en-US`;
		const res = await fetch(url);
		const data = await res.json();
		this.setState({ person: data });
	}

	async fetchCredits() {
		const url = `https://api.themoviedb.org/3/person/${this.props.router.query.personID}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`;
		const res = await fetch(url);
		const data = await res.json();
		this.setState({ credits: data, loading: false });
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
			</div>
		);
	}
}

export default withRouter(PersonPage);
