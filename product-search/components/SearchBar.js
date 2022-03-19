import SearchIcon from "./SearchIcon";


export default function SearchBar() {

  const handleClick = () => {
    console.log('Sanyi')
  }

  return (
    <div className="m-4 flex max-w-md place-self-center rounded-full border">
    <input className="w-full p-1 bg-inherit rounded m-2" type="text" placeholder="Search..."/>
    <button onClick={handleClick}>
      <span className="w-auto flex justify-end items-center text-grey p-2">
        <SearchIcon/>
      </span>
    </button>
  </div>
  )
}
