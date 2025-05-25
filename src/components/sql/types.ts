// src/components/sql/types - SQL Query Interface props definition

import { PGlite } from "@electric-sql/pglite";

export interface SQLQueryInterfaceProps {
  db: PGlite;
}

export interface QueryResult {
  rows?: any[];
  error?: string;
}

export interface SampleQuery {
  query: string;
  description: string;
}

export interface QueryEditorProps {
  query: string;
  onQueryChange: (query: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
}

export interface QueryResultsProps {
  results: QueryResult | null;
}

export interface SampleQueriesProps {
  queries: SampleQuery[];
  onQuerySelect: (query: string) => void;
  onQueryCopy: (query: string) => void;
} 