import { ColumnDef } from "@tanstack/react-table";
import type { Person } from "./data";

//
// ─── DEFAULT COLUMNS ────────────────────────────────────────────────────────────
//

export const defaultColumns: ColumnDef<Person>[] = [
  {
    header: "Name",
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        header: () => <span>Last Name</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        id: "lastName",
      },
    ],
    footer: (props) => props.column.id,
  },
  {
    header: "Info",
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id,
      },
    ],
    footer: (props) => props.column.id,
  },
];
