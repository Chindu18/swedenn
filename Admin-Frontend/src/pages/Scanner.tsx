import { useState } from "react";
import { QrCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const Scanner = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const handleScan = () => {
    // Simulate QR scan
    const mockData = {
      name: "Ramesh Kumar",
      email: "ramesh@email.com",
      seats: 4,
      bookingId: "TFS2024001",
      movie: "Modern Blockbuster 2024"
    };
    
    setScannedData(mockData);
    setShowSuccess(true);
    toast.success("QR Code Scanned Successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent mb-2">
            QR Code Scanner
          </h1>
          <p className="text-muted-foreground">Scan tickets for verification</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-2">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="p-8 bg-gradient-to-br from-primary/10 to-red-700/10 rounded-3xl">
                  <QrCode className="h-32 w-32 text-primary" />
                </div>
                
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Ready to Scan</h2>
                  <p className="text-muted-foreground max-w-md">
                    Click the button below to simulate scanning a QR code from a ticket
                  </p>
                </div>

                <Button
                  onClick={handleScan}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-red-700 hover:opacity-90 text-lg px-12 py-6 shadow-lg"
                >
                  <QrCode className="mr-2 h-5 w-5" />
                  Scan QR Code
                </Button>

                <div className="mt-8 p-6 bg-secondary rounded-lg w-full">
                  <h3 className="font-semibold mb-3 text-center">Scanner Instructions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">1.</span>
                      Position the QR code within the scanner frame
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">2.</span>
                      Wait for automatic detection and verification
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">3.</span>
                      Check the confirmation message and booking details
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600 text-xl">
                <CheckCircle2 className="h-6 w-6" />
                Successfully Scanned!
              </DialogTitle>
            </DialogHeader>
            
            {scannedData && (
              <div className="space-y-4 pt-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-center text-green-700 font-semibold">
                    Ticket Verified ✓
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Booking ID:</span>
                    <span className="font-semibold">{scannedData.bookingId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-semibold">{scannedData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-semibold">{scannedData.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Movie:</span>
                    <span className="font-semibold">{scannedData.movie}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Seats:</span>
                    <span className="font-semibold">{scannedData.seats}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowSuccess(false)} 
                  className="w-full bg-gradient-to-r from-primary to-red-700"
                >
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Scanner;
