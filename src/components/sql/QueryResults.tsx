// src/components/sql/QueryResults - Component for rendering Query results

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueryResultsProps } from "./types";
import { formatValue } from "./utils";

export const QueryResults = ({ results }: QueryResultsProps) => {
  if (!results) return null;

  return (
    <Card className="border-2 border-green-200">
      <CardHeader>
        <CardTitle>Query Results</CardTitle>
        <CardDescription>
          {results.error ? "Error occurred" : `${results.rows?.length || 0} rows returned`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {results.error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <pre className="text-red-700 text-sm whitespace-pre-wrap">{results.error}</pre>
          </div>
        ) : results.rows && results.rows.length > 0 ? (
          <ScrollArea className="w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    {Object.keys(results.rows[0]).map((column) => (
                      <th key={column} className="text-left p-2 font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.rows.map((row: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      {Object.values(row).map((value: any, cellIndex: number) => (
                        <td key={cellIndex} className="p-2 max-w-xs truncate">
                          {formatValue(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No rows returned by the query.
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 