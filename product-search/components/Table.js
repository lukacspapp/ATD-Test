import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

export default function GetTable() {
  const [trips, setTrips] = useState([]); // state for rendered items

  const [paginationOffset, setPaginationOffset] = useState(0); // state for pagination it will be increased by 10
  const [totalCount, setTotalCount] = useState(0); // state for items that will return from the search
  const [searchTerm, setSearchTerm] = useState(""); // state for the search term

  const [loading, setLoading] = useState(true); // state for loading that is set to true by deafult until we have the data
  const [error, setError] = useState(undefined); // state for error

  useEffect(() => { 
    const fetchData = async () => {
      setLoading(true); // loading sign is on until I have the data
      try {
        const {
          data: { meta }, // deconstracting meta data for the for the pagination and the counting of the items
          data: { data }, // decontructing data for rendering
        } = await axios.get(
          // axois request will translate the data into JSON by default
          `https://global.atdtravel.com/api/products?geo=en&offset=${paginationOffset}&limit=10&title=${searchTerm}`
        );

        if (meta.total_count !== totalCount) {
          // When the total count that is in state is not equal the total count from the new request,
          setTrips(data); // replace the trips state with the new data
        } else {
          setTrips([...trips, ...data]); // otherwise spread the new data into the trips state with the previous data. // Edgecase if the array has the same ammount of trips for the same search term it will not update the page?
        }

        setTotalCount(meta.total_count); // We are setting the total count state to the new request count
        setLoading(false); // Set loading false on a successful request
        setError(undefined); // Sett Err undefined incase we had an error before
      } catch (err) {
        setError(err.response.data.err_desc); // displaying error message
        setLoading(false); // then loading is false
      }
    };

    fetchData();
  }, [paginationOffset, searchTerm]); // fetchData function gets called once the search term or the pagination changes

  if (loading) {
    // if loading true than a spinner appear
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
        {error ? ( // if there is error it will display a message
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
              {trips.map( // mapping over the items to be able to display them
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
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}

        {totalCount > 10 && totalCount - paginationOffset > 10 && ( // if we have more than 10 in the total count then display the button and if we have less than 10 in the total count then the button will disappear
          <button
            type="button"
            className="flex items-center justify-center h-16 w-32 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 hover:cursor-pointer mx-auto my-6"
            onClick={() => setPaginationOffset(paginationOffset + 10)} // once the button is clicked we update the pagination by 10 and it will show us the next 10 or less items
          >
            Load more...
          </button>
        )}
      </div>
    </div>
  );
}