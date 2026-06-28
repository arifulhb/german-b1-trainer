import { s } from "../styles/theme.js";

// Row of toggle buttons. Used for the DE→EN / EN→DE direction toggle and for
// the verb drill-mode selector. options: [{ value, label }].
export default function DrillModeToggle({ options, value, onChange, wrap = false }) {
  return (
    <div style={{ ...s.dirToggle, flexWrap: wrap ? "wrap" : "nowrap" }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          style={s.btn(value === opt.value ? "primary" : "default")}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
