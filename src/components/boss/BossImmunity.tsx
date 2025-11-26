import React from "react";
import { StringListInput } from "../common/StringListInput";
import type { ImmunityEntry } from "../../types";
import { Tooltip } from "../common/Tooltip";
import { BossImmunityTooltips as tooltips } from '../../tooltips';

interface Props {
  values: ImmunityEntry[] | undefined;
  onChange: (newValues: ImmunityEntry[]) => void;
}

export const BossImmunityForm: React.FC<Props> = ({ values, onChange }) => {
  return (
    <div className="form-group">
      <Tooltip text={tooltips.ImmunityTables}>
        <label>Immunity Tables</label>
      </Tooltip>
      <StringListInput
        label=""
        name="ImmunityTables"
        values={values}
        onChange={onChange}
        placeholder="e.g., FIRE_TICK:0, LAVA:0, FALL:1"
        helpText="Damage immunities. (e.g., DAMAGE_TYPE:multiplier)"
      />
    </div>
  );
};