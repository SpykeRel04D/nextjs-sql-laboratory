import { useRouter } from "next/router";

export default function Persona({ persona }) {
	const router = useRouter();
	const id = router.query.id?.toString();

	return (
		<div>
			<h1>
				{persona.name} {persona.surname}
			</h1>
			<h2>{persona.birthdate}</h2>
			<p>{persona.description}</p>
		</div>
	);
}

export async function getStaticPaths() {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: "blocking", //indicates the type of fallback
	};
}

export async function getStaticProps({ params }) {
	const { id } = params;
	const req = await fetch(`http://localhost:3000/api/getPersona?id=${id}`);
	const data = await req.json();
	const persona = data;
	return {
		props: {
			persona,
		},
	};
}
