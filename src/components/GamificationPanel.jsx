export default function GamificationPanel({
    xp,
    level,
    badges,
  }) {
    return (
      <div className="bg-slate-800 p-4 rounded text-white">
        <h2 className="text-lg mb-2">Your Progress</h2>
  
        <p>Level: {level}</p>
        <p>XP: {xp}</p>
  
        <div className="mt-2">
          <h3 className="text-sm">Badges</h3>
          <div className="flex gap-2 mt-1">
            {badges?.length
              ? badges.map((b) => <span key={b}>{b}</span>)
              : <span>No badges yet</span>}
          </div>
        </div>
      </div>
    );
  }
  