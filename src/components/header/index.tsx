import HeaderImage from "../../assets/header.png";

const Header = () => {
  return (
    <div className="relative h-[300px] overflow-hidden">
      <img
        src={HeaderImage}
        alt="Header"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-50 p-4">
        <div className="md:space-y-6">
          <p className="text-3xl font-bold font-inter text-black md:text-[50px] text-center">
            Optimize Your Meal
          </p>
          <p className="text-[10px] font-inter md:text-sm  text-black text-center">
            Select a meal to add to your week. You will be able to edit, modify,
            and change the meal weeks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
