import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

export default function GetTable() {
  const [trips, setTrips] = useState();
  const [meta, setMeta] = useState();

  const [paginationOffset, setPaginationOffset] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { meta },
          data: { data },
        } = await axios.get(
          `https://global.atdtravel.com/api/products?geo=en&offset=${paginationOffset}&limit=10`
        );

        setTrips(data);
        setMeta(meta);

        console.log(data);
        console.log(meta);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h2>There was an error</h2>
      </div>
    );
  }

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
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-xl leading-none text-gray-800">
              <th className="font-normal text-left pl-4">Image</th>
              <th className="font-normal text-left pl-12">Title</th>
              <th className="font-normal text-left pl-12">Price for Adults</th>
              <th className="font-normal text-left pl-20">Price for Child</th>
              <th className="font-normal text-left pl-20">Destination</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {trips.map(({ id, img_sml, title, price_from_all, dest }) => (
              <tr
                key={id}
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              >
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
                  <p className="text-lg font-medium leading-none text-gray-800">
                    {title}
                  </p>
                </td>
                {price_from_all.map(
                  ({ desc, price_from, type_description }) => (
                    <td key={desc} className="pl-12">
                      <p className="font-medium text-lg text-green-500">
                        from ${price_from}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 mt-2">
                        {type_description}
                      </p>
                    </td>
                  )
                )}
                <td className="pl-20">
                  <p className="font-medium">{dest}</p>
                  <p className="text-xs leading-3 text-gray-600 mt-2">
                    34 days
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}