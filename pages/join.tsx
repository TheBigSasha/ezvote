import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useJoinMultiPeerSession } from "@thebigsasha/react-peerjs-hooks";
import { useState } from "react";
import styled from "styled-components";
import { Links, inter } from "../components/Links";
import { FaCheck, FaVoteYea } from "react-icons/fa";

interface Voter {
  name: string;
  vote?: string;
}

interface Host {
  name: string;
  question: string;
  options: string[];
  showResults?: boolean;
}

export const VotableLi = styled.li`
  &:hover {
    background-color: rgba(130, 130, 255, 0.3);
  }
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  list-style: none;
`;

export const VotedLi = styled(VotableLi)`
  border: 1px solid rgba(130, 130, 255, 0.8);
`;

export default function Host() {
  let initPeer = "";
  if (typeof window !== "undefined") {
    // arg from ?poll=
    const urlParams = new URLSearchParams(window.location.search);
    initPeer = urlParams.get("poll") || "";
  }

  const [peerID, setPeerID] = useState(initPeer);

  const [peerStates, hostState, myState, setMyState, _numConnections, error] =
    useJoinMultiPeerSession<Host, Voter>(peerID, {
      name: "Voter",
    });


  

  const votes: { [key: string]: number } = {};

  for (const peerState of peerStates) {
    const { vote } = peerState.data as Voter;
    if (vote) {
      votes[vote] = (votes[vote] || 0) + 1;
    }
  }

  if (myState.vote) {
    votes[myState.vote || ""] = (votes[myState.vote || ""] || 0) + 1;
  }

  const questionView = (
    <div className={inter.className}>
      <strong>{hostState?.question}</strong>
      <ul>
        {hostState?.options.map((option) => {
          if (!votes[option]) votes[option] = 0;

          const results = hostState.showResults ? `(${votes[option]})` : "";

          if (myState.vote === option)
            return (
              <VotedLi key={option}>
                {option} {results}
                <button disabled>
                  <FaCheck />
                </button>
              </VotedLi>
            );

          return (
            <VotableLi key={option}>
              {option} {results}
              <button
                onClick={() => {
                  setMyState({ ...myState, vote: option });
                }}
              >
                <FaVoteYea />
              </button>
            </VotableLi>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      <Head>
        <title>Join a Poll</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>
          {JSON.stringify(
            [peerStates, hostState, myState, setMyState, _numConnections, error]
          )}
        </p>
        <div className={styles.description}>
          <h1>Join a Poll</h1>
          <div>
            <p className={"std-borders"} style={{ padding: "1rem" }}>
              Join Code
              <input
                style={{ marginInlineStart: 8, width: "130px" }}
                type="text"
                id="peerID"
                value={peerID}
                placeholder={"egtc-4ve7-55gv"}
                onChange={(e) =>
                  setPeerID(
                    e.target.value
                      .replace("http://thebigsasha.github.io/ezvote", "")
                      .replace("/join", "")
                      .replace("?poll=", "")
                  )
                }
              />
            </p>
          </div>
        </div>

        {error && <p>{error}</p>}

        <div className={styles.center}>
          {hostState && questionView}
          {!hostState && (
            <h2 className={inter.className}>
              Enter a join code to vote in a poll
            </h2>
          )}
        </div>
        <Links />
      </main>
    </>
  );
}
