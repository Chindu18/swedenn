import { IndianRupee, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MovieCarousel from "@/components/MovieCarousel";

const currentMovieBookings = [
  { name: "Ramesh Krishnan", email: "ramesh@email.com", seats: 4, status: "Paid", amount: 400 },
  { name: "Pooja Reddy", email: "pooja@email.com", seats: 2, status: "Paid", amount: 200 },
  { name: "Suresh Babu", email: "suresh@email.com", seats: 3, status: "Pending", amount: 300 },
  { name: "Kavitha Menon", email: "kavitha@email.com", seats: 5, status: "Paid", amount: 500 },
  { name: "Ganesh Iyer", email: "ganesh@email.com", seats: 2, status: "Pending", amount: 200 },
  { name: "Shreya Patel", email: "shreya@email.com", seats: 4, status: "Paid", amount: 400 },
];

const totalCollected = currentMovieBookings
  .filter(b => b.status === "Paid")
  .reduce((sum, b) => sum + b.amount, 0);

const totalPending = currentMovieBookings
  .filter(b => b.status === "Pending")
  .reduce((sum, b) => sum + b.amount, 0);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Welcome back, Admin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-3xl font-bold mt-2">5,600</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Collected</p>
                  <p className="text-3xl font-bold mt-2 flex items-center gap-1">
                    <IndianRupee className="h-6 w-6" />
                    85,500
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold mt-2 flex items-center gap-1">
                    <IndianRupee className="h-6 w-6" />
                    29,000
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Shows</p>
                  <p className="text-3xl font-bold mt-2">28</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* <MovieCarousel /> */}

        {/* <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">
                Current Movie Bookings
              </h2>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Collected</p>
                  <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    {totalCollected}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-lg font-bold text-orange-600 flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    {totalPending}
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Seats Booked</TableHead>
                    <TableHead className="text-center">Payment Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMovieBookings.map((booking, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>{booking.email}</TableCell>
                      <TableCell className="text-center">{booking.seats}</TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-semibold flex items-center justify-end gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {booking.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card> */}
        <Card className="shadow-lg">
  <CardContent className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">
        Current Movie Bookings
      </h2>
      <div className="flex gap-4">
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Collected</p>
          <p className="text-lg font-bold text-green-600 flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            {totalCollected}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-lg font-bold text-orange-600 flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            {totalPending}
          </p>
        </div>
      </div>
    </div>

   {/* --- New Movie Filter Section --- */}
<div className="flex flex-wrap gap-4 mb-6 items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
  {/* Movie Name */}
  <div className="flex flex-col w-40">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Movie Name</label>
    <input
      type="text"
      value="Idli Kadai"
      readOnly
      className="mt-1 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
    />
  </div>

  {/* Show Dropdown */}
  <div className="flex flex-col w-36">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show</label>
    <select
      className="mt-1 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
    >
      <option value="morning">Morning</option>
      <option value="afternoon">Afternoon</option>
      <option value="evening">Evening</option>
      <option value="night">Night</option>
    </select>
  </div>

  {/* Date Picker */}
  <div className="flex flex-col w-36">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
    <input
      type="date"
      className="mt-1 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
    />
  </div>
</div>



    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Seats Booked</TableHead>
            <TableHead className="text-center">Payment Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMovieBookings.map((booking, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{booking.name}</TableCell>
              <TableCell>{booking.email}</TableCell>
              <TableCell className="text-center">{booking.seats}</TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="text-right font-semibold flex items-center justify-end gap-1">
                <IndianRupee className="h-4 w-4" />
                {booking.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
};

export default Dashboard;
