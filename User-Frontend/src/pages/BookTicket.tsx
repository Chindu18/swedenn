

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, Ticket, CreditCard } from "lucide-react";
import { time } from "console";

interface BookingData {
  date: string;
  timing: string;
  seatNumbers: number[];
  adult: number;
  kids: number;
  ticketType: string;
  totalAmount: number;
}

const BookTicket = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("");
  const [adult, setAdult] = useState(0);
  const [kids, setKids] = useState(0);
  const [ticketType, setTicketType] = useState<string>(""); 
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);


   useEffect(() => {
    if (!date || !timing) return; // only fetch if date & timing are selected
    console.log(date)
    console.log(timing)
    axios.get(`http://localhost:8004/api/bookedSeats?date=${date}&timing=${timing}`)
      .then(res => setBookedSeats(res.data)) // array of seat numbers
      .catch(err => console.log(err));
  }, [date, timing]);

  const timings = ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"];
  const totalSeatsSelected = adult + kids;

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) {
      toast({
        title: "Seat Unavailable",
        description: "This seat is already booked.",
        variant: "destructive",
      });
      return;
    }
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length >= totalSeatsSelected) {
        toast({
          title: "Maximum Seats Selected",
          description: `You can only select ${totalSeatsSelected} seat(s) based on Adult + Kids count.`,
          variant: "destructive",
        });
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const getSeatColor = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return "bg-seat-booked";
    if (selectedSeats.includes(seatNumber)) return "bg-seat-selected";
    return "bg-seat-unselected";
  };

  const calculateTotal = () => adult * 100 + kids * 80;

  // -------------------
  // Handle Booking with Axios
  // -------------------
  const handleBooking = async () => {
    if (!name || !email || !date || !timing || selectedSeats.length !== totalSeatsSelected || !ticketType) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and select seats equal to Adult + Kids count.",
        variant: "destructive",
      });
      return;
    }

    const totalAmount = calculateTotal();
    const booking: BookingData = {
      date,
      timing,
      seatNumbers: selectedSeats,
      adult,
      kids,
      ticketType,
      totalAmount,
    };

    try {
      // Send booking data to backend
      const response = await axios.post("http://localhost:8004/api/addBooking", {
        name,
        email,
        ...booking,
      });

      // On success
      console.log("Booking Response:", response.data);
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setBookingData(booking);
      setShowQRModal(true);

      toast({
        title: "Booking Successful!",
        description: "Your ticket has been booked. Check your email for confirmation.",
      });

      // Reset form
      setName("");
      setEmail("");
      setDate("");
      setTiming("");
      setAdult(0);
      setKids(0);
      setTicketType("");
      setSelectedSeats([]);
    } catch (error: any) {
      console.error("Booking Error:", error);
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // -------------------
  // Seat Layout Rendering
  // -------------------
  const seatLayoutSets = [
    [19, 19, 21, 21, 21, 21, 21, 21], // Rows 1-8
    [19, 19, 19, 19, 19, 19, 19],     // Rows 9-15
    [7],                              // Row 18
  ];

  let currentSeatNumber = 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">Book Your Tickets</h1>
          <div className="w-32 h-1 bg-accent mx-auto rounded-full"></div>
          <p className="text-muted-foreground text-lg mt-4">Select your seats and complete your booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details */}
            <Card className="border-2 border-border hover:border-accent/50 transition-colors shadow-xl animate-slide-up">
              <CardHeader className="bg-gradient-to-r from-accent to-accent/80 text-white">
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Ticket className="w-8 h-8" /> Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" /> Name
                  </Label>
                  <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" className="text-lg p-6 border-2 focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent" /> Email
                  </Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" className="text-lg p-6 border-2 focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" /> Date
                  </Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                    className="text-lg p-6 border-2 focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timing" className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" /> Timing
                  </Label>
                  <Select value={timing} onValueChange={setTiming}>
                    <SelectTrigger className="text-lg p-6 border-2 focus:border-accent">
                      <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                      {timings.map((time) => (
                        <SelectItem key={time} value={time} className="text-lg">{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Types */}
            <Card className="border-2 border-border hover:border-accent/50 transition-colors shadow-xl animate-slide-up">
              <CardHeader className="bg-gradient-to-r from-secondary to-cinema-black text-white">
                <CardTitle className="text-3xl flex items-center gap-3">
                  <CreditCard className="w-8 h-8" /> Ticket Types
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-4 mb-6">
                  {["online", "video", "sodertalije"].map((type) => (
                    <button key={type} onClick={() => setTicketType(type)}
                      className={`px-6 py-3 rounded-lg font-semibold text-lg border-2 transition-all duration-200
                        ${ticketType === type ? "bg-accent text-white border-accent" :
                        "bg-background border-border hover:border-accent"}`}>
                      {type === "online" ? "Online Payment" : type === "video" ? "Video Speed" : "Sodertalije"}
                    </button>
                  ))}
                </div>

                {ticketType && (
                  <div className="space-y-4 border-2 border-border rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold">Adult (₹100)</Label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setAdult(Math.max(adult - 1, 0))} className="px-3 py-1 bg-gray-200 rounded">-</button>
                        <span className="w-8 text-center">{adult}</span>
                        <button onClick={() => setAdult(adult + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold">Kids (₹80)</Label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setKids(Math.max(kids - 1, 0))} className="px-3 py-1 bg-gray-200 rounded">-</button>
                        <span className="w-8 text-center">{kids}</span>
                        <button onClick={() => setKids(kids + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                      </div>
                    </div>
                    <p className="text-lg font-semibold mt-2">Total Seats: {totalSeatsSelected}</p>
                    <div className="pt-4 border-t-2 border-border mt-4">
                      <div className="flex justify-between items-center p-4 bg-accent/10 rounded-lg">
                        <span className="text-xl font-bold">Total Amount:</span>
                        <span className="text-2xl font-bold text-accent">₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Seats */}
            <Card className="border-2 border-accent shadow-xl animate-slide-up">
              <CardContent className="p-6">
                <Label className="text-foreground text-lg font-semibold mb-3 block">Selected Seats</Label>
                <div className="p-4 bg-muted rounded-lg min-h-[80px] flex items-center justify-center">
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.sort((a, b) => a - b).map((seat) => (
                        <span key={seat} className="px-4 py-2 bg-seat-selected text-white rounded-lg font-bold text-lg shadow-lg">{seat}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-lg">No seats selected</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleBooking}
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-2xl py-8 rounded-xl shadow-2xl cinema-glow hover:scale-105 transition-all duration-300"
              size="lg">Book Now</Button>
          </div>

          {/* Seat Layout */}
          <div className="lg:col-span-3">
            <Card className="border-2 border-border shadow-2xl animate-scale-in h-full">
              <CardHeader className="bg-gradient-to-r from-cinema-black to-secondary text-white">
                <CardTitle className="text-3xl tracking-[2px]">Select Your Seats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-12">
                  <div className="bg-gradient-to-r from-transparent via-accent to-transparent h-1 rounded-full mb-3 shadow-lg cinema-glow"></div>
                  <p className="text-center text-lg font-bold text-foreground tracking-wider">THIS IS THE SCREEN</p>
                </div>

                {/* Seats Grid */}
                <div className="space-y-2 overflow-auto max-h-[700px] px-2">
                  {seatLayoutSets.map((set, setIndex) => {
                    const maxCols = Math.max(...set);
                    return set.map((cols, rowIndex) => (
                      <div key={`set${setIndex}-${rowIndex}`} className="flex flex-col items-center">
                        <div className="flex gap-1 items-center justify-center w-full">
                          <span className="text-xs text-muted-foreground font-bold w-8 text-right mr-2">
                            {currentSeatNumber} {/* Just label, can adjust */}
                          </span>
                          {Array.from({ length: maxCols }, (_, seatIndex) => {
                            if (seatIndex < Math.floor((maxCols - cols) / 2) || seatIndex >= Math.floor((maxCols - cols) / 2) + cols) {
                              return <div key={`empty-${setIndex}-${rowIndex}-${seatIndex}`} className="w-8 h-8" />;
                            }
                            const seatNumber = currentSeatNumber++;
                            return (
                              <button
                                key={seatNumber}
                                onClick={() => handleSeatClick(seatNumber)}
                                className={`w-8 h-8 text-[11px] rounded ${getSeatColor(seatNumber)} 
                                  hover:opacity-80 transition-all duration-200 font-bold text-white 
                                  flex items-center justify-center shadow hover:scale-110 hover:shadow-lg`}
                                disabled={bookedSeats.includes(seatNumber)}
                              >
                                {seatNumber}
                              </button>
                            );
                          })}
                          <span className="text-xs text-muted-foreground font-bold w-8 text-left ml-2">{currentSeatNumber - 1}</span>
                        </div>
                      </div>
                    ));
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl text-foreground font-bold">🎉 Booking Confirmed!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 py-6">
            {bookingData && (
              <>
                <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-xl">
                  <QRCodeSVG value={JSON.stringify(bookingData)} size={220} level="H" includeMargin={true} />
                </div>
                <div className="text-center space-y-3 w-full bg-muted/30 p-6 rounded-xl">
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground text-lg">Date:</span> {bookingData.date}</p>
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground text-lg">Time:</span> {bookingData.timing}</p>
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground text-lg">Seats:</span> {bookingData.seatNumbers.join(", ")}</p>
                  <p className="text-2xl font-bold text-accent pt-3 border-t-2 border-accent/20">Total: ₹{bookingData.totalAmount}</p>
                  <p className="text-xs text-muted-foreground mt-6 bg-accent/10 p-3 rounded-lg">✉️ Confirmation email sent successfully!</p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookTicket;
