// src/components/boss/BossOptions.tsx
import React from "react";
import type { BossOptions } from "../../types";
import {
  TextInput,
  NumberInput,
  CheckboxInput,
  SelectInput,
} from "../common/FormInputs";
// ★ 1. 修正: tooltips と一緒に mobTypeOptions もインポート
import { BossOptionsTooltips as tooltips, mobTypeOptions } from '../../tooltips';

interface Props {
  options: BossOptions;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// Helper to create nested name attribute (e.g., "Options.Type")
const name = (key: keyof BossOptions) => `Options.${key}`;

// ★ 2. 削除: ローカルの mobTypeOptions 定義を削除 (tooltips.ts からインポート)

const dragonPhaseOptions = [
  { value: "CIRCLING", label: "CIRCLING" },
  { value: "STRAFING", label: "STRAFING" },
  { value: "FLYING_TO_PORTAL", label: "FLYING_TO_PORTAL" },
  { value: "LANDING_ON_PORTAL", label: "LANDING_ON_PORTAL" },
  { value: "BREATH_ATTACK", label: "BREATH_ATTACK" },
  { value: "SEARCHING_FOR_BREATH_ATTACK_TARGET", label: "SEARCHING_FOR_BREATH_ATTACK_TARGET" },
  { value: "ROARING_BEFORE_BREATH_ATTACK", label: "ROARING_BEFORE_BREATH_ATTACK" },
  { value: "CHARGING_PLAYER", label: "CHARGING_PLAYER" },
  { value: "DYING", label: "DYING" },
  { value: "HOVERING_NO_TARGET", label: "HOVERING_NO_TARGET" }
];

export const BossOptionsForm: React.FC<Props> = ({ options, onChange }) => {
  return (
    <>
      {/* 1. Basic Settings */}
      <details className="form-section" open>
        <summary><h4>Basic Settings</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* ★ 3. 変更なし (インポートした mobTypeOptions が使われる) */}
          <SelectInput
            label="Type (Required)"
            name={name("Type")}
            value={options.Type}
            onChange={onChange}
            options={mobTypeOptions}
            tooltipText={tooltips.Type} 
          />
          
          <TextInput
            label="Display"
            name={name("Display")}
            value={options.Display}
            onChange={onChange}
            placeholder="e.g., '&cAngry Mob'"
            tooltipText={tooltips.Display} 
          />
          <TextInput
            label="Level"
            name={name("Level")}
            value={options.Level as string}
            onChange={onChange}
            helpText="Number or Range (e.g., 1-10) 5.0.0+"
            tooltipText={tooltips.Level}
          />
          <NumberInput
            label="Scale"
            name={name("Scale")}
            value={options.Scale}
            onChange={onChange}
            helpText="5.1.0+"
            step={0.1}
            tooltipText={tooltips.Scale}
          />
        </div>
      </details>

      {/* 2. Combat Stats */}
      <details className="form-section">
        <summary><h4>Combat Stats</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <NumberInput
            label="Health"
            name={name("Health")}
            value={options.Health}
            onChange={onChange}
            placeholder="e.g., 100"
            tooltipText={tooltips.Health}
          />
          <NumberInput
            label="Damage"
            name={name("Damage")}
            value={options.Damage}
            onChange={onChange}
            placeholder="e.g., 5"
            tooltipText={tooltips.Damage}
          />
          <NumberInput
            label="Armor"
            name={name("Armor")}
            value={options.Armor}
            onChange={onChange}
            placeholder="e.g., 10"
            tooltipText={tooltips.Armor}
          />
          <NumberInput
            label="KnockbackResistance"
            name={name("KnockbackResistance")}
            value={options.KnockbackResistance}
            onChange={onChange}
            step={0.1} min={0} max={1}
            placeholder="0.0 - 1.0"
            tooltipText={tooltips.KnockbackResistance}
          />
          <NumberInput
            label="AttackSpeed"
            name={name("AttackSpeed")}
            value={options.AttackSpeed}
            onChange={onChange}
            step={0.1}
            tooltipText={tooltips.AttackSpeed}
          />
           <NumberInput
            label="Experience"
            name={name("Experience")}
            value={options.Experience}
            onChange={onChange}
            helpText="5.0.0+"
            tooltipText={tooltips.Experience}
          />
          <NumberInput
            label="NoDamageTicks"
            name={name("NoDamageTicks")}
            value={options.NoDamageTicks}
            onChange={onChange}
            tooltipText={tooltips.NoDamageTicks}
          />
        </div>
      </details>

      {/* 3. Movement & AI */}
      <details className="form-section">
        <summary><h4>Movement & AI</h4></summary>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <NumberInput
              label="FollowRange"
              name={name("FollowRange")}
              value={options.FollowRange}
              onChange={onChange}
              placeholder="e.g., 32"
              tooltipText={tooltips.FollowRange}
            />
            <NumberInput
              label="MovementSpeed"
              name={name("MovementSpeed")}
              value={options.MovementSpeed}
              onChange={onChange}
              step={0.1} min={0} max={1}
              placeholder="0.0 - 1.0"
              tooltipText={tooltips.MovementSpeed}
            />
             <NumberInput
              label="MaxCombatDistance"
              name={name("MaxCombatDistance")}
              value={options.MaxCombatDistance}
              onChange={onChange}
              tooltipText={tooltips.MaxCombatDistance}
            />
            <TextInput
              label="Faction"
              name={name("Faction")}
              value={options.Faction}
              onChange={onChange}
              tooltipText={tooltips.Faction}
            />
            <TextInput
              label="AIName"
              name={name("AIName")}
              value={options.AIName}
              onChange={onChange}
              helpText="5.2.0+"
              tooltipText={tooltips.AIName}
            />
            <TextInput
              label="Mount"
              name={name("Mount")}
              value={options.Mount}
              onChange={onChange}
              placeholder="e.g., internal_mob_name"
              tooltipText={tooltips.Mount}
            />
         </div>
      </details>
      
      {/* 4. Boolean Options (Toggles) */}
      <details className="form-section">
        <summary><h4>Boolean Options (Toggles)</h4></summary>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem" }}>
          <CheckboxInput label="Collidable" name={name("Collidable")} checked={options.Collidable} onChange={onChange} tooltipText={tooltips.Collidable} />
          <CheckboxInput label="Invincible" name={name("Invincible")} checked={options.Invincible} onChange={onChange} tooltipText={tooltips.Invincible} />
          <CheckboxInput label="Interactable" name={name("Interactable")} checked={options.Interactable} onChange={onChange} tooltipText={tooltips.Interactable} />
          <CheckboxInput label="Levitation" name={name("Levitation")} checked={options.Levitation} onChange={onChange} tooltipText={tooltips.Levitation} />
          <CheckboxInput label="Mountable" name={name("Mountable")} checked={options.Mountable} onChange={onChange} tooltipText={tooltips.Mountable} />
          <CheckboxInput label="NoAI" name={name("NoAI")} checked={options.NoAI} onChange={onChange} tooltipText={tooltips.NoAI} />
          <CheckboxInput label="NoGravity" name={name("NoGravity")} checked={options.NoGravity} onChange={onChange} tooltipText={tooltips.NoGravity} />
          <CheckboxInput label="Persistent" name={name("Persistent")} checked={options.Persistent} onChange={onChange} tooltipText={tooltips.Persistent} />
          <CheckboxInput label="PreventOtherDrops" name={name("PreventOtherDrops")} checked={options.PreventOtherDrops} onChange={onChange} tooltipText={tooltips.PreventOtherDrops} />
          <CheckboxInput label="PreventSunburn" name={name("PreventSunburn")} checked={options.PreventSunburn} onChange={onChange} tooltipText={tooltips.PreventSunburn} />
          <CheckboxInput label="PreventItemPickup" name={name("PreventItemPickup")} checked={options.PreventItemPickup} onChange={onChange} tooltipText={tooltips.PreventItemPickup} />
          <CheckboxInput label="PreventRandomEquipment" name={name("PreventRandomEquipment")} checked={options.PreventRandomEquipment} onChange={onChange} tooltipText={tooltips.PreventRandomEquipment} />
          <CheckboxInput label="PreventRenaming" name={name("PreventRenaming")} checked={options.PreventRenaming} onChange={onChange} tooltipText={tooltips.PreventRenaming} />
          <CheckboxInput label="PreventSlimeSplit" name={name("PreventSlimeSplit")} checked={options.PreventSlimeSplit} onChange={onChange} tooltipText={tooltips.PreventSlimeSplit} />
          <CheckboxInput label="PreventPotionEffects" name={name("PreventPotionEffects")} checked={options.PreventPotionEffects} onChange={onChange} tooltipText={tooltips.PreventPotionEffects} />
          <CheckboxInput label="PreventTeleporting" name={name("PreventTeleporting")} checked={options.PreventTeleporting} onChange={onChange} tooltipText={tooltips.PreventTeleporting} />
          <CheckboxInput label="PreventWorldSave" name={name("PreventWorldSave")} checked={options.PreventWorldSave} onChange={onChange} tooltipText={tooltips.PreventWorldSave} />
          <CheckboxInput label="RepeatAllSkills" name={name("RepeatAllSkills")} checked={options.RepeatAllSkills} onChange={onChange} tooltipText={tooltips.RepeatAllSkills} />
          <CheckboxInput label="ShowHealth" name={name("ShowHealth")} checked={options.ShowHealth} onChange={onChange} tooltipText={tooltips.ShowHealth} />
          <CheckboxInput label="Silent" name={name("Silent")} checked={options.Silent} onChange={onChange} tooltipText={tooltips.Silent} />
          <CheckboxInput label="SpectatorTarget" name={name("SpectatorTarget")} checked={options.SpectatorTarget} onChange={onChange} tooltipText={tooltips.SpectatorTarget} />
          <CheckboxInput label="ThreatTable" name={name("ThreatTable")} checked={options.ThreatTable} onChange={onChange} tooltipText={tooltips.ThreatTable} />
          <CheckboxInput label="UsePlayerName" name={name("UsePlayerName")} checked={options.UsePlayerName} onChange={onChange} tooltipText={tooltips.UsePlayerName} />
          <CheckboxInput label="CanPickUpItems" name={name("CanPickUpItems")} checked={options.CanPickUpItems} onChange={onChange} helpText="5.0.0+" tooltipText={tooltips.CanPickUpItems} />
          <CheckboxInput label="CanSpawn" name={name("CanSpawn")} checked={options.CanSpawn} onChange={onChange} helpText="5.0.0+" tooltipText={tooltips.CanSpawn} />
          <CheckboxInput label="Glowing" name={name("Glowing")} checked={options.Glowing} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.Glowing} />
          <CheckboxInput label="Gravity" name={name("Gravity")} checked={options.Gravity} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.Gravity} />
          <CheckboxInput label="Invisible" name={name("Invisible")} checked={options.Invisible} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.Invisible} />
          <CheckboxInput label="IsBaby" name={name("IsBaby")} checked={options.IsBaby} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.IsBaby} />
          <CheckboxInput label="NoClip" name={name("NoClip")} checked={options.NoClip} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.NoClip} />
          <CheckboxInput label="Sitting" name={name("Sitting")} checked={options.Sitting} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.Sitting} />
          <CheckboxInput label="HasCollision" name={name("HasCollision")} checked={options.HasCollision} onChange={onChange} tooltipText={tooltips.HasCollision} />
          <CheckboxInput label="YawPitchLock" name={name("YawPitchLock")} checked={options.YawPitchLock} onChange={onChange} tooltipText={tooltips.YawPitchLock} />
          <CheckboxInput label="ApplyInvisibility" name={name("ApplyInvisibility")} checked={options.ApplyInvisibility} onChange={onChange} tooltipText={tooltips.ApplyInvisibility} />
        </div>
      </details>
      
      {/* 5. ArmorStand Options */}
      <details className="form-section">
        <summary><h4>ArmorStand Options</h4></summary>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem" }}>
          <CheckboxInput label="HasArms" name={name("HasArms")} checked={options.HasArms} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.HasArms} />
          <CheckboxInput label="HasBasePlate" name={name("HasBasePlate")} checked={options.HasBasePlate} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.HasBasePlate} />
          <CheckboxInput label="HasGravity (ArmorStand)" name={name("HasGravity")} checked={options.HasGravity} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.HasGravity} />
          <CheckboxInput label="IsMarker" name={name("IsMarker")} checked={options.IsMarker} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.IsMarker} />
          <CheckboxInput label="IsSmall" name={name("IsSmall")} checked={options.IsSmall} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.IsSmall} />
          <CheckboxInput label="IsVisible" name={name("IsVisible")} checked={options.IsVisible} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.IsVisible} />
          <CheckboxInput label="ShowArmor" name={name("ShowArmor")} checked={options.ShowArmor} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.ShowArmor} />
        </div>
      </details>

      {/* 6. Mob-Specific Options */}
      <details className="form-section">
        <summary><h4>Mob-Specific Options</h4></summary>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <NumberInput label="SlimeSize" name={name("SlimeSize")} value={options.SlimeSize} onChange={onChange} helpText="5.1.0+" tooltipText={tooltips.SlimeSize} />
          <CheckboxInput label="CreeperCharged" name={name("CreeperCharged")} checked={options.CreeperCharged} onChange={onChange} tooltipText={tooltips.CreeperCharged} />
          <NumberInput label="CreeperExplosionRadius" name={name("CreeperExplosionRadius")} value={options.CreeperExplosionRadius} onChange={onChange} tooltipText={tooltips.CreeperExplosionRadius} />
          <NumberInput label="CreeperFuse" name={name("CreeperFuse")} value={options.CreeperFuse} onChange={onChange} tooltipText={tooltips.CreeperFuse} />
          <CheckboxInput label="CreeperIncendiary" name={name("CreeperIncendiary")} checked={options.CreeperIncendiary} onChange={onChange} tooltipText={tooltips.CreeperIncendiary} />
          <SelectInput label="EnderDragonPhase" name={name("EnderDragonPhase")} value={options.EnderDragonPhase} onChange={onChange} options={dragonPhaseOptions} tooltipText={tooltips.EnderDragonPhase} />
          <TextInput label="EndermanHeldBlock" name={name("EndermanHeldBlock")} value={options.EndermanHeldBlock} onChange={onChange} placeholder="e.g., STONE" tooltipText={tooltips.EndermanHeldBlock} />
          <TextInput label="FoxType" name={name("FoxType")} value={options.FoxType} onChange={onChange} placeholder="e.g., RED, SNOW" tooltipText={tooltips.FoxType} />
          <TextInput label="Gene (Panda)" name={name("Gene")} value={options.Gene} onChange={onChange} placeholder="e.g., NORMAL, LAZY" tooltipText={tooltips.Gene} />
          <NumberInput label="HorseArmor" name={name("HorseArmor")} value={options.HorseArmor} onChange={onChange} tooltipText={tooltips.HorseArmor} />
          <TextInput label="HorseColor" name={name("HorseColor")} value={options.HorseColor} onChange={onChange} tooltipText={tooltips.HorseColor} />
          <TextInput label="HorseStyle" name={name("HorseStyle")} value={options.HorseStyle} onChange={onChange} tooltipText={tooltips.HorseStyle} />
          <TextInput label="OcelotType" name={name("OcelotType")} value={options.OcelotType} onChange={onChange} tooltipText={tooltips.OcelotType} />
          <TextInput label="ParrotVariant" name={name("ParrotVariant")} value={options.ParrotVariant} onChange={onChange} tooltipText={tooltips.ParrotVariant} />
          <TextInput label="RabbitType" name={name("RabbitType")} value={options.RabbitType} onChange={onChange} tooltipText={tooltips.RabbitType} />
          <CheckboxInput label="Sheared" name={name("Sheared")} checked={options.Sheared} onChange={onChange} tooltipText={tooltips.Sheared} />
          <TextInput label="VillagerProfession" name={name("VillagerProfession")} value={options.VillagerProfession} onChange={onChange} tooltipText={tooltips.VillagerProfession} />
          <TextInput label="VillagerType" name={name("VillagerType")} value={options.VillagerType} onChange={onChange} tooltipText={tooltips.VillagerType} />
          <TextInput label="WitchHeldItem" name={name("WitchHeldItem")} value={options.WitchHeldItem} onChange={onChange} tooltipText={tooltips.WitchHeldItem} />
          <CheckboxInput label="WolfAngry" name={name("WolfAngry")} checked={options.WolfAngry} onChange={onChange} tooltipText={tooltips.WolfAngry} />
          <TextInput label="WolfCollarColor" name={name("WolfCollarColor")} value={options.WolfCollarColor} onChange={onChange} tooltipText={tooltips.WolfCollarColor} />
          <TextInput label="Pose" name={name("Pose")} value={options.Pose} onChange={onChange} placeholder="e.g., SLEEPING" tooltipText={tooltips.Pose} />
          <TextInput label="MainHand (Vex)" name={name("MainHand")} value={options.MainHand} onChange={onChange} tooltipText={tooltips.MainHand} />
        </div>
      </details>
    </>
  );
};