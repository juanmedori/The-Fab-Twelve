
import React, { useState, useEffect } from 'react';
import { 
    Grid, Calendar, Swords, Target, BarChart2, Crown, Medal, 
    ArrowLeft, X, Sparkles, BrainCircuit,
    Zap, Activity, Ghost, Skull, Lock, Eye, Maximize2
} from 'lucide-react';
import { teamsData, recordsList, awardsData, matchupData, ICONS, newsTickerData } from './constants';
import { Team, Award } from './types';
import LeagueBadge from './components/LeagueBadge';
import StatBar from './components/StatBar';
import LiveAnnouncer from './components/LiveAnnouncer';
import ChatInterface from './components/ChatInterface';
import CountUp from './components/CountUp'; // Import new component
import { getCoachAdvice, getMatchupPrediction } from './services/gemini';

// --- SUB-COMPONENTS ---

const Background = () => (
  <div className="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.9)_2px,transparent_2px),linear-gradient(90deg,rgba(18,18,18,0.9)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10 animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-10 animate-pulse delay-1000"></div>
  </div>
);

const Header = () => (
  <div className="relative w-full bg-slate-900 border-b-4 border-red-600 overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-red-600/20 to-transparent skew-x-[-20deg] transform translate-x-10"></div>
    <div className="container mx-auto px-4 py-6 relative z-10 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <div className="transform hover:scale-110 transition-transform">
          <img src="https://i.postimg.cc/9QYFYG35/El_logo_the_Fab_twelve.png" alt="League Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
        </div>
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 font-sans uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            THE FAB TWELVE
          </h1>
          <p className="text-red-500 font-bold tracking-[0.5em] text-sm md:text-base uppercase glow-text">Official League Hub</p>
        </div>
      </div>
      <div className="flex space-x-6 text-white font-mono text-sm md:text-right">
        <div><div className="text-gray-400 text-xs uppercase">Temporada</div><div className="font-bold text-xl">2025-26</div></div>
        <div><div className="text-gray-400 text-xs uppercase">Equipos</div><div className="font-bold text-xl">12</div></div>
        <div><div className="text-gray-400 text-xs uppercase">Semana</div><div className="font-bold text-xl text-green-400">ACTIVA</div></div>
      </div>
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center space-x-2 px-4 md:px-6 py-4 font-bold uppercase tracking-wider transform transition-all duration-300 skew-x-[-10deg] border-r border-slate-700 ${active ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] translate-y-[-2px]' : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'}`}
  >
    <div className="skew-x-[10deg] flex items-center space-x-2"><Icon size={18} /><span className="text-xs md:text-base">{label}</span></div>
  </button>
);

// --- VIEWS ---

const TeamProfileView = ({ team, onClose }: { team: Team, onClose: () => void }) => {
    const [coachAdvice, setCoachAdvice] = useState<string | null>(null);
    const [loadingAdvice, setLoadingAdvice] = useState(false);
    
    // Logic for Advice using Gemini Thinking
    const handleAdvice = async () => {
        setLoadingAdvice(true);
        const advice = await getCoachAdvice(team.name, JSON.stringify(team.real), team.rank);
        setCoachAdvice(advice || "No advice available.");
        setLoadingAdvice(false);
    }

    if (!team) return null;
    const maxPts = Math.max(...teamsData.map(t => t.real.pts));
    const teamAwards = awardsData.filter(award => award.winners.includes(team.id));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="relative bg-slate-800 p-6 flex items-center justify-between border-b border-slate-700 overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{background: `linear-gradient(to right, ${team.color}, transparent)`}}></div>
                    <div className="flex items-center z-10 space-x-6">
                         <LeagueBadge color={team.color} icon={team.icon} size={80} />
                         <div>
                             <h2 className="text-4xl font-black text-white italic uppercase tracking-tight leading-none mb-1 shadow-black drop-shadow-md">{team.name}</h2>
                             <div className="flex space-x-2">{team.badges.map((b, i) => <span key={i} className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase rounded border border-yellow-500/50">{b}</span>)}</div>
                         </div>
                    </div>
                    <button onClick={onClose} className="z-10 bg-slate-700 hover:bg-red-600 text-white p-2 rounded-full transition-colors border border-slate-500"><X size={24} /></button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar space-y-8 bg-slate-900/95">
                    {/* Gemini Thinking Feature */}
                    <div className="flex justify-end">
                        <button onClick={handleAdvice} disabled={loadingAdvice} className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all disabled:opacity-50">
                            {loadingAdvice ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <BrainCircuit size={18} />}
                            <span>{loadingAdvice ? "Analizando..." : "Reporte de Scout (AI)"}</span>
                        </button>
                    </div>
                    {coachAdvice && <div className="bg-indigo-900/20 border border-indigo-500/50 p-4 rounded-xl animate-in fade-in slide-in-from-top-4"><h4 className="text-indigo-400 font-bold uppercase flex items-center mb-2"><Sparkles className="mr-2" size={16} /> Coach Virtual</h4><p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{coachAdvice}</p></div>}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-lg"><div className="text-gray-500 text-xs uppercase font-bold mb-1">Récord</div><div className="text-2xl font-black text-white">{team.record}</div></div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-lg"><div className="text-gray-500 text-xs uppercase font-bold mb-1">Rank</div><div className="text-2xl font-black text-blue-400">#{team.rank}</div></div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-lg"><div className="text-gray-500 text-xs uppercase font-bold mb-1">Prob. Playoffs</div><div className={`text-2xl font-black ${team.prob > 80 ? 'text-green-500' : 'text-yellow-500'}`}>{team.prob}%</div></div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-lg"><div className="text-gray-500 text-xs uppercase font-bold mb-1">Racha</div><div className="text-2xl font-black text-white">{team.streak}</div></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white italic mb-4 flex items-center border-b border-blue-500 pb-2"><Zap className="mr-2 text-blue-500" size={20}/> Rendimiento Fantasy</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-white/5"><span className="text-gray-400 font-mono text-sm">Puntos a Favor</span><span className="font-bold text-white">{team.fantasy.pf}</span></div>
                                <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-white/5"><span className="text-gray-400 font-mono text-sm">Puntos en Contra</span><span className="font-bold text-white">{team.fantasy.pa}</span></div>
                                <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-white/5"><span className="text-gray-400 font-mono text-sm">Diferencial</span><span className={`font-bold ${team.fantasy.diff.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{team.fantasy.diff}</span></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white italic mb-4 flex items-center border-b border-orange-500 pb-2"><Activity className="mr-2 text-orange-500" size={20}/> Totales NBA</h3>
                            <div className="space-y-3">
                                <StatBar label="PTS" value={team.real.pts} max={maxPts} color="bg-orange-500" />
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="bg-slate-800/30 p-2 rounded text-center border border-white/5"><div className="text-[10px] text-gray-500 uppercase">Rebotes</div><div className="font-bold text-white">{team.real.reb}</div></div>
                                     <div className="bg-slate-800/30 p-2 rounded text-center border border-white/5"><div className="text-[10px] text-gray-500 uppercase">Asistencias</div><div className="font-bold text-white">{team.real.ast}</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Mini Trophy Room */}
                     <div>
                        <h3 className="text-xl font-bold text-white italic mb-4 flex items-center border-b border-amber-500 pb-2"><Medal className="mr-2 text-amber-500" size={20}/> Sala de Trofeos</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                            {teamAwards.length > 0 ? (
                                teamAwards.map(award => (
                                    <div key={award.id} className="relative group flex flex-col items-center">
                                        <div className={`w-12 h-12 p-1 rounded-xl border ${award.id >= 50 ? 'border-purple-900 bg-slate-950 grayscale' : 'border-amber-500 bg-slate-900'}`}>
                                            <img src={award.img} alt={award.name} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 font-mono text-sm">Sin trofeos aún.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StandingsView = ({ onSelectTeam }: {onSelectTeam: (t: Team)=>void}) => (
  <div className="fade-in-up">
    <h2 className="text-2xl font-black text-white italic mb-6 border-l-4 border-red-500 pl-4 uppercase">Clasificación General</h2>
    <div className="overflow-x-auto rounded-xl shadow-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-950 text-gray-400 uppercase text-xs tracking-wider border-b border-slate-700">
            <th className="p-4 font-bold">Rk</th>
            <th className="p-4 font-bold">Equipo / Alias</th>
            <th className="p-4 font-bold text-center">Récord</th>
            <th className="p-4 font-bold text-center">PCT</th>
            <th className="p-4 font-bold text-center">GB</th>
            <th className="p-4 font-bold text-center">Prob. Playoffs</th>
            <th className="p-4 font-bold text-center">Racha</th>
            <th className="p-4 font-bold hidden md:table-cell text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team, idx) => {
             // Logic to determine status
             let statusText = team.note;
             let statusColorClass = "bg-blue-900/20 text-blue-300 border-blue-900/50";
             
             if (!statusText && team.rank > 6) {
                 statusText = "Eliminado";
                 statusColorClass = "bg-slate-800 text-slate-400 border-slate-700";
             } else if (team.rank <= 2) {
                 statusColorClass = "bg-yellow-900/20 text-yellow-300 border-yellow-900/50";
             }

             return (
            <tr 
              key={team.id} 
              onClick={() => onSelectTeam(team)} 
              className={`border-b border-slate-800 transition-all duration-300 ease-in-out hover:bg-slate-800 hover:scale-[1.01] hover:border-slate-600 hover:shadow-lg cursor-pointer group relative overflow-hidden ${idx < 2 ? 'bg-gradient-to-r from-yellow-900/10 to-transparent' : ''} ${idx >= 10 ? 'bg-gradient-to-r from-red-900/10 to-transparent' : ''}`}
              style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${idx * 100}ms`, opacity: 0 }}
            >
              <td className="p-4 font-mono font-bold text-lg text-gray-500 group-hover:text-white transition-colors">{team.rank}</td>
              <td className="p-4">
                <div className="flex items-center space-x-4">
                  <LeagueBadge color={team.color} icon={team.icon} size={48} />
                  <div>
                    <div className="font-bold text-white text-lg leading-tight group-hover:text-red-400 transition-colors flex items-center">{team.name} <ArrowLeft size={14} className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all text-red-400"/></div>
                    <div className="text-xs text-gray-400 font-mono uppercase tracking-wide">{team.alias}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-center font-bold text-white font-mono whitespace-nowrap"><span className="bg-slate-950 px-2 py-1 rounded border border-slate-800">{team.record}</span></td>
              <td className="p-4 text-center text-gray-300 font-mono">{team.pct.toFixed(3)}</td>
              <td className="p-4 text-center text-gray-400 font-mono">{team.gb}</td>
              <td className="p-4 max-w-[120px]">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold ${team.prob > 80 ? 'text-green-400' : team.prob < 30 ? 'text-red-400' : 'text-yellow-400'}`}>{team.prob}%</span>
                  <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${team.prob > 80 ? 'bg-green-500' : team.prob < 30 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${team.prob}%` }}></div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-center">
                <span className={`px-2 py-1 rounded text-xs font-bold font-mono ${team.streak.startsWith('W') ? 'bg-green-900/20 text-green-400 border border-green-900' : 'bg-red-900/20 text-red-400 border border-red-900'}`}>{team.streak}</span>
              </td>
              <td className="p-4 hidden md:table-cell text-center">
                {statusText && (
                    <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded border leading-relaxed whitespace-normal max-w-[120px] ${statusColorClass}`}>
                        {statusText}
                    </span>
                )}
              </td>
            </tr>
          );})}
        </tbody>
      </table>
    </div>
  </div>
);

