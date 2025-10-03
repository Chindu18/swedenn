import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch with Sweden Tamil Film</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80" 
              alt="Theater"
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Theater</h2>
              <p className="text-muted-foreground">
                Experience the best of Tamil cinema in Sweden at our state-of-the-art theater facility.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    Storgatan 123<br />
                    123 45 Stockholm<br />
                    Sweden
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-muted-foreground">+46 8 123 456 78</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">info@swedentamilfilm.se</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary p-3 rounded-lg flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Sunday<br />
                    12:00 PM - 11:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
