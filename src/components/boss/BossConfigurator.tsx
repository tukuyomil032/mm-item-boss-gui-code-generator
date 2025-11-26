// src/components/boss/BossConfigurator.tsx
import React, { useState } from "react"; // ★ 1. useState をインポート
import type { BossConfig } from "../../types";

// Tooltips
import { BossInternalNameTooltip as tooltips } from '../../tooltips';

// Child Components
import { TextInput, SelectInput } from "../common/FormInputs"; // ★ 2. SelectInput をインポート
import { BossOptionsForm } from "./BossOptions";
import { BossDisplayForm } from "./BossDisplay";
import { BossEquipmentForm } from "./BossEquipment";
import { BossBarForm } from "./BossBar";
import { BossAIForm } from "./BossAI";
import { BossKillMessagesForm } from "./BossKillMessages";
import { BossImmunityForm } from "./BossImmunity";
import { BossDisguiseForm } from "./BossDisguise";

interface Props {
  config: BossConfig;
  setConfig: React.Dispatch<React.SetStateAction<BossConfig>>;
}

// ★ 3. カテゴリのリストを定義
const bossCategories = [
  { value: "Options", label: "1. Options" },
  { value: "Display", label: "2. Display Options" },
  { value: "Equipment", label: "3. Equipment" },
  { value: "BossBar", label: "4. BossBar" },
  { value: "AI", label: "5. Custom AI" },
  { value: "KillMessages", label: "7. Kill Messages" },
  { value: "Immunity", label: "8. Immunity Tables" },
  { value: "Disguise", label: "9. Disguise" },
];
// ★ 4. カテゴリの型を定義
type BossCategory = "Options" | "Display" | "Equipment" | "BossBar" | "AI" | "KillMessages" | "Immunity" | "Disguise";


export function BossConfigurator({ config, setConfig }: Props) {
  
  // ★ 5. アクティブなカテゴリを管理するState。デフォルトは'Options'
  const [activeCategory, setActiveCategory] = useState<BossCategory>("Options");
  
  // (handleChange 関数は変更なし)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const checked = (e.target as HTMLInputElement).checked;
    const isNumber = type === "number";

    const keys = name.split(".");
    
    setConfig((prev) => {
      const newState = JSON.parse(JSON.stringify(prev)); 
      let current = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}; 
        }
        current = current[keys[i]];
      }

      const finalKey = keys[keys.length - 1];
      if (isCheckbox) {
        current[finalKey] = checked;
      } else if (isNumber) {
        current[finalKey] = value === "" ? undefined : Number(value);
      } else {
        current[finalKey] = value === "" ? undefined : value;
      }

      return newState;
    });
  };

  // (handleListChange 関数は変更なし)
  const handleListChange = (name: keyof BossConfig, newValues: string[]) => {
     setConfig((prev) => ({
      ...prev,
      [name]: newValues,
    }));
  };

  return (
    <>
      {/* 1. InternalName (変更なし) */}
      <div className="form-section">
        <h3>Mob Internal Name</h3>
        <TextInput
          label="Internal Mob Name (YAML Key)"
          name="internalName"
          value={config.internalName}
          onChange={handleChange}
          tooltipText={tooltips.internalName}
        />
      </div>

      {/* ★ 6. カテゴリ選択のドロップダウンを追加 */}
      <div className="form-section">
        <h3>Category Select</h3>
        <SelectInput
          label="Select Category to Edit"
          name="category-select"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value as BossCategory)}
          options={bossCategories}
          tooltipText="編集したい設定のカテゴリを選択してください。"
        />
      </div>

      {/* ★ 7. 条件付きレンダリングに変更 */}
      {/* 以前の <details> タグを削除し、
        activeCategory に応じて単一のフォームだけを表示します。
        各フォームは .form-section でラップします。
      */}
      
      {activeCategory === "Options" && (
        <div className="form-section">
          <h3>1. Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <BossOptionsForm
              options={config.Options || {}}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {activeCategory === "Display" && (
        <div className="form-section">
          <h3>2. Display Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <BossDisplayForm
              options={config.DisplayOptions || {}}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      
      {activeCategory === "Equipment" && (
        <div className="form-section">
          <h3>3. Equipment</h3>
          <BossEquipmentForm
            values={config.Equipment}
            onChange={(v) => handleListChange("Equipment", v)}
          />
        </div>
      )}

      {activeCategory === "BossBar" && (
        <div className="form-section">
          <h3>4. BossBar</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <BossBarForm
              options={config.BossBar || {}}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      
      {activeCategory === "AI" && (
        <div className="form-section">
          <h3>5. Custom AI</h3>
          <BossAIForm
            goals={config.AIGoalSelectors}
            targets={config.AITargetSelectors}
            onGoalChange={(v) => handleListChange("AIGoalSelectors", v)}
            onTargetChange={(v) => handleListChange("AITargetSelectors", v)}
          />
        </div>
      )}

      {activeCategory === "KillMessages" && (
        <div className="form-section">
          <h3>7. Kill Messages</h3>
          <BossKillMessagesForm
            values={config.KillMessages}
            onChange={(v) => handleListChange("KillMessages", v)}
          />
        </div>
      )}

      {activeCategory === "Immunity" && (
        <div className="form-section">
          <h3>8. Immunity Tables</h3>
          <BossImmunityForm
            values={config.ImmunityTables}
            onChange={(v) => handleListChange("ImmunityTables", v)}
          />
        </div>
      )}
      
      {activeCategory === "Disguise" && (
        <div className="form-section">
          <h3>9. Disguise</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <BossDisguiseForm
              options={config.Disguise || { Type: "" }}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </>
  );
}