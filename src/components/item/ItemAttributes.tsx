// src/components/item/ItemAttributes.tsx
import React from "react";
import { StringListInput } from "../common/StringListInput";
import type { AttributeEntry } from "../../types";
// Import Tooltips
import { Tooltip } from "../common/Tooltip";
import { ItemAttributesTooltips as tooltips } from '../../tooltips';

interface Props {
  values: AttributeEntry[] | undefined;
  onChange: (newValues: AttributeEntry[]) => void;
}

export const ItemAttributesForm: React.FC<Props> = ({ values, onChange }) => {
  return (
    <div className="form-group">
      <Tooltip text={tooltips.Attributes}>
        <label>Attributes</label>
      </Tooltip>
      <StringListInput
        label=""
        name="Attributes"
        values={values}
        onChange={onChange}
        placeholder="e.g., HAND:GENERIC_MAX_HEALTH:10:0"
        helpText="Format: [SLOT]:[Attribute]:[Amount]:[Operation]"
      />
    </div>
  );
};