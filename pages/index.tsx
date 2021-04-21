import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Options from "../components/Options";
import Footer from "../components/Footer";
import submitSearch from "../utils/submitSearch";
import styles from "../styles/modules/Home.module.scss";

export default function Home() {
	const router = useRouter();

	const submitForm = async (e) => {
		const result = await submitSearch(e);
		router.push(`/search/${result.apiUrl}`);
	};

	return (
		<div className={styles.App}>
			<Head>
				<title>Movie Finder</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<div className={styles.content_wrapper}>
				<header className={styles.logo_container}>
					<img
						className={styles.logo_image}
						src="/logo.svg"
						alt="Movie Magic logo"
					/>
					<h1 className={styles.logo}>Movie Magic</h1>
				</header>
				<section className={styles.form_container}>
					<form onSubmit={submitForm} autoComplete="off">
						<p className={styles.form_text}>Find me movies...</p>
						<Options />
						<br />
						<input
							type="submit"
							value="Search"
							className={styles.submit_button}
						/>
					</form>
				</section>
			</div>
			<Footer />
		</div>
	);
}
