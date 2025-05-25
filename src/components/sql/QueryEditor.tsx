// src/components/sql/QueryEditor - Component for rendering Query Editor Card

import { Database, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryEditorProps } from "./types";

export const QueryEditor = ({ query, onQueryChange, onExecute, isExecuting }: QueryEditorProps) => {
  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          SQL Query Editor
        </CardTitle>
        <CardDescription>
          Write and execute SQL queries against the patients table
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your SQL query here..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          rows={6}
          className="font-mono text-sm"
        />
        <div className="flex gap-2">
          <Button 
            onClick={onExecute} 
            disabled={isExecuting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {isExecuting ? "Executing..." : "Execute Query"}
          </Button>
          <Button variant="outline" onClick={() => onQueryChange("")}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 