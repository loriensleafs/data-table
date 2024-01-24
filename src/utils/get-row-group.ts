import { Row, RowData } from "@tanstack/react-table";
import type { TableGroup } from "./../types";

export const getRowGroup = <TData extends RowData>(
  row: Row<TData>,
  tableGroup?: TableGroup,
) => {
  if (tableGroup === "left") {
    return row.getLeftVisibleCells();
  }

  if (tableGroup === "right") {
    return row.getRightVisibleCells();
  }

  if (tableGroup === "center") {
    return row.getCenterVisibleCells();
  }

  return row.getVisibleCells();
};
