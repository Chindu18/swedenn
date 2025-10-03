import { Link, useNavigate, useLocation } from "react-router-dom";
import { Film, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/movies" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Sweden Tamil Film</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/movies" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/movies") ? "text-primary" : "text-foreground"
              }`}
            >
              Movies
            </Link>
            <Link 
              to="/dashboard" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/scanner" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/scanner") ? "text-primary" : "text-foreground"
              }`}
            >
              Scanner
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact Us
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
