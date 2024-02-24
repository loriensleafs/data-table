import type { Column } from "@tanstack/react-table";

export const getColumnSize = (column: Column<any>) =>
  column.columns.length > 0
    ? column.columns.reduce(
        (columnSize, subColumn) => columnSize + subColumn.getSize(),
        0,
      )
    : column.getSize();
