import React, { useState } from "react";
import { IndianRupee, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const currentMovieBookingsData = [
  { bookingId: "BKG-001", name: "Ramesh Krishnan", email: "ramesh@email.com", seats: 4, status: "Paid", amount: 400, show: { date: "2025-10-06", time: "10:00 AM" } },
  { bookingId: "BKG-002", name: "Pooja Reddy", email: "pooja@email.com", seats: 2, status: "Paid", amount: 200, show: { date: "2025-10-06", time: "2:00 PM" } },
  { bookingId: "BKG-003", name: "Suresh Babu", email: "suresh@email.com", seats: 3, status: "Pending", amount: 300, show: { date: "2025-10-06", time: "6:00 PM" } },
  { bookingId: "BKG-004", name: "Kavitha Menon", email: "kavitha@email.com", seats: 5, status: "Paid", amount: 500, show: { date: "2025-10-06", time: "9:30 PM" } },
  { bookingId: "BKG-005", name: "Ganesh Iyer", email: "ganesh@email.com", seats: 2, status: "Pending", amount: 200, show: { date: "2025-10-07", time: "10:00 AM" } },
  { bookingId: "BKG-006", name: "Shreya Patel", email: "shreya@email.com", seats: 4, status: "Paid", amount: 400, show: { date: "2025-10-07", time: "2:00 PM" } },
];

const Dashboard = () => {
  const [bookings, setBookings] = useState(currentMovieBookingsData);
  const [showModal, setShowModal] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(null); // store index of booking to toggle

  const totalCollected = bookings.filter(b => b.status === "Paid").reduce((sum, b) => sum + b.amount, 0);
  const totalPending = bookings.filter(b => b.status === "Pending").reduce((sum, b) => sum + b.amount, 0);

  // Only trigger modal if the booking is Pending
  const requestToggleStatus = (index) => {
    if (bookings[index].status === "Pending") {
      setPendingToggle(index);
      setShowModal(true);
    }
  };

  // Confirm toggle to Paid
  const confirmToggleStatus = () => {
    if (pendingToggle !== null) {
      setBookings(prev => {
        const newBookings = [...prev];
        newBookings[pendingToggle].status = "Paid"; // Only change to Paid
        return newBookings;
      });
    }
    setPendingToggle(null);
    setShowModal(false);
  };

  const cancelToggleStatus = () => {
    setPendingToggle(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold mt-2">5,600</p>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="text-3xl font-bold mt-2 flex items-center gap-1">
                  <IndianRupee className="h-6 w-6" /> {totalCollected}
                </p>
              </div>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold mt-2 flex items-center gap-1">
                  <IndianRupee className="h-6 w-6" /> {totalPending}
                </p>
              </div>
              <Clock className="h-6 w-6 text-orange-600" />
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-purple-500"> <CardContent className="p-6"> <div className="flex items-start justify-between"> <div> <p className="text-sm text-muted-foreground">Total Shows</p> <p className="text-3xl font-bold mt-2">28</p> </div> <div className="p-3 bg-purple-100 rounded-lg"> <TrendingUp className="h-6 w-6 text-purple-600" /> </div> </div> </CardContent> </Card>
        </div>

        {/* Bookings Table */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent mb-4">Current Movie Bookings</h2>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Member Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Seats</TableHead>
                    <TableHead>Show</TableHead>
                    <TableHead className="text-center">Payment Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b, i) => (
                    <TableRow key={b.bookingId}>
                      <TableCell>{b.bookingId}</TableCell>
                      <TableCell>{b.name}</TableCell>
                      <TableCell>{b.email}</TableCell>
                      <TableCell className="text-center">{b.seats}</TableCell>
                      <TableCell>
                        {b.show.date} <br />
                        <span className="text-sm text-muted-foreground">{b.show.time}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          onClick={() => requestToggleStatus(i)}
                          disabled={b.status === "Paid"} // disable Paid bookings
                          className={`relative inline-flex items-center h-6 w-16 rounded-full transition-colors duration-300 focus:outline-none ${b.status === "Paid" ? "bg-green-500 cursor-not-allowed" : "bg-orange-500"
                            }`}
                        >
                          <span
                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${b.status === "Paid" ? "translate-x-10" : "translate-x-0"
                              }`}
                          ></span>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white pointer-events-none">
                            {b.status}
                          </span>
                        </button>
                      </TableCell>
                      <TableCell className="text-right font-semibold flex items-center justify-end gap-1">
                        <IndianRupee className="h-4 w-4" /> {b.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4">Are you sure you want to change this booking to Paid?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmToggleStatus}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Yes
                </button>
                <button
                  onClick={cancelToggleStatus}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
