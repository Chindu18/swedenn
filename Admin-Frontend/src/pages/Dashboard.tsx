import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [bookings] = useState([
    {
      id: 1,
      name: "Lars Andersson",
      email: "lars.andersson@email.com",
      paymentStatus: "Paid",
      showTiming: "7:00 PM",
      seats: 3
    },
    {
      id: 2,
      name: "Priya Kumar",
      email: "priya.kumar@email.com",
      paymentStatus: "Pending",
      showTiming: "4:00 PM",
      seats: 2
    },
    {
      id: 3,
      name: "Erik Johansson",
      email: "erik.j@email.com",
      paymentStatus: "Paid",
      showTiming: "9:30 PM",
      seats: 4
    },
    {
      id: 4,
      name: "Aisha Rahman",
      email: "aisha.rahman@email.com",
      paymentStatus: "Paid",
      showTiming: "7:00 PM",
      seats: 2
    },
    {
      id: 5,
      name: "Johan Berg",
      email: "johan.berg@email.com",
      paymentStatus: "Pending",
      showTiming: "4:00 PM",
      seats: 5
    }
  ]);

  const getPaymentBadge = (status: string) => {
    return status === "Paid" 
      ? <Badge className="bg-green-600 hover:bg-green-700">Paid</Badge>
      : <Badge variant="destructive">Pending</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Bookings Dashboard</h1>
          <p className="text-muted-foreground">Manage all customer bookings and payments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>A list of all ticket bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Show Timing</TableHead>
                    <TableHead className="text-right">Seats</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>{booking.email}</TableCell>
                      <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                      <TableCell>{booking.showTiming}</TableCell>
                      <TableCell className="text-right">{booking.seats}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
