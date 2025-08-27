import * as React from "react";
const MainLogo = (props) => (
    <svg
        width={250}
        height={70}
        viewBox="0 0 400 120"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                    offset="0%"
                    style={{
                        stopColor: "#5e1c9bff",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset="25%"
                    style={{
                        stopColor: "#6e1f96ff",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset="50%"
                    style={{
                        stopColor: "#763986ff",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset="75%"
                    style={{
                        stopColor: "#982a95ff",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset="100%"
                    style={{
                        stopColor: "#b023b0ff",
                        stopOpacity: 1,
                    }}
                />
            </linearGradient>
        </defs>
        <text
            x={20}
            y={80}
            fontFamily="Arial, sans-serif"
            fontSize={56}
            fontWeight="bold"
            fill="url(#textGradient)"
        >
            {"C"}
        </text>
        <text
            x={80}
            y={80}
            fontFamily="Arial, sans-serif"
            fontSize={48}
            fontWeight="bold"
            fill="url(#textGradient)"
        >
            {"m"}
        </text>
        <text
            x={130}
            y={80}
            fontFamily="Arial, sans-serif"
            fontSize={56}
            fontWeight="bold"
            fill="url(#textGradient)"
        >
            {"D"}
        </text>
        <text
            x={190}
            y={80}
            fontFamily="Arial, sans-serif"
            fontSize={56}
            fontWeight="bold"
            fill="url(#textGradient)"
        >
            {"Z"}
        </text>
        <text
            x={250}
            y={80}
            fontFamily="Arial, sans-serif"
            fontSize={48}
            fontWeight="bold"
            fill="url(#textGradient)"
        >
            {"e"}
        </text>
        <text
            x={290}
            y={80}
            fontFamily="Arial, sans-serif"
            fontSize={56}
            fontWeight="bold"
            fill="url(#textGradient)"
        >
            {"N"}
        </text>
    </svg>
);
export default MainLogo;
