import React,{useState, useEffect} from "react";
import SearchBar from "./SearchBar";
import axios from "axios"
import Spinner from "./Spinner";

export default function GetTable() {

  const [trips,setTrips] = useState([])
  const [error,setError] = useState(false)
  const [load,setLoad] = useState(true)
  const [meta, setMeta] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      setLoad(true)
      try {
        const { data } = await axios.get('https://global.atdtravel.com/api/products?geo=en&offset=2&limit=10')
        setTrips(data.data)
        console.log(meta)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])


    return (
        <>
            <div className="w-full sm:px-6"> // todo : make it responsive 
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100  rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-around">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Trips and Attraction</p>
                        <div>
                          <SearchBar/>
                          <Spinner/>
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
                        {trips.map((trip) => {
                          return (
                        <tbody className="w-full">
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-120 h-120">
                                            <img className="w-full h-full rounded-lg" src={trip.img_sml}/>
                                        </div>
                                        {/* <div className="pl-4">
                                            <p className="font-medium">{trip.dest}</p>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">Herman Group</p>
                                        </div> */}
                                    </div>
                                </td>
                                <td className="pl-12">
                                    <p className="text-lg font-medium leading-none text-gray-800">{trip.title}</p>
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium text-lg text-green-500">from ${trip.price_from_adult}</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">5 tasks pending</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium text-lg text-green-500">from ${trip.price_from_child}</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">{trip.price_from_all[0].desc}</p> // I can not access to the second element 
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">{trip.dest}</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">34 days</p>
                                </td>
                            </tr>
                        </tbody>
                          )
                        })}
                    </table>
                </div>
            </div>
        </>
    );
}


