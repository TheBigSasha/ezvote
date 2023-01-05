import styled from "styled-components";
import { FaCopy } from "react-icons/fa";

const CodeText = styled.code`
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(130, 130, 130, 0.3);
`;

export const JoinCode = ({ code }: { code: string }) => {
  if (code === undefined || code === null || code === "")
    return <p>loading join code...</p>;
  return (
    <p>
      Join Code
      <CodeText style={{ marginLeft: 6, marginRight: 6 }}>{code}</CodeText>
      <FaCopy
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigator.clipboard.writeText(
            `http://thebigsasha.github.io/ezvote?poll=${code}`
          );
        }}
      />
    </p>
  );
};
