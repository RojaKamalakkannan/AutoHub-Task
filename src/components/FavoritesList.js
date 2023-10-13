import React from "react";
import { useTable } from "react-table";

const FavoriteList = ({ columnList, favoriteList, updateFavoriteList }) => {
  const data = React.useMemo(() => favoriteList, []);
  const columns = React.useMemo(() => columnList, []);

  const addToFavorites = (vehicle) => {
    if (isVehicleInFavorites(vehicle)) {
      const updatedList = favoriteList.filter(
        (favVehicle) => favVehicle.vehicleid !== vehicle.vehicleid
      );
      updateFavoriteList(updatedList);
    } else {
      updateFavoriteList([...favoriteList, vehicle]);
    }
  };

  const isVehicleInFavorites = (vehicle) => {
    return favoriteList.some(
      (favVehicle) => favVehicle.vehicleid === vehicle.vehicleid
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: columnList, data: favoriteList });

  return (
    <div className="text-center">
      {favoriteList.length > 0 && (
        <table
          {...getTableProps()}
          className="w-full border-collapse bg-linen m-2 align-left"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-cadetblue"
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === "IsFavorite" ? (
                        <button onClick={() => addToFavorites(row.original)}>
                          {isVehicleInFavorites(row.original)
                            ? "Added to Favorite"
                            : "Add to Favorite"}
                        </button>
                      ) : cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
