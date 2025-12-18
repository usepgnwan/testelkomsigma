import { ArrowUpDown, SortAscIcon } from "lucide-react";
import React from "react";

export type SortDirection = "asc" | "desc" | null;

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  sortable?: boolean;
  direction?: SortDirection;
  multiColumn?: boolean;
};

export default function Th({
  children,
  sortable = false,
  direction = null,
  multiColumn = false,
  className = "",
  ...props
}: ThProps) {
  return (
    <th
      className={`bg-gray-50 text-gray-500 p-2 font-bold border-b   ${className}`}
    >
      {!sortable ? (
        <span className="text-left text-xs  uppercase tracking-wider font-bold">
          {children}
        </span>
      ) : (
        <button
          {...props}
          className="flex  font-bold items-center w-full justify-between space-x-1 text-left text-xs  uppercase tracking-wider   group focus:outline-none"
        >
          <span>{children}</span>

          <span className="relative flex items-center">
            {multiColumn ? (
              <>
                {direction === "asc" && (
                  <>
                    <IconUp className="group-hover:opacity-0" />
                    <IconDown className="absolute opacity-0 group-hover:opacity-100" />
                  </>
                )}

                {direction === "desc" && (
                  <>
                    <IconDown className="group-hover:opacity-0" />
                    <IconUp className="absolute opacity-0 group-hover:opacity-100" />
                  </>
                )}

                {!direction && (
                  <ArrowUpDown className="w-3 h-3 opacity-100 transition-opacity" />
                )}
              </>
            ) : (
              <>
                {direction === "asc" && <IconDown />}
                {direction === "desc" && <IconUp />}
                {!direction && (
                  <IconUp className=" opacity-100 transition-opacity" />
                )}
              </>
            )}
          </span>
        </button>
      )}
    </th>
  );
}

function IconUp({ className = "" }) {
  return (
    <svg
      className={`w-3 h-3 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
    </svg>
  );
}

function IconDown({ className = "" }) {
  return (
    <svg
      className={`w-3 h-3 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
