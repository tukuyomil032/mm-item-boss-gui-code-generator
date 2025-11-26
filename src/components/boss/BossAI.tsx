// src/components/boss/BossAI.tsx
import React from "react";
import { StringListInput } from "../common/StringListInput";
import type { AIEntry } from "../../types";
// Import Tooltips
import { Tooltip } from "../common/Tooltip";
import { BossAITooltips as tooltips } from '../../tooltips';

interface Props {
  goals: AIEntry[] | undefined;
  targets: AIEntry[] | undefined;
  onGoalChange: (newValues: AIEntry[]) => void;
  onTargetChange: (newValues: AIEntry[]) => void;
}

export const BossAIForm: React.FC<Props> = ({
  goals,
  targets,
  onGoalChange,
  onTargetChange,
}) => {
  return (
    <>
      <div className="form-group">
        <Tooltip text={tooltips.AIGoalSelectors}>
          <label>AI Goal Selectors</label>
        </Tooltip>
        <StringListInput
          label=""
          name="AIGoalSelectors"
          values={goals}
          onChange={onGoalChange}
          placeholder="e.g., 1:randomstroll"
          helpText="Behavior AI (e.g., wander, look at player)"
        />
      </div>
      
      <div className="form-group">
        <Tooltip text={tooltips.AITargetSelectors}>
          <label>AI Target Selectors</label>
        </Tooltip>
        <StringListInput
          label=""
          name="AITargetSelectors"
          values={targets}
          onChange={onTargetChange}
          placeholder="e.g., 1:players"
          helpText="Targeting AI (e.g., target players)"
        />
      </div>
    </>
  );
};