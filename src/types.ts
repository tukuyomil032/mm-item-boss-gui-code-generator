
// -----------------------------------------------
// BOSS TYPES
// -----------------------------------------------

/** Mob Options */
export interface BossOptions{
    Type?: string;
    Display?: string;
    Health?: number;
    Damage?: number;
    Armor?: number;
    FollowRange?: number;
    KnockbackResistance?: number; // 0.0 ~ 1.0
    MovementSpeed?: number; // 0.0 ~ 1.0
    MaxCombatDistance?: number;
    AttackSpeed?: number;
    Collidable?: boolean;
    Despawn?: boolean | string; // true, false, 'scripted'
    Faction?: string;
    Invicible?: boolean;
    Interactable?: boolean;
    Levitation?: boolean;
    Mount?: string;
    Mountable?: boolean;
    NoAI?: boolean;
    NoDamageTicks?: number;
    NoGravity?: boolean;
    Persistent?: boolean;
    PreventOtherDrops?: boolean;
    PreventSunburn?: boolean;
    PreventItemPickup?: boolean;
    PreventRandomEquipment?: boolean;
    PreventRenaming?: boolean;
    PreventSlimeSplit?: boolean;
    PreventPotionEffects?: boolean;
    PreventTeleporing?: boolean;
    PreventWorldSave?: boolean;
    RepeatAllSkills?: boolean;
    ShowHealth?: boolean;
    Silent?: boolean;
    SpectatorTarget?: boolean;
    ThreatTable?: boolean;
    UsePlayerName?: boolean;
    CanPickUpItems?: boolean; // 5.0.0+
    CanSpawn?: boolean; // 5.0.0+
    Experience?: number; // 5.0.0+
    Level?: number | string; // 5.0.0+
    Glowing?: boolean; // 5.1.0+
    Gravity?: boolean; // 5.1.0+ (NoGravityの逆)
    HasArms?: boolean; // 5.1.0+ (ArmorStands)
    HasBasePlate?: boolean; // 5.1.0+ (ArmorStands)
    HasGravity?: boolean; // 5.1.0+ (ArmorStands)
    Invisible?: boolean; // 5.1.0+
    IsBaby?: boolean; // 5.1.0+
    IsMarker?: boolean; // 5.1.0+ (ArmorStands)
    IsSmall?: boolean; // 5.1.0+ (ArmorStands)
    IsVisible?: boolean; // 5.1.0+ (ArmorStands)
    NoClip?: boolean; // 5.1.0+
    Pitch?: number; // 5.1.0+
    Scale?: number; // 5.1.0+
    ShowArmor?: boolean; // 5.1.0+
    Sitting?: boolean; // 5.1.0+
    SlimeSize?: number; // 5.1.0+
    Yaw?: number; // 5.1.0+
    AIName?: string; // 5.2.0+
    CreeperCharged?: boolean;
    CreeperExplosionRadius?: number;
    CreeperFuse?: number;
    CreeperIncendiary?: boolean;
    CreeperMaxFuse?: number;
    CreeperPowered?: boolean;
    EnderDragonPhase?: string;
    EndermanHeldBlock?: string;
    FoxType?: string;
    Gene?: string; // (Panda)
    HasCollision?: boolean;
    HorseArmor?: number;
    HorseColor?: string;
    HorseStyle?: string;
    OcelotType?: string;
    ParrotVariant?: string;
    RabbitType?: string;
    Sheared?: boolean;
    VillagerProfession?: string;
    VillagerType?: string;
    WitchHeldItem?: string;
    WolfAngry?: boolean;
    WolfCollarColor?: string;
    YawPitchLock?: boolean;
    Pose?: string;
    MainHand?: string; // (Vex)
    ApplyInvisibility?: boolean;
}

/* Display Options */
export interface BossDisplayOptions{
    NameVisible?: boolean;
    HealthVisible?: boolean;
    ShowHealth?: boolean;
    Glowing?: boolean;
    Invisible?: boolean;
    Invulnerable?: boolean;
    HasBoundingBox?: boolean;
    Model?: string;
    MythicCreater?: string;
    ShowPitch?: boolean;
}


/** Equipment */
export type EquipmentEntry = string;


/** BossBar */
export interface BossBarOptions{
  Enabled?: boolean;
  Title?: string;
  Range?: number;
  Color?: 'PINK' | 'BLUE' | 'RED' | 'GREEN' | 'YELLOW' | 'PURPLE' | 'WHITE';
  Style?: 'SOLID' | 'SEGMENTED_6' | 'SEGMENTED_10' | 'SEGMENTED_12' | 'SEGMENTED_20';
  CreateFog?: boolean;
  DarkenSky?: boolean;
  PlayMusic?: boolean;
}


