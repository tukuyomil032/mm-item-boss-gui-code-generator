import React from "react";
import { StringListInput } from "../common/StringListInput";
import type { KillMessageEntry } from "../../types";
import { Tooltip } from "../common/Tooltip";
import { BossKillMessagesTooltips as tooltips } from '../../tooltips';

interface Props {
  values: KillMessageEntry[] | undefined;
  onChange: (newValues: KillMessageEntry[]) => void;
}

export const BossKillMessagesForm: React.FC<Props> = ({ values, onChange }) => {
  return (
    <div className="form-group">
      <Tooltip text={tooltips.KillMessages}>
        <label>Kill Messages</label>
      </Tooltip>
      <StringListInput
        label=""
        name="KillMessages"
        values={values}
        onChange={onChange}
        placeholder="e.g., '<target.name> was slain by <mob.name>'"
        helpText="Messages shown on player death."
      />
    </div>
  );
};