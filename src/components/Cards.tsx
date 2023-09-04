import axios from "axios";
import { FC, useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface CardsProps {
  title: string;
  fetchURL: string;
  rowId: string;
  value: (val: string) => void;
}

interface MovieInteface {
  backdrop_path: string;
  id: number;
  poster_path: string;
  title: string;
}

const Cards: FC<CardsProps> = ({ title, fetchURL, rowId, value }) => {
  const [card, setCard] = useState<MovieInteface[]>([]);
  useEffect(() => {
    axios
      .get(fetchURL)
      .then((response) => {
        setCard((prev) => response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchURL]);

  const rightSlide = () => {
    let slider = document.getElementById("slider" + rowId)!;
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const leftSide = () => {
    let slider = document.getElementById("slider" + rowId)!;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const view = (itemsId: string) => {
    value(itemsId);
  };
  return (
    <>
      <h2 className="text-white text-sm md:text-xl p-4 font-semibold">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={rightSlide}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowId}
          className="w-full left-0 h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide px-3"
        >
          {card.map((items) => {
            return (
              <div
                onClick={() => view(items.id.toString())}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2 cursor-pointer"
                key={items.id}
              >
                <img
                  className="rounded"
                  src={`https://image.tmdb.org/t/p/w500/${items?.backdrop_path}`}
                  alt={items?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="white-space-normal text-xs md:text-sm flex justify-center items-center h-full">
                    {items.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <MdChevronRight
          onClick={leftSide}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Cards;
