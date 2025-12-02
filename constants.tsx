import React from 'react';
import { 
    Trophy, TrendingUp, Activity, BarChart2, Shield, 
    Zap, Crown, Flame, AlertTriangle, Target, 
    Eye, Star, Ghost, VenetianMask, Wine, Clover, Croissant,
    Hammer, PawPrint, GraduationCap, Info
} from 'lucide-react';
import { Team, Award, Matchup, RecordItem, NewsItem } from './types';

// Icons mapping for easier usage
export const ICONS = {
    Trophy, TrendingUp, Activity, BarChart2, Shield, 
    Zap, Crown, Flame, AlertTriangle, Target, 
    Eye, Star, Ghost, VenetianMask, Wine, Clover, Croissant,
    Hammer, PawPrint, GraduationCap, Info
};

export const teamsData: Team[] = [
  {
    id: 1,
    name: "Ingeniero",
    alias: "Neno Reyes",
    color: "#D4AF37", // Metallic Gold
    icon: <Hammer size={24} strokeWidth={2.5} />,
    rank: 1,
    record: "5-0-0",
    pct: 1.000,
    gb: "--",
    prob: 98,
    fantasy: { pf: 5377.5, pa: 3988.5, diff: "+1389.0" },
    real: { pts: 3366, reb: 1021, ast: 876, stl: 172, blk: 104, to: 456, pf: 510, dd: 26, td: 1 },
    jornadas: { w: 28, l: 5, t: 1, eff: 85 },
    streak: "W5",
    moves: 15,
    note: "Pase Directo Semifinales",
    badges: ["Invicto", "Líder Diferencial", "Líder Tabla"]
  },
  {
    id: 2,
    name: "Profesor",
    alias: "Diamante Sabrosis",
    color: "#8B5CF6", // Violet Glow
    icon: <GraduationCap size={24} strokeWidth={2.5} />,
    rank: 2,
    record: "4-1-0",
    pct: .800,
    gb: "1",
    prob: 95,
    fantasy: { pf: 5455.0, pa: 4401.0, diff: "+1054.0" },
    real: { pts: 3047, reb: 1116, ast: 714, stl: 169, blk: 112, to: 344, pf: 480, dd: 47, td: 12 },
    jornadas: { w: 21, l: 13, t: 0, eff: 62 },
    streak: "W4",
    moves: 9,
    note: "Pase Directo Semifinales",
    badges: ["Máx TD", "Líder Puntos", "Récord Paliza"]
  },
  {
    id: 3,
    name: "Illuminati",
    alias: "Los Illuminati",
    color: "#EF4444", // Red Neon
    icon: <Eye size={24} strokeWidth={2.5} />,
    rank: 3,
    record: "4-1-0",
    pct: .800,
    gb: "1",
    prob: 94,
    fantasy: { pf: 5251.0, pa: 4688.5, diff: "+562.5" },
    real: { pts: 2804, reb: 1250, ast: 705, stl: 255, blk: 111, to: 352, pf: 530, dd: 45, td: 2 },
    jornadas: { w: 21, l: 13, t: 0, eff: 62 },
    streak: "W4",
    moves: 32,
    note: "Clasifica Ronda Previa",
    badges: ["Más Activo", "Líder REB", "Líder STL"]
  },
  {
    id: 4,
    name: "Caballo",
    alias: "Metta World Peace",
    color: "#3B82F6", // Royal Blue
    icon: <img 
            src="https://i.postimg.cc/SKN4WZR5/36124.png" 
            alt="Caballo Logo" 
            style={{ 
              width: '26px', 
              height: '26px', 
              filter: 'invert(1) drop-shadow(0 2px 2px rgba(0,0,0,0.5))', 
              objectFit: 'contain'
            }} 
          />,
    rank: 4,
    record: "3-2-0",
    pct: .600,
    gb: "2",
    prob: 79,
    fantasy: { pf: 5004.0, pa: 4894.0, diff: "+110.0" },
    real: { pts: 2977, reb: 962, ast: 815, stl: 192, blk: 89, to: 396, pf: 495, dd: 32, td: 4 },
    jornadas: { w: 20, l: 14, t: 0, eff: 59 },
    streak: "W2",
    moves: 16,
    note: "Clasifica Ronda Previa",
    badges: ["Top 4"]
  },
  {
    id: 5,
    name: "Leones",
    alias: "Leones",
    color: "#B45309", // Marrón-Amarillo Mostaza
    icon: <PawPrint size={24} strokeWidth={2.5} />, 
    rank: 5,
    record: "2-3-0",
    pct: .400,
    gb: "3",
    prob: 60,
    fantasy: { pf: 4975.5, pa: 5156.5, diff: "-181.0" },
    real: { pts: 3178, reb: 969, ast: 585, stl: 172, blk: 123, to: 319, pf: 460, dd: 23, td: 3 },
    jornadas: { w: 16, l: 18, t: 0, eff: 47 },
    streak: "L2",
    moves: 12,
    note: "Clasifica Ronda Previa",
    badges: ["Récord Semanal"]
  },
  {
    id: 6,
    name: "The Champions",
    alias: "The Champions",
    color: "#94A3B8", // Slate Silver
    icon: <Trophy size={24} strokeWidth={2.5} />,
    rank: 6,
    record: "2-3-0",
    pct: .400,
    gb: "3",
    prob: 37,
    fantasy: { pf: 4557.0, pa: 4759.5, diff: "-202.5" },
    real: { pts: 3001, reb: 908, ast: 671, stl: 162, blk: 73, to: 399, pf: 440, dd: 32, td: 4 },
    jornadas: { w: 14, l: 19, t: 1, eff: 42 },
    streak: "L2",
    moves: 18,
    note: "Clasifica Ronda Previa",
    badges: []
  },
  {
    id: 7,
    name: "Pulpo",
    alias: "Team Ricurda",
    color: "#EC4899", // Pink
    icon: <Ghost size={24} strokeWidth={2.5} />, 
    rank: 7,
    record: "2-3-0",
    pct: .400,
    gb: "3",
    prob: 37,
    fantasy: { pf: 4494.0, pa: 4412.0, diff: "+82.0" },
    real: { pts: 2839, reb: 946, ast: 574, stl: 151, blk: 124, to: 354, pf: 505, dd: 22, td: 1 },
    jornadas: { w: 16, l: 18, t: 0, eff: 47 },
    streak: "W1",
    moves: 18,
    note: "",
    badges: []
  },
  {
    id: 8,
    name: "Bambilio",
    alias: "El Legado de Mondongo",
    color: "#22C55E", // Vibrant Green
    icon: <VenetianMask size={24} strokeWidth={2.5} />, 
    rank: 8,
    record: "2-3-0",
    pct: .400,
    gb: "3",
    prob: 33,
    fantasy: { pf: 4426.0, pa: 4513.5, diff: "-87.5" },
    real: { pts: 2520, reb: 1012, ast: 580, stl: 153, blk: 151, to: 341, pf: 520, dd: 39, td: 1 },
    jornadas: { w: 15, l: 19, t: 0, eff: 44 },
    streak: "L2",
    moves: 11,
    note: "",
    badges: ["Líder BLK", "Match Cerrado x2"]
  },
  {
    id: 9,
    name: "Carupano",
    alias: "Young Buckets",
    color: "#06B6D4", // Cyan
    icon: <Wine size={24} strokeWidth={2.5} />, 
    rank: 9,
    record: "2-3-0",
    pct: .400,
    gb: "3",
    prob: 27,
    fantasy: { pf: 4244.5, pa: 5034.5, diff: "-790.0" },
    real: { pts: 2863, reb: 805, ast: 517, stl: 157, blk: 71, to: 293, pf: 410, dd: 19, td: 0 },
    jornadas: { w: 12, l: 22, t: 0, eff: 35 },
    streak: "L3",
    moves: 9,
    note: "",
    badges: ["Ganador Match Cerrado"]
  },
  {
    id: 10,
    name: "Celtas",
    alias: "Celtas",
    color: "#166534", // Deep Green
    icon: <Clover size={24} strokeWidth={2.5} />, 
    rank: 10,
    record: "2-3-0",
    pct: .400,
    gb: "3",
    prob: 29,
    fantasy: { pf: 4327.0, pa: 4654.5, diff: "-327.5" },
    real: { pts: 2472, reb: 922, ast: 564, stl: 154, blk: 74, to: 271, pf: 390, dd: 32, td: 0 },
    jornadas: { w: 14, l: 20, t: 0, eff: 41 },
    streak: "L1",
    moves: 6,
    note: "",
    badges: []
  },
  {
    id: 11,
    name: "Titanes",
    alias: "Titanes de Petare",
    color: "#334155", // Slate / Steel
    icon: <Shield size={24} strokeWidth={2.5} />, 
    rank: 11,
    record: "1-4-0",
    pct: .200,
    gb: "4",
    prob: 7,
    fantasy: { pf: 3952.5, pa: 4930.0, diff: "-977.5" },
    real: { pts: 2455, reb: 757, ast: 515, stl: 124, blk: 76, to: 218, pf: 380, dd: 16, td: 0 },
    jornadas: { w: 13, l: 21, t: 0, eff: 38 },
    streak: "L1",
    moves: 16,
    note: "",
    badges: ["Cuidado de Balón"]
  },
  {
    id: 12,
    name: "Panadero",
    alias: "Double Dribble",
    color: "#F97316", // Orange
    icon: <Croissant size={24} strokeWidth={2.5} />, 
    rank: 12,
    record: "1-4-0",
    pct: .200,
    gb: "4",
    prob: 5,
    fantasy: { pf: 3846.5, pa: 4478.0, diff: "-631.5" },
    real: { pts: 2397, reb: 777, ast: 503, stl: 169, blk: 66, to: 283, pf: 425, dd: 24, td: 0 },
    jornadas: { w: 13, l: 21, t: 0, eff: 38 },
    streak: "W1",
    moves: 4,
    note: "",
    badges: []
  }
];

