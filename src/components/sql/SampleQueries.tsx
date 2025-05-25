// src/components/sql/SampleQueries - Component for displaying sample queries

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SampleQueriesProps } from "./types";

export const SampleQueries = ({ queries, onQuerySelect, onQueryCopy }: SampleQueriesProps) => {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <CardTitle>Sample Queries</CardTitle>
        <CardDescription>
          Click any query to load it into the editor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {queries.map(({ query, description }, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => onQuerySelect(query)}
            >
              <div className="flex-1 mr-2">
                <code className="text-sm text-gray-700 block">{query}</code>
                <span className="text-xs text-gray-500 mt-1 block">{description}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onQueryCopy(query);
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 