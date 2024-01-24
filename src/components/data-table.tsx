import { Flex } from "@chakra-ui/react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import { defaultColumns, makeData } from "./../utils";
import { ResizeHandle } from "./resize-handle";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "./styled-table";

//
// ─── APP ────────────────────────────────────────────────────────────────────────
//

export const DataTable = () => {
  const table = useReactTable({
    data: React.useMemo(() => makeData(100), []),
    columns: React.useMemo(() => defaultColumns, []),
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  const tableCssVars = React.useMemo(() => {
    const headers = table.getFlatHeaders();
    const cssVars: { [key: string]: number } = {};

    for (let i = 0; i < headers.length; i++) {
      cssVars[`--header-${headers[i].id}-width`] = headers[i].getSize();
      cssVars[`--col-${headers[i].column.id}-width`] = headers[i].column.getSize();
      cssVars[`--root-width`] =
        (cssVars[`--root-width`] ?? 0) + cssVars[`--col-${headers[i].column.id}-width`];
    }

    return cssVars;
  }, [table.getState().columnSizingInfo, table]);

  return (
    <Flex
      boxSizing="border-box"
      position="relative"
      minW="0px"
      minH="0px"
      height="100%"
      direction="column"
      borderColor="gray.300"
      borderStyle="solid"
      borderWidth="1px"
      borderRadius="sm"
      outline="none"
      style={tableCssVars}
    >
      <Flex position="relative" direction="column" grow={1} overflow="hidden">
        <TableRoot>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} header={header}>
                    {!header.isPlaceholder &&
                      flexRender(header.column.columnDef.header, header.getContext())}
                    <ResizeHandle
                      onResize={header.getResizeHandler()}
                      onResetSize={header.column.resetSize}
                      isResizing={header.column.getIsResizing()}
                    />
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} cell={cell} />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Flex>
    </Flex>
  );
};
