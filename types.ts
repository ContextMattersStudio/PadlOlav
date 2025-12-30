
export type Category = '1ra' | '2da' | '3ra' | '4ta' | '5ta' | '6ta' | '7ma' | '8va' | 'Principiante';
export type Position = 'Drive' | 'Revés' | 'Ambos';
export type Hand = 'Diestro' | 'Zurdo';
export type MagicShot = 'Rulo a la reja' | 'Smash al vidrio' | 'Víbora' | 'Globo perfecto' | 'Dejada cortada' | 'Bajada de pared';
export type MatchType = 'Doble Caballeros' | 'Doble Damas' | 'Doble Mixto' | 'Singles';
export type LocalClub = 'Estudiantes' | 'Racing' | 'El Fortín' | 'San Martín' | 'Padel Time' | 'La Quinta' | 'Otro';

export interface PlayerData {
  id: string;
  fullName: string;
  whatsapp: string;
  age: number;
  availability: string;
  city: string;
  category: Category;
  position: Position;
  hand: Hand;
  magicShot?: MagicShot;
  preferredClub?: LocalClub;
  matchPrefs: MatchType[];
}

export type CourtSlot = 'drive_1' | 'reves_1' | 'drive_2' | 'reves_2';

export interface MatchState {
  players: Record<CourtSlot, PlayerData | null>;
  status: 'planning' | 'inviting' | 'confirmed';
  timer: number;
}
