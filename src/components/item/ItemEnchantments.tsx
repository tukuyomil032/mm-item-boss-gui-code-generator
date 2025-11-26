// src/components/item/ItemEnchantments.tsx
import React from "react";
import { StringListInput } from "../common/StringListInput";
import type { EnchantmentEntry } from "../../types";
// Import Tooltips
import { Tooltip } from "../common/Tooltip";
import { ItemEnchantmentsTooltips as tooltips } from '../../tooltips';

interface Props {
  values: EnchantmentEntry[] | undefined;
  onChange: (newValues: EnchantmentEntry[]) => void;
}

export const ItemEnchantmentsForm: React.FC<Props> = ({ values, onChange }) => {
  return (
    <div className="form-group">
      <Tooltip text={tooltips.Enchantments}>
        <label>Enchantments</label>
      </Tooltip>
      <StringListInput
        label=""
        name="Enchantments"
        values={values}
        onChange={onChange}
        placeholder="e.g., DAMAGE_ALL:5"
        helpText="Format: [EnchantmentName]:[Level]"
      />
    </div>
  );
}