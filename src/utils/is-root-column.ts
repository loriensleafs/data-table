import { isUndefined } from "@chakra-ui/utils";
import type { Column } from "@tanstack/react-table";

export const isRootColumn = (column: Column<any>) => isUndefined(column.parent);