const JornadasView = ({ onSelectTeam }: {onSelectTeam: (t: Team)=>void}) => (
  <div className="fade-in-up">
    <h2 className="text-2xl font-black text-white italic mb-6 border-l-4 border-green-500 pl-4 uppercase flex items-center"><Calendar className="mr-2 text-green-500" /> Estadísticas por Jornada</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamsData.map((team, idx) => {
        // Animation states
        const [wPct, setWPct] = useState(0);
        const [lPct, setLPct] = useState(0);
        const [tPct, setTPct] = useState(0);
        const [circleOffset, setCircleOffset] = useState(1); // 1 = empty (via strokeDashoffset calc)

        useEffect(() => {
            const total = team.jornadas.w + team.jornadas.l + team.jornadas.t;
            if (total === 0) return;
            const targetW = (team.jornadas.w / total) * 100;
            const targetL = (team.jornadas.l / total) * 100;
            const targetT = (team.jornadas.t / total) * 100;
            
            const timer = setTimeout(() => {
                setWPct(targetW);
                setLPct(targetL);
                setTPct(targetT);
                setCircleOffset(1 - (team.jornadas.eff / 100));
            }, idx * 100 + 200);
            return () => clearTimeout(timer);
        }, [team, idx]);

        return (
        <div 
          key={team.id} 
          onClick={() => onSelectTeam(team)} 
          className="group relative bg-slate-900/80 border border-slate-700 p-5 rounded-2xl shadow-xl hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] cursor-pointer transition-all duration-300 backdrop-blur-sm overflow-hidden"
          style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${idx * 100}ms`, opacity: 0 }}
        >
          {/* Next Gen Hover Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
             <div className="flex items-center space-x-3">
               <div className="transform transition-transform duration-300 group-hover:scale-110">
                   <LeagueBadge color={team.color} icon={team.icon} size={48} />
               </div>
               <div><h3 className="text-lg font-bold text-white font-sans italic leading-none group-hover:text-green-400 transition-colors">{team.name}</h3><span className="text-xs text-gray-400">Jornadas Totales: {team.jornadas.w + team.jornadas.l + team.jornadas.t}</span></div>
             </div>
             
             {/* Circular Progress with larger viewbox to prevent clipping */}
             <div className="relative w-16 h-16 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    stroke={team.jornadas.eff >= 50 ? "#22c55e" : "#ef4444"} 
                    strokeWidth="8" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`} 
                    strokeDashoffset={`${2 * Math.PI * 40 * circleOffset}`} 
                    className="transition-all duration-1000 ease-out"
                    style={{ transitionDelay: '300ms' }}
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white font-mono">{team.jornadas.eff}%</span>
             </div>
          </div>
          
          <div className="space-y-3 relative z-10">
            <div className="flex items-center text-xs font-bold text-gray-400 uppercase">
                <span className="w-8">W</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden mx-2 shadow-inner border border-slate-700">
                    <div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all duration-1000 ease-out" style={{width: `${wPct}%`}}></div>
                </div>
                <span className="text-white w-6 text-right">{team.jornadas.w}</span>
            </div>
            <div className="flex items-center text-xs font-bold text-gray-400 uppercase">
                <span className="w-8">L</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden mx-2 shadow-inner border border-slate-700">
                    <div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-1000 ease-out" style={{width: `${lPct}%`}}></div>
                </div>
                <span className="text-white w-6 text-right">{team.jornadas.l}</span>
            </div>
            {team.jornadas.t > 0 && (
                <div className="flex items-center text-xs font-bold text-gray-400 uppercase">
                    <span className="w-8">T</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden mx-2 shadow-inner border border-slate-700">
                        <div className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] transition-all duration-1000 ease-out" style={{width: `${tPct}%`}}></div>
                    </div>
                    <span className="text-white w-6 text-right">{team.jornadas.t}</span>
                </div>
            )}
          </div>
        </div>
      )})}
    </div>
  </div>
);

