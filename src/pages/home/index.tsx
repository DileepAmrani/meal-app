import { useEffect, useState } from "react";
import { MealCard, Header, Menu } from "../../components";
import HomeBg from "../../assets/home-bg.png";
import axios from "axios";
import { Card } from "../../types";

const Home = () => {
  const [meals, setMeals] = useState<Card []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedWeek, setSelectedWeek] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedWeek = localStorage.getItem("selectedWeek");
      return storedWeek || "All Meals";
    }
    return "All Meals";
  });

  const [weeks, setWeeks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedWeeks = localStorage.getItem("weeks");
      return storedWeeks
        ? JSON.parse(storedWeeks)
        : ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"];
    }
    return ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"];
  });

  const handleWeekChange = (week: string) => {
    setSelectedWeek(week);
    localStorage.setItem("selectedWeek", week);
  };

  const addWeek = () => {
    const newWeek = `Week ${weeks.length + 1}`;
    setWeeks((prevWeeks) => [...prevWeeks, newWeek]);
  };

  const fetchMeals = async () => {
    setLoading(true);
    if (selectedWeek === "All Meals") {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        setMeals(response.data.recipes);
        localStorage.setItem("meals", JSON.stringify(response.data.recipes));
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    } else {
      const storedDeals = localStorage.getItem("deals");

      if (storedDeals) {
        try {
          const parsedDeals = JSON.parse(storedDeals);

          if (Array.isArray(parsedDeals)) {
            const filteredDeals = parsedDeals.filter(
              (deal) => deal.week === selectedWeek
            );

            if (filteredDeals.length > 0) {
              setMeals(filteredDeals);
            } else {
              setMeals([]);
            }
          } else {
            setMeals([]);
          }
        } catch (error) {
          console.error("Error parsing deals from localStorage:", error);
          setMeals([]);
        }
      } else {
        setMeals([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, [selectedWeek]);

  const handleDeleteDeal = (data: { id: number | string; name: string }) => {
    if (!selectedWeek) {
      alert("Please select a week before deleting.");
      return;
    }

    const existingDeals: { name: string; week: string; [key: string]: any }[] =
      JSON.parse(localStorage.getItem("deals") || "[]");

    const updatedDeals = existingDeals.filter(
      (deal) => !(deal.week === selectedWeek && deal.id === data.id)
    );

    if (existingDeals.length === updatedDeals.length) {
      alert("No matching deal found to delete.");
    } else {
      localStorage.setItem("deals", JSON.stringify(updatedDeals));
      alert("Deal removed successfully!");
      fetchMeals();
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <Header />
      <div className="max-w-5xl mx-auto py-5 max-md:px-4">
        <p className="font-poppins text-[25px] font-semibold">Week Orders</p>
      </div>
      <Menu
        selectedWeek={selectedWeek}
        weeks={weeks}
        onWeekChange={handleWeekChange}
        onAddWeek={addWeek}
      />
      <div className="max-w-5xl mx-auto py-5 mt-6 max-md:px-4">
        {loading ? (
          <p>Loading meals...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {meals.map((meal, index) => (
              <MealCard
                key={index}
                data={meal}
                handleDeleteDeal={handleDeleteDeal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
