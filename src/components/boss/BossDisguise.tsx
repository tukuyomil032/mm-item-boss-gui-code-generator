// src/components/boss/BossDisguise.tsx
import React from "react";
import type { DisguiseOptions } from "../../types";
import {
  TextInput,
  NumberInput,
  CheckboxInput,
} from "../common/FormInputs";
// Import Tooltips
import { BossDisguiseTooltips as tooltips } from '../../tooltips';

interface Props {
  options: DisguiseOptions;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// Helper to create nested name attribute
const name = (key: keyof DisguiseOptions) => `Disguise.${key}`;

export const BossDisguiseForm: React.FC<Props> = ({ options, onChange }) => {
  return (
    <>
      <details className="form-section" open>
        <summary><h4>General Disguise</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <TextInput
            label="Type (Required)"
            name={name("Type")}
            value={options.Type}
            onChange={onChange}
            placeholder="e.g., PLAYER, ZOMBIE, ARMOR_STAND"
            tooltipText={tooltips.Type}
          />
          <TextInput
            label="Skin (Player)"
            name={name("Skin")}
            value={options.Skin}
            onChange={onChange}
            placeholder="e.g., Notch or URL"
            tooltipText={tooltips.Skin}
          />
          <TextInput
            label="Item (Item/FallingBlock)"
            name={name("Item")}
            value={options.Item}
            onChange={onChange}
            placeholder="e.g., STONE"
            tooltipText={tooltips.Item}
          />
          <NumberInput
            label="ItemData (Legacy)"
            name={name("ItemData")}
            value={options.ItemData}
            onChange={onChange}
            tooltipText={tooltips.ItemData}
          />
          <NumberInput
            label="ItemAmount (Item)"
            name={name("ItemAmount")}
            value={options.ItemAmount}
            onChange={onChange}
            tooltipText={tooltips.ItemAmount}
          />
          <TextInput
            label="Pose"
            name={name("Pose")}
            value={options.Pose}
            onChange={onChange}
            placeholder="e.g., SLEEPING"
            tooltipText={tooltips.Pose}
          />
        </div>
      </details>
      
      <details className="form-section">
        <summary><h4>General Toggles</h4></summary>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem" }}>
          <CheckboxInput label="Burning" name={name("Burning")} checked={options.Burning} onChange={onChange} tooltipText={tooltips.Burning} />
          <CheckboxInput label="Blocking" name={name("Blocking")} checked={options.Blocking} onChange={onChange} tooltipText={tooltips.Blocking} />
          <CheckboxInput label="Invisible" name={name("Invisible")} checked={options.Invisible} onChange={onChange} tooltipText={tooltips.Invisible} />
          <CheckboxInput label="ShowName" name={name("ShowName")} checked={options.ShowName} onChange={onChange} tooltipText={tooltips.ShowName} />
          <CheckboxInput label="Sneaking" name={name("Sneaking")} checked={options.Sneaking} onChange={onChange} tooltipText={tooltips.Sneaking} />
          <CheckboxInput label="Sprinting" name={name("Sprinting")} checked={options.Sprinting} onChange={onChange} tooltipText={tooltips.Sprinting} />
          <CheckboxInput label="ModifyBoundingBox" name={name("ModifyBoundingBox")} checked={options.ModifyBoundingBox} onChange={onChange} tooltipText={tooltips.ModifyBoundingBox} />
        </div>
      </details>

      <details className="form-section">
        <summary><h4>ArmorStand</h4></summary>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem" }}>
          <CheckboxInput label="ArmorStandInvisible" name={name("ArmorStandInvisible")} checked={options.ArmorStandInvisible} onChange={onChange} tooltipText={tooltips.ArmorStandInvisible} />
          <CheckboxInput label="ArmorStandMarker" name={name("ArmorStandMarker")} checked={options.ArmorStandMarker} onChange={onChange} tooltipText={tooltips.ArmorStandMarker} />
          <CheckboxInput label="ArmorStandBasePlate" name={name("ArmorStandBasePlate")} checked={options.ArmorStandBasePlate} onChange={onChange} tooltipText={tooltips.ArmorStandBasePlate} />
          <CheckboxInput label="ArmorStandArms" name={name("ArmorStandArms")} checked={options.ArmorStandArms} onChange={onChange} tooltipText={tooltips.ArmorStandArms} />
          <CheckboxInput label="ArmorStandSmall" name={name("ArmorStandSmall")} checked={options.ArmorStandSmall} onChange={onChange} tooltipText={tooltips.ArmorStandSmall} />
        </div>
      </details>
      
      <details className="form-section">
        <summary><h4>Mob-Specific</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <NumberInput label="ArrowCount" name={name("ArrowCount")} value={options.ArrowCount} onChange={onChange} tooltipText={tooltips.ArrowCount} />
          <CheckboxInput label="BatHanging" name={name("BatHanging")} checked={options.BatHanging} onChange={onChange} tooltipText={tooltips.BatHanging} />
          <CheckboxInput label="CreeperPowered" name={name("CreeperPowered")} checked={options.CreeperPowered} onChange={onChange} tooltipText={tooltips.CreeperPowered} />
          <CheckboxInput label="CreeperIgnited" name={name("CreeperIgnited")} checked={options.CreeperIgnited} onChange={onChange} tooltipText={tooltips.CreeperIgnited} />
          <TextInput label="EndermanBlock" name={name("EndermanBlock")} value={options.EndermanBlock} onChange={onChange} placeholder="e.g., GRASS" tooltipText={tooltips.EndermanBlock} />
          <CheckboxInput label="GhastAggressive" name={name("GhastAggressive")} checked={options.GhastAggressive} onChange={onChange} tooltipText={tooltips.GhastAggressive} />
          <CheckboxInput label="GuardianElderly" name={name("GuardianElderly")} checked={options.GuardianElderly} onChange={onChange} tooltipText={tooltips.GuardianElderly} />
          <TextInput label="HorseColor" name={name("HorseColor")} value={options.HorseColor} onChange={onChange} placeholder="e.g., WHITE" tooltipText={tooltips.HorseColor} />
          <TextInput label="HorseStyle" name={name("HorseStyle")} value={options.HorseStyle} onChange={onChange} placeholder="e.g., BLACK_DOTS" tooltipText={tooltips.HorseStyle} />
          <CheckboxInput label="HorseChest" name={name("HorseChest")} checked={options.HorseChest} onChange={onChange} tooltipText={tooltips.HorseChest} />
          <CheckboxInput label="HorseSaddled" name={name("HorseSaddled")} checked={options.HorseSaddled} onChange={onChange} tooltipText={tooltips.HorseSaddled} />
          <TextInput label="HorseArmor" name={name("HorseArmor")} value={options.HorseArmor} onChange={onChange} placeholder="e.g., IRON" tooltipText={tooltips.HorseArmor} />
          <CheckboxInput label="IronGolemLPlayerCreated" name={name("IronGolemLPlayerCreated")} checked={options.IronGolemLPlayerCreated} onChange={onChange} tooltipText={tooltips.IronGolemLPlayerCreated} />
          <TextInput label="OcelotType" name={name("OcelotType")} value={options.OcelotType} onChange={onChange} placeholder="e.g., RED" tooltipText={tooltips.OcelotType} />
          <CheckboxInput label="PigSaddled" name={name("PigSaddled")} checked={options.PigSaddled} onChange={onChange} tooltipText={tooltips.PigSaddled} />
          <TextInput label="RabbitType" name={name("RabbitType")} value={options.RabbitType} onChange={onChange} placeholder="e.g., BLACK" tooltipText={tooltips.RabbitType} />
          <TextInput label="SheepColor" name={name("SheepColor")} value={options.SheepColor} onChange={onChange} placeholder="e.g., BLUE" tooltipText={tooltips.SheepColor} />
          <CheckboxInput label="SheepSheared" name={name("SheepSheared")} checked={options.SheepSheared} onChange={onChange} tooltipText={tooltips.SheepSheared} />
          <NumberInput label="SlimeSize" name={name("SlimeSize")} value={options.SlimeSize} onChange={onChange} tooltipText={tooltips.SlimeSize} />
          <NumberInput label="MagmaClientSize" name={name("MagmaClientSize")} value={options.MagmaClientSize} onChange={onChange} tooltipText={tooltips.MagmaClientSize} />
          <CheckboxInput label="SnowmanDerp" name={name("SnowmanDerp")} checked={options.SnowmanDerp} onChange={onChange} tooltipText={tooltips.SnowmanDerp} />
          <TextInput label="VillagerProfession" name={name("VillagerProfession")} value={options.VillagerProfession} onChange={onChange} placeholder="e.g., LIBRARIAN" tooltipText={tooltips.VillagerProfession} />
          <CheckboxInput label="WolfAngry" name={name("WolfAngry")} checked={options.WolfAngry} onChange={onChange} tooltipText={tooltips.WolfAngry} />
          <CheckboxInput label="WolfSitting" name={name("WolfSitting")} checked={options.WolfSitting} onChange={onChange} tooltipText={tooltips.WolfSitting} />
          <TextInput label="WolfCollarColor" name={name("WolfCollarColor")} value={options.WolfCollarColor} onChange={onChange} placeholder="e.g., RED" tooltipText={tooltips.WolfCollarColor} />
          <TextInput label="ZombieType" name={name("ZombieType")} value={options.ZombieType} onChange={onChange} placeholder="e.g., HUSK" tooltipText={tooltips.ZombieType} />
          <TextInput label="ZombieVillagerProfession" name={name("ZombieVillagerProfession")} value={options.ZombieVillagerProfession} onChange={onChange} placeholder="e.g., FARMER" tooltipText={tooltips.ZombieVillagerProfession} />
          <CheckboxInput label="ZombieBaby" name={name("ZombieBaby")} checked={options.ZombieBaby} onChange={onChange} tooltipText={tooltips.ZombieBaby} />
          <CheckboxInput label="ZombieConversion" name={name("ZombieConversion")} checked={options.ZombieConversion} onChange={onChange} tooltipText={tooltips.ZombieConversion} />
          <TextInput label="CatType" name={name("CatType")} value={options.CatType} onChange={onChange} tooltipText={tooltips.CatType} />
          <TextInput label="FoxType" name={name("FoxType")} value={options.FoxType} onChange={onChange} tooltipText={tooltips.FoxType} />
          <TextInput label="MooshroomType" name={name("MooshroomType")} value={options.MooshroomType} onChange={onChange} placeholder="e.g., BROWN" tooltipText={tooltips.MooshroomType} />
          <TextInput label="PandaGene" name={name("PandaGene")} value={options.PandaGene} onChange={onChange} tooltipText={tooltips.PandaGene} />
          <TextInput label="ParrotVariant" name={name("ParrotVariant")} value={options.ParrotVariant} onChange={onChange} tooltipText={tooltips.ParrotVariant} />
          <NumberInput label="PufferFishState" name={name("PufferFishState")} value={options.PufferFishState} onChange={onChange} tooltipText={tooltips.PufferFishState} />
          <TextInput label="TropicalFishType" name={name("TropicalFishType")} value={options.TropicalFishType} onChange={onChange} tooltipText={tooltips.TropicalFishType} />
        </div>
      </details>
    </>
  );
};