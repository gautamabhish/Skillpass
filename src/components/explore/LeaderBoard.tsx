import { div } from 'framer-motion/client';
import React from 'react';

type Player = {
  id: string;
  name: string;
  score: number;
  rank: number;
};



interface LeaderBoardProps {
  topPlayers: Player[];
  surroundingPlayers: Player[];
  currentUser: Player;
}

const PlayerRow = ({ player, highlight = false }: { player: Player; highlight?: boolean }) => (
  <div
    className={`flex justify-between items-center px-4 py-2 border-b text-sm w-full ${
      highlight ? 'bg-blue-100 font-semibold rounded-md' : ''
    }`}
  >
    <span className="w-10 text-center">{player.rank}</span>
    <span className="flex-1">{player.name}</span>
    <span className="w-16 text-right font-mono">{player.score}</span>
  </div>
);

const LeaderBoard: React.FC<LeaderBoardProps> = ({ topPlayers, surroundingPlayers, currentUser }) => {
  return (
    <div className='w-full max-w-7xl  px-4 mx-auto '>
    <div className=" mx-auto  p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Top 10 Leaderboard</h2>
      <div className="mb-6">
        {topPlayers.map(player => (
          <PlayerRow key={player.id} player={player} highlight={player.id === currentUser.id} />
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-center">📍Your Rank</h3>
      <div>
        {surroundingPlayers.map(player => (
          <PlayerRow key={player.id} player={player} highlight={player.id === currentUser.id} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default LeaderBoard;