export type AIEntry = string; // CustomAI
export type KillMessageEntry = string; // KillMessages
export type ImmunityEntry = string; // ImmunityTables


/** Disguises */
export interface DisguiseOptions{
  Type: string; // PLAYER, ZOMBIE, ARMOR_STAND, etc.
  Skin?: string;
  Burning?: boolean;
  Blocking?: boolean;
  Invisible?: boolean;
  ShowName?: boolean;
  Sneaking?: boolean;
  Sprinting?: boolean;
  ArrowCount?: number;
  ArmorStandInvisible?: boolean;
  ArmorStandMarker?: boolean;
  ArmorStandBasePlate?: boolean;
  ArmorStandArms?: boolean;
  ArmorStandSmall?: boolean;
  BatHanging?: boolean;
  CreeperPowered?: boolean;
  CreeperIgnited?: boolean;
  EndermanBlock?: string;
  EndermanBlockData?: number;
  GhastAggressive?: boolean;
  GuardianElderly?: boolean;
  HorseColor?: string;
  HorseStyle?: string;
  HorseChest?: boolean;
  HorseSaddled?: boolean;
  HorseArmor?: string;
  IronGolemLPlayerCreated?: boolean;
  OcelotType?: string;
  PigSaddled?: boolean;
  RabbitType?: string;
  SheepColor?: string;
  SheepSheared?: boolean;
  SlimeSize?: number;
  MagmaClientSize?: number;
  SnowmanDerp?: boolean;
  VillagerProfession?: string;
  WolfAngry?: boolean;
  WolfSitting?: boolean;
  WolfCollarColor?: string;
  ZombieType?: string;
  ZombieVillagerProfession?: string;
  ZombieBaby?: boolean;
  ZombieConversion?: boolean;
  EntityHorse?: boolean;
  Item?: string;
  ItemData?: number;
  ItemAmount?: number;
  AnimalColor?: string;
  CatType?: string;
  FoxType?: string;
  MooshroomType?: string;
  PandaGene?: string;
  ParrotVariant?: string;
  PufferFishState?: number;
  TropicalFishType?: string;
  Pose?: string;
  ModifyBoundingBox?: boolean;
}


/** Boss Config */
export interface BossConfig{
  internalName: string;
  Options?: BossOptions;
  DisplayOptions?: BossDisplayOptions;
  Equipment?: EquipmentEntry[];
  BossBar?: BossBarOptions;
  AIGoalSelectors?: AIEntry[];
  AITargetSelectors?: AIEntry[];
  KillMessages?: KillMessageEntry[];
  ImmunityTables?: ImmunityEntry[];
  Disguise?: DisguiseOptions;
}

// -----------------------------------------------
// ITEM TYPES
// -----------------------------------------------

/** Item Options */
export interface ItemOptions{
  Id: string;
  Amount?: number;
  Data?: number;
  Damage?: number;
  Lore?: string[];
  Unbreakable?: boolean;
  CustomModelData?: number;
  EnchantmentGlint?: boolean | string; // 5.2.0+ (true/false/'AUTO')
  Texture?: string; // 5.2.0+
  PotionColor?: string; // 5.2.0+ (R,G,B format)
  Player?: string; // 5.2.0+ (Player Heads)
  Hide?: string[]; // e.g., ['ATTRIBUTES', 'ENCHANTS', 'LORE']
  ItemFlags?: string[];
  BannerLayers?: string[]; // 5.3.0+
  Book?: {
    Title?: string;
    Author?: string;
    Pages?: string[];
  };
  Firework?: {
    Power?: number;
    Flicker?: boolean;
    Trail?: boolean;
    Type?: 'BALL' | 'BALL_LARGE' | 'STAR' | 'BURST' | 'CREEPER';
    Colors?: string[]; // R,G,B
    FadeColors?: string[]; // R,G,B
  };
  Map?: {
    Color?: string; // R,G,B
    Downscale?: boolean;
    Locked?: boolean;
    Location?: string; // World,X,Y,Z
    MapID?: number;
  };
}

/** Attributes */
export type AttributeEntry = string;

/** Enchantments */
export type EnchantmentEntry = string;

/** PotionEntry */
export type PotionEntry = string;

/** Item Config */
export interface ItemConfig{
  internalName: string;
  Options: ItemOptions;
  Attributes?: AttributeEntry[];
  Enchantments?: EnchantmentEntry[];
  Potions?: PotionEntry[];
}