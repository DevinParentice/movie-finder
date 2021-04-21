import React from "react";
import styles from "../styles/modules/Home.module.scss";

export default function Header() {
	return (
		<header className={styles.header}>
			<a href="/">
				<p className={styles.image_left}>Movie</p>
				<img
					src="/logo.svg"
					alt="Movie Magic logo"
					className={styles.header_image}
				/>
				<p className={styles.image_right}>Magic</p>
			</a>
		</header>
	);
}
