import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Patient Registration System
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Secure, local patient data management with PGlite
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-blue-600 mb-4">404</h2>
            <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
            <p className="text-sm text-gray-500 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex justify-center">
              <Button
                onClick={() => window.location.href = "/"}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Return to Home
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
