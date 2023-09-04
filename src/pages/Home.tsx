import { FC, useState } from "react";
import { API_KEY, api } from "../api/api";
import Cards from "../components/Cards";
import axios from "axios";
import Youtube from 'react-youtube';
import Main from "../components/Main";



export const Home: FC = () => {

    const opts = {
        height: "490", // Set your desired height here
        width: "740",
        playerVars: {
          autoplay: 1,
        }
    }
    const [urlId, setUrlId] = useState<{key: string}>({key: ''});

    const idHandler = (value: string) => {
        const fetchYoutubVideoKey = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${value}/videos?api_key=${API_KEY}`);
            const data: {results: {key:string}[]} = await res.data;
            if(data.results.length !== 0) {
                setUrlId(prev => data.results[0]);
            }
        }
        fetchYoutubVideoKey();
      };

      const onClose = () => {
        setUrlId(prev => ({key: ''}));
      };

  return (
    <div className="bg-black">
      <div></div>
      {urlId.key && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="modal-content bg-transparent p-8 rounded-xl relative">
            <button className="absolute top-4 right-4 text-gray-600 bg-white rounded-md p-1 font-semibold"
              onClick={onClose}>
              X
            </button>
            <Youtube opts={opts} videoId={urlId.key} />
          </div>
        </div>
      )}
      <Main />
      <Cards value={idHandler} rowId="1" title="Top Rated" fetchURL={api.fetchActionMovies}/>
      <Cards value={idHandler} rowId="2" title="Trending" fetchURL={api.fetchTrending}/>
      <Cards value={idHandler} rowId="3" title="Action" fetchURL={api.fetchActionMovies}/>
      <Cards value={idHandler} rowId="4" title="Horror" fetchURL={api.fetchHorrorMovies}/>
    </div>
  );
};
