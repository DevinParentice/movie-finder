// Import React & useState to create a stateful component
import React, { useState } from "react";

// Import Next.js libraries
import Head from "next/head";
import { useRouter } from "next/router";

// Import React components
import Options from "../components/Options";
import Footer from "../components/Footer";

// Import utility files
import submitSearch from "../utils/submitSearch";

// Import SCSS module
import styles from "../styles/modules/Home.module.scss";

export default function Home() {
	// Create a state called isSearching
	const [isSearching, setIsSearching] = useState(false);

	// Intialize Next.js router
	const router = useRouter();

	// Change data from form into something that the API can read
	const submitForm = async (e) => {
		setIsSearching(true);
		const result = await submitSearch(e);

		// Change current URL
		console.log(result.apiUrl);
		if (!result.apiUrl) {
			result.apiUrl = "with_cast=0";
		}
		router.push(`/search/${result.apiUrl}`);
	};

	return (
		<div className={styles.App}>
			{/* Add appropriate items to <head> element  */}
			<Head>
				<title>Movie Magic</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="Movie Magic is the new way to search for the movies you are looking for."
				/>
			</Head>
			{isSearching && (
				<div className={styles.loading_modal}>
					<div className={styles.spinner}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
			<div className={styles.content_wrapper}>
				<header className={styles.logo_container}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						version="1.0"
						width="280.000000pt"
						height="280.000000pt"
						viewBox="0 0 900.000000 900.000000"
						preserveAspectRatio="xMidYMid meet"
						className={styles.logo_image}
					>
						<g
							transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)"
							fill="#ffffff"
							stroke="none"
						>
							<path d="M3375 6800 c-33 -4 -73 -12 -90 -18 -16 -5 -57 -18 -90 -27 -88 -25 -111 -35 -263 -117 -65 -36 -75 -43 -182 -132 -100 -84 -160 -154 -242 -284 -24 -40 -86 -164 -92 -187 -3 -11 -17 -54 -31 -95 -27 -78 -43 -166 -52 -283 -6 -77 21 -313 41 -367 8 -19 22 -62 32 -95 10 -33 24 -67 31 -76 11 -13 9 -19 -10 -37 -13 -12 -26 -22 -29 -22 -11 0 -200 -115 -289 -176 -103 -70 -236 -171 -300 -228 -25 -23 -74 -66 -110 -98 -129 -113 -249 -240 -379 -400 -120 -146 -220 -346 -220 -438 0 -91 77 -158 170 -146 121 15 146 20 165 32 11 8 27 14 37 14 49 0 331 146 503 259 305 203 555 418 797 689 40 44 51 51 65 42 245 -148 364 -190 624 -220 53 -6 107 -8 120 -5 13 3 60 10 104 15 102 11 211 33 250 50 17 7 46 19 65 27 64 27 162 78 172 90 6 7 15 13 20 13 17 0 163 118 224 182 55 56 139 167 170 223 35 61 84 163 84 173 0 6 6 26 14 44 22 51 46 148 50 203 3 28 5 53 5 58 1 4 5 7 10 7 15 0 41 -67 41 -107 0 -35 21 -115 41 -154 4 -9 11 -33 14 -52 4 -20 13 -41 21 -48 8 -6 14 -19 14 -28 1 -9 12 -34 25 -56 14 -22 28 -47 32 -55 32 -70 238 -296 310 -340 17 -10 34 -23 37 -29 4 -5 19 -16 34 -24 56 -29 125 -67 136 -75 20 -15 180 -71 236 -82 30 -6 91 -15 135 -20 44 -5 91 -12 105 -14 33 -7 211 12 281 30 30 8 66 14 80 14 13 0 37 7 53 15 15 8 33 15 38 15 6 0 65 27 132 61 191 95 350 237 470 419 45 68 108 197 130 268 9 28 23 73 31 100 19 62 38 271 30 342 -3 30 -8 81 -10 112 -4 54 -28 158 -55 238 -11 32 -93 203 -124 258 -8 13 -25 36 -40 51 -14 15 -26 31 -26 36 0 25 -233 237 -310 280 -78 45 -234 114 -290 130 -36 9 -85 25 -110 34 -65 23 -415 23 -480 0 -25 -9 -72 -24 -105 -34 -64 -18 -79 -24 -195 -80 -93 -45 -100 -49 -175 -105 -99 -73 -198 -169 -243 -237 -14 -21 -29 -40 -33 -43 -15 -11 -129 -226 -129 -244 0 -5 -6 -22 -13 -39 -28 -64 -48 -134 -54 -187 -3 -30 -14 -68 -23 -83 l-17 -28 -7 32 c-3 17 -6 48 -6 69 0 106 -115 375 -217 510 -75 99 -268 277 -323 298 -8 3 -30 16 -48 28 -30 20 -73 42 -157 78 -16 7 -57 21 -90 30 -33 10 -80 24 -105 32 -53 18 -323 27 -415 14z m343 -707 c63 -21 169 -91 217 -144 43 -47 95 -144 117 -219 16 -57 16 -256 0 -272 -7 -7 -12 -21 -12 -32 0 -32 -66 -139 -117 -191 -97 -97 -205 -147 -344 -160 -143 -13 -288 39 -397 144 -72 69 -112 133 -142 230 -20 64 -22 88 -17 179 3 57 10 109 16 115 6 6 11 20 11 31 0 10 16 47 35 81 68 122 229 238 355 256 76 11 222 1 278 -18z m2427 0 c114 -36 243 -149 294 -257 17 -37 31 -72 31 -79 0 -8 7 -27 15 -43 19 -39 13 -211 -9 -272 -41 -110 -84 -175 -156 -236 -100 -85 -226 -135 -345 -136 -54 0 -170 21 -201 38 -10 5 -36 18 -57 28 -100 48 -208 182 -247 304 -19 58 -21 293 -2 312 6 6 12 21 12 31 0 27 65 132 111 176 45 45 128 102 184 126 85 37 268 41 370 8z" />
							<path d="M7753 4510 c-79 -43 -292 -165 -420 -241 -45 -27 -85 -49 -88 -49 -4 0 -26 -13 -49 -28 -22 -15 -48 -31 -56 -35 -8 -4 -24 -13 -35 -20 -11 -7 -44 -25 -72 -41 l-53 -29 0 -638 0 -638 57 -33 c32 -18 64 -36 73 -41 8 -4 29 -16 45 -27 17 -11 50 -31 75 -45 25 -14 52 -29 60 -34 54 -33 171 -101 175 -101 2 0 61 -34 130 -75 70 -41 130 -75 134 -75 5 0 14 -6 20 -13 6 -8 37 -22 70 -32 56 -17 61 -17 112 0 69 22 114 65 139 132 19 52 20 79 20 982 0 1025 3 983 -64 1055 -71 78 -162 86 -273 26z" />
							<path d="M4330 4449 c-49 -36 -213 -122 -295 -155 -72 -29 -223 -68 -315 -80 -162 -23 -452 4 -600 56 -113 40 -249 101 -292 131 -14 11 -31 19 -37 19 -8 0 -11 -293 -11 -1042 0 -1036 0 -1042 21 -1085 25 -52 80 -100 131 -113 23 -7 688 -9 1880 -8 l1845 3 47 39 c30 24 56 57 67 84 19 44 20 77 20 1095 0 577 -3 1052 -6 1055 -6 6 -35 -8 -130 -63 -91 -53 -126 -68 -255 -115 -37 -13 -177 -42 -296 -61 -105 -17 -320 -1 -459 34 -160 41 -357 129 -462 208 l-52 39 -373 -1 -373 -1 -55 -39z" />
						</g>
					</svg>
					<h1 className={styles.logo}>Movie Magic</h1>
				</header>

				{/* Start of form */}
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
