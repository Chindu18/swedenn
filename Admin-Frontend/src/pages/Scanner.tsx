import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR scan after 1.5 seconds
    setTimeout(() => {
      const ticketId = `TKT-${Math.floor(Math.random() * 10000)}`;
      setLastScanned(ticketId);
      setIsScanning(false);
      toast.success("Successfully scanned!", {
        description: `Ticket ID: ${ticketId}`,
        duration: 4000
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">QR Code Scanner</h1>
          <p className="text-muted-foreground">Scan customer tickets at entrance</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Verification</CardTitle>
              <CardDescription>Click the button below to scan a ticket QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className={`p-8 rounded-full ${isScanning ? 'bg-primary animate-pulse' : 'bg-secondary'} transition-all`}>
                  <ScanLine className={`h-20 w-20 ${isScanning ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </div>
                
                <Button 
                  onClick={handleScan} 
                  disabled={isScanning}
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                  size="lg"
                >
                  {isScanning ? "Scanning..." : "Start Scanning"}
                </Button>
              </div>

              {lastScanned && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Last Successful Scan</p>
                    <p className="text-sm text-green-700">Ticket ID: {lastScanned}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Scanner;
