import styled from "styled-components";
import { FaCopy, FaQrcode } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

const CodeText = styled.code`
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(130, 130, 130, 0.3);
`;

export const JoinCode = ({ code }: { code: string }) => {
  const [showQR, setShowQR] = useState(false);
  if (code === undefined || code === null || code === "")
    return <p>loading join code...</p>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>
        Join Code
        <CodeText style={{ marginLeft: 6, marginRight: 6 }}>{code}</CodeText>
        <FaCopy
          style={{ cursor: "pointer" }}
          className="buttonable"
          onClick={() => {
            navigator.clipboard.writeText(
              `http://thebigsasha.github.io/ezvote/join?poll=${code}`
            );
          }}
        />
        <FaQrcode
          style={{ cursor: "pointer", marginInlineStart: 10 }}
          className="buttonable"
          onClick={() => {
            setShowQR(!showQR);
          }}
        />
      </p>
      {showQR && (
        <QRCodeSVG
          value={`http://thebigsasha.github.io/ezvote/join?poll=${code}`}
        />
      )}
    </div>
  );
};