const HeadToHeadView = () => {
    return (
        <div className="fade-in-up">
            <h2 className="text-2xl font-black text-white italic mb-6 border-l-4 border-red-500 pl-4 uppercase flex items-center"><Swords className="mr-2 text-red-500" /> Matchups Directos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchupData.map((matchup, idx) => {
                    const teamA = teamsData.find(t => t.id === matchup.teamAId)!;
                    const teamB = teamsData.find(t => t.id === matchup.teamBId)!;
                    const [pred, setPred] = useState<{text:string, chunks: any[]}|null>(null);
                    const [loading, setLoading] = useState(false);
                    const [animatedSeasonA, setAnimatedSeasonA] = useState(0);
                    const [animatedSeasonB, setAnimatedSeasonB] = useState(0);
                    const [animatedHistoricA, setAnimatedHistoricA] = useState(0);
                    const [animatedHistoricB, setAnimatedHistoricB] = useState(0);

                    useEffect(() => {
                        const totalS = matchup.season.a + matchup.season.b;
                        const sPctA = totalS === 0 ? 50 : (matchup.season.a / totalS) * 100;
                        const sPctB = totalS === 0 ? 50 : (matchup.season.b / totalS) * 100;

                        const totalH = matchup.historic.a + matchup.historic.b;
                        const hPctA = totalH === 0 ? 50 : (matchup.historic.a / totalH) * 100;
                        const hPctB = totalH === 0 ? 50 : (matchup.historic.b / totalH) * 100;
                        
                        // Delay animation slightly
                        const timer = setTimeout(() => {
                            setAnimatedSeasonA(sPctA);
                            setAnimatedSeasonB(sPctB);
                            setAnimatedHistoricA(hPctA);
                            setAnimatedHistoricB(hPctB);
                        }, 200 + (idx * 100)); 
                        return () => clearTimeout(timer);
                    }, [matchup, idx]);

                    const handlePred = async () => {
                        setLoading(true);
                        const res = await getMatchupPrediction(teamA.name, teamB.name);
                        setPred(res);
                        setLoading(false);
                    };

                    return (
                        <div 
                          key={matchup.id} 
                          className="group relative bg-slate-900/80 border border-slate-700 p-5 rounded-2xl shadow-xl hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-300 flex flex-col backdrop-blur-sm"
                          style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${idx * 100}ms`, opacity: 0 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="flex flex-col items-center transform transition-transform group-hover:scale-110 duration-300"><LeagueBadge color={teamA.color} icon={teamA.icon} size={48} /><span className="text-[10px] font-bold mt-2 uppercase text-gray-400">{teamA.name}</span></div>
                                <div className="text-2xl font-black text-red-600 italic animate-pulse">VS</div>
                                <div className="flex flex-col items-center transform transition-transform group-hover:scale-110 duration-300"><LeagueBadge color={teamB.color} icon={teamB.icon} size={48} /><span className="text-[10px] font-bold mt-2 uppercase text-gray-400">{teamB.name}</span></div>
                            </div>
                            
                            {/* Season Stats */}
                            <div className="mb-4 relative z-10">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm font-black text-white">{matchup.season.a}</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase pb-1 tracking-wider">Temporada</span>
                                    <span className="text-sm font-black text-white">{matchup.season.b}</span>
                                </div>
                                <div className="flex h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 shadow-inner">
                                    <div style={{ width: `${animatedSeasonA}%`, backgroundColor: teamA.color }} className="h-full shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-in"></div>
                                    <div style={{ width: `${animatedSeasonB}%`, backgroundColor: teamB.color }} className="h-full shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-in"></div>
                                </div>
                            </div>

                            {/* Historic Stats (NEW) */}
                            <div className="mb-4 relative z-10">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm font-black text-white">{matchup.historic.a}</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase pb-1 tracking-wider">Histórico</span>
                                    <span className="text-sm font-black text-white">{matchup.historic.b}</span>
                                </div>
                                <div className="flex h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 shadow-inner">
                                    <div style={{ width: `${animatedHistoricA}%`, backgroundColor: teamA.color }} className="h-full shadow-[0_0_10px_currentColor] opacity-80 transition-all duration-1000 ease-in"></div>
                                    <div style={{ width: `${animatedHistoricB}%`, backgroundColor: teamB.color }} className="h-full shadow-[0_0_10px_currentColor] opacity-80 transition-all duration-1000 ease-in"></div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-800 relative z-10">
                                {!pred ? (
                                    <button onClick={handlePred} disabled={loading} className="w-full py-2 bg-indigo-600/20 border border-indigo-500/50 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center disabled:opacity-50 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                                        {loading ? <span className="animate-pulse">Consultando...</span> : <><Zap size={14} className="mr-2" /> Predicción del Oráculo</>}
                                    </button>
                                ) : (
                                    <div className="bg-indigo-950/50 p-3 rounded-lg border border-indigo-500/30 text-xs text-indigo-200 italic animate-in fade-in">
                                        <p>"{pred.text}"</p>
                                        {pred.chunks && pred.chunks.length > 0 && <div className="mt-2 pt-2 border-t border-indigo-500/20 text-[10px] text-indigo-400">Fuentes: {pred.chunks.length} webs consultadas.</div>}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const FantasyView = ({ onSelectTeam }: {onSelectTeam: (t: Team)=>void}) => (
  <div className="fade-in-up">
    <h2 className="text-2xl font-black text-white italic mb-6 border-l-4 border-blue-500 pl-4 uppercase flex items-center"><Zap className="mr-2 text-blue-500" /> Métricas de Fantasía</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamsData.map((team, idx) => (
        <div 
          key={team.id} 
          onClick={() => onSelectTeam(team)} 
          className="group relative bg-slate-900/80 border border-slate-700 p-5 rounded-2xl shadow-xl hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] cursor-pointer transition-all duration-300 backdrop-blur-sm overflow-hidden"
          style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${idx * 100}ms`, opacity: 0 }}
        >
          {/* Next Gen Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity text-white transform scale-150 origin-top-right duration-700 rotate-12">{team.icon}</div>
          
          <div className="flex items-center space-x-4 mb-4 relative z-10">
             <div className="transform transition-transform duration-300 group-hover:scale-110">
                <LeagueBadge color={team.color} icon={team.icon} size={56} />
             </div>
            <div><h3 className="text-xl font-bold text-white font-sans italic leading-none group-hover:text-blue-400 transition-colors">{team.name}</h3><span className="text-xs text-gray-400">RK: {team.rank}</span></div>
          </div>
          
          <div className="space-y-4 pointer-events-none relative z-10">
            <div className="flex justify-between items-end border-b border-slate-800 pb-2"><span className="text-gray-400 text-xs uppercase">Puntos Favor (PF)</span><span className="text-2xl font-black text-white font-mono tracking-tighter group-hover:text-blue-200 transition-colors">{team.fantasy.pf}</span></div>
            <div className="flex justify-between items-end border-b border-slate-800 pb-2"><span className="text-gray-400 text-xs uppercase">Puntos Contra (PA)</span><span className="text-xl font-bold text-gray-300 font-mono">{team.fantasy.pa}</span></div>
            <div className="mt-4 pt-2">
              <div className="flex justify-between text-xs uppercase font-bold mb-1"><span>Diferencial</span><span className={`${team.fantasy.diff.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{team.fantasy.diff}</span></div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full flex overflow-hidden">
                {/* Differential Bar */}
                <div className="w-1/2 bg-slate-800 flex justify-end relative">
                    {team.fantasy.diff.startsWith('-') && (
                        <div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" style={{ width: `${Math.min(Math.abs(parseFloat(team.fantasy.diff))/15, 100)}%` }}></div>
                    )}
                </div>
                <div className="w-1/2 bg-slate-800 flex justify-start relative">
                    {team.fantasy.diff.startsWith('+') && (
                        <div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" style={{ width: `${Math.min(Math.abs(parseFloat(team.fantasy.diff))/15, 100)}%` }}></div>
                    )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs mt-2 text-gray-500 font-mono"><span>MOVIMIENTOS: <span className="text-white">{team.moves}</span></span><span>EFECTIVIDAD: {Math.round((parseInt(team.record.split('-')[0]) / (parseInt(team.record.split('-')[0]) + parseInt(team.record.split('-')[1]))) * 100)}%</span></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RealStatsView = () => {
    const maxPts = Math.max(...teamsData.map(t => t.real.pts));
    const maxReb = Math.max(...teamsData.map(t => t.real.reb));
    const maxAst = Math.max(...teamsData.map(t => t.real.ast));
    const maxStl = Math.max(...teamsData.map(t => t.real.stl));
    const maxBlk = Math.max(...teamsData.map(t => t.real.blk));
    const maxTo = Math.max(...teamsData.map(t => t.real.to));
    const maxPf = Math.max(...teamsData.map(t => t.real.pf));

    const leaderPts = teamsData.reduce((prev, current) => (prev.real.pts > current.real.pts) ? prev : current).id;
    const leaderReb = teamsData.reduce((prev, current) => (prev.real.reb > current.real.reb) ? prev : current).id;
    const leaderAst = teamsData.reduce((prev, current) => (prev.real.ast > current.real.ast) ? prev : current).id;
    const leaderStl = teamsData.reduce((prev, current) => (prev.real.stl > current.real.stl) ? prev : current).id;
    const leaderBlk = teamsData.reduce((prev, current) => (prev.real.blk > current.real.blk) ? prev : current).id;
    const leaderTo = teamsData.reduce((prev, current) => (prev.real.to > current.real.to) ? prev : current).id;
    const leaderPf = teamsData.reduce((prev, current) => (prev.real.pf > current.real.pf) ? prev : current).id;

    return (
      <div className="fade-in-up">
        <h2 className="text-2xl font-black text-white italic mb-6 border-l-4 border-orange-500 pl-4 uppercase flex items-center"><Activity className="mr-2 text-orange-500" /> Estadísticas Reales NBA</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
           {teamsData.map((team, idx) => (
               <div 
                 key={team.id} 
                 className="group bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-lg hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300 backdrop-blur-sm"
                 style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${idx * 100}ms`, opacity: 0 }}
               >
                   <div className="md:w-1/3 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
                       <div className="mb-2 transform transition-transform duration-300 group-hover:scale-110"><LeagueBadge color={team.color} icon={team.icon} size={64} /></div>
                       <h3 className="font-bold text-white uppercase text-center text-lg">{team.name}</h3>
                       <div className="flex space-x-2 mt-3 w-full justify-center">
                           <div className="text-center bg-slate-950 p-1.5 rounded border border-slate-800 flex-1 group-hover:border-orange-500/30 transition-colors"><div className="text-[9px] text-gray-500 font-bold">TRIPLE-D</div><div className="font-mono text-white font-bold">{team.real.td}</div></div>
                           <div className="text-center bg-slate-950 p-1.5 rounded border border-slate-800 flex-1 group-hover:border-orange-500/30 transition-colors"><div className="text-[9px] text-gray-500 font-bold">DOBLE-D</div><div className="font-mono text-white font-bold">{team.real.dd}</div></div>
                       </div>
                   </div>
                   <div className="flex-1 space-y-3">
                        <StatBar label="Puntos (PTS)" value={team.real.pts} max={maxPts} color="bg-orange-500" isLeader={team.id === leaderPts} />
                        <StatBar label="Rebotes (REB)" value={team.real.reb} max={maxReb} color="bg-blue-600" isLeader={team.id === leaderReb} />
                        <StatBar label="Asistencias (AST)" value={team.real.ast} max={maxAst} color="bg-emerald-500" isLeader={team.id === leaderAst} />
                        <StatBar label="Robos (STL)" value={team.real.stl} max={maxStl} color="bg-purple-500" isLeader={team.id === leaderStl} />
                        <StatBar label="Bloqueos (BLK)" value={team.real.blk} max={maxBlk} color="bg-slate-500" isLeader={team.id === leaderBlk} />
                        <StatBar label="Pérdidas (TO)" value={team.real.to} max={maxTo} color="bg-red-500" isLeader={team.id === leaderTo} />
                        <StatBar label="Faltas (PF)" value={team.real.pf} max={maxPf} color="bg-yellow-500" isLeader={team.id === leaderPf} />
                   </div>
               </div>
           ))}
        </div>
      </div>
    );
};

const AwardsView = ({ onSelectAward }: { onSelectAward: (a: Award) => void }) => {
  const regularAwards = awardsData.filter(a => a.id < 50);
  const shameAwards = awardsData.filter(a => a.id >= 50);

  return (
    <div className="fade-in-up">
      {/* Sala de Trofeos */}
      <h2 className="text-2xl font-black text-white italic mb-6 border-l-4 border-amber-500 pl-4 uppercase flex items-center">
        <Medal className="mr-2 text-amber-500" /> Sala de Trofeos
      </h2>
      
      <div className="flex flex-col space-y-6 mb-16">
        {regularAwards.map((medal, idx) => (
          <div 
            key={medal.id} 
            onClick={() => onSelectAward(medal)}
            className="relative h-40 bg-slate-900 border border-amber-500/30 rounded-xl shadow-lg overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(217,119,6,0.2)] cursor-pointer"
            style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${idx * 50}ms`, opacity: 0 }}
          >
             {/* Hover Overlay */}
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm">
                 <div className="flex flex-col items-center text-amber-400 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                     <div className="bg-amber-500/20 p-4 rounded-full border border-amber-500 mb-2 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                         <Eye size={32} />
                     </div>
                     <span className="uppercase font-bold tracking-[0.2em] text-sm">Ver Detalles</span>
                 </div>
             </div>

             <div className="flex h-full w-full">
                {/* MITAD IZQUIERDA: IMAGEN */}
                <div className="w-2/5 md:w-1/4 h-full relative overflow-hidden border-r border-white/10 bg-black">
                   <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e293b,#0f172a,#334155)] bg-[length:400%_400%] animate-gradient-xy z-0"></div>
                   <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay z-0"></div>
                   <img 
                      src={medal.img} 
                      alt={medal.name} 
                      className="relative z-10 h-full w-full object-contain p-2 drop-shadow-2xl"
                   />
                </div>

                {/* MITAD DERECHA: TEXTO */}
                <div className="flex-1 h-full p-6 flex flex-col justify-center relative">
                   <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/95 to-transparent z-0"></div>
                   <div className="relative z-10">
                      <h3 className="text-xl md:text-3xl font-black text-amber-400 uppercase tracking-tighter leading-none mb-2 transition-all duration-300 group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                         {medal.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 font-mono leading-tight border-l-2 border-amber-600/50 pl-3 transition-colors duration-300 group-hover:text-white group-hover:border-amber-400">
                         {medal.desc}
                      </p>
                   </div>
                   <div className="absolute top-2 right-2 opacity-10 text-amber-500 transform rotate-12 pointer-events-none">
                      <Medal size={80} strokeWidth={1} />
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Muro de la Vergüenza */}
      <div className="relative pt-10 border-t-4 border-dashed border-slate-800">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-950 px-6 py-2 border border-slate-800 rounded-full flex items-center space-x-2 shadow-2xl">
              <Skull className="text-purple-500 animate-pulse" />
              <span className="text-gray-400 font-black uppercase tracking-widest text-sm">Zona de Castigo</span>
              <Skull className="text-purple-500 animate-pulse" />
          </div>

          <h2 className="text-2xl font-black text-gray-300 italic mb-6 border-l-4 border-purple-600 pl-4 uppercase flex items-center">
            <Ghost className="mr-2 text-purple-600" /> El Muro de la Vergüenza
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shameAwards.map((award, idx) => (
              <div 
                key={award.id} 
                onClick={() => onSelectAward(award)}
                className="group relative bg-slate-950 border border-purple-900/30 rounded-xl overflow-hidden hover:border-purple-600 transition-all duration-300 cursor-pointer h-40"
                style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${idx * 100}ms`, opacity: 0 }}
              >
                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm">
                     <div className="flex flex-col items-center text-purple-400 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                         <div className="bg-purple-900/40 p-3 rounded-full border border-purple-500 mb-2 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                             <Eye size={24} />
                         </div>
                         <span className="uppercase font-bold tracking-[0.2em] text-xs">Ver Castigo</span>
                     </div>
                 </div>

                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-30 pointer-events-none z-0"></div>
                 
                 <div className="flex h-full w-full relative z-10">
                    <div className="w-1/3 h-full relative overflow-hidden bg-black/50 border-r border-slate-800 flex items-center justify-center">
                       <img 
                          src={award.img} 
                          alt={award.name} 
                          className="w-24 h-24 object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500"
                       />
                       <div className="absolute inset-0 bg-purple-900/20 mix-blend-multiply"></div>
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center relative">
                       <h3 className="text-lg font-black text-gray-500 uppercase tracking-tighter leading-none mb-2 group-hover:text-purple-400 transition-colors">
                          {award.name}
                       </h3>
                       <p className="text-xs text-slate-600 font-mono leading-tight line-clamp-2 border-l border-slate-800 pl-2 group-hover:text-slate-400 mb-2">
                          {award.desc}
                       </p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

const AwardDetailModal = ({ award, onClose }: { award: Award, onClose: () => void }) => {
    if (!award) return null;
    const winners = award.winners.map(winnerId => teamsData.find(t => t.id === winnerId)).filter(Boolean) as Team[];
    const isShame = award.id >= 50;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`relative w-full max-w-2xl bg-slate-900 border-2 ${isShame ? 'border-purple-900/50' : 'border-amber-500/50'} rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden`}>
                <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full transition-colors backdrop-blur-sm"><X size={20} /></button>
                <div className="p-8 flex flex-col items-center text-center relative">
                    <div className={`absolute inset-0 bg-gradient-to-b ${isShame ? 'from-purple-950/40 to-black' : 'from-amber-900/40 to-slate-900'} z-0`}></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent z-0"></div>
                    <div className={`relative z-10 w-48 h-48 mb-6 ${isShame ? 'grayscale hover:grayscale-0 transition-all duration-700' : 'drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]'}`}>
                        <img src={award.img} alt={award.name} className="w-full h-full object-contain" />
                    </div>
                    <h2 className={`relative z-10 text-4xl font-black ${isShame ? 'text-gray-400' : 'text-amber-400'} uppercase tracking-tighter mb-4 drop-shadow-md`}>{award.name}</h2>
                    <p className={`relative z-10 text-lg ${isShame ? 'text-slate-500' : 'text-gray-300'} font-mono mb-8 max-w-md leading-relaxed border-b ${isShame ? 'border-slate-800' : 'border-amber-500/30'} pb-6`}>{award.desc}</p>
                    <div className="relative z-10 w-full">
                        <h3 className={`text-sm font-bold ${isShame ? 'text-red-500' : 'text-amber-200/70'} uppercase tracking-widest mb-4`}>
                            {isShame ? "Víctimas Actuales" : "Ganadores Actuales"}
                        </h3>
                        {winners.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-4">
                                {winners.map(team => (
                                    <div key={team.id} className={`flex items-center ${isShame ? 'bg-black border-red-900/30' : 'bg-slate-800/80 border-amber-500/20'} border rounded-full px-4 py-2 space-x-3 shadow-lg`}>
                                        <LeagueBadge color={team.color} icon={team.icon} size={32} />
                                        <span className={`font-bold ${isShame ? 'text-gray-400' : 'text-white'} uppercase`}>{team.name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="inline-flex items-center bg-slate-800/50 border border-slate-700 rounded-full px-6 py-2 text-gray-400 font-mono italic">
                                <Lock size={14} className="mr-2" />
                                <span>Vacante / Aún no {isShame ? 'sufrido' : 'reclamado'}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecordsView = () => (
    <div className="fade-in-up">
      <h2 className="text-2xl font-black text-white italic mb-6 border-l-4 border-yellow-500 pl-4 uppercase flex items-center"><Crown className="mr-2 text-yellow-500" /> Hall of Records</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordsList.map((rec, i) => (
              <div 
                key={i} 
                className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-t-2 border-slate-700 p-6 shadow-xl hover:-translate-y-1 transition-transform overflow-hidden group rounded-xl"
                style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                  <div className="absolute -right-4 -top-4 text-slate-700 opacity-20 transform rotate-12 group-hover:opacity-40 transition-opacity"><Crown size={100} /></div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{rec.title}</h3>
                  <div className={`text-3xl font-black font-sans italic mb-3 ${rec.type === 'negative' ? 'text-red-500' : rec.type === 'positive' ? 'text-green-400' : 'text-yellow-400'}`}>
                      <CountUp value={rec.val} />
                  </div>
                  <div className="flex items-center justify-center mt-4 border-t border-slate-700 pt-3 space-x-3">
                      {rec.teamIds ? (rec.teamIds.map(id => {const team = teamsData.find(t => t.id === id); return team ? (<div key={id} className="flex items-center space-x-2"><LeagueBadge color={team.color} icon={team.icon} size={32} /></div>) : null})) : null}
                      <span className="text-white font-bold text-sm">{rec.holder}</span>
                  </div>
              </div>
          ))}
      </div>
    </div>
);

// --- MAIN APP ---

const App = () => {
  const [activeTab, setActiveTab] = useState('standings');
  const [selectedTeam, setSelectedTeam] = useState<Team|null>(null);
  const [selectedAward, setSelectedAward] = useState<Award|null>(null);

  // Marquee logic
  const newsItems = [...newsTickerData, ...newsTickerData];

  // Global style for fadeInUp
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-24 selection:bg-red-500 selection:text-white">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Background />
      <Header />
      {selectedTeam && <TeamProfileView team={selectedTeam} onClose={() => setSelectedTeam(null)} />}
      {selectedAward && <AwardDetailModal award={selectedAward} onClose={() => setSelectedAward(null)} />}
      <LiveAnnouncer />
      <ChatInterface />

      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar space-x-1 py-2">
            <TabButton active={activeTab === 'standings'} onClick={() => setActiveTab('standings')} icon={Grid} label="General" />
            <TabButton active={activeTab === 'jornadas'} onClick={() => setActiveTab('jornadas')} icon={Calendar} label="Jornadas" />
            <TabButton active={activeTab === 'matchups'} onClick={() => setActiveTab('matchups')} icon={Swords} label="Enfrentamientos" />
            <TabButton active={activeTab === 'fantasy'} onClick={() => setActiveTab('fantasy')} icon={Target} label="Fantasy Labs" />
            <TabButton active={activeTab === 'real'} onClick={() => setActiveTab('real')} icon={BarChart2} label="NBA Stats" />
            <TabButton active={activeTab === 'records'} onClick={() => setActiveTab('records')} icon={Crown} label="Records" />
            <TabButton active={activeTab === 'premios'} onClick={() => setActiveTab('premios')} icon={Medal} label="Premios" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'standings' && <StandingsView onSelectTeam={setSelectedTeam} />}
        {activeTab === 'jornadas' && <JornadasView onSelectTeam={setSelectedTeam} />}
        {activeTab === 'matchups' && <HeadToHeadView />}
        {activeTab === 'fantasy' && <FantasyView onSelectTeam={setSelectedTeam} />}
        {activeTab === 'real' && <RealStatsView />}
        {activeTab === 'records' && <RecordsView />}
        {activeTab === 'premios' && <AwardsView onSelectAward={setSelectedAward} />}
      </main>

      <div className="fixed bottom-0 left-0 w-full z-30">
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/90 to-red-950/95 backdrop-blur-md border-t border-red-500/30"></div>
          <div className="relative py-3 overflow-hidden text-white flex">
            <div className="flex animate-marquee hover:pause">
               {newsItems.map((item, idx) => {
                   const Icon = item.icon;
                   return (
                       <div key={idx} className="flex items-center mx-8 whitespace-nowrap">
                           <Icon size={16} className={`mr-2 ${item.color} drop-shadow-md`} />
                           <span className="font-bold font-mono text-sm uppercase tracking-widest text-gray-100">{item.text}</span>
                           <span className="ml-8 text-red-500/50">|</span>
                       </div>
                   );
               })}
            </div>
          </div>
      </div>
    </div>
  );
};

export default App;
