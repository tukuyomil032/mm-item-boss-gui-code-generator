// src/components/common/StringListInput.tsx
import React, { useState } from "react";

interface Props {
  label: string;
  name: string;
  values: string[] | undefined;
  onChange: (newValues: string[]) => void;
  placeholder: string;
  helpText?: string;
}

export const StringListInput: React.FC<Props> = ({
  label,
  values = [],
  onChange,
  placeholder,
  helpText,
}) => {
  const [currentValue, setCurrentValue] = useState("");

  const handleAdd = () => {
    if (currentValue && !values.includes(currentValue)) {
      onChange([...values, currentValue]);
      setCurrentValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    // 変更: .setting-item-child (layout.css) と .string-list-input (components.css)
    <div className="setting-item-child string-list-input">
      <label>{label}</label>
      {helpText && (
        <small
          style={{
            color: "var(--text-color-muted)",
            marginTop: "-4px",
            marginBottom: "4px",
          }}
        >
          {helpText}
        </small>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{ flexGrow: 1 }}
        />
        <button
          type="button"
          // (デフォルトの <button> スタイルを適用)
          onClick={handleAdd}
          style={{ flexShrink: 0 }}
        >
          追加
        </button>
      </div>

      {values.length > 0 && (
        <ul>
          {values.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button
                type="button"
                className="button-remove" // 変更: .button-remove
                onClick={() => handleRemove(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};