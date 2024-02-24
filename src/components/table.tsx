import type { BoxProps, FlexProps } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { isNumber } from "@chakra-ui/utils";
import type { Cell, Header } from "@tanstack/react-table";
import type { FC } from "react";
import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";

//
// ─── TABLE - <table /> ──────────────────────────────────────────────────────────
//

/**
 * # TableProps
 *
 * > Props for the `<Table />` component.
 */
export interface TableProps extends BoxProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * # `<Table />`
 *
 * > Styled HTML `<table />` component.
 */
export const Table = memo<TableProps>(
  ({ className = "", ...props }) => (
    <Box
      borderColor="gray.300"
      borderStyle="solid"
      borderWidth={0}
      width="calc(var(--fn-datatable-width) * 1px)"
      {...props}
      className={"fn-datatable " + className}
      role="table"
    />
  ),
  isEqual,
);

//
// ─── TABLE ROW - <tr /> ─────────────────────────────────────────────────────────
//

/**
 * # TableRowProps
 *
 * > Props for the `<TableRow />` component.
 */
export interface TableRowProps extends FlexProps {
  className?: string;
}

/**
 * # `<TableRow />`
 *
 * > Styled HTML `<tr />` component.
 */
export const TableRow = memo<TableRowProps>(
  ({ className = "", ...props }) => (
    <Flex
      sx={{ breakInside: "avoid" }}
      width="fit-content"
      {...props}
      className={"fn-datatable-row " + className}
      role="row"
    />
  ),
  isEqual,
);

//
// ─── TABLE HEAD - <thead /> ─────────────────────────────────────────────────────
//

/**
 * # TableHeadProps
 *
 * > Props for the `<TableHead />` component.
 */
export interface TableHeadProps extends FlexProps {
  className?: string;
  isSticky?: boolean;
}

/**
 * # `<TableHead />`
 *
 * > Styled HTML `<thead />` component.
 */
export const TableHead = memo<TableHeadProps>(
  ({ className = "", isSticky = false, ...props }) => (
    <Flex
      alignItems="flex-start"
      background="#ffffff"
      border="none"
      boxSizing="border-box"
      flexDirection="column"
      position={isSticky ? "sticky" : "relative"}
      top={isSticky ? 0 : undefined}
      transform="translate3d(0px, 0px, 0px)"
      _hover={{
        ".fn-datatable-resize-handle": {
          opacity: 0.25,
        },
      }}
      {...props}
      className={"fn-datatable-head " + className}
    />
  ),
  isEqual,
);

//
// ─── TABLE HEADER - <th /> ──────────────────────────────────────────────────────
//

/**
 * # TableHeaderProps
 *
 * > Props for the `<TableHeader />` component.
 */
export interface TableHeaderProps extends FlexProps {
  className?: string;
  header: Header<any, any>;
  resizingIsEnabled?: boolean;
}

/**
 * # `<TableHeader />`
 *
 * > Styled HTML `<th />` component.
 */
export const TableHeader = memo<TableHeaderProps>(
  ({ children, className = "", header, resizingIsEnabled = false, ...props }) => {
    const width = useMemo(() => {
      const { maxSize, minSize } = header.column.columnDef;
      return {
        maxWidth:
          isNumber(maxSize) && maxSize != 9007199254740991
            ? maxSize + (resizingIsEnabled ? 16 : 0) + "px"
            : undefined,
        minWidth: isNumber(minSize) ? minSize + "px" : undefined,
        width: `calc(var(--fn-datatable-column-${header.column.id.toLowerCase()}-width) * 1px)`,
      };
    }, [
      header.column.columnDef.maxSize,
      header.column.columnDef.minSize,
      header.column.id,
      resizingIsEnabled,
    ]);

    return (
      <Flex
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.300"
        fontFamily="heading"
        fontSize="xs"
        fontWeight="bold"
        height={12}
        justifyContent="center"
        letterSpacing="wider"
        lineHeight={4}
        paddingLeft={6}
        paddingRight={
          resizingIsEnabled ? "calc(var(--chakra-space-6) + var(--chakra-space-4))" : 6
        }
        position="relative"
        textAlign="start"
        textTransform="uppercase"
        {...width}
        isTruncated
        {...props}
        className={"fn-datatable-header " + className}
        role="columnheader"
      >
        {!header.isPlaceholder && <Box isTruncated>{children}</Box>}
      </Flex>
    );
  },
  isEqual,
);

//
// ─── TABLE BODY - <tbody /> ─────────────────────────────────────────────────────
//

const BaseTableBody: FC<TableBodyProps> = ({ className = "", ...props }) => (
  <Box
    border="none"
    boxSizing="border-box"
    {...props}
    className={"fn-datatable-body " + className}
  />
);

const MemoTableBody = memo(BaseTableBody, isEqual) as typeof BaseTableBody;

//
// ────────────────────────────────────────────────────────────────────────────────
//

/**
 * # TableBodyProps
 *
 * > Props for the `<TableBody />` component.
 */
export interface TableBodyProps extends BoxProps {
  className?: string;
  isResizing?: boolean;
}

/**
 * # `<TableBody />`
 *
 * > Styled HTML `<tbody />` component.
 */
export const TableBody = memo<TableBodyProps>(
  ({ isResizing, ...props }) =>
    isResizing ? <MemoTableBody {...props} /> : <BaseTableBody {...props} />,
  isEqual,
);

//
// ─── TABLE CELL - <td /> ────────────────────────────────────────────────────────
//

/**
 * # TableCellProps
 *
 * > Props for the `<TableCell />` component.
 */
export interface TableCellProps extends FlexProps {
  cell: Cell<any, any>;
  className?: string;
  resizingIsEnabled?: boolean;
}

/**
 * # `<TableCell />`
 *
 * > Styled HTML `<td />` component.
 */
export const TableCell = memo<TableCellProps>(
  ({ cell, className = "", resizingIsEnabled = false, ...props }) => (
    <Flex
      alignItems="center"
      borderBottomColor="gray.300"
      borderBottomWidth="1px"
      boxSizing="border-box"
      fontSize="sm"
      height={12}
      justifyContent="flex-start"
      lineHeight={5}
      overflow="hidden"
      paddingLeft={
        resizingIsEnabled ? "calc(var(--chakra-space-6) + var(--chakra-space-4))" : 6
      }
      paddingRight={6}
      textAlign="start"
      width={`calc(var(--fn-datatable-column-${cell.column.id.toLowerCase()}-width) * 1px)`}
      isTruncated
      {...props}
      className={"fn-datatable-cell " + className}
      role="cell"
    >
      {cell.renderValue<any>()}
    </Flex>
  ),
  isEqual,
);
