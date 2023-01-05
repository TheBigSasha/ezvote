import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export const Links: React.FC<{}> = () => {
  return (
    <div className={styles.grid}>
      <Link
        href="/host"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          Host <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Host a live poll and invite your friends to vote!
        </p>
      </Link>

      <Link
        href="/join"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          Join <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Join a poll and vote on your favorite options!
        </p>
      </Link>

      <a
        href="https://github.com/TheBigSasha/react-peerjs-hooks"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          View Source <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          See how this app was built using TypeScript, React.JS, and PeerJS
        </p>
      </a>

      <Link
        href="/learn-more"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2 className={inter.className}>
          Learn More <span>-&gt;</span>
        </h2>
        <p className={inter.className}>
          Learn about how to use EzVote and how to host your own polls!
        </p>
      </Link>
    </div>
  );
};
