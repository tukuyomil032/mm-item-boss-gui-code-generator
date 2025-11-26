import React, { useCallback, useRef, useEffect } from "react"; 
import { Tooltip } from './Tooltip';

type CommonProps = {
  label: string;
  name: string;
  placeholder?: string;
  helpText?: string;
  tooltipText?: string; 
};

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

interface NumberProps extends CommonProps {
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number; min?: number; max?: number;
}

export const NumberInput: React.FC<NumberProps> = ({
  label, name, value, onChange, placeholder, step = 1, min, max, helpText, tooltipText
}) => {

  
  const handleStep = useCallback((direction: 'up' | 'down') => {
    const currentValue = Number(value) || 0;
    let newValue = currentValue + (direction === 'up' ? step : -step);

    const stepString = String(step);
    const decimalPlaces = stepString.includes('.') ? stepString.split('.')[1].length : 0;
    if (decimalPlaces > 0) {
      newValue = parseFloat(newValue.toFixed(decimalPlaces));
    }

    if (min !== undefined && newValue < min) newValue = min;
    if (max !== undefined && newValue > max) newValue = max;
    if (newValue === currentValue) return;

    const syntheticEvent = {
      target: {
        name: name,
        value: String(newValue),
        type: 'number'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);

  }, [value, onChange, name, step, min, max]); 

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const savedHandleStep = useRef(handleStep);

  useEffect(() => {
    savedHandleStep.current = handleStep;
  }, [handleStep]);

  const handleMouseDown = useCallback((direction: 'up' | 'down') => {
    savedHandleStep.current(direction);
    
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        savedHandleStep.current(direction);
      }, 100); 
    }, 500);
  }, []); 

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
          <button 
            type="button" 
            tabIndex={-1}
            onMouseDown={() => handleMouseDown('up')}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={(e) => { e.preventDefault(); handleMouseDown('up'); }}
            onTouchEnd={handleMouseUpOrLeave}
          >
            &#9650; 
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
            &#9660;
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