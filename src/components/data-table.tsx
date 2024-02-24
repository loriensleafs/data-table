import { Flex } from "@chakra-ui/react";
import { isUndefined } from "@chakra-ui/utils";
import type { RowData, TableOptions } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { getMaxHeadersDepth, getColumnSize } from "./../utils";
import { ResizeHandle } from "./resize-handle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

//
// ─── <DataTable /> ────────────────────────────────────────────────────────
//

/**
 * # DataTableProps
 *
 * > Props for the `<DataTable />` component.
 */
export interface DataTableProps<TData>
  extends Omit<TableOptions<TData>, "getCoreRowModel"> {
  headerIsSticky?: boolean;
}

/**
 * # `<DataTable />`
 *
 * > A React component for displaying large amounts of tabular data.
 */
export const DataTable = <TData extends RowData>({
  enableColumnResizing = false,
  headerIsSticky = false,
  ...props
}: DataTableProps<TData>) => {
  const table = useReactTable({
    ...props,
    enableColumnResizing,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getState());

  const cssVars = useMemo(
    () =>
      table.getAllFlatColumns().reduce(
        (vars, column) => {
          const columnId = column.id.toLowerCase();
          const columnSize = getColumnSize(column, column.getCanResize());

          vars[`--fn-datatable-column-${columnId}-width`] = columnSize;

          if (isUndefined(column.parent)) {
            vars[`--fn-datatable-width`] = vars[`--fn-datatable-width`] + columnSize;
          }

          return vars;
        },
        {
          "--fn-datatable-height":
            getMaxHeadersDepth(table.getHeaderGroups()) + props.data.length * 48,
          "--fn-datatable-width": 0,
        } as Record<string, number>,
      ),
    [
      props.data,
      table.getAllFlatColumns(),
      table.getHeaderGroups(),
      table.getState().columnSizing,
    ],
  );

  return (
    <Flex
      borderColor="gray.300"
      borderRadius="sm"
      borderStyle="solid"
      borderWidth={1}
      boxSizing="border-box"
      flexDirection="column"
      height="full"
      minHeight={0}
      minWidth={0}
      outline="none"
      position="relative"
      style={cssVars}
    >
      <Flex
        flexDirection="column"
        flexGrow={1}
        height="var(--fn-datatable-height)px"
        overflowX="auto"
        position="relative"
      >
        <Table>
          <TableHead isSticky={headerIsSticky}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader
                    header={header}
                    key={header.id}
                    resizingIsEnabled={
                      enableColumnResizing && header.column.getCanResize() !== false
                    }
                  >
                    {!header.isPlaceholder && (
                      <span>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                    )}
                    {enableColumnResizing && header.column.getCanResize() !== false && (
                      <ResizeHandle
                        isResizing={header.column.getIsResizing()}
                        onResetSize={header.column.resetSize}
                        onResize={header.getResizeHandler()}
                      />
                    )}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    cell={cell}
                    key={cell.id}
                    resizingIsEnabled={enableColumnResizing}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    </Flex>
  );
};