export const awardsData: Award[] = [
    {
        id: 1,
        name: "La Mano Caliente",
        desc: "Ganar 5 matchups consecutivos sin perder.",
        img: "https://i.postimg.cc/fRfTfYGf/La_mano_caliente_(1).png",
        winners: [1]
    },
    {
        id: 2,
        name: "The Worm",
        desc: "Una racha legendaria. 10 victorias al hilo. Nadie te detiene.",
        img: "https://i.postimg.cc/0y0207TX/The_worm_(1).png",
        winners: []
    },
    {
        id: 3,
        name: "El Invicto",
        desc: "La perfección absoluta. Terminar la temporada regular con 0 derrotas.",
        img: "https://i.postimg.cc/zvN1RXHW/Proyecto_nuevo6.png",
        winners: []
    },
    {
        id: 4,
        name: "El Rey De La Colina",
        desc: "Mirando a todos desde arriba. Líder de la tabla general en una semana.",
        img: "https://i.postimg.cc/Wz7cmLMh/Proyecto_nuevo_(5)_(1).png",
        winners: [1]
    },
    {
        id: 5,
        name: "2004's Pistons",
        desc: "David contra Goliat. Ganarle al líder de la tabla estando tú en la mitad inferior.",
        img: "https://i.postimg.cc/bw9N9177/2004_Pistons.png",
        winners: []
    },
    {
        id: 6,
        name: "Modo Bestia",
        desc: "Lograr 40 Triple-Dobles en la temporada.",
        img: "https://i.postimg.cc/GhDfG1xL/Proyecto-nuevo-(5).png",
        winners: []
    },
    {
        id: 7,
        name: "Amenaza Triple",
        desc: "Se obtiene al lograr 5 Triple-Dobles en la semana.",
        img: "https://i.postimg.cc/qMWRCrY0/Amenaza_Triple.png",
        winners: []
    },
    {
        id: 8,
        name: "El Coleccionista",
        desc: "Se obtiene al lograr al menos 20 Triple-Dobles en la temporada.",
        img: "https://i.postimg.cc/qMWRCrYr/El_Coleccionista.png",
        winners: []
    },
    {
        id: 9,
        name: "La Leyenda",
        desc: "Se obtiene al lograr al menos 30 Triple-Dobles en la temporada.",
        img: "https://i.postimg.cc/qqfnLKDR/La_leyenda.png",
        winners: []
    },
    {
        id: 10,
        name: "El Unicornio",
        desc: "Lograr un Cuádruple-Doble. Lo mítico hecho realidad.",
        img: "https://i.postimg.cc/MKmR7v7w/El_Unicornio.png",
        winners: []
    },
    {
        id: 11,
        name: "Doble Amenaza",
        desc: "Se obtiene al lograr 10 doble-dobles en la semana.",
        img: "https://i.postimg.cc/RV8bKpvm/La_doble_amenaza.png",
        winners: []
    },
    {
        id: 12,
        name: "The Big O",
        desc: "Se obtiene al lograr al menos 100 doble-dobles en una temporada.",
        img: "https://i.postimg.cc/sD807Hsn/The_Big_O.png",
        winners: []
    },
    {
        id: 13,
        name: "Pulmón de acero",
        desc: "Líder en minutos jugados de la semana.",
        img: "https://i.postimg.cc/yY5rcpsM/Pulmón_de_acero.png",
        winners: []
    },
    {
        id: 14,
        name: "23 como Mike",
        desc: "Homenaje a la cabra. Se obtiene cuando un jugador logra jugar un total de 23 minutos, anotar 23 puntos, hacer 2 asistencias y ganar 3 rebotes.",
        img: "https://i.postimg.cc/VLTHnZzQ/23_como_mike.png",
        winners: []
    },
    {
        id: 15,
        name: "Mamba Mentality",
        desc: "Homenaje a la eternidad. Se obtiene cuando un jugador anota exactamente 81.0 FPTS.",
        img: "https://i.postimg.cc/PrcFYVTR/Mamba_Mentality.png",
        winners: []
    },
    {
        id: 16,
        name: "The Big Dipper",
        desc: "Dominio total. Un jugador superó los 100 FPTS en una sola noche.",
        img: "https://i.postimg.cc/WbKfgYTW/The_Big_Dipper.png",
        winners: []
    },
    {
        id: 17,
        name: "La Antorcha de Popovich",
        desc: "Visión del futuro. Terminaste la semana y ningún jugador de tu banca anoto más FPTS que tus titulares.",
        img: "https://i.postimg.cc/pX71zcR8/La_Antorcha_de_popovich.png",
        winners: []
    },
    {
        id: 18,
        name: "El lobo de los Waivers",
        desc: "Más activo en cambios de la temporada.",
        img: "https://i.postimg.cc/x1jfWdW8/El_lobo_de_los_waivers.png",
        winners: [3]
    },
    {
        id: 19,
        name: "El Buitre (Plata)",
        desc: "Adquirir a un jugador de Waivers y que haga Doble-Doble esa semana.",
        img: "https://i.postimg.cc/XY2j3bWW/El_buitre_plata.png",
        winners: []
    },
    {
        id: 20,
        name: "El Buitre (Oro)",
        desc: "Adquirir a un jugador de Waivers y que haga Triple-Doble esa semana.",
        img: "https://i.postimg.cc/qvmJ0TTY/El_buitre_oro.png",
        winners: []
    },
    {
        id: 21,
        name: "Diamante Bruto",
        desc: "Peor Posición en el draft que mejor quedó en la tabla de posiciones general.",
        img: "https://i.postimg.cc/283KqNRx/Diamante_Bruto.png",
        winners: []
    },
    {
        id: 22,
        name: "Sobre la chicharra",
        desc: "Ganar un match por una diferencia de 3 puntos o menos.",
        img: "https://i.postimg.cc/qMYZyD4G/Sobre_la_chicharra.png",
        winners: []
    },
    {
        id: 23,
        name: "El Francotirador",
        desc: "Ganar la minoría de jordanas de un matchup, pero aún así ganarlo.",
        img: "https://i.postimg.cc/DfxNyyD8/El_Francotirador.png",
        winners: []
    },
    {
        id: 24,
        name: "Sangre Fría",
        desc: "Ganador del match más cerrado de la semana.",
        img: "https://i.postimg.cc/PrNRLnsZ/Sangre_Fría.png",
        winners: [9]
    },
    {
        id: 25,
        name: "Final de fotografía",
        desc: "Protagonista del enfrentamiento más cerrado (ganes o pierdas).",
        img: "https://i.postimg.cc/L6hbqFKz/Final_de_fotografía.png",
        winners: [9, 10]
    },
    {
        id: 26,
        name: "Alineación Cósmica (Bronce)",
        desc: "Empatar al menos una vez en la temporada.",
        img: "https://i.postimg.cc/sf8J2R1t/Alineación_cósmica_(Bronce).png",
        winners: [1, 6]
    },
    {
        id: 27,
        name: "Alineación Cósmica (Plata)",
        desc: "Empatar al menos dos veces en la temporada.",
        img: "https://i.postimg.cc/Hsy9cPyV/Alineación_cósmica_plata.png",
        winners: []
    },
    {
        id: 28,
        name: "Alineación Cósmica (Oro)",
        desc: "Empatar al menos tres veces en la temporada.",
        img: "https://i.postimg.cc/qB1FMMFP/Alineacion-cosmica.png",
        winners: []
    },
    {
        id: 29,
        name: "The Flu",
        desc: "Ganar la semana con 3 jugadores o más lesionados en el roster (+40% rostered).",
        img: "https://i.postimg.cc/1300MnBB/The_flu.png",
        winners: []
    },
    {
        id: 30,
        name: "Superman O'neale",
        desc: "Otorgado al equipo que termine la semana como líder en rebotes (REB) totales.",
        img: "https://i.postimg.cc/CxpHjHGR/SUPERMAN_o_neale.png",
        winners: [3]
    },
    {
        id: 31,
        name: "The Dream",
        desc: "Un solo jugador logró al menos 3 Robos (STL) y 3 Bloqueos (BLK) en un partido.",
        img: "https://i.postimg.cc/mgWNQNYn/The_dream.png",
        winners: []
    },
    {
        id: 32,
        name: "Larry Legend",
        desc: "Otorgado al equipo que termine la semana con la más alta cantidad de FPTS.",
        img: "https://i.postimg.cc/131cpcG4/Larry_legend.png",
        winners: [2]
    },
    {
        id: 33,
        name: "The Big Fundamental",
        desc: "Ganar su matchup siendo el equipo con la menor cantidad de Pérdidas (TO).",
        img: "https://i.postimg.cc/pLMYDYfk/The_Big_fundamental.png",
        winners: [11]
    },
    {
        id: 34,
        name: "D-Wade",
        desc: "Jugador PG/SG logró 3 o más Bloqueos (BLK) en un solo partido.",
        img: "https://i.postimg.cc/W3QzZ8Bk/D-wade.png",
        winners: []
    },
    {
        id: 35,
        name: "Piers",
        desc: "Ganar la última jornada de tu matchup semanal por menos de 10 FPTS.",
        img: "https://i.postimg.cc/GmnJkJF7/Piers.png",
        winners: []
    },
    {
        id: 36,
        name: "La Gran Muralla",
        desc: "Un solo jugador logró 7 o más Bloqueos (BLK) en un solo partido.",
        img: "https://i.postimg.cc/mgWNQNY7/LA_GRAN_MURALLA.png",
        winners: []
    },
    {
        id: 37,
        name: "Dirty",
        desc: "Un jugador PF anotó 40 puntos o más en un solo partido.",
        img: "https://i.postimg.cc/9QPP1R1h/Dirty.png",
        winners: []
    },
    {
        id: 38,
        name: "The Sky Hook",
        desc: "Tu equipo terminó la semana como líder absoluto en Puntos (PTS).",
        img: "https://i.postimg.cc/YCBf1f6R/The_Sky_hook.png",
        winners: [1]
    },
    {
        id: 39,
        name: "The Answer",
        desc: "Un jugador de tu equipo logró anotar 60 o más puntos (PTS) en un partido.",
        img: "https://i.postimg.cc/BnfcxcT8/The_Answer.png",
        winners: []
    },
    {
        id: 40,
        name: "Magic",
        desc: "Tu equipo terminó la semana como líder absoluto en Asistencias (AST).",
        img: "https://i.postimg.cc/kgNNw6sL/Magic.png",
        winners: [1]
    },
    {
        id: 41,
        name: "Pip",
        desc: "Jugador con 20 PTS, 5 REB, 5 AST y 5 estadísticas defensivas (STL+BLK).",
        img: "https://i.postimg.cc/ht88MzMq/Pip.png",
        winners: []
    },
    {
        id: 42,
        name: "El Romperachas (Bronce)",
        desc: "Venciste a un rival con racha activa de 3 victorias consecutivas.",
        img: "https://i.postimg.cc/xdzPHx76/El_Romperachas_bronce.png",
        winners: []
    },
    {
        id: 43,
        name: "El Romperachas (Plata)",
        desc: "Venciste a un rival con racha activa de 5 victorias consecutivas.",
        img: "https://i.postimg.cc/KYM5LqVg/El_Romperachas_plata.png",
        winners: []
    },
    {
        id: 44,
        name: "El Romperachas (Oro)",
        desc: "Venciste a un rival con racha activa de 10 victorias consecutivas.",
        img: "https://i.postimg.cc/QdPbFG6j/El_Romperachas_oro.png",
        winners: []
    },
    {
        id: 45,
        name: "Rebelión de los Humildes (Bronce)",
        desc: "Clasificando mitad inferior, cortaste racha de 3 victorias de un rival.",
        img: "https://i.postimg.cc/g0ZKRS5N/Rebelión_de_los_Humildes_bronce.png",
        winners: []
    },
    {
        id: 46,
        name: "Rebelión de los Humildes (Plata)",
        desc: "Clasificando mitad inferior, cortaste racha de 5 victorias de un rival.",
        img: "https://i.postimg.cc/pdFB8G70/Rebelión_de_los_Humildes_(plata).png",
        winners: []
    },
    {
        id: 47,
        name: "Rebelión de los Humildes (Oro)",
        desc: "Clasificando mitad inferior, cortaste racha de 10 victorias de un rival.",
        img: "https://i.postimg.cc/TPDcm7Ss/Rebelión_de_los_Humildes_oro.png",
        winners: []
    },
    {
        id: 48,
        name: "El Abusador",
        desc: "3 veces ganador de la mayor paliza semanal.",
        img: "https://i.postimg.cc/kM1DqKvt/El_abusador.png",
        winners: [2]
    },
    {
        id: 49,
        name: "El Tirano",
        desc: "5 veces ganador de la mayor paliza semanal.",
        img: "https://i.postimg.cc/RV2Fnm8C/El_Tirano.png",
        winners: []
    },
    // --- PREMIOS DE VERGÜENZA (NUEVOS) ---
    {
        id: 50,
        name: "El Albañil",
        desc: "Tus aros estaban cerrados. Obtuviste la puntuación final de puntos fantasy totales más baja (FPTS) de toda la liga esta semana.",
        img: "https://i.postimg.cc/63Npcc6x/Elalbañil.png",
        winners: [11]
    },
    {
        id: 51,
        name: "Falso profeta",
        desc: "Prometía la tierra prometida y trajo sequía. Tú primer pick del draft termino fuera del Top 50 de la temporada.",
        img: "https://i.postimg.cc/90LXWjd3/Falso_profeta.png",
        winners: []
    },
    {
        id: 52,
        name: "El tropezón",
        desc: "3 derrotas seguidas.",
        img: "https://i.postimg.cc/4yfNk3hz/El_tropezon.png",
        winners: [9]
    },
    {
        id: 53,
        name: "Caída libre",
        desc: "5 derrotas seguidas. ¡Abre el paracaídas!",
        img: "https://i.postimg.cc/ZnbKtqyD/Caída_libre.png",
        winners: []
    },
    {
        id: 54,
        name: "Nadar para morir en la orilla",
        desc: "Ganar la mayoría de jornadas pero perder el match.",
        img: "https://i.postimg.cc/wMwx6dhC/Nadar_para_morir_en_la_orilla.png",
        winners: []
    },
    {
        id: 55,
        name: "El saco de boxeo",
        desc: "Perdedor de la mayor paliza de la semana.",
        img: "https://i.postimg.cc/zvxDJ1CG/El_saco_de_boxeo.png",
        winners: [9]
    },
    {
        id: 56,
        name: "El titanic",
        desc: "Peor Record y último lugar de la temporada.",
        img: "https://i.postimg.cc/44Pxvpr1/El_titanic.png",
        winners: [12]
    },
    {
        id: 57,
        name: "Tigre de papel",
        desc: "Mejor posición de draft que terminó en peor posición de la temporada.",
        img: "https://i.postimg.cc/GhphXHR8/Tigre_de_papel.png",
        winners: []
    },
    {
        id: 58,
        name: "Arrepentimiento de banquillo",
        desc: "Perder por exactamente la cantidad de Puntos que se dejó en la banca.",
        img: "https://i.postimg.cc/gk0kgnpw/Arrepentimiento_de_banquillo.png",
        winners: []
    },
    {
        id: 59,
        name: "Manos de mantequilla",
        desc: "Autodestrucción por errores. Perdiste tu enfrentamiento semanal y fuiste el equipo con la mayor cantidad de Pérdidas (TO) de toda la liga esa semana.",
        img: "https://i.postimg.cc/bw7yYgtT/Manos_de_mantequilla.png",
        winners: []
    },
    {
        id: 60,
        name: "La maldición del traspaso",
        desc: "Hacer un trade con otro equipo y que el jugador que hayas intercambiado termine más arriba en FPTS que el que tú recibiste.",
        img: "https://i.postimg.cc/SNKNgJ4q/La_maldición_del_traspaso.png",
        winners: []
    },
    {
        id: 61,
        name: "Linea de cardio (La de Tony Snell)",
        desc: "Solo salió a correr. Un jugador titular de tu equipo en tu alineación jugó al menos 20 minutos y terminó con 0 o menos FPTS.",
        img: "https://i.postimg.cc/RVbCy4C6/Linea_de_cardio.png",
        winners: []
    },
    {
        id: 62,
        name: "Fiesta de silbatos",
        desc: "Exceso de agresividad. Tu equipo registró la cifra más alta de Faltas Personales (PF) en la semana, y terminaste perdiendo el enfrentamiento.",
        img: "https://i.postimg.cc/xCY9MdgH/Fiesta_de_silbatos.png",
        winners: []
    },
    {
        id: 63,
        name: "Caída de pedestal",
        desc: "La humillación suprema. Tú racha de legendaria 10 victorias seguidas fue cortada nada menos que por un equipo del sótano de la liga.",
        img: "https://i.postimg.cc/VvvQW0CV/Caída_del_pedestal.png",
        winners: []
    }
];

