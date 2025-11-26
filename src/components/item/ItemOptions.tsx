import React from "react";
import type { ItemOptions } from "../../types";
import {
  TextInput,
  NumberInput,
  CheckboxInput,
  SelectInput,
} from "../common/FormInputs";
import { StringListInput } from "../common/StringListInput";
import { ItemOptionsTooltips as tooltips } from '../../tooltips';
import { Tooltip } from '../common/Tooltip';

interface Props {
  options: ItemOptions;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onListChange: (
    name: "Lore" | "Hide" | "ItemFlags" | "BannerLayers" | "Colors" | "FadeColors" | "Pages",
    newValues: string[]
  ) => void;
}

const name = (key: string) => `Options.${key}`;

const fireworkTypeOptions = [
  { value: "BALL", label: "Ball" },
  { value: "BALL_LARGE", label: "Large Ball" },
  { value: "STAR", label: "Star" },
  { value: "BURST", label: "Burst" },
  { value: "CREEPER", label: "Creeper" },
];

export const ItemOptionsForm: React.FC<Props> = ({
  options,
  onChange,
  onListChange,
}) => {
  return (
    <>
      <details className="form-section" open>
        <summary><h4>Basic Options</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <TextInput
            label="Id (Required)"
            name={name("Id")}
            value={options.Id}
            onChange={onChange}
            placeholder="e.g., DIAMOND_SWORD"
            tooltipText={tooltips.Id}
          />
          <NumberInput
            label="Amount"
            name={name("Amount")}
            value={options.Amount}
            onChange={onChange}
            min={1} max={64}
            tooltipText={tooltips.Amount}
          />
          <NumberInput
            label="Data (Legacy)"
            name={name("Data")}
            value={options.Data}
            onChange={onChange}
            tooltipText={tooltips.Data}
          />
          <NumberInput
            label="Damage (Tools)"
            name={name("Damage")}
            value={options.Damage}
            onChange={onChange}
            tooltipText={tooltips.Damage}
          />
        </div>
      </details>

      <details className="form-section">
        <summary><h4>Visual & Customization</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <NumberInput
            label="CustomModelData"
            name={name("CustomModelData")}
            value={options.CustomModelData}
            onChange={onChange}
            tooltipText={tooltips.CustomModelData}
          />
          <CheckboxInput
            label="Unbreakable"
            name={name("Unbreakable")}
            checked={options.Unbreakable}
            onChange={onChange}
            tooltipText={tooltips.Unbreakable}
          />
          <SelectInput
            label="EnchantmentGlint"
            name={name("EnchantmentGlint")}
            value={options.EnchantmentGlint as string}
            onChange={onChange}
            helpText="5.2.0+"
            options={[
              { value: "AUTO", label: "Auto" },
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ]}
            tooltipText={tooltips.EnchantmentGlint}
          />
          <TextInput
            label="Texture (Base64)"
            name={name("Texture")}
            value={options.Texture}
            onChange={onChange}
            helpText="For PLAYER_HEAD (5.2.0+)"
            tooltipText={tooltips.Texture}
          />
          <TextInput
            label="Player (Head)"
            name={name("Player")}
            value={options.Player}
            onChange={onChange}
            placeholder="e.g., Notch"
            helpText="For PLAYER_HEAD (5.2.0+)"
            tooltipText={tooltips.Player}
          />
          <TextInput
            label="PotionColor (R,G,B)"
            name={name("PotionColor")}
            value={options.PotionColor}
            onChange={onChange}
            placeholder="e.g., 255,0,0"
            helpText="For Potions (5.2.0+)"
            tooltipText={tooltips.PotionColor}
          />
        </div>
      </details>

      <details className="form-section">
        <summary><h4>Text & Flags</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="form-group">
            <Tooltip text={tooltips.Lore}>
              <label>Lore</label>
            </Tooltip>
            <StringListInput
              label=""
              name="Lore"
              values={options.Lore}
              onChange={(v) => onListChange("Lore", v)}
              placeholder="e.g., '&7A legendary blade.'"
              helpText="Item description lines."
            />
          </div>
          
          <div className="form-group">
            <Tooltip text={tooltips.Hide}>
              <label>Hide / ItemFlags</label>
            </Tooltip>
            <StringListInput
              label=""
              name="Hide"
              values={options.Hide || options.ItemFlags}
              onChange={(v) => onListChange("Hide", v)}
              placeholder="e.g., ATTRIBUTES"
              helpText="Flags to hide (e.g., ATTRIBUTES, ENCHANTS)"
            />
          </div>
          
          <div className="form-group">
            <Tooltip text={tooltips.BannerLayers}>
              <label>BannerLayers</label>
            </Tooltip>
            <StringListInput
              label=""
              name="BannerLayers"
              values={options.BannerLayers}
              onChange={(v) => onListChange("BannerLayers", v)}
              placeholder="e.g., WHITE:BASE"
              helpText="5.3.0+"
            />
          </div>
        </div>
      </details>

      <details className="form-section">
        <summary><h4>Book Options</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <TextInput
            label="Book Title"
            name={name("Book.Title")}
            value={options.Book?.Title}
            onChange={onChange}
            tooltipText={tooltips["Book.Title"]}
          />
          <TextInput
            label="Book Author"
            name={name("Book.Author")}
            value={options.Book?.Author}
            onChange={onChange}
            tooltipText={tooltips["Book.Author"]}
          />
          <div className="form-group">
            <Tooltip text={tooltips["Book.Pages"]}>
              <label>Book Pages</label>
            </Tooltip>
            <StringListInput
              label=""
              name="Pages"
              values={options.Book?.Pages}
              onChange={(v) => onListChange("Pages", v)}
              placeholder="e.g., Page 1 text"
              helpText="Add one page at a time."
            />
          </div>
        </div>
      </details>
      
      <details className="form-section">
        <summary><h4>Firework Options</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <NumberInput
            label="Firework Power"
            name={name("Firework.Power")}
            value={options.Firework?.Power}
            onChange={onChange}
            min={0}
            tooltipText={tooltips["Firework.Power"]}
          />
          <CheckboxInput
            label="Firework Flicker"
            name={name("Firework.Flicker")}
            checked={options.Firework?.Flicker}
            onChange={onChange}
            tooltipText={tooltips["Firework.Flicker"]}
          />
          <CheckboxInput
            label="Firework Trail"
            name={name("Firework.Trail")}
            checked={options.Firework?.Trail}
            onChange={onChange}
            tooltipText={tooltips["Firework.Trail"]}
          />
          <SelectInput
            label="Firework Type"
            name={name("Firework.Type")}
            value={options.Firework?.Type}
            onChange={onChange}
            options={fireworkTypeOptions}
            tooltipText={tooltips["Firework.Type"]}
          />
          <div className="form-group">
            <Tooltip text={tooltips["Firework.Colors"]}>
              <label>Firework Colors (R,G,B)</label>
            </Tooltip>
            <StringListInput
              label=""
              name="Colors"
              values={options.Firework?.Colors}
              onChange={(v) => onListChange("Colors", v)}
              placeholder="e.g., 255,0,0"
            />
          </div>
          <div className="form-group">
            <Tooltip text={tooltips["Firework.FadeColors"]}>
              <label>Firework FadeColors (R,G,B)</label>
            </Tooltip>
            <StringListInput
              label=""
              name="FadeColors"
              values={options.Firework?.FadeColors}
              onChange={(v) => onListChange("FadeColors", v)}
              placeholder="e.g., 0,255,0"
            />
          </div>
        </div>
      </details>
      
      <details className="form-section">
        <summary><h4>Map Options</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <NumberInput
            label="Map ID"
            name={name("Map.MapID")}
            value={options.Map?.MapID}
            onChange={onChange}
            tooltipText={tooltips["Map.MapID"]}
          />
          <TextInput
            label="Map Color (R,G,B)"
            name={name("Map.Color")}
            value={options.Map?.Color}
            onChange={onChange}
            placeholder="e.g., 0,0,255"
            tooltipText={tooltips["Map.Color"]}
          />
          <TextInput
            label="Map Location (World,X,Y,Z)"
            name={name("Map.Location")}
            value={options.Map?.Location}
            onChange={onChange}
            placeholder="e.g., world,100,64,100"
            tooltipText={tooltips["Map.Location"]}
          />
           <CheckboxInput
            label="Map Locked"
            name={name("Map.Locked")}
            checked={options.Map?.Locked}
            onChange={onChange}
            tooltipText={tooltips["Map.Locked"]}
          />
           <CheckboxInput
            label="Map Downscale"
            name={name("Map.Downscale")}
            checked={options.Map?.Downscale}
            onChange={onChange}
            tooltipText={tooltips["Map.Downscale"]}
          />
        </div>
      </details>
    </>
  );
}