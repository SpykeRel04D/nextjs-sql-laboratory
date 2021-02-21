import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [apiName, setApiName] = useState("Waiting for name..");
	const [apiDate, setApiDate] = useState("Waiting for date..");
	const [people, setPeople] = useState("");

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

	// Fetch data from DB getUserList
	const getPeopleList = () => {
		setLoading(true);
		fetch("http://localhost:3000/api/getPeopleList")
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Something went wrong");
				}
			})
			.then((data) => {
				setPeople(data);
				setLoading(false);
			})
			.catch((error) => alert(error));
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
					<h2>Basic API fetch data</h2>
					<div className={styles.labDiv}>
						<div className={styles.experiment}>
							<span>Click to receive name from /api: </span>
							<button onClick={() => handleGetName()} disabled={loading}>
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
							<button onClick={() => fetchDate()} disabled={loading}>
								Receive Data
							</button>
						</div>
						<div className={styles.result}>
							<span>Current nameDate: </span>
							{apiDate}
						</div>
					</div>
				</div>
				<div className={styles.laboratory}>
					<h2>Basic SQL serverless fetch</h2>
					<div className={styles.labDiv}>
						<div className={styles.experiment}>
							<span>Click to receive people list from SQL: </span>
							<button onClick={() => getPeopleList()} disabled={loading}>
								Receive Data
							</button>
						</div>
						<div className={styles.result}>
							<span>Current people list: </span>
							<ul>
								{people &&
									people.map((item, i) => (
										<li className={styles.person} key={i}>
											<span>
												{item.name} {item.surname}
											</span>
											<button>
												<Link href={`/persona/${item.id}`}>
													<a>View</a>
												</Link>
											</button>
										</li>
									))}
							</ul>
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
