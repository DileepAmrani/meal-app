import { useState, useRef, useEffect } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import TrashLogo from "../../assets/trash.png";
import { Card } from "../../types";

interface CardProps {
  data: Card;
  handleDeleteDeal: (data: Card) => void;
}

const MealCard = ({ data, handleDeleteDeal }: CardProps) => {
  const [weeks, setWeeks] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedWeekDeal, setSelectedWeekDeal] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null); // Create a reference for the modal

  const handleAddToLocalStorage = () => {
    if (selectedWeekDeal) {
      const existingDeals: {
        name: string;
        week: string;
        [key: string]: any;
      }[] = JSON.parse(localStorage.getItem("deals") || "[]");

      const isDealAlreadyAdded = existingDeals.some(
        (deal) => deal.week === selectedWeekDeal && deal.name === data.name
      );

      if (isDealAlreadyAdded) {
        alert("Deal for this week is already added!");
      } else {
        const deal = { ...data, week: selectedWeekDeal };
        existingDeals.push(deal);
        localStorage.setItem("deals", JSON.stringify(existingDeals));
        setIsModalOpen(false);
        alert("Deal added successfully!");
      }
    } else {
      alert("Please select a week!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedWeeks = localStorage.getItem("weeks");
    const parsedWeeks = storedWeeks ? JSON.parse(storedWeeks) : ["Week 1", "Week 2", "Week 3", "Week 4"];
    const weeksWithoutFirst = parsedWeeks.slice(1);
    setWeeks(weeksWithoutFirst);
  }, []);

  return (
    <>
      <div
        className="bg-white p-5 rounded-xl flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-full max-h-[240px] object-cover rounded-xl"
          />
          <p className="absolute top-2 right-2 font-poppin font-semibold text-[11.5px] bg-black text-white px-8 py-0.5 rounded-md shadow-lg hover:bg-opacity-75">
            {data.mealType[0]}
          </p>
          {data.week && (
            <button
              onClick={() => handleDeleteDeal(data)} // Use the function passed from the parent
              className="bg-[#FFE0E0] text-white p-1 rounded-sm absolute left-2 top-2"
            >
              <img src={TrashLogo} alt="" />
            </button>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1">
          <p className="font-semibold font-poppin text-[23px] mt-4">
            {data.name}
          </p>

          <div className="my-3">
            <p className="text-[12.44px] font-poppins text-ellipsis line-clamp-7">
              {data.instructions.join(" ")}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <p className="font-semibold font-poppin text-[12.44px]">
                Cuisine:
              </p>
              <p className="font-poppin text-[12.44px]">{data.cuisine}</p>
            </div>
            <div className="flex items-center gap-2 ">
              <p className="font-semibold font-poppin text-[12.44px]">
                Rating:
              </p>
              <div className="flex items-center gap-1">
                <p className="font-poppin text-[12.44px]">{data.rating}</p>

                <div className="flex items-center">
                  <ReactStarsRating
                    value={data.rating}
                    size={14}
                    className="inline-flex"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 top-0">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-xl max-w-2xl w-full"
          >
            <p className="font-poppin mb-2 text-center font-semibold text-[30px]">
              Select week
            </p>
            <div className="flex flex-wrap justify-center gap-4 my-8">
              {weeks.map((week) => (
                <button
                  key={week}
                  onClick={() => setSelectedWeekDeal(week)}
                  className={`px-4 p-2 border rounded-md  ${
                    selectedWeekDeal === week ? "bg-[#CFECFF]" : "bg-[#F2F2F2]"
                  }`}
                >
                  {week}
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={handleAddToLocalStorage}
                className="bg-[#004370] text-white py-2 px-4 rounded-lg max-w-[150px] w-full"
              >
                Add Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MealCard;
