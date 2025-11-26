// src/components/common/FormInputs.tsx
import React, { useCallback, useRef, useEffect } from "react"; 
import { Tooltip } from './Tooltip';

type CommonProps = {
  label: string;
  name: string;
  placeholder?: string;
  helpText?: string;
  tooltipText?: string; 
};

// ラベル用ヘルパー (変更なし)
const LabelWithTooltip: React.FC<{ htmlFor: string, label: string, tooltipText?: string }> = 
({ htmlFor, label, tooltipText }) => {
  if (tooltipText) {
    return (
      <Tooltip text={tooltipText}>
        <label htmlFor={htmlFor}>{label}</label>
      </Tooltip>
    );
  }
  return <label htmlFor={htmlFor}>{label}</label>;
};


// --- TextInput --- (変更なし)
interface TextProps extends CommonProps {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextProps> = ({
  label, name, value, onChange, placeholder, helpText, tooltipText
}) => (
  <div className="form-group">
    <LabelWithTooltip htmlFor={name} label={label} tooltipText={tooltipText} />
    <input
      type="text"
      id={name}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
    />
    {helpText && (
      <small style={{ color: "var(--text-color-muted)", marginTop: "-4px" }}>
        {helpText}
      </small>
    )}
  </div>
);

// --- NumberInput --- (★ 修正)
interface NumberProps extends CommonProps {
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number; min?: number; max?: number;
}

export const NumberInput: React.FC<NumberProps> = ({
  label, name, value, onChange, placeholder, step = 1, min, max, helpText, tooltipText
}) => {

  // ★ 1. スピンボタンのクリック処理 (変更なし)
  const handleStep = useCallback((direction: 'up' | 'down') => {
    // value が stale (古い) でも、
    // 親の handleChange -> setConfig(prev => ...) が functional update なので
    // 依存配列から value を抜いても計算自体は正しく動く...
    // いや、この value は計算の起点になるため stale だとダメ。
    
    // (前回のコード)
    // const currentValue = Number(value) || 0; // ← この 'value' がstaleになるのが問題
    
    // ★ 1b. 修正: value を引数で受け取るようにせず、
    // functional update を onChange に渡すように変更...
    // いや、onChange は event を期待している。

    // ★ 1c. 修正:
    // handleStep が `value` に依存していることが正しい。
    // 問題は `setInterval` が古い `handleStep` を呼ぶこと。
    const currentValue = Number(value) || 0;
    let newValue = currentValue + (direction === 'up' ? step : -step);

    const stepString = String(step);
    const decimalPlaces = stepString.includes('.') ? stepString.split('.')[1].length : 0;
    if (decimalPlaces > 0) {
      newValue = parseFloat(newValue.toFixed(decimalPlaces));
    }

    if (min !== undefined && newValue < min) newValue = min;
    if (max !== undefined && newValue > max) newValue = max;

    // ★ 1d. 値が変わらないならイベントを発火させない (重要)
    if (newValue === currentValue) return;

    const syntheticEvent = {
      target: {
        name: name,
        value: String(newValue),
        type: 'number'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);

  }, [value, onChange, name, step, min, max]); // ★ 'value' は依存配列に必要

  // ★ 2. 長押し機能のための参照
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ★ 3. 常に最新の handleStep を保持するための ref
  const savedHandleStep = useRef(handleStep);

  // ★ 4. handleStep (つまり value) が更新されるたびに、ref の中身を更新
  useEffect(() => {
    savedHandleStep.current = handleStep;
  }, [handleStep]);

  // ★ 5. mousedown / touchstart イベントハンドラ
  const handleMouseDown = useCallback((direction: 'up' | 'down') => {
    // 1. まず1回、最新の handleStep を ref から呼ぶ
    savedHandleStep.current(direction);
    
    // 2. 500ms後に高速リピートを開始
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        // 3. 100msごとに、最新の handleStep を ref から呼ぶ
        savedHandleStep.current(direction);
      }, 100); 
    }, 500);
  }, []); // ★ 依存配列は空でOK (ref を使うため)

  // ★ 6. mouseup / mouseleave / touchend イベントハンドラ (変更なし)
  const handleMouseUpOrLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ★ 7. コンポーネントがアンマウントされたときにタイマーをクリア (変更なし)
  useEffect(() => {
    return () => {
      handleMouseUpOrLeave();
    };
  }, [handleMouseUpOrLeave]);

  return (
    <div className="form-group">
      <LabelWithTooltip htmlFor={name} label={label} tooltipText={tooltipText} />
      
      <div className="number-input-wrapper">
        <input
          type="number"
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
        />
        <div className="number-input-arrows">
          {/* ★ 8. 修正: イベントハンドラは handleMouseDown を呼ぶ (変更なし) */}
          <button 
            type="button" 
            tabIndex={-1}
            onMouseDown={() => handleMouseDown('up')}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={(e) => { e.preventDefault(); handleMouseDown('up'); }}
            onTouchEnd={handleMouseUpOrLeave}
          >
            &#9650; {/* ▲ */}
          </button>
          <button 
            type="button" 
            tabIndex={-1}
            onMouseDown={() => handleMouseDown('down')}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={(e) => { e.preventDefault(); handleMouseDown('down'); }}
            onTouchEnd={handleMouseUpOrLeave}
          >
            &#9660; {/* ▼ */}
          </button>
        </div>
      </div>
      
      {helpText && (
        <small style={{ color: "var(--text-color-muted)", marginTop: "-4px" }}>
          {helpText}
        </small>
      )}
    </div>
  );
};


// --- CheckboxInput --- (変更なし)
interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
  tooltipText?: string; 
}
export const CheckboxInput: React.FC<CheckboxProps> = ({
  label, name, checked, onChange, helpText, tooltipText
}) => (
  <div className="form-group">
    <div className="checkbox-group">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked || false}
        onChange={onChange}
      />
      <LabelWithTooltip htmlFor={name} label={label} tooltipText={tooltipText} />
      {helpText && (
        <small style={{ color: "var(--text-color-muted)" }}>
          ({helpText})
        </small>
      )}
    </div>
  </div>
);

// --- SelectInput --- 
interface SelectProps extends CommonProps {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}
export const SelectInput: React.FC<SelectProps> = ({
  label, name, value, onChange, options, helpText, tooltipText
}) => (
  <div className="form-group">
    <LabelWithTooltip htmlFor={name} label={label} tooltipText={tooltipText} />
    <select id={name} name={name} value={value || ""} onChange={onChange}>
      <option value="">-- 未選択 --</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {helpText && (
      <small style={{ color: "var(--text-color-muted)", marginTop: "-4px" }}>
        {helpText}
      </small>
    )}
  </div>
);