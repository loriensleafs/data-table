import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn, SortingFn } from "@tanstack/react-table";
import { sortingFns } from "@tanstack/react-table";
import type { Person } from "./data";

//
// ─── Functions ──────────────────────────────────────────────────────────────────
//

export const fuzzyFilter: FilterFn<Person> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta(itemRank);

  return itemRank.passed;
};

export const fuzzySort: SortingFn<Person> = (rowA, rowB, columnId) => {
  let dir = 0;

  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]! as RankingInfo,
      rowB.columnFiltersMeta[columnId]! as RankingInfo,
    );
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
