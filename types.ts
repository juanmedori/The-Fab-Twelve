import { ReactNode } from "react";

export interface Team {
  id: number;
  name: string;
  alias: string;
  color: string;
  icon: ReactNode;
  rank: number;
  record: string;
  pct: number;
  gb: string;
  prob: number;
  fantasy: { pf: number; pa: number; diff: string };
  real: { pts: number; reb: number; ast: number; stl: number; blk: number; to: number; pf: number; dd: number; td: number };
  jornadas: { w: number; l: number; t: number; eff: number };
  streak: string;
  moves: number;
  note: string;
  badges: string[];
}

export interface Award {
  id: number;
  name: string;
  desc: string;
  img: string;
  winners: number[];
}

export interface Matchup {
  id: number;
  teamAId: number;
  teamBId: number;
  season: { a: number; b: number };
  historic: { a: number; b: number };
}

export interface RecordItem {
  title: string;
  val: string;
  holder: string;
  teamIds?: number[];
  type: "positive" | "negative" | "neutral";
}

export interface NewsItem {
  text: string;
  icon: any; 
  color: string;
}