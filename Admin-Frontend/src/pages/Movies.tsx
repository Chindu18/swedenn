import { IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import movie1 from "@/assets/movie1.jpg";
import movie2 from "@/assets/movie2.jpg";
import movie3 from "@/assets/movie3.jpg";
import movie4 from "@/assets/movie4.jpg";
import movie5 from "@/assets/movie5.jpg";

const movies = [
  { id: 1, image: movie1, title: "Classic Tamil Film 1975", cost: 100, charges: 50 },
  { id: 2, image: movie2, title: "Action Hero 1985", cost: 150, charges: 50 },
  { id: 3, image: movie3, title: "Romance Classic 1995", cost: 120, charges: 50 },
  { id: 4, image: movie4, title: "Family Drama 2005", cost: 150, charges: 50 },
  { id: 5, image: movie5, title: "Modern Blockbuster 2024", cost: 200, charges: 75 },
];

const Movies = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent mb-2">
            Movies Collection
          </h1>
          <p className="text-muted-foreground">Browse all available movies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <div className="relative overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-bold text-lg line-clamp-2 min-h-[3.5rem]">{movie.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Ticket Cost:</span>
                    <span className="font-bold text-lg flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      {movie.cost}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Booking Charges:</span>
                    <span className="font-semibold flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      {movie.charges}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="font-bold text-xl text-primary flex items-center gap-1">
                        <IndianRupee className="h-5 w-5" />
                        {movie.cost + movie.charges}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
