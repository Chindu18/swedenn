// import { IndianRupee } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import movie1 from "@/assets/movie1.jpg";
// import movie2 from "@/assets/movie2.jpg";
// import movie3 from "@/assets/movie3.jpg";
// import movie4 from "@/assets/movie4.jpg";
// import movie5 from "@/assets/movie5.jpg";

// const movies = [
//   { id: 1, image: movie1, title: "Classic Tamil Film 1975", cost: 100, charges: 50 },
//   { id: 2, image: movie2, title: "Action Hero 1985", cost: 150, charges: 50 },
//   { id: 3, image: movie3, title: "Romance Classic 1995", cost: 120, charges: 50 },
//   { id: 4, image: movie4, title: "Family Drama 2005", cost: 150, charges: 50 },
//   { id: 5, image: movie5, title: "Modern Blockbuster 2024", cost: 200, charges: 75 },
// ];

// const Movies = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent mb-2">
//             Movies Collection
//           </h1>
//           <p className="text-muted-foreground">Browse all available movies</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {movies.map((movie) => (
//             <Card key={movie.id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105">
//               <div className="relative overflow-hidden">
//                 <img
//                   src={movie.image}
//                   alt={movie.title}
//                   className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//               <CardContent className="p-5 space-y-3">
//                 <h3 className="font-bold text-lg line-clamp-2 min-h-[3.5rem]">{movie.title}</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-muted-foreground">Ticket Cost:</span>
//                     <span className="font-bold text-lg flex items-center gap-1">
//                       <IndianRupee className="h-4 w-4" />
//                       {movie.cost}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-muted-foreground">Booking Charges:</span>
//                     <span className="font-semibold flex items-center gap-1">
//                       <IndianRupee className="h-4 w-4" />
//                       {movie.charges}
//                     </span>
//                   </div>
//                   <div className="pt-2 border-t">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium">Total:</span>
//                       <span className="font-bold text-xl text-primary flex items-center gap-1">
//                         <IndianRupee className="h-5 w-5" />
//                         {movie.cost + movie.charges}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Movies;


import { useState } from "react";
import { IndianRupee, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modalMovie, setModalMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    cast: "",
    crew: "",
    poster: null,
    shows: "",
    ticketKids: 0,
    ticketAdults: 0,
    online: 0,
    videoSpeed: 0,
    soder: 0,
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = { id: Date.now(), ...formData };
    setMovies((prev) => {
      const updated = [...prev, newMovie];
      // Limit to 5 movies
      if (updated.length > 5) updated.shift();
      return updated;
    });
    setFormData({
      title: "",
      cast: "",
      crew: "",
      poster: null,
      shows: "",
      ticketKids: 0,
      ticketAdults: 0,
      online: 0,
      videoSpeed: 0,
      soder: 0,
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-4">Movies Collection</h1>

      {/* Add Movie Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add Movie"}
      </button>

      {/* Movie Form */}
      {showForm && (
        <form className="mb-6 max-w-xl p-4 border rounded shadow space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Movie Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Cast"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Crew"
            name="crew"
            value={formData.crew}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Shows"
            name="shows"
            value={formData.shows}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Ticket Kids"
              name="ticketKids"
              value={formData.ticketKids}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Ticket Adults"
              name="ticketAdults"
              value={formData.ticketAdults}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="Online Payment"
              name="online"
              value={formData.online}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Video Speed"
              name="videoSpeed"
              value={formData.videoSpeed}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Soder Payment"
              name="soder"
              value={formData.soder}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Add Movie
          </button>
        </form>
      )}

      {/* Movie Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => {
          const paidAmount = movie.online + movie.videoSpeed + movie.soder;
          const pendingAmount = movie.ticketAdults + movie.ticketKids - paidAmount;
          return (
            <Card
              key={movie.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => setModalMovie(movie)}
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
              <CardContent className="flex justify-between p-3">
                <span>Paid: <IndianRupee className="h-4 w-4 inline" /> {paidAmount}</span>
                <span>Pending: <IndianRupee className="h-4 w-4 inline" /> {pendingAmount}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      {modalMovie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-96 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setModalMovie(null)}
            >
              <X />
            </button>
            <img src={modalMovie.poster} alt={modalMovie.title} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{modalMovie.title}</h2>
            <p><strong>Cast:</strong> {modalMovie.cast}</p>
            <p><strong>Crew:</strong> {modalMovie.crew}</p>
            <p><strong>Shows:</strong> {modalMovie.shows}</p>
            <p><strong>Tickets:</strong> Kids {modalMovie.ticketKids}, Adults {modalMovie.ticketAdults}</p>
            <p><strong>Payments:</strong> Online {modalMovie.online}, Video {modalMovie.videoSpeed}, Soder {modalMovie.soder}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;

