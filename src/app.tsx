import { calculateClamp, stringToNumber } from "./lib/calculate-clamp";
import { useState, useEffect, useRef } from "preact/hooks";
import Input from "./components/Input";

export const App = () => {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const [calcedClamp, setCalcedClamp] = useState("");
  const [sizes, setSizes] = useState({
    minSize: "24px",
    maxSize: "64px",
    minScreenSize: "500px",
    maxScreenSize: "1520px",
  });

  useEffect(() => {
    const sizesToNumbers = {
      maxSize: stringToNumber(sizes.maxSize),
      minSize: stringToNumber(sizes.minSize),
    };

    const screenSizesToNumbers = {
      maxScreenSize: stringToNumber(sizes.maxScreenSize),
      minScreenSize: stringToNumber(sizes.minScreenSize),
    };

    const clampedValue = calculateClamp(sizesToNumbers, screenSizesToNumbers);

    if (clampedValue) setCalcedClamp(clampedValue);
  }, [sizes]);

  const onChange = (e: any) => {
    return setSizes({ ...sizes, [e.target.name]: e.target.value.trim() });
  };

  const copyToClipboard = () => {
    if (!resultRef.current) return;

    // Copy innerText to clipboard
    navigator.clipboard.writeText(resultRef.current.innerText);

    // Display tooltip
    setDisplayTooltip(true);

    // Remove tooltip aftetr 1600ms
    setTimeout(() => setDisplayTooltip(false), 1600);
  };

  return (
    <main>
      <div className="head">
        <h1>Viewport clamp calculator </h1>
        <p>
          Linearly scale values based on the viewport with the help of{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp"
            target="_blank"
            rel="noreffer"
          >
            CSS clamp()
          </a>
          . Clamp is{" "}
          <a
            href="https://caniuse.com/?search=clamp"
            target="_blank"
            rel="noreffer"
          >
            supported by modern browsers
          </a>
          . Provide min and max values in{" "}
          <strong>
            <u>px</u>{" "}
          </strong>
          down below.
        </p>
      </div>
      <section className="input-section">
        <Input
          label="Min-size"
          id="minSize"
          name="minSize"
          value={sizes.minSize}
          onChange={(e) => onChange(e)}
        />
        <Input
          label="Max-size"
          id="maxSize"
          name="maxSize"
          value={sizes.maxSize}
          onChange={onChange}
        />
      </section>
      <section className="input-section">
        <Input
          label="Min-viewport"
          onChange={onChange}
          id="minScreenWidth"
          name="minScreenSize"
          value={sizes.minScreenSize}
        />
        <Input
          label="Max-viewport"
          id="maxScreenWidth"
          name="maxScreenSize"
          value={sizes.maxScreenSize}
          onChange={onChange}
        />
      </section>
      <section id="result-section" className="input-wrapper">
        <h2>Results</h2>
        <div id="result-content-wrapper">
          <div ref={resultRef} id="result">
            {calcedClamp && calcedClamp}
          </div>
          <button onClick={copyToClipboard} id="copy-button">
            Copy
          </button>
          <div id="copy-toast" className={displayTooltip ? "active" : "idle"}>
            Copied!
          </div>
        </div>
      </section>
    </main>
  );
};
