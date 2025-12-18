 

// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Link } from "@inertiajs/react";
import { Pagination, PaginationContent, PaginationItem } from "../ui/pagination";

type TableProps<T extends Record<string, any>> = {
  children?: React.ReactNode; 
  data: T;                   
};

export default function Table<T extends Record<string, any>>({ children, data }: TableProps<T>){
   
     return (
        <div className="space-y-2">
            <div className="relative overflow-x-auto shadow-sm sm:rounded-md  border ">
                <table className="w-full text-sm">
                    {children}
                </table>
            </div>
            {data !== undefined && Object.entries(data).length > 0 && (
                <div className="mt-1 flex flex-row justify-between items-center"> 
                        <div className="text-gray-400">
                            <p>Displaying {data.per_page} total {data.total} entries</p>
                        </div>
                        <div>
                            <Pagination>
                            <PaginationContent>
                                {data.links.map((link : any, i : number) => {
                                    return (
                                        <PaginationItem key={i}>
                                        {link.url ? (
                                        <>
                                            {link.label.includes("Previous") && ( 
                                                <Link
                                                    href={link.url}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )}

                                            {!link.label.includes("Previous") &&
                                            !link.label.includes("Next") && (
                                                
                                            <Link
                                                    href={link.url || "#"}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm      font-medium transition-all
                                                                disabled:pointer-events-none disabled:opacity-50
                                                                [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
                                                                outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                                                aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
                                                                aria-invalid:border-destructive   bg-background 
                                                                hover:bg-accent hover:text-accent-foreground size-9
                                                                ${link.active ? "bg-accent border shadow-xs " : ""}`}
                                                    >
                                                    </Link>
                                            )}

                                            {link.label.includes("Next") && ( 
                                            <Link
                                                    href={link.url}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )}
                                        </>
                                        ) : (
                                        
                                            <span
                                                className="px-3 py-1 text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </PaginationItem>
                                    )
                                })}
                            </PaginationContent>
                        </Pagination>
                        </div>
                </div> 
            )}
       </div>
     )

}

type TableHeadProps ={
    children : React.ReactNode
}

Table.Header  = function TableHeader({children}: TableHeadProps){
    return(
        <thead  >
            {children}
        </thead>
    );
}


 
Table.Body = function TableBody({ children, data }: TableProps) { 
  return (
    <tbody className="bg-white divide-y divide-gray-200 ">
      {data.total == 0 ? (
        <tr className="bg-white">
          <td
            className="text-center align-middle w-full"
            rowSpan={5}
            colSpan={20}
          >
            <div className="h-24 flex items-center justify-center flex-col text-gray-300">
              No matching records found
            </div>
          </td>
        </tr>
      ) : (
        children
      )}
    </tbody>
  );
};


// Subcomponent Footer
type TableFooterProps = {
  children: React.ReactNode;
};

Table.Footer = function TableFooter({ children }: TableFooterProps) {
  return <tfoot  >{children}</tfoot>;
};