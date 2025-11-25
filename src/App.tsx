// src/App.tsx
import React, { useState, useCallback } from "react";
import "./style/App.css";
import { BossConfigurator } from "./components/BossConfigurator";
import { ItemConfigurator } from "./components/ItemConfigurator";
import type { BossConfig, ItemConfig } from "./types";
import { stringify } from "yaml";

/**
 * オブジェクトから未定義 (undefined, null, '', []) のプロパティを再帰的に削除します。
 * @param obj フィルタリングするオブジェクト
 */
function cleanObject(obj: any): any {
  if (Array.isArray(obj)) {
    // 配列の場合は、中身をクリーンにして、空でなければ返す
    const cleanedArray = obj
      .map(cleanObject)
      .filter(
        (v) => v !== null && v !== undefined && v !== ""
      );
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }
  if (typeof obj === "object" && obj !== null) {
    // オブジェクトの場合は、各プロパティをクリーンにする
    const cleanedObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const cleanedValue = cleanObject(value);

        if (
          cleanedValue !== undefined &&
          cleanedValue !== null &&
          cleanedValue !== "" &&
          !(Array.isArray(cleanedValue) && cleanedValue.length === 0)
        ) {
          cleanedObj[key] = cleanedValue;
        }
      }
    }
    // オブジェクトが空になった場合は undefined を返す
    return Object.keys(cleanedObj).length > 0
      ? cleanedObj
      : undefined;
  }
  // プリミティブ値 (string, number, boolean)
  if (obj === "") return undefined;
  return obj;
}

export default function App() {
  const [configType, setConfigType] = useState<"boss" | "item" | "none">(
    "none"
  );
  const [generatedYaml, setGeneratedYaml] = useState(
    "ここにYAMLコードが生成されます..."
  );

  // Bossの初期設定 (新しい型定義に合わせて初期化)
  const [bossConfig, setBossConfig] = useState<BossConfig>({
    internalName: "MyCoolBoss",
    Options: {
      Type: "ZOMBIE",
      Health: 100,
    },
    // 他の項目は未設定 (undefined) にしておく
    Equipment: [],
    AIGoalSelectors: [],
    AITargetSelectors: [],
    KillMessages: [],
    ImmunityTables: [],
  });

  // Itemの初期設定 (新しい型定義に合わせて初期化)
  const [itemConfig, setItemConfig] = useState<ItemConfig>({
    internalName: "MyCoolItem",
    Options: {
      Id: "DIAMOND_SWORD",
      DisplayName: "'&bCool Sword'",
    },
    // 他の項目は未設定 (undefined) にしておく
    Attributes: [],
    Enchantments: [],
    Potions: [],
  });

  // YAML生成ロジック (cleanObject を使用)
  const handleGenerateCode = useCallback(() => {
    let outputObject = {};
    let yamlString = "";

    try {
      if (configType === "boss") {
        // internalName はキーとして使うので、元のオブジェクトから削除
        const { internalName, ...configData } = bossConfig;
        if (!internalName) {
          setGeneratedYaml(
            "Error: Internal Name (YAMLのキー) を設定してください。"
          );
          return;
        }
        // 未設定の項目を除外
        const cleanedData = cleanObject(configData);
        outputObject = {
          [internalName]: cleanedData,
        };
      } else if (configType === "item") {
        const { internalName, ...configData } = itemConfig;
        if (!internalName) {
          setGeneratedYaml(
            "Error: Internal Name (YAMLのキー) を設定してください。"
          );
          return;
        }
        // 未設定の項目を除外
        const cleanedData = cleanObject(configData);
        outputObject = {
          [internalName]: cleanedData,
        };
      } else {
        setGeneratedYaml("Error: BossまたはItemを選択してください。");
        return;
      }

      yamlString = stringify(outputObject, { indent: 2 });
      setGeneratedYaml(yamlString);
    } catch (error) {
      console.error(error);
      setGeneratedYaml(
        `Error: YAMLの生成に失敗しました。\n${(error as Error).message}`
      );
    }
  }, [configType, bossConfig, itemConfig]);

  // クリップボードにコピー
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedYaml)
      .then(() => {
        alert("クリップボードにコピーしました！");
      })
      .catch((err) => {
        alert("コピーに失敗しました。");
        console.error("Copy failed: ", err);
      });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        MythicMobs - YAML Generator
      </header>

      <main className="main-layout">
        {/* 左側: 設定パネル */}
        <div className="config-panel">
          {/* (変更なし) ... タイプ選択 */}
          <div className="form-section">
            <h3>1. Generate Type</h3>
            <div className="type-selector">
              <button
                className={`button ${
                  configType === "boss"
                    ? "button-primary"
                    : "button-secondary"
                }`}
                onClick={() => setConfigType("boss")}
              >
                Boss
              </button>
              <button
                className={`button ${
                  configType === "item"
                    ? "button-primary"
                    : "button-secondary"
                }`}
                onClick={() => setConfigType("item")}
              >
                Item
              </button>
            </div>
          </div>

          {/* (変更なし) ... 設定オプション */}
          {configType === "boss" && (
            <BossConfigurator
              config={bossConfig}
              setConfig={setBossConfig}
            />
          )}
          {configType === "item" && (
            <ItemConfigurator
              config={itemConfig}
              setConfig={setItemConfig}
            />
          )}

          {/* (変更なし) ... 生成ボタン */}
          {configType !== "none" && (
            <div className="form-section">
              <h3>Generate Code</h3>
              <button
                className="button button-primary"
                style={{ width: "100%" }}
                onClick={handleGenerateCode}
              >
                GENERATE YAML CODE
              </button>
            </div>
          )}
        </div>

        {/* (変更なし) ... 右側: 出力パネル */}
        <div className="output-panel">
          <div className="output-header">
            <h3>Generated MythicMobs YAML</h3>
            <button
              className="button button-secondary"
              onClick={handleCopyToClipboard}
            >
              COPY TO CLIPBOARD
            </button>
          </div>
          <textarea
            className="yaml-output"
            value={generatedYaml}
            readOnly
            spellCheck="false"
          />
        </div>
      </main>
    </div>
  );
}