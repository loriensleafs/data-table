import { HeaderGroup, RowData, Table } from "@tanstack/react-table";
import type { TableGroup } from "./../types";

export const getTableHeaderGroups = <TData extends RowData>(
  table: Table<TData>,
  tableGroup?: TableGroup,
): [HeaderGroup<TData>[], HeaderGroup<TData>[]] => {
  if (tableGroup === "left") {
    return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()];
  }

  if (tableGroup === "right") {
    return [table.getRightHeaderGroups(), table.getRightFooterGroups()];
  }

  if (tableGroup === "center") {
    return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()];
  }

  return [table.getHeaderGroups(), table.getFooterGroups()];
};
