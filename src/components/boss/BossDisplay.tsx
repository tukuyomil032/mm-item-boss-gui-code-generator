// src/components/boss/BossDisplay.tsx
import React from "react";
import type { BossDisplayOptions } from "../../types";
import { TextInput, CheckboxInput } from "../common/FormInputs";
// Import Tooltips
import { BossDisplayTooltips as tooltips } from '../../tooltips';

interface Props {
  options: BossDisplayOptions;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Helper to create nested name attribute
const name = (key: keyof BossDisplayOptions) => `DisplayOptions.${key}`;

export const BossDisplayForm: React.FC<Props> = ({ options, onChange }) => {
  return (
    <>
      <CheckboxInput 
        label="NameVisible" 
        name={name("NameVisible")} 
        checked={options.NameVisible} 
        onChange={onChange} 
        tooltipText={tooltips.NameVisible} 
      />
      <CheckboxInput 
        label="HealthVisible" 
        name={name("HealthVisible")} 
        checked={options.HealthVisible} 
        onChange={onChange} 
        tooltipText={tooltips.HealthVisible} 
      />
      <CheckboxInput 
        label="ShowHealth (Legacy)" 
        name={name("ShowHealth")} 
        checked={options.ShowHealth} 
        onChange={onChange} 
        tooltipText={tooltips.ShowHealth} 
      />
      <CheckboxInput 
        label="Glowing" 
        name={name("Glowing")} 
        checked={options.Glowing} 
        onChange={onChange} 
        tooltipText={tooltips.Glowing} 
      />
      <CheckboxInput 
        label="Invisible" 
        name={name("Invisible")} 
        checked={options.Invisible} 
        onChange={onChange} 
        tooltipText={tooltips.Invisible} 
      />
      <CheckboxInput 
        label="Invulnerable" 
        name={name("Invulnerable")} 
        checked={options.Invulnerable} 
        onChange={onChange} 
        tooltipText={tooltips.Invulnerable} 
      />
      <CheckboxInput 
        label="HasBoundingBox" 
        name={name("HasBoundingBox")} 
        checked={options.HasBoundingBox} 
        onChange={onChange} 
        tooltipText={tooltips.HasBoundingBox} 
      />
      <CheckboxInput 
        label="ShowPitch" 
        name={name("ShowPitch")} 
        checked={options.ShowPitch} 
        onChange={onChange} 
        tooltipText={tooltips.ShowPitch} 
      />
      <TextInput
        label="Model (ModelEngine)"
        name={name("Model")}
        value={options.Model}
        onChange={onChange}
        placeholder="e.g., model_id"
        tooltipText={tooltips.Model}
      />
      <TextInput
        label="MythicCrater"
        name={name("MythicCrater")}
        value={options.MythicCrater}
        onChange={onChange}
        placeholder="e.g., crater_id"
        tooltipText={tooltips.MythicCrater}
      />
    </>
  );
};