const Reviews = () => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md font-display">
      <li className="p-4 pb-2 text-base font-bold tracking-wide flex items-center gap-2.5">
        Reviews <div className="badge badge-primary badge-lg">2</div>
      </li>

      {/* später mappen wir hier "li" element mit className="list-row"*/}
      <li className="list-row flex flex-row items-center">
        <img
          className="size-10 rounded-full "
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />

        <div className="flex flex-col gap-3.5 w-full">
          <div className="flex flex-row justify-between items-center ">
            <p className="text-[18.7px] font-bold">Olivia King</p>{" "}
            <div>
              <p className="text-neutral-400">2024.09.02</p>
              <p className="text-lg text-amber-400">★★★☆☆</p>
            </div>
          </div>

          <p className=" text-sm opacity-60">
            Comfortable and stylish, this car is perfect for long drives.
            (Model: Volkswagen Golf)
          </p>
        </div>
      </li>

      {/* ===============================================*/}
    </ul>
  );
};

export default Reviews;
