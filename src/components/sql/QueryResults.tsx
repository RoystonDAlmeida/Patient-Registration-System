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
      <CardContent className="p-0">
        {results.error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
            <pre className="text-red-700 text-sm whitespace-pre-wrap">{results.error}</pre>
          </div>
        ) : results.rows && results.rows.length > 0 ? (
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(results.rows[0]).map((column) => (
                      <th 
                        key={column} 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap border-b"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.rows.map((row: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.values(row).map((value: any, cellIndex: number) => (
                        <td 
                          key={cellIndex} 
                          className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-b"
                        >
                          {formatValue(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No rows returned by the query.
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 