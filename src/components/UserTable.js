import React, { useMemo, useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UserTable = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const initialPage = parseInt(query.get("page") || "0", 10);
  const initialSearch = query.get("search") || "";

  const [pageIndex, setPageIndex] = useState(initialPage);
  const [searchInput, setSearchInput] = useState(initialSearch);

  const { data, isLoading } = useUsers(pageIndex, searchInput);

  const columns = useMemo(
    () => [
      { accessorKey: "username", header: "Username" },
      { accessorKey: "fullName", header: "Full Name" },
      {
        accessorKey: "avatar",
        header: "Avatar",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        ),
      },
      {
        accessorKey: "active",
        header: "Active",
        cell: (info) => (
          <span
            className={`inline-block w-4 h-4 rounded-full ${
              info.getValue() ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.users || [],
    columns,
    state: {
      pagination: { pageIndex, pageSize: 5 },
      globalFilter: searchInput,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.totalCount || 0) / 5),
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("search", searchInput);
    params.set("page", pageIndex);
    navigate({ search: params.toString() });
  }, [searchInput, pageIndex, navigate]);

  useEffect(() => {
    if (searchInput) {
      setPageIndex(0);
    }
  }, [searchInput]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-2xl rounded-3xl p-6">
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by username or email"
        className="mb-4 p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-left">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 border-b shadow-sm">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100 transition">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 border-b shadow-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
          className="p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:-translate-y-1 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() =>
            setPageIndex((old) =>
              old + 1 < table.getPageCount() ? old + 1 : old
            )
          }
          disabled={pageIndex + 1 >= table.getPageCount()}
          className="p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:-translate-y-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
