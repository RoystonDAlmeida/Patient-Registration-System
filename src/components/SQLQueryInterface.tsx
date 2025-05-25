// src/components/SQLQueryInterface - Component for SQL Query interface

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { QueryEditor } from "./sql/QueryEditor";
import { QueryResults } from "./sql/QueryResults";
import { SampleQueries } from "./sql/SampleQueries";
import { SQLQueryInterfaceProps, QueryResult } from "./sql/types";
import { sampleQueries, copyToClipboard } from "./sql/utils.tsx";

const SQLQueryInterface = ({ db }: SQLQueryInterfaceProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeQuery = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a SQL query to execute.",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    
    try {
      const result = await db.query(query);
      setResults(result);
      
      toast({
        title: "Query Executed",
        description: `Query completed successfully. ${result.rows?.length || 0} rows returned.`,
      });
      
    } catch (error) {
      setResults({ error: error.message });
      toast({
        title: "Query Error",
        description: error.message || "Failed to execute query.",
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      <QueryEditor
        query={query}
        onQueryChange={setQuery}
        onExecute={executeQuery}
        isExecuting={isExecuting}
      />

      <QueryResults results={results} />

      <SampleQueries
        queries={sampleQueries}
        onQuerySelect={setQuery}
        onQueryCopy={(query) => copyToClipboard(query, "Query copied to clipboard.")}
      />
    </div>
  );
};

export default SQLQueryInterface;