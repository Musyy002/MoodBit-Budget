export default function MoodBit({ totalSpent, budget }) {
    let mood = "neutral";
    let emoji = "🙂";
    let message = "You're doing okay. Keep tracking!";
  
    if (!budget) {
      return (
        <div className="p-4 bg-slate-800 rounded text-white">
          <p>🐾 Set a budget to activate MoodBit</p>
        </div>
      );
    }
  
    const percent = totalSpent / budget;
  
    if (percent <= 0.5) {
      mood = "happy";
      emoji = "😊";
      message = "Great job! Your spending is well under control.";
    } else if (percent <= 0.7) {
      mood = "neutral";
      emoji = "🙂";
      message = "You're doing fine. Just stay mindful.";
    } else if (percent <= 0.9) {
      mood = "sad";
      emoji = "😟";
      message = "Careful! You're close to your budget limit.";
    } else if (percent <= 1) {
      mood = "angry";
      emoji = "😡";
      message = "Overspending detected! MoodBit is upset.";
    }
  
    return (
      <div className="p-4 bg-slate-800 rounded text-center text-white">
        <div className="text-5xl">{emoji}</div>
        <p className="mt-2 font-semibold capitalize">{mood}</p>
        <p className="text-sm mt-1">{message}</p>
      </div>
    );
  }
  