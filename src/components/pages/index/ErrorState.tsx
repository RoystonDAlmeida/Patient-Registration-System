// src/components/pages/index/ErrorState - Component for error state 

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorStateProps } from "./types";

export const ErrorState = ({ error, onRetry, onRefresh }: ErrorStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Database Error
          </CardTitle>
          <CardDescription>
            Failed to initialize the patient database. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
            <strong>Error Details:</strong><br />
            {error}
          </div>
          <div className="flex gap-2">
            <Button onClick={onRetry} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
            <Button onClick={onRefresh} className="flex-1">
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 