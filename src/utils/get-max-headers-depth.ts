import type { HeaderGroup } from "@tanstack/react-table";

export const getMaxHeadersDepth = (headers: HeaderGroup<any>[]) =>
  headers.reduce(
    (maxDepth, header) => (header.depth > maxDepth ? header.depth : maxDepth),
    0,
  );
