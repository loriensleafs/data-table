import { Box } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import isEqual from "react-fast-compare";

/**
 * # ResizeHandleProps
 *
 * > Props for the `<ResizeHandle />` component.
 */
export interface ResizeHandleProps {
  className?: string;
  isResizing?: boolean;
  onResetSize: () => void;
  onResize: (event: unknown) => void;
}

/**
 * # `<ResizeHandle />`
 *
 * > A React component that allows a user to resize a `<Table />` column
 * > on `mouse down` / `touch` `drag` events.
 */
export const ResizeHandle = memo<ResizeHandleProps>(
  ({ className = "", isResizing, onResetSize, onResize, ...props }) => (
    <Box
      background="rgba(0,0,0,0.1)"
      borderRadius="3px"
      cursor="col-resize"
      height="calc(100% - 1rem)"
      marginX={3}
      marginY={2}
      opacity={0}
      position="absolute"
      right={0}
      top={0}
      transform="translate3d(0px, 0.05rem, 0px)"
      transition="background 0.15s ease-out, opacity 0.15s ease-out"
      userSelect="none"
      width="3px"
      sx={{
        touchAction: "none",
      }}
      _grabbed={{
        background: "blue.400",
        opacity: "1 !important",
      }}
      _hover={{
        opacity: "1 !important",
      }}
      onDoubleClick={useCallback(() => onResetSize(), [onResetSize])}
      onMouseDown={onResize}
      onTouchStart={onResize}
      {...props}
      className={"fn-datatable-resize-handle " + className}
      {...(isResizing && { ["data-grabbed"]: true })}
    />
  ),
  isEqual,
);
