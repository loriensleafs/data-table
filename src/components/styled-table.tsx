import { Box, Flex } from "@chakra-ui/react";
import { Cell, Header } from "@tanstack/react-table";
import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import isEqual from "react-fast-compare";

//
// ─── TABLE ROOT - <table> ───────────────────────────────────────────────────────
//

export interface TableRootProps extends PropsWithChildren {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const TableRoot = memo<TableRootProps>(
  ({ className = "", ...props }) => (
    <Box
      {...props}
      width="fit-content"
      borderColor="gray.300"
      borderStyle="solid"
      borderWidth={1}
      style={{
        width: `calc(var(--root-width) * 1px)`,
      }}
      className={"fn-table-root " + className}
      role="table"
    />
  ),
  isEqual,
);

//
// ─── TABLE ROW - <tr> ───────────────────────────────────────────────────────────
//

export interface TableRowProps extends PropsWithChildren {
  className?: string;
}

export const TableRow = memo<TableRowProps>(
  ({ className = "", ...props }) => (
    <Flex
      {...props}
      width="fit-content"
      style={{ breakInside: "avoid" }}
      className={"fn-table-row " + className}
      role="row"
    />
  ),
  isEqual,
);

//
// ─── TABLE HEAD - <thead> ───────────────────────────────────────────────────────
//

export interface TableHeadProps extends PropsWithChildren {
  className?: string;
}

export const TableHead = memo<TableHeadProps>(
  ({ className = "", ...props }) => (
    <Flex
      {...props}
      boxSizing="border-box"
      align="flex-start"
      direction="column"
      border="none"
      transform="translate3d(0px, 0px, 0px)"
      className={"fn-table-head " + className}
    />
  ),
  isEqual,
);

//
// ─── TABLE HEADER - <th> ─────────────────────────────────────────────────────────────────
//

export interface TableHeaderProps extends PropsWithChildren {
  className?: string;
  header: Header<any, any>;
}

export const TableHeader = memo<TableHeaderProps>(
  ({ children, className = "", header }) => (
    <Flex
      position="relative"
      // Spacing
      paddingX={4}
      // Size - container
      height={12}
      // Size - content
      fontSize="xs"
      lineHeight={4}
      // Alignment
      align="center"
      justify="center"
      textAlign="start"
      // Border
      borderBottom="1px"
      borderColor="gray.300"
      fontFamily="heading"
      fontWeight="bold"
      letterSpacing="wider"
      textTransform="uppercase"
      isTruncated
      style={{
        width: `calc(var(--header-${header?.id}-width) * 1px)`,
      }}
      className={"fn-table-header " + className}
      role="columnheader"
    >
      {!header.isPlaceholder && <>{children}</>}
    </Flex>
  ),
  isEqual,
);

//
// ─── TABLE BODY - <tbody> ───────────────────────────────────────────────────────
//

const BaseTableBody: FC<TableBodyProps> = ({ className = "", ...props }) => (
  <Box
    {...props}
    border="none"
    boxSizing="border-box"
    className={"fn-table-body " + className}
  />
);

const MemoTableBody = memo(BaseTableBody, isEqual) as typeof BaseTableBody;

//
// ──────────────────────────────────────────────────────────
//

export interface TableBodyProps extends PropsWithChildren {
  className?: string;
  isResizing?: boolean;
}

export const TableBody = memo<TableBodyProps>(
  ({ isResizing, ...props }) =>
    isResizing ? <MemoTableBody {...props} /> : <BaseTableBody {...props} />,
  isEqual,
);

//
// ─── TABLE CELL - <td> ──────────────────────────────────────────────────────────
//

export interface TableCellProps extends PropsWithChildren {
  cell: Cell<any, any>;
  className?: string;
}

export const TableCell = memo<TableCellProps>(
  ({ cell, className = "" }) => (
    <Flex
      boxSizing="border-box"
      // Spacing
      paddingX={6}
      // Size - container
      height={12}
      // Size - content
      fontSize="sm"
      lineHeight={5}
      // Alignment
      align="center"
      justify="flex-start"
      textAlign="start"
      // Border
      borderBottomColor="gray.300"
      borderBottomWidth="1px"
      overflow="hidden"
      isTruncated
      style={{
        width: `calc(var(--col-${cell.column.id}-width) * 1px)`,
      }}
      className={"fn-table-cell " + className}
      role="cell"
    >
      {cell.renderValue<any>()}
    </Flex>
  ),
  isEqual,
);
