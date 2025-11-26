import React from "react";
import { StringListInput } from "../common/StringListInput";
import type { EquipmentEntry } from "../../types";
import { Tooltip } from "../common/Tooltip";
import { BossEquipmentTooltips as tooltips } from '../../tooltips';

interface Props {
  values: EquipmentEntry[] | undefined;
  onChange: (newValues: EquipmentEntry[]) => void;
}

export const BossEquipmentForm: React.FC<Props> = ({ values, onChange }) => {
  return (
    <div className="form-group">
      <Tooltip text={tooltips.Equipment}>
        <label>Equipment</label>
      </Tooltip>
      <StringListInput
        label=""
        name="Equipment"
        values={values}
        onChange={onChange}
        placeholder="e.g., MyHelmet:HEAD, MySword:HAND"
        helpText="Format: [InternalItemName]:[SLOT]"
      />
    </div>
  );
};