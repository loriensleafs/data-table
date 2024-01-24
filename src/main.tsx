import { ChakraProvider, Box } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { DataTable } from "./components/data-table";

//
// ─── APP ────────────────────────────────────────────────────────────────────────
//

const App = () => {
  return (
    <Box position="relative" width="100%">
      <Box
        position="relative"
        maxW={900}
        width="100%"
        mx="auto"
        overflow="hidden"
      >
        <DataTable />
      </Box>
    </Box>
  );
};

//
// ─── MOUNT ──────────────────────────────────────────────────────────────────────
//

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
