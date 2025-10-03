import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const Movies = () => {
  const [movies] = useState([
    {
      id: 1,
      title: "Vikram",
      cost: "150 SEK",
      charges: "25 SEK booking fee",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80"
    },
    {
      id: 2,
      title: "Ponniyin Selvan",
      cost: "175 SEK",
      charges: "25 SEK booking fee",
      image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80"
    },
    {
      id: 3,
      title: "Varisu",
      cost: "160 SEK",
      charges: "25 SEK booking fee",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80"
    },
    {
      id: 4,
      title: "Jailer",
      cost: "180 SEK",
      charges: "25 SEK booking fee",
      image: "https://images.unsplash.com/photo-1574267432644-f610b142e5b3?w=800&q=80"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Now Showing</h1>
          <p className="text-muted-foreground">Browse and manage current movies</p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border-2 hover:border-primary transition-colors">
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="text-xl font-bold">{movie.title}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Ticket Price:</span>
                        <span className="font-semibold">{movie.cost}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Booking Fee:</span>
                        <span className="font-semibold">{movie.charges}</span>
                      </p>
                    </div>
                    <Button className="w-full gap-2" variant="outline">
                      <Edit className="h-4 w-4" />
                      Edit Movie
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="mt-8 text-center">
          <Button className="bg-primary hover:bg-primary/90">
            Add New Movie
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Movies;
