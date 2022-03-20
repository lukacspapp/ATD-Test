import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

export default function GetTable() {
  const [trips, setTrips] = useState([]);

  const [paginationOffset, setPaginationOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {
          data: { meta },
          data: { data },
        } = await axios.get(
          `https://global.atdtravel.com/api/products?geo=en&offset=${paginationOffset}&limit=10&title=${searchTerm}`
        );

        if (meta.total_count !== totalCount) {
          setTrips(data);
        } else {
          setTrips([...trips, ...data]);
        }

        setTotalCount(meta.total_count);
        setLoading(false);
        setError(undefined);
      } catch (err) {
        setError(err.response.data.err_desc);
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationOffset, searchTerm]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full sm:px-6">
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100  rounded-tl-lg rounded-tr-lg">
        <div className="sm:flex items-center justify-around">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Trips and Attractions
          </p>
          <div>
            <SearchBar
              setSearchTerm={setSearchTerm}
              setPaginationOffset={setPaginationOffset}
            />
          </div>
        </div>
      </div>
      <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        {error ? (
          <div className="h-screen w-screen flex items-center justify-center">
            <h2>{error}</h2>
          </div>
        ) : (
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-xl text-gray-800">
                <th className="font-normal text-left pl-4">#</th>
                <th className="font-normal text-left pl-4">Image</th>
                <th className="font-normal text-left pl-12">Title</th>
                <th className="font-normal text-left pl-12">
                  Price for Adults
                </th>
                <th className="font-normal text-left pl-20">Destination</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {trips.map(
                ({ id, img_sml, title, price_from_adult, dest }, index) => (
                  <tr
                    key={id}
                    className="h-20 text-sm text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  >
                    <td>{index + 1}</td>
                    <td className="pl-4 cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-120 h-120">
                          <Image
                            className="rounded-lg"
                            src={img_sml}
                            height={230}
                            width={307}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-12">
                      <p className="text-lg font-medium text-gray-800">
                        {title}
                      </p>
                    </td>
                    <td className="pl-12">
                      <p className="font-medium text-lg text-green-500">
                        from £{price_from_adult}
                      </p>
                    </td>
                    <td className="pl-20">
                      <p className="font-medium">{dest}</p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        34 days
                      </p>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}

        {totalCount > 10 && totalCount - paginationOffset > 10 && (
          <button
            type="button"
            className="flex items-center justify-center h-16 w-32 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 hover:cursor-pointer mx-auto my-6"
            onClick={() => setPaginationOffset(paginationOffset + 10)}
          >
            Load more...
          </button>
        )}
      </div>
    </div>
  );
}