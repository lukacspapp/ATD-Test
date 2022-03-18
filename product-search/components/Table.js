import { useEffect, useState } from "react";
import axios from 'axios';
import SearchBar from "./SearchBar";
export default function Table() {

  const [trips,setTrips] = useState([])
  const [error,setError] = useState(false)
  const [load,setLoad] = useState(true)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://global.atdtravel.com/api/products?geo=en')
        setTrips(data.data)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])



  return (
    <section class="flex-wrap antialiased justify-center  bg-gray-100 text-gray-600 h-screen px-4 max-h-full">
      <div class="flex flex-wrap flex-col align-middle justify-center max-h-full">
        <div class="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border m-6 border-gray-200 max-h-full">
            <header class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">Trips and Attractions</h2>
                <SearchBar />
            </header>
            
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left"></div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Title</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Price</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Destination</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                        {trips.map((trip) => {
                          return (
                            <tr>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-20 h-20 object-fill flex-shrink-0 mr-2 sm:mr-3"><img class="h-20 w-60 rounded-lg" src={trip.img_sml} width="15" height="70" alt="Alex Shatov"/></div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left text-xl">{trip.title}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg font-medium text-green-500">{trip.price_from_adult}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-lg text-center">{trip.dest}</div>
                                </td>
                            </tr>
                          )
                        })}
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  </section>
  )
}
