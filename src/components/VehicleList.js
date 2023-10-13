import { textAlign } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import VehicleModal from "./Modal";
import FavoriteList from "./FavoritesList";

const columnData = [
  {
    Header: "Images",
    accessor: "images",
    Cell: ({ value }) => (
      <img src={value} alt="Vehicle" style={{ width: "100px" }} />
    ),
  },
  {
    Header: "Make",
    accessor: "make",
  },
  {
    Header: "Model",
    accessor: "model",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "Mileage",
    accessor: "mileage",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "IsFavorite",
    accessor: "isFavorite",
  },
];
const rowData = [
  {
    vehicleid: 1,
    make: "Toyato",
    model: "Corolla",
    year: 2020,
    mileage: 15000,
    price: 200000,
    images:
      "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Toyota-Glanza-060520221539.jpg&w=872&h=578&q=75&c=1",
    status: "AVAILABLE",
    isFavorite: false,
  },
  {
    vehicleid: 2,
    make: "Audi",
    model: "Corolla",
    year: 2020,
    mileage: 15000,
    price: 188000,
    images:
      "https://imgd.aeplcdn.com/0X0/n/cw/ec/51909/a4-exterior-right-front-three-quarter-2.jpeg?q=80",
    status: "AVAILABLE",
    isFavorite: false,
  },
  {
    vehicleid: 3,
    make: "BMW",
    model: "Corolla",
    year: 2020,
    mileage: 15000,
    price: 1445000,
    images:
      "https://images.hindustantimes.com/auto/img/2023/03/21/1600x900/rolls-royce-black_1679377493896_1679377772569_1679377772569.jpg",
    status: "AVAILABLE",
    isFavorite: false,
  },
  {
    vehicleid: 4,
    make: "Tata",
    model: "Corolla",
    year: 2020,
    mileage: 15000,
    price: 100000,
    images:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/149123/nexon-ev-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
    status: "SOLD",
    isFavorite: false,
  },
  {
    vehicleid: 5,
    make: "Hundai",
    model: "Corolla",
    year: 2020,
    mileage: 1115000,
    price: 18000,
    images:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/149123/nexon-ev-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
    status: "SOLD",
    isFavorite: false,
  },
  {
    vehicleid: 6,
    make: "TATA",
    model: "Corolla",
    year: 2020,
    mileage: 1115000,
    price: 18000,
    images:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/9850/1681887437871/front-left-side-47.jpg?impolicy=resize&imwidth=420",
    status: "SOLD",
    isFavorite: false,
  },
  {
    vehicleid: 7,
    make: "Crysta",
    model: "Corolla",
    year: 2020,
    mileage: 1115000,
    price: 18000,
    images:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijfoyUZk-parabR1bkg6MQquMbxWIpBPpLw&usqp=CAU",
    status: "SOLD",
    isFavorite: false,
  },
  {
    vehicleid: 8,
    make: "Verna",
    model: "Corolla",
    year: 2020,
    mileage: 1115000,
    price: 18000,
    images:
      "https://imgd.aeplcdn.com/1280x720/n/cw/ec/146195/tata-nexon-left-front-three-quarter0.jpeg?isig=0&wm=0",
    status: "SOLD",
    isFavorite: false,
  },
  {
    vehicleid: 9,
    make: "Inova",
    model: "Corolla",
    year: 2020,
    mileage: 15000,
    price: 1445000,
    images:
      "https://images.hindustantimes.com/auto/img/2023/03/21/1600x900/rolls-royce-black_1679377493896_1679377772569_1679377772569.jpg",
    status: "AVAILABLE",
    isFavorite: false,
  },
  {
    vehicleid: 10,
    make: "Toyato",
    model: "Corolla",
    year: 2020,
    mileage: 15000,
    price: 200000,
    images:
      "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Toyota-Glanza-060520221539.jpg&w=872&h=578&q=75&c=1",
    status: "AVAILABLE",
    isFavorite: false,
  },
];
const VechileList = () => {
  const [filter, setFilter] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [favoriteList, setFavoriteList] = useState([]);
//   const [filteredData, setFilteredData] = useState(data);
  const [disabledVehicles, setDisabledVehicles] = useState([]);


  const initialStates = {
    pageSize: 5,
    pageIndex: 0,
  };

  const data = React.useMemo(() => rowData, []);
  const columns = React.useMemo(() => columnData, []);
  const initialState = React.useMemo(() => initialStates);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addToFavorites = (vehicle) => {
    setFavoriteList([...favoriteList, vehicle]);
    // setfav(fav+1)
    // setFilteredData([...filteredData, vehicle]);
  };


  const isVehicleDisabled = (vehicle) => {
    return disabledVehicles.some((v) => v.vehicleid === vehicle.vehicleid);
  };


  const getStatusCellStyle = (status) => {
    switch (status) {
      case "AVAILABLE":
        return { color: "green" };
      case "SOLD":
        return { color: "red" };
      default:
        return { color: "blue" }; // You can use any other color for the "Blocked" status
    }
  };

  const favoriteListColumns = columns.filter((column) => {
    return column.Header !== "Status" && column.Header !== "IsFavorite";
  });

    // // setFilteredData([...filteredData, ...favoriteList]);

    // const filteredData = data.filter((item) => {
    //   return (
    //     item.make.toLowerCase().includes(filter.toLowerCase()) ||
    //     item.model.toLowerCase().includes(filter.toLowerCase())
    //   );
    // });
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState }, usePagination);

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="text-center">
      <div className="container mx-auto mb-8">
        <input
          className="w-full m-1 p-2 border border-gray-400  text-lg outline-black"
          type="text"
          placeholder="Filter by make or model"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <table
        {...getTableProps()}
        className="w-full border-collapse bg-linen m-2 align-left"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-cadetblue">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.column.Header === "Images" ? (
                      <img
                        src={cell.value}
                        alt="Vehicle"
                        style={{ width: "100px", cursor: "pointer" }}
                        onClick={() => openModal(row.original)}
                      />
                    ) : cell.column.Header === "IsFavorite" ? (
                      isVehicleDisabled(row.original) ? (
                        "Disabled"
                      ) : (
                        <button onClick={() => addToFavorites(row.original)}>
                          Add to Favorite
                        </button>
                      )
                    ) : cell.column.Header === "Status" ? (
                      <span style={getStatusCellStyle(row.original.status)}>
                        {row.original.status}
                      </span>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <VehicleModal isOpen={modalIsOpen} closeModal={closeModal} data={selectedVehicle}/>
      <br />

      <div>
  <h1 className="text-current text-left text-4xl">Favorites</h1>
  <FavoriteList
    columnList={favoriteListColumns}
    favoriteList={favoriteList}
    updateFavoriteList={setFavoriteList}
  />
</div>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()}>{">"}</button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 7, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VechileList;
