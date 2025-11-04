
import React from 'react';

interface StatsProps {
  count: number;
}

const Stats: React.FC<StatsProps> = ({ count }) => {
  return (
    <div className="bg-black bg-opacity-30 p-4 rounded-lg text-center w-full">
      <p className="text-xl text-gray-300">Pixels Edited</p>
      <p className="text-5xl font-bold text-white">{count}</p>
    </div>
  );
};

export default Stats;