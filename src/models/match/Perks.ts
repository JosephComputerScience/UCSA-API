export interface PerksDTO {
  statPerks: PerkStatsDTO;
  styles: PerkStyleDTO[];
}

export interface PerkStatsDTO {
  defense: number;
  flex: number;
  offense: number;
}

export interface PerkStyleDTO {
  description: string;
  selections: PerkStyleSelectionDTO[];
  style: number;
}

export interface PerkStyleSelectionDTO {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}
