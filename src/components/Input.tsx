import { useState } from "preact/hooks";

const Input = (p: IInput) => {
  const [msg, setMsg] = useState("");

  const onInputChange = (e: any) => {
    const pxRegex = /px$/;
    const numberRegex = /^[0-9]+$/;
    const value = e.target.value;
    const number = value.split("px")[0];
    // Please provide a number ending with px
    // If provided value ends with px or not

    if (!value.match(pxRegex) || !number.match(numberRegex)) {
      setMsg("Please provide a number ending with px.");
    } else {
      setMsg("");
    }
    return p.onChange(e);
  };

  return (
    <div className={`input-wrapper iw-half ${msg ? "error" : ""}`}>
      <label for={p.id}>{p.label}</label>
      <input
        id={p.id}
        type="text"
        name={p.name}
        value={p.value}
        onInput={(e) => onInputChange(e)}
      />
      <div className="error-message">{msg && msg}</div>
    </div>
  );
};

export default Input;

interface IInput {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: (e: any) => void;
}
