// src/components/item/ItemConfigurator.tsx
import React, { useState } from "react"; // ★ 1. useState をインポート
import type { ItemConfig } from "../../types";

// Tooltips
import { ItemInternalNameTooltip as tooltips } from '../../tooltips';

// Child Components
import { TextInput, SelectInput } from "../common/FormInputs"; // ★ 2. SelectInput をインポート
import { ItemOptionsForm } from "./ItemOptions";
import { ItemAttributesForm } from "./ItemAttributes";
import { ItemEnchantmentsForm } from "./ItemEnchantments";
import { ItemPotionsForm } from "./ItemPotions";

interface Props {
  config: ItemConfig;
  setConfig: React.Dispatch<React.SetStateAction<ItemConfig>>;
}

// ★ 3. カテゴリのリストを定義
const itemCategories = [
  { value: "Options", label: "1. Options" },
  { value: "Attributes", label: "2. Attributes" },
  { value: "Enchantments", label: "3. Enchantments" },
  { value: "Potions", label: "4. Potions" },
];
// ★ 4. カテゴリの型を定義
type ItemCategory = "Options" | "Attributes" | "Enchantments" | "Potions";


export function ItemConfigurator({ config, setConfig }: Props) {

  // ★ 5. アクティブなカテゴリを管理するState。デフォルトは'Options'
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("Options");

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

  // (handleRootListChange 関数は変更なし)
  const handleRootListChange = (
    name: "Attributes" | "Enchantments" | "Potions", 
    newValues: string[]
  ) => {
     setConfig((prev) => ({
      ...prev,
      [name]: newValues,
    }));
  };
  
  // (handleOptionsListChange 関数は変更なし)
  const handleOptionsListChange = (
    name: "Lore" | "Hide" | "ItemFlags" | "BannerLayers" | "Colors" | "FadeColors" | "Pages",
    newValues: string[]
  ) => {
     setConfig((prev) => {
        const newOptions = {...prev.Options};
        
        if (name === "Colors" || name === "FadeColors") {
          newOptions.Firework = { ...newOptions.Firework, [name]: newValues };
        } else if (name === "Pages") {
          newOptions.Book = { ...newOptions.Book, [name]: newValues };
        } else if (name === "Hide" || name === "ItemFlags") {
          newOptions["Hide"] = newValues;
          newOptions["ItemFlags"] = newValues;
        }
         else {
          newOptions[name as "Lore" | "BannerLayers"] = newValues;
        }

        return {
          ...prev,
          Options: newOptions
        };
     });
  };

  return (
    <>
      {/* 1. InternalName (変更なし) */}
      <div className="form-section">
        <h3>Item Internal Name</h3>
        <TextInput
          label="Internal Item Name (YAML Key)"
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
          onChange={(e) => setActiveCategory(e.target.value as ItemCategory)}
          options={itemCategories}
          tooltipText="編集したい設定のカテゴリを選択してください。"
        />
      </div>

      {/* ★ 7. 条件付きレンダリングに変更 */}
      
      {activeCategory === "Options" && (
        <div className="form-section">
          <h3>1. Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <ItemOptionsForm
              options={config.Options}
              onChange={handleChange}
              onListChange={handleOptionsListChange}
            />
          </div>
        </div>
      )}

      {activeCategory === "Attributes" && (
        <div className="form-section">
          <h3>2. Attributes</h3>
          <ItemAttributesForm
            values={config.Attributes}
            onChange={(v) => handleRootListChange("Attributes", v)}
          />
        </div>
      )}
      
      {activeCategory === "Enchantments" && (
        <div className="form-section">
          <h3>3. Enchantments</h3>
          <ItemEnchantmentsForm
            values={config.Enchantments}
            onChange={(v) => handleRootListChange("Enchantments", v)}
          />
        </div>
      )}

      {activeCategory === "Potions" && (
        <div className="form-section">
          <h3>4. Potions</h3>
          <ItemPotionsForm
            values={config.Potions}
            onChange={(v) => handleRootListChange("Potions", v)}
          />
        </div>
      )}
    </>
  );
}