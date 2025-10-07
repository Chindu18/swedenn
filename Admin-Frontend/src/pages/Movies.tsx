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

const Movies = () => {
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
      const res = await axios.get(`${backend_url}/api/movie/getAll`);
      setMovies(res.data.data || []);
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
  const addShow = () => {
    setFormData({
      ...formData,
      shows: [
        ...formData.shows,
        { date: "", time: "", prices: { online: { adult: "", kids: "" }, videoSpeed: { adult: "", kids: "" }, soder: { adult: "", kids: "" } } },
      ],
    });
  };

  const handleShowChange = (
    index: number,
    field: "date" | "time" | "prices",
    method: keyof Show["prices"] | null,
    type: keyof ShowPrices | null,
    value: string
  ) => {
    const shows = [...formData.shows];
    if (field === "time") shows[index].time = value;
    else if (field === "date") shows[index].date = value;
    else if (field === "prices" && method && type) {
      if (/\D/.test(value)) return;
      shows[index].prices[method][type] = value;
    }
    setFormData({ ...formData, shows });
  };

  // ---------------------- Submit Form ----------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("hero", formData.cast.actor);
      data.append("heroine", formData.cast.actress);
      data.append("villain", formData.cast.villan);
      data.append("supportArtists", formData.cast.supporting);
      data.append("director", formData.crew.director);
      data.append("producer", formData.crew.producer);
      data.append("musicDirector", formData.crew.musicDirector);
      data.append("cinematographer", formData.crew.cinematographer);
      data.append("showTimings", JSON.stringify(formData.shows));
      formData.posters.forEach((file) => data.append("photos", file));

      const res = await axios.post(`${backend_url}/api/addDetails`, data, { headers: { "Content-Type": "multipart/form-data" } });

      setMovies((prev) => [res.data.data, ...prev]);
      setFormData(initialFormData);
      setPosterPreviews([]);
      setShowForm(false);
      alert("Movie saved successfully!");
    } catch (err: any) {
      console.error("Error saving movie:", err.response?.data || err.message);
      alert("Failed to save movie. Check console for details.");
    }
  };

  const getPosterSrc = (poster: File | string) =>
    poster instanceof File ? URL.createObjectURL(poster) : `${backend_url}/${poster.replace(/^\/+/, "")}`;

  // ---------------------- JSX ----------------------
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-4">Movies Collection</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Movie"}
      </button>

      {showForm && (
        <form className="mb-6 max-w-3xl p-6 border rounded shadow space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <input type="text" name="title" placeholder="Movie Title" value={formData.title} onChange={handleChange} required className="border p-2 w-full rounded" />

          {/* Cast */}
          <div>
            <label className="font-semibold">Cast:</label>
            {Object.keys(formData.cast).map((role) => (
              <input
                key={role}
                type="text"
                placeholder={role.charAt(0).toUpperCase() + role.slice(1)}
                value={formData.cast[role as keyof Cast]}
                onChange={(e) => handleChange(e, "cast", role)}
                required
                className="border p-2 w-full rounded mb-2"
              />
            ))}
          </div>

          {/* Crew */}
          <div>
            <label className="font-semibold">Crew:</label>
            {Object.keys(formData.crew).map((role) => (
              <input
                key={role}
                type="text"
                placeholder={role.replace(/([A-Z])/g, " $1")}
                value={formData.crew[role as keyof Crew]}
                onChange={(e) => handleChange(e, "crew", role)}
                required
                className="border p-2 w-full rounded mb-2"
              />
            ))}
          </div>

          {/* Posters */}
          <div>
            <label className="font-semibold">Posters (3 max):</label>
            <input type="file" multiple accept="image/*" onChange={handlePosterUpload} required />
            <div className="flex gap-2 mt-2">
              {posterPreviews.map((src, idx) => (
                <img key={idx} src={src} alt={`Poster ${idx + 1}`} className="w-24 h-24 object-cover border rounded" />
              ))}
            </div>
          </div>

          {/* Shows */}
          <div>
            <label className="font-semibold">Shows:</label>
            {formData.shows.map((show, idx) => (
              <div key={idx} className="border p-3 rounded mb-3 space-y-2">
                <input type="date" value={show.date} onChange={(e) => handleShowChange(idx, "date", null, null, e.target.value)} className="border p-2 w-full rounded" required />
                <input type="text" placeholder="Show Time" value={show.time} onChange={(e) => handleShowChange(idx, "time", null, null, e.target.value)} className="border p-2 w-full rounded" required />

                <div className="grid grid-cols-3 gap-2">
                  {(["online", "videoSpeed", "soder"] as const).map((method) => (
                    <div key={method} className="border p-2 rounded space-y-1">
                      <p className="font-medium">{method}</p>
                      <input type="text" placeholder="Adult Price" value={show.prices[method].adult} onChange={(e) => handleShowChange(idx, "prices", method, "adult", e.target.value)} className="border p-1 w-full rounded" required />
                      <input type="text" placeholder="Kids Price" value={show.prices[method].kids} onChange={(e) => handleShowChange(idx, "prices", method, "kids", e.target.value)} className="border p-1 w-full rounded" required />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" className="bg-gray-300 text-black px-2 py-1 rounded" onClick={addShow}>
              + Add Show
            </button>
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-4">
            Save Movie
          </button>
        </form>
      )}

      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Card key={movie._id} className="cursor-pointer hover:shadow-lg" onClick={() => setModalMovie(movie)}>
            <img src={getPosterSrc(movie.posters[0])} alt={movie.title} className="w-full h-64 object-cover" />
            <CardContent className="flex justify-between p-3">
              <span>
                Paid: <IndianRupee className="h-4 w-4 inline" /> 0
              </span>
              <span>
                Pending: <IndianRupee className="h-4 w-4 inline" /> 0
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
                  {show.date} - {show.time} - Online: {show.prices.online.adult}/{show.prices.online.kids}, Video: {show.prices.videoSpeed.adult}/{show.prices.videoSpeed.kids}, Soder: {show.prices.soder.adult}/{show.prices.soder.kids}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
