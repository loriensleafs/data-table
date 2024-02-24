import { Box, Flex } from "@chakra-ui/react";
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
    <Flex
      cursor="col-resize"
      height="full"
      opacity={0}
      paddingY={3.5}
      position="absolute"
      right="-4px"
      top={0}
      transition="opacity 0.15s ease-out"
      width="8px"
      sx={{
        touchAction: "none",
      }}
      _grabbed={{
        opacity: "1 !important",
        "> div": {
          background: "blue.400",
        },
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
    >
      <Box
        background="rgba(0,0,0,0.1)"
        borderRadius="3px"
        height="full"
        transition="background 0.15s ease-out"
        width="3px"
      />
    </Flex>
  ),
  isEqual,
);
