

import React, { useEffect, useState } from "react";
import { IndianRupee, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";

const Dashboard = () => {
  const backend_url = "https://swedenn-backend.onrender.com";



  const requestToggleStatus = async (index) => {
  try {
    const booking = bookings[index];
    if (booking.paymentStatus.toLowerCase() === "paid") return;

    // ✅ Call your existing backend API
    const response = await axios.put(
      `${backend_url}/dashboard/booking/${booking.bookingId}/status`
,
      { paymentStatus: "Paid" }
    );

    if (response.data.success) {
      // ✅ Update state locally without reloading the page
      const updatedBookings = [...bookings];
      updatedBookings[index].paymentStatus = "Paid";
      setBookings(updatedBookings);
    }
  } catch (err) {
    console.error("Failed to update payment status:", err);
  }
};


  const [movie, setmovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${backend_url}/movie/getmovie`);
        const data = response.data.data;
        if (data && data.length > 0) {
          const lastMovie = data[data.length - 1];
          setmovie(lastMovie);
          console.log("Fetched movie:", lastMovie);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, []);

  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("All");

  // ✅ New state for search filter
  const [searchId, setSearchId] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [pendingToggleIndex, setPendingToggleIndex] = useState(null);

  const [totalSeats, setTotalSeats] = useState(0);
  const [paidMoney, setPaidMoney] = useState(0);
  const [pendingMoney, setPendingMoney] = useState(0);
  const [totalShow, settotalShows] = useState(0);

  useEffect(() => {
    if (!movie.title) return;

    const fetchData = async () => {
      try {
        const seatsResp = await axios.get(`${backend_url}/dashboard/seats`, {
          params: { movieName: movie.title },
        });
        setTotalSeats(seatsResp.data.totalSeats);

        const totalShow = await axios.get(`${backend_url}/dashboard/totalshow`, {
          params: { movieName: movie.title },
        });
        settotalShows(totalShow.data.totalShows);

        const pendingResp = await axios.get(`${backend_url}/dashboard/pending`, {
          params: { movieName: movie.title, paymentStatus: "pending" },
        });

        const paidResp = await axios.get(`${backend_url}/dashboard/pending`, {
          params: { movieName: movie.title, paymentStatus: "paid" },
        });

        const combinedBookings = [...pendingResp.data.data, ...paidResp.data.data];
        setAllBookings(combinedBookings);
        setBookings(combinedBookings);

        setPendingMoney(pendingResp.data.totalAmount);
        setPaidMoney(paidResp.data.totalAmount);
      } catch (error) {
        console.error("Error fetching bookings or seats:", error);
      }
    };

    fetchData();
  }, [movie]);

  // ✅ Updated filter (includes searchId)
  useEffect(() => {
    let filtered = allBookings;

    if (paymentStatus.toLowerCase() === "pending") {
      filtered = filtered.filter((b) => b.paymentStatus.toLowerCase() === "pending");
    } else if (paymentStatus.toLowerCase() === "paid") {
      filtered = filtered.filter((b) => b.paymentStatus.toLowerCase() === "paid");
    }

    if (searchId.trim() !== "") {
      filtered = filtered.filter((b) =>
        b.bookingId.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    setBookings(filtered);
  }, [paymentStatus, allBookings, searchId]);

  // const requestToggleStatus = (index) => {
  //   if (bookings[index].paymentStatus.toLowerCase() === "pending") {
  //     setPendingToggleIndex(index);
  //     setShowModal(true);
  //   }
  // };

  const confirmToggleStatus = async () => {
    if (pendingToggleIndex !== null) {
      const booking = bookings[pendingToggleIndex];

      try {
        await axios.put(`${backend_url}/dashboard/booking/${booking.bookingId}/status`, {
          paymentStatus: "paid",
        });

        setBookings((prev) => {
          const newBookings = [...prev];
          newBookings[pendingToggleIndex].paymentStatus = "paid";
          return newBookings;
        });

        setPendingMoney((prev) => prev - booking.totalAmount);
        setPaidMoney((prev) => prev + booking.totalAmount);
      } catch (error) {
        console.error("Failed to update payment status:", error);
      }
    }
    setPendingToggleIndex(null);
    setShowModal(false);
  };

  const cancelToggleStatus = () => {
    setPendingToggleIndex(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold mt-2">{totalSeats}</p>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="text-3xl font-bold mt-2 flex items-center gap-1">
                  <IndianRupee className="h-6 w-6" /> {paidMoney}
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
                  <IndianRupee className="h-6 w-6" /> {pendingMoney}
                </p>
              </div>
              <Clock className="h-6 w-6 text-orange-600" />
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Shows</p>
                  <p className="text-3xl font-bold mt-2">{totalShow}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
       <Card className="shadow-lg">
  <CardContent className="p-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent mb-4">
      Current Movie Bookings
    </h2>

    {/* Filters */}
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Movie Name</label>
        <input
          type="text"
          value={movie.title}
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          readOnly
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search by Booking ID</label>
        <input
          type="text"
          placeholder="Enter booking ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>
    </div>

    {/* Desktop Table */}
    <div className="hidden lg:block border rounded-lg overflow-hidden">
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
              <TableCell className="text-center">{b.seatNumbers.join(", ")}</TableCell>
              <TableCell>
                {b.date} <br />
                <span className="text-sm text-muted-foreground">{b.timing}</span>
              </TableCell>
              <TableCell className="text-center">
                <button
                  onClick={() => requestToggleStatus(i)}
                  disabled={b.paymentStatus.toLowerCase() === "paid"}
                  className={`relative inline-flex items-center h-6 w-16 rounded-full transition-colors duration-300 focus:outline-none ${
                    b.paymentStatus.toLowerCase() === "paid" ? "bg-green-500 cursor-not-allowed" : "bg-orange-500"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                      b.paymentStatus.toLowerCase() === "paid" ? "translate-x-10" : "translate-x-0"
                    }`}
                  ></span>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white pointer-events-none">
                    {b.paymentStatus}
                  </span>
                </button>
              </TableCell>
              <TableCell className="text-right font-semibold flex items-center justify-end gap-1">
                <IndianRupee className="h-4 w-4" /> {b.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Mobile / Medium Cards */}
    <div className="lg:hidden flex flex-col gap-4">
      {bookings.map((b, i) => {
        const [isOpen, setIsOpen] = useState(false); // Individual card state
        return (
          <div key={b.bookingId} className="border p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{b.bookingId}</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" /> {b.totalAmount}
                </p>

                <button
                  onClick={() => {
                    if (b.paymentStatus.toLowerCase() === "pending") {
                      setPendingToggleIndex(i);
                      setShowModal(true);
                    }
                  }}
                  disabled={b.paymentStatus.toLowerCase() === "paid"}
                  className={`relative inline-flex items-center h-6 w-16 rounded-full transition-colors duration-300 focus:outline-none ${
                    b.paymentStatus.toLowerCase() === "paid" ? "bg-green-500 cursor-not-allowed" : "bg-orange-500"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                      b.paymentStatus.toLowerCase() === "paid" ? "translate-x-10" : "translate-x-0"
                    }`}
                  ></span>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white pointer-events-none">
                    {b.paymentStatus}
                  </span>
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="ml-2 text-sm text-blue-600 underline"
                >
                  {isOpen ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>Name: {b.name}</p>
                <p>Email: {b.email}</p>
                <p>Seats: {b.seatNumbers.join(", ")}</p>
                <p>
                  Show: {b.date} <span className="text-muted-foreground">{b.timing}</span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Confirmation Modal */}
    {showModal && pendingToggleIndex !== null && (
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
  </CardContent>
</Card>


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
