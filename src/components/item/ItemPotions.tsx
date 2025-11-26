// src/components/item/ItemPotions.tsx
import React from "react";
import { StringListInput } from "../common/StringListInput";
import type { PotionEntry } from "../../types";
// Import Tooltips
import { Tooltip } from "../common/Tooltip";
import { ItemPotionsTooltips as tooltips } from '../../tooltips';

interface Props {
  values: PotionEntry[] | undefined;
  onChange: (newValues: PotionEntry[]) => void;
}

export const ItemPotionsForm: React.FC<Props> = ({ values, onChange }) => {
  return (
    <div className="form-group">
      <Tooltip text={tooltips.Potions}>
        <label>Potions</label>
      </Tooltip>
      <StringListInput
        label=""
        name="Potions"
        values={values}
        onChange={onChange}
        placeholder="e.g., SPEED:100:0"
        helpText="Format: [EffectName]:[DurationTicks]:[Amplifier]"
      />
    </div>
  );
};