import { useState, useEffect } from "react";
import { IndianRupee, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

interface Cast {
  actor: string;
  actress: string;
  villan: string;
  supporting: string;
}

interface Crew {
  director: string;
  producer: string;
  musicDirector: string;
  cinematographer: string;
}

interface ShowPrices {
  adult: string;
  kids: string;
}

interface Show {
  date: string;
  time: string;
  prices: {
    online: ShowPrices;
    videoSpeed: ShowPrices;
    soder: ShowPrices;
  };
}

interface Movie {
  _id: string;
  title: string;
  cast: Cast;
  crew: Crew;
  posters: string[];
  shows: Show[];
}

const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
};

const formatDate = (dateString) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const Revenue = () => {
  const backend_url = 'https://swedenn-backend.onrender.com';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);

  const initialFormData: Omit<Movie, "_id"> & { posters: File[] } = {
    title: "",
    cast: { actor: "", actress: "", villan: "", supporting: "" },
    crew: { director: "", producer: "", musicDirector: "", cinematographer: "" },
    posters: [],
    shows: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [posterPreviews, setPosterPreviews] = useState<string[]>([]);

  // ---------------------- Fetch existing movies ----------------------
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${backend_url}/movie/getmovie`);
      setMovies(res.data.data);
      console.log(res.data.data)
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ---------------------- Input Handlers ----------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section?: keyof Omit<Movie, "_id" | "title" | "posters" | "shows">,
    key?: string
  ) => {
    const { value, name } = e.target;
    if (section && key) {
      setFormData({ ...formData, [section]: { ...formData[section], [key]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 3);
    setFormData({ ...formData, posters: files });
    setPosterPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  // ---------------------- Shows ----------------------
 

  // ---------------------- Submit Form ----------------------
  
const getPosterSrc = (poster: File | string) =>
  poster instanceof File
    ? URL.createObjectURL(poster)
    : poster;

  // ---------------------- JSX ----------------------
  return (
    <div className="min-h-screen bg-background p-8">
      

     

      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.reverse().map((movie) => (
          <Card key={movie._id} className="cursor-pointer hover:shadow-lg" onClick={() => setModalMovie(movie)}>
            <img src={getPosterSrc(movie.posters[0])} alt={movie.title} className="w-full h-64 object-cover" />
            <CardContent className="flex justify-between p-3">
              <span>
                {movie.title}
              </span>
              <span>
                Revenue:{movie.title}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {modalMovie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-3/4 max-w-xl relative overflow-auto max-h-[90vh]">
            <button className="absolute top-2 right-2" onClick={() => setModalMovie(null)}>
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4">{modalMovie.title}</h2>
            <p className="mb-2">
              <strong>Cast:</strong> {Object.values(modalMovie.cast).join(", ")}
            </p>
            <p className="mb-2">
              <strong>Crew:</strong> {Object.values(modalMovie.crew).join(", ")}
            </p>
            <p className="mb-2">
              <strong>Shows:</strong>
            </p>
            <ul className="list-disc pl-5">
              {modalMovie.shows.map((show, idx) => (
                <li key={idx}>
                  {formatDate(show.date)} - {formatTime(show.time)} - Online: {show.prices.online.adult}/{show.prices.online.kids}, Video: {show.prices.videoSpeed.adult}/{show.prices.videoSpeed.kids}, Soder: {show.prices.soder.adult}/{show.prices.soder.kids}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revenue;
