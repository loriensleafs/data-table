import { Box } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import isEqual from "react-fast-compare";

export interface ResizeHandleProps {
  isResizing?: boolean;
  onResize: (event: unknown) => void;
  onResetSize: () => void;
}

export const ResizeHandle = memo<ResizeHandleProps>(
  ({ isResizing, onResize, onResetSize, ...props }) => (
    <Box
      {...props}
      cursor="col-resize"
      height="100%"
      position="absolute"
      right={0}
      top={0}
      userSelect="none"
      width="10px"
      opacity={isResizing ? 1 : 0}
      background={isResizing ? "blue.500" : "rgba(0, 0, 0, 0.5)"}
      style={{ touchAction: "none" }}
      _hover={{ opacity: 1 }}
      onDoubleClick={useCallback(() => onResetSize(), [onResetSize])}
      onMouseDown={onResize}
      onTouchStart={onResize}
    />
  ),
  isEqual,
);
