import { useEffect } from "react";

interface ChildComponentProps {
  selectedWeek: string;
  weeks: string[];
  onWeekChange: (week: string) => void;
  onAddWeek: () => void;
}

const Menu: React.FC<ChildComponentProps> = ({
  selectedWeek,
  weeks,
  onWeekChange,
  onAddWeek,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedWeek", selectedWeek);
      localStorage.setItem("weeks", JSON.stringify(weeks));
    }
  }, [selectedWeek, weeks]);

  return (
    <div className="bg-white py-3">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center min-h-20 gap-4 md:gap-14">
        <div className="flex items-center flex-wrap gap-4 md:gap-8">
          {weeks.map((week) => (
            <button
              key={week}
              className={`font-poppins text-[16px] font-semibold leading-[24px] text-center px-5 py-1 ${
                selectedWeek === week
                  ? "border-b-[4px] border-[#004370]"
                  : "border-b-transparent"
              }`}
              onClick={() => onWeekChange(week)}
            >
              {week}
            </button>
          ))}
        </div>
        <button
          className="bg-[#9B9B9B] h-[44px] px-10 rounded-md font-poppins font-semibold text-white mt-4 md:mt-0"
          onClick={onAddWeek}
        >
          Add to Week
        </button>
      </div>
    </div>
  );
};

export default Menu;
