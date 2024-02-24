import type { Column } from "@tanstack/react-table";

export const getColumnSize = (column: Column<any>, isResizable: boolean = false) =>
  column.columns.length > 0
    ? column.columns.reduce(
        (columnSize, subColumn) =>
          columnSize + subColumn.getSize() + (subColumn.getCanResize() ? 16 : 0),
        0,
      )
    : column.getSize() + (isResizable ? 16 : 0);
