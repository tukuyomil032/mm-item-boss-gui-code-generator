import React, { useState, useCallback } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { BossConfigurator } from "./components/boss/BossConfigurator";
import { ItemConfigurator } from "./components/item/ItemConfigurator";
import { DocsPage } from './components/DocsPage';
import type { BossConfig, ItemConfig } from "./types";
import { stringify } from "yaml";

function cleanObject(obj: any): any {
  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map(cleanObject)
      .filter((v) => v !== null && v !== undefined && v !== "");
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }
  if (typeof obj === "object" && obj !== null) {
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
    return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
  }
  if (obj === "") return undefined;
  return obj;
}

interface GeneratorPageProps {
  configType: 'boss' | 'item';
  setConfigType: React.Dispatch<React.SetStateAction<'boss' | 'item'>>;
  generatedYaml: string;
  bossConfig: BossConfig;
  setBossConfig: React.Dispatch<React.SetStateAction<BossConfig>>;
  itemConfig: ItemConfig;
  setItemConfig: React.Dispatch<React.SetStateAction<ItemConfig>>;
  handleGenerateCode: () => void;
  handleCopyToClipboard: () => void;
  isCopied: boolean;
}

const GeneratorPage: React.FC<GeneratorPageProps> = ({
  configType, setConfigType,
  generatedYaml,
  bossConfig, setBossConfig,
  itemConfig, setItemConfig,
  handleGenerateCode,
  handleCopyToClipboard,
  isCopied
}) => {
  return (
    <main className="app-layout">
      <div className="config-panel">
        
        <div className="form-section">
          <h3>1. Generate Type</h3>
          <div className="type-selector">
            <button
              className={`button ${
                configType === "boss" ? "button-primary" : ""
              }`}
              onClick={() => setConfigType("boss")}
            >
              Boss
            </button>
            <button
              className={`button ${
                configType === "item" ? "button-primary" : ""
              }`}
              onClick={() => setConfigType("item")}
            >
              Item
            </button>
          </div>
        </div>

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

        <div className="form-section" style={{ marginTop: 'auto', paddingTop: '15px' }}>
          <button
            className="button button-primary"
            style={{ width: "100%" }}
            onClick={handleGenerateCode}
          >
            GENERATE YAML CODE
          </button>
        </div>
      </div>

      <div className="output-panel">
        <div className="output-header">
          <h3>Generated MythicMobs YAML</h3>
          <button
            className={`button button-secondary ${isCopied ? 'copied' : ''}`}
            onClick={handleCopyToClipboard}
            disabled={isCopied}
          >
            {isCopied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                COPIED!
              </>
            ) : (
              'COPY'
            )}
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
  );
};


export default function App() {
  const [configType, setConfigType] = useState<'boss' | 'item'>('boss');
  const [generatedYaml, setGeneratedYaml] = useState(
    "ここにYAMLコードが生成されます..."
  );
  const [bossConfig, setBossConfig] = useState<BossConfig>({
    internalName: "MyCoolBoss",
    Options: { Type: "ZOMBIE", Health: 100 },
    Equipment: [], AIGoalSelectors: [], AITargetSelectors: [],
    KillMessages: [], ImmunityTables: [],
  });
  const [itemConfig, setItemConfig] = useState<ItemConfig>({
    internalName: "MyCoolItem",
    Options: { Id: "DIAMOND_SWORD" },
    Attributes: [], Enchantments: [], Potions: [],
  });

  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateCode = useCallback(() => {
    let outputObject = {};
    let yamlString = "";
    try {
      if (configType === "boss") {
        const { internalName, ...configData } = bossConfig;
        if (!internalName) {
          setGeneratedYaml("Error: Internal Name (YAMLのキー) を設定してください。");
          return;
        }
        const cleanedData = cleanObject(configData);
        outputObject = { [internalName]: cleanedData };
      } else if (configType === "item") {
        const { internalName, ...configData } = itemConfig;
        if (!internalName) {
          setGeneratedYaml("Error: Internal Name (YAMLのキー) を設定してください。");
          return;
        }
        const cleanedData = cleanObject(configData);
        outputObject = { [internalName]: cleanedData };
      }
      yamlString = stringify(outputObject, { indent: 2 });
      setGeneratedYaml(yamlString);
    } catch (error) {
      console.error(error);
      setGeneratedYaml(`Error: YAMLの生成に失敗しました。\n${(error as Error).message}`);
    }
  }, [configType, bossConfig, itemConfig]);

  const handleCopyToClipboard = useCallback(() => {
    if (isCopied) return;

    navigator.clipboard.writeText(generatedYaml).then(() => {
        setIsCopied(true); 
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); 
      }).catch((err) => {
        alert("コピーに失敗しました。"); 
        console.error("Copy failed: ", err);
      });
  }, [isCopied, generatedYaml]);

  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/">
          <h1>MythicMobs - YAML Generator</h1>
        </Link>
        <Link to="/docs">
          <button className="button button-secondary">
            Docs
          </button>
        </Link>
      </header>

      <Routes>
        <Route 
          path="/" 
          element={
            <GeneratorPage 
              configType={configType}
              setConfigType={setConfigType}
              generatedYaml={generatedYaml}
              bossConfig={bossConfig}
              setBossConfig={setBossConfig}
              itemConfig={itemConfig}
              setItemConfig={setItemConfig}
              handleGenerateCode={handleGenerateCode}
              handleCopyToClipboard={handleCopyToClipboard}
              isCopied={isCopied}
            />
          } 
        />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </div>
  );
}