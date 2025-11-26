// src/components/boss/BossBar.tsx
import React from "react";
import type { BossBarOptions } from "../../types";
import {
  TextInput,
  NumberInput,
  CheckboxInput,
  SelectInput,
} from "../common/FormInputs";
// Import Tooltips
import { BossBarTooltips as tooltips } from '../../tooltips';

interface Props {
  options: BossBarOptions;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// Helper to create nested name attribute
const name = (key: keyof BossBarOptions) => `BossBar.${key}`;

const colorOptions = [
  { value: "PINK", label: "Pink" },
  { value: "BLUE", label: "Blue" },
  { value: "RED", label: "Red" },
  { value: "GREEN", label: "Green" },
  { value: "YELLOW", label: "Yellow" },
  { value: "PURPLE", label: "Purple" },
  { value: "WHITE", label: "White" },
];

const styleOptions = [
  { value: "SOLID", label: "Solid" },
  { value: "SEGMENTED_6", label: "Segmented 6" },
  { value: "SEGMENTED_10", label: "Segmented 10" },
  { value: "SEGMENTED_12", label: "Segmented 12" },
  { value: "SEGMENTED_20", label: "Segmented 20" },
];

export const BossBarForm: React.FC<Props> = ({ options, onChange }) => {
  return (
    <>
      <CheckboxInput 
        label="Enabled" 
        name={name("Enabled")} 
        checked={options.Enabled} 
        onChange={onChange} 
        tooltipText={tooltips.Enabled}
      />
      <TextInput
        label="Title"
        name={name("Title")}
        value={options.Title}
        onChange={onChange}
        placeholder="e.g., &cBoss Name"
        tooltipText={tooltips.Title}
      />
      <NumberInput
        label="Range"
        name={name("Range")}
        value={options.Range}
        onChange={onChange}
        placeholder="e.g., 20"
        tooltipText={tooltips.Range}
      />
      <SelectInput
        label="Color"
        name={name("Color")}
        value={options.Color}
        onChange={onChange}
        options={colorOptions}
        tooltipText={tooltips.Color}
      />
      <SelectInput
        label="Style"
        name={name("Style")}
        value={options.Style}
        onChange={onChange}
        options={styleOptions}
        tooltipText={tooltips.Style}
      />
      <CheckboxInput 
        label="CreateFog" 
        name={name("CreateFog")} 
        checked={options.CreateFog} 
        onChange={onChange} 
        tooltipText={tooltips.CreateFog}
      />
      <CheckboxInput 
        label="DarkenSky" 
        name={name("DarkenSky")} 
        checked={options.DarkenSky} 
        onChange={onChange} 
        tooltipText={tooltips.DarkenSky}
      />
      <CheckboxInput 
        label="PlayMusic" 
        name={name("PlayMusic")} 
        checked={options.PlayMusic} 
        onChange={onChange} 
        tooltipText={tooltips.PlayMusic}
      />
    </>
  );
};