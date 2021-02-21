import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [isLoading, setLoading] = useState(false);
	const [apiName, setApiName] = useState("Waiting for name..");
	const [apiDate, setApiDate] = useState("Waiting for date..");

	// Async await call
	const fetchName = async () => {
		const req = await fetch("http://localhost:3000/api/hello");
		const data = await req.json();
		setLoading(false);
		return setApiName(data.name);
	};

	// Fetch then catch
	const fetchDate = () => {
		fetch("http://localhost:3000/api/date")
			.then((res) => res.json())
			.then((data) => {
				setApiDate(data.date);
			});
	};

	const handleGetName = () => {
		setLoading(true);
		fetchName();
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>NextJS SQL Playground</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to NextJS SQL Playground</h1>
				<div className={styles.laboratory}>
					<div className={styles.labDiv}>
						<div className={styles.experiment}>
							<span>Click to receive name from /api: </span>
							<button onClick={() => handleGetName()} disabled={isLoading}>
								Receive Data
							</button>
						</div>
						<div className={styles.result}>
							<span>Current name: </span>
							{apiName}
						</div>
					</div>
					<hr />
					<div className={styles.labDiv}>
						<div className={styles.experiment}>
							<span>Click to receive date from /api: </span>
							<button onClick={() => fetchDate()} disabled={isLoading}>
								Receive Data
							</button>
						</div>
						<div className={styles.result}>
							<span>Current nameDate: </span>
							{apiDate}
						</div>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer>
		</div>
	);
}
