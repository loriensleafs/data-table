import { Box, ChakraProvider } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { DataTable } from "./components/data-table";
import type { Person } from "./utils";
import { makeData } from "./utils";

//
// ─── APP ────────────────────────────────────────────────────────────────────────
//

const App = () => {
  const data = useMemo(() => makeData(100), []);

  return (
    <Box position="relative" width="100%">
      <Box height="100vh" marginX="auto" maxWidth={1200} position="relative" width="100%">
        <DataTable<Person>
          columnResizeMode="onChange"
          columns={useMemo(
            () => [
              {
                id: "name",
                columns: [
                  {
                    accessorKey: "firstName",
                    header: "First Name",
                    minSize: 156,
                    maxSize: 250,
                  },
                  {
                    accessorFn: (row) => row.lastName,
                    header: "Last Name",
                    id: "lastName",
                  },
                ],
                header: "Name",
              },
              {
                id: "info",
                columns: [
                  {
                    accessorKey: "age",
                    header: "Age",
                  },
                  {
                    accessorKey: "visits",
                    header: "Visits",
                  },
                  {
                    accessorKey: "status",
                    header: "Status",
                  },
                  {
                    accessorKey: "progress",
                    header: "Profile Progress",
                  },
                ],
                header: "Info",
              },
            ],
            [],
          )}
          data={data}
          enableColumnResizing
          headerIsSticky
        />
      </Box>
    </Box>
  );
};

//
// ─── MOUNT ──────────────────────────────────────────────────────────────────────
//

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
