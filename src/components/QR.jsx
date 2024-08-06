import React from "react";
import QRCode from "react-qr-code";

export default function QR({ urlValue, fgColor }) {
  return (
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={urlValue}
        fgColor={fgColor}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}