export const matchupData: Matchup[] = [
    { id: 1, teamAId: 1, teamBId: 9, season: { a: 1, b: 0 }, historic: { a: 14, b: 2 } },
    { id: 2, teamAId: 2, teamBId: 11, season: { a: 1, b: 0 }, historic: { a: 2, b: 3 } },
    { id: 3, teamAId: 7, teamBId: 5, season: { a: 1, b: 0 }, historic: { a: 2, b: 3 } },
    { id: 4, teamAId: 6, teamBId: 4, season: { a: 0, b: 1 }, historic: { a: 1, b: 4 } },
    { id: 5, teamAId: 12, teamBId: 8, season: { a: 1, b: 0 }, historic: { a: 5, b: 12 } },
    { id: 6, teamAId: 10, teamBId: 3, season: { a: 0, b: 1 }, historic: { a: 2, b: 3 } }
];

export const recordsList: RecordItem[] = [
  { title: "Mejor Diferencial", val: "+1389", holder: "Ingeniero", teamIds: [1], type: "positive" },
  { title: "Mayor Puntaje Jornada (Equipo)", val: "295 pts", holder: "Profesor", teamIds: [2], type: "positive" },
  { title: "Mayor Paliza Semana", val: "+435 pts", holder: "Profesor", teamIds: [2], type: "positive" },
  { title: "Mejor Jugador Semanal", val: "N. Jokic", holder: "Profesor", teamIds: [2], type: "neutral" },
  { title: "Mayor Puntaje Jugador (Jornada)", val: "94 pts", holder: "Ingeniero / Illuminati", teamIds: [1, 3], type: "neutral" },
  { title: "Más Robos Acumulados", val: "255 STL", holder: "Illuminati", teamIds: [3], type: "positive" },
  { title: "Más Rebotes Acumulados", val: "1250 REB", holder: "Illuminati", teamIds: [3], type: "positive" },
  { title: "Más Bloqueos Acumulados", val: "151 BLK", holder: "Bambilio", teamIds: [8], type: "positive" },
  { title: "Match Más Cerrado", val: "14 pts", holder: "Carupano vs Celtas", teamIds: [9, 10], type: "neutral" },
  { title: "Peor Diferencial", val: "-977.5", holder: "Titanes", teamIds: [11], type: "negative" },
  { title: "Víctima Mayor Paliza", val: "vs Profesor", holder: "Carupano", teamIds: [9], type: "negative" }
];

export const newsTickerData: NewsItem[] = [
    { text: "Ingeniero lidera con récord perfecto 5-0", icon: Zap, color: "text-yellow-400" },
    { text: "Nikola Jokic (Profesor) MVP Semanal (x2)", icon: TrendingUp, color: "text-green-400" },
    { text: "Titanes busca romper racha negativa", icon: AlertTriangle, color: "text-orange-400" },
    { text: "Illuminati domina en Robos (255) y Rebotes (1250)", icon: Shield, color: "text-blue-400" },
    { text: "Profesor registra la mayor paliza (+435 pts)", icon: Flame, color: "text-red-400" },
    { text: "Cade Cunningham (Ingeniero) anota 94 pts en una jornada", icon: Star, color: "text-yellow-300" },
    { text: "Jalen Johnson (Illuminati) empata récord de jornada (94 pts)", icon: Star, color: "text-green-300" },
    { text: "Bambilio líder en Bloqueos totales (151)", icon: Activity, color: "text-green-500" },
    { text: "Titanes es el equipo que mejor cuida el balón (218 TO)", icon: Info, color: "text-blue-300" }
];