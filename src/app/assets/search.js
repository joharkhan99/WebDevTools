import { useState, useEffect, useRef } from "react";
const data = require('../products/commands.json')
export default function Search() {
  const [searchValue, setSearchValue] = useState(""); // State to store the value of search input
  const [searchResults, setSearchResults] = useState([]); // State to store the filtered search results
  const [showDropdown, setShowDropdown] = useState(false); // State to control the visibility of the dropdown
  const inputRef = useRef(null); // Reference to the input element
  const dropdownRef = useRef(null); // Reference to the dropdown list element

  useEffect(() => {
    // Event listener to handle outside clicks and close the dropdown
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside the input and dropdown list
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // Attach the event listener for outside click detection

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup by removing the event listener
    };
  }, []);

  useEffect(() => {
    const toolList = [
      // Simulated JSON data
      {
        id: 1,
        name: "Code editor",
        url: "codeedit",
      },
      {
        id: 7,
        name: "Mark down Editor",
        url: "MD"
      }
    ];
    toolList.push(...data);
    console.log(data)
    const filteredData = toolList.filter(
      (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()), // Filter the JSON data based on the search value
    );
    setSearchResults(filteredData); // Update the filtered search results
    setShowDropdown(searchValue !== "" && filteredData.length > 0); // Show the dropdown if search value is not empty and there are filtered results
  }, [searchValue]);
  const handleInputChange = (event) => {
    setSearchValue(event.target.value); // Update the search value when the input changes
  };

  useEffect(() => {
    if (inputRef.current && dropdownRef.current) {
      dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`; // Set the width of the dropdown to match the width of the input
    }
  }, [showDropdown]);

  return (
    <div>
      <div ref={inputRef}>
            <input
                      value={searchValue}
                      onChange={handleInputChange}
            type="search" id="search" class="grow outline-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-1.5 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search" required />
      </div>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="bg-white border border-gray-300 ml-4 shadow absolute z-10"
        >
          {searchResults.map((item) => (
            <a href={item.url}>
              <li
                key={item.name}
                className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
}
