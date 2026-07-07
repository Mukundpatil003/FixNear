const CategoryCard = ({ icon, title }) => {
  return (
    <div className="group flex h-[160px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-[#EDF1F7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F8FF] text-3xl text-blue-600">
        {icon}
      </div>

      <h3 className="mt-6 text-[16px] font-semibold text-[#111827]">
        {title}
      </h3>

    </div>
  );
};

export default CategoryCard;