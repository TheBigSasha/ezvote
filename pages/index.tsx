import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useHostMultiPeerSession } from "@thebigsasha/react-peerjs-hooks";
import { JoinCode } from "../components/JoinCode";
import { VotableLi } from "./join";
import { Links, inter } from "../components/Links";
import { ToggleButton } from "../components/ToggleButton";
import React, { Suspense } from "react";

const Results = React.lazy(() => import("../components/Results"));

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

interface StateInterface {
  member: Voter | Host;
}

export default function Index() {
  const [peerStates, myState, setMyState, myID, numConnections, error] =
    useHostMultiPeerSession<StateInterface>({
      member: {
        name: "Host",
        question: "What is your favorite color?",
        options: ["Red", "Blue", "Green"],
      },
    });

  const {
    name,
    question,
    options: rawOptions,
    showResults,
  } = myState.member as Host;

  const votes: { [key: string]: number } = {};

  for (const peerState of peerStates) {
    const { vote } = peerState.data.member as Voter;
    if (vote) {
      votes[vote] = (votes[vote] || 0) + 1;
    }
  }

  // make all options unique
  const options = [...new Set(rawOptions)];

  const chartData = options.map((option) => ({
    name: option,
    votes: votes[option] || 0,
  }));

  const hasResults = chartData.some((data) => data.votes > 0);

  return (
    <>
      <Head>
        <title>Host a Poll</title>
        <meta name="description" content="Stupid simple polls" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Host a Poll</h1>
          <JoinCode code={myID}></JoinCode>
        </div>

        <div className={styles.center}>
          <div>
            {hasResults && (
              <Suspense
                fallback={<p className={inter.className}>Loading Chart </p>}
              >
                {" "}
                <Results chartData={chartData} />
              </Suspense>
            )}
            <br />

            <textarea
              id="question"
              rows={3}
              style={{ width: "100%" }}
              value={question}
              onChange={(e) => {
                setMyState({
                  member: { name, question: e.target.value, options },
                });
              }}
            />

            <br />

            <ul>
              {options.map((option, index) => {
                return (
                  <VotableLi key={option.substring(0, 1) + index}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = options.map((o) => {
                          if (o === option) {
                            return e.target.value;
                          }
                          return o;
                        });
                        setMyState({
                          member: { name, question, options: newOptions },
                        });
                      }}
                    />

                    <button
                      onClick={() => {
                        setMyState({
                          member: {
                            name,
                            question,
                            options: options.filter((o) => o !== option),
                          },
                        });
                      }}
                    >
                      Remove
                    </button>
                    <p
                      className={inter.className}
                      style={{ display: "inline" }}
                    >
                      {votes[option] || 0} votes
                    </p>
                  </VotableLi>
                );
              })}

              <VotableLi>
                <button
                  onClick={() => {
                    setMyState({
                      member: {
                        name,
                        question,
                        options: [
                          ...options,
                          `Option ${options.length + 1}`,
                        ],
                      },
                    });
                  }}
                >
                  Add Option
                </button>
                <ToggleButton
                  on={showResults || false}
                  onClick={() => {
                    setMyState({
                      member: {
                        name,
                        question,
                        options,
                        showResults: !showResults,
                      },
                    });
                  }}
                >
                  {showResults ? "Hide Results" : "Publish Results"}
                </ToggleButton>
              </VotableLi>
            </ul>
          </div>
        </div>

        <Links />
      </main>
    </>
  );
}
