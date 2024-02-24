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
  headerIsSticky = false,
  ...props
}: DataTableProps<TData>) => {
  const table = useReactTable({
    enableColumnResizing: false,
    ...props,
    getCoreRowModel: getCoreRowModel(),
  });

  const cssVars = useMemo(() => {
    const tableHeadHeight = getMaxHeadersDepth(table.getHeaderGroups()) * 48;
    const tableBodyHeight = props.data.length * 48;
    const tableHeight = tableHeadHeight + tableBodyHeight;

    return table.getAllFlatColumns().reduce(
      (vars, column) => {
        const columnId = column.id.toLowerCase();
        const columnSize = getColumnSize(column);

        vars[`--fn-datatable-column-${columnId}-width`] = columnSize;

        if (isUndefined(column.parent)) {
          vars[`--fn-datatable-width`] = vars[`--fn-datatable-width`] + columnSize;
        }

        return vars;
      },
      {
        "--fn-datatable-height": tableHeight,
        "--fn-datatable-width": 0,
        "--fn-datatable-head-height": tableHeadHeight,
        "--fn-datatable-body-height": tableBodyHeight,
      } as Record<string, number>,
    );
  }, [
    props.data,
    table.getAllFlatColumns(),
    table.getHeaderGroups(),
    table.getState().columnSizing,
  ]);

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
        height="calc(var(--fn-datatable-height) * 1px)"
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
                    resizingIsEnabled={header.column.getCanResize()}
                  >
                    {!header.isPlaceholder && (
                      <span>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                    )}
                    {header.column.getCanResize() && (
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
                    resizingIsEnabled={cell.column.getCanResize()}
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
