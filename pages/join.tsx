import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useJoinMultiPeerSession } from "@thebigsasha/react-peerjs-hooks";
import { useState } from "react";
import styled from "styled-components";
import { Links } from "../components/Links";

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

interface StateInterface {
  member: Voter | Host;
}

export default function Host() {
  let initPeer = "";
  if (typeof window !== "undefined") {
    // arg from ?poll=
    const urlParams = new URLSearchParams(window.location.search);
    initPeer = urlParams.get("poll") || "";
  }

  const [peerID, setPeerID] = useState(initPeer);

  const [peerStates, myState, setMyState, numConnections, error] =
    useJoinMultiPeerSession<StateInterface>(peerID, {
      member: { name: "Voter" },
    });

  const hostState = peerStates.find(
    (peerState) =>
      peerState.data.member && (peerState.data.member as Host).question
  ) || {
    data: {
      member: {
        name: "Host",
        question: "What is your favorite color?",
        options: ["Red", "Blue", "Green"],
      },
    },
    id: "",
  };

  const { name, question, options, showResults } = hostState?.data
    .member as Host;

  const votes: { [key: string]: number } = {};

  for (const peerState of peerStates) {
    const { vote } = peerState.data.member as Voter;
    if (vote) {
      votes[vote] = (votes[vote] || 0) + 1;
    }
  }

  if (myState.member && (myState.member as Voter).vote) {
    votes[(myState.member as Voter).vote || ""] =
      (votes[(myState.member as Voter).vote || ""] || 0) + 1;
  }

  const questionView = (
    <div>
      <strong>{question}</strong>
      <ul>
        {options.map((option) => {
          if (!votes[option]) votes[option] = 0;

          const results = showResults ? `(${votes[option]})` : "";

          if (myState.member && (myState.member as Voter).vote === option)
            return (
              <VotedLi key={option}>
                {option} {results}
              </VotedLi>
            );

          return (
            <VotableLi key={option}>
              {option} {results}
              <button
                onClick={() => {
                  setMyState({ member: { name: "Voter", vote: option } });
                }}
              >
                Vote
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
        <div className={styles.description}>
          <h1>Join a Poll</h1>
          <div>
            <label
              className={"std-borders"}
              style={{ padding: "1rem" }}
              htmlFor="peerID"
            >
              Poll ID
              <input
                style={{ marginInlineStart: 8 }}
                type="text"
                id="peerID"
                value={peerID}
                onChange={(e) =>
                  setPeerID(
                    e.target.value.replace(
                      "http://thebigsasha.github.io/ezvote?poll=",
                      ""
                    )
                  )
                }
              />
            </label>
          </div>
        </div>

        {error && <p>{error}</p>}

        <div className={styles.center}>
          {peerStates.length > 0 && questionView}
        </div>

        <Links />
      </main>
    </>
  );
}
