import { useState } from "react";
import { SortDirection } from "./th";

export type SortState = Record<string, SortDirection>;
type OrderBy = Record<string, SortDirection>;
export function useSortable() {
  const [sorts, setSorts] = useState<SortState>({});

  function sortBy(column: string) {
    setSorts(prev => {
      const current = prev[column];

      if (!current) {
        return { ...prev, [column]: "asc" };
      }

      if (current === "asc") {
        return { ...prev, [column]: "desc" };
      }
 
      const { [column]: _, ...rest } = prev;
      return rest;
    });
  }


    function serializeSorts(orderby: OrderBy): Record<string, SortDirection> {
    const sorts: Record<string, SortDirection> = {};

    Object.entries(orderby).forEach(([key, dir]) => {
        sorts[key] = dir;
    });

    return sorts;
    }
 
    const sortParams = serializeSorts(sorts);
        

  return { sorts, sortBy , sortParams};
}
