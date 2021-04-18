import React from "react";
import Link from "next/link";
import styles from "../styles/modules/Home.module.scss";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Proudly
				<Link href="https://github.com/DevinParentice/movie-finder">
					<a target="_blank"> open source</a>
				</Link>
				. Data provided by
				<Link href="https://www.themoviedb.org/">
					<a target="_blank"> TMDb</a>
				</Link>
				.
			</p>
		</footer>
	);
}
