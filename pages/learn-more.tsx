import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Links, inter } from "../components/Links";

export default function Home() {
  return (
    <>
      <Head>
        <title>EZPoll | About</title>
        <meta name="description" content="Stupid simple polls" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}></div>

        <div className={styles.center}>
          <p className={inter.className}>
            Welcome to EZVote! We are a voting platform that allows you to host
            a poll and invite anyone to vote.
          </p>
        </div>

        <Links />
      </main>
    </>
  );
}
