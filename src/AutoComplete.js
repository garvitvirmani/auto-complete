import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Autocomplete = ({ data, setData }) => {
  const [query, setQuery] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedChipIndex, setSelectedChipIndex] = useState(-1);
  const listContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedChipIndex(-1);
  };

  const handleSelectItem = (item) => {
    setSelectedChips([...selectedChips, item]);
    setData(data.filter((currentItem) => currentItem !== item));
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = selectedChips.filter(
      (selectedItem) => selectedItem !== item
    );
    setData([...data, item].sort());
    setSelectedChips(updatedItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleSelectItem(data[selectedIndex]);
    } else if (e.key === "Backspace") {
      if (query === "" && selectedChips.length > 0) {
        const lastSelectedItem = selectedChips[selectedChips.length - 1];
        if (selectedChipIndex === -1) {
          setSelectedChipIndex(selectedChips.length - 1);
        } else {
          setSelectedChipIndex(-1);
          handleRemoveItem(lastSelectedItem);
        }
      } else if (query === "" && selectedChips.length === 0) {
        // Do nothing
      } else {
        setSelectedChipIndex(-1);
      }
    }
  };

  useEffect(() => {
    const selectedElement = document.getElementById(
      `autocomplete-item-${selectedIndex}`
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div className="relative">
      <div className="flex flex-wrap">
        {selectedChips.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            id={`autocomplete-item-${index}`}
            className={`bg-blue-500 text-white py-2 px-4 rounded-full flex items-center mr-2 mt-2 p-3 ${
              index === selectedChipIndex ? "border-2 border-red-500" : ""
            }`}
            style={{
              fontFamily: "Arial, sans-serif",
              margin: "4px",
              padding: "8px",
            }} // Adjusted margin and padding
          >
            <span className="mr-2" style={{ fontFamily: "inherit" }}>
              {item}
            </span>
            <button
              onClick={() => handleRemoveItem(item)}
              className="focus:outline-none text-white hover:text-red-700"
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              &#10005;
            </button>
          </motion.div>
        ))}
        <div className="relative" ref={listContainerRef}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border-none p-2 rounded-full mt-2 ml-2 focus:outline-none"
            placeholder="Type to search..."
          />
          {query.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 bg-white border p-2 mt-1 rounded max-w-sm shadow-md"
              style={{
                left: 0,
                top: listContainerRef.current
                  ? listContainerRef.current.clientHeight
                  : 0,
              }}
            >
              {data.map((item, index) => (
                <motion.li
                  key={item}
                  id={`autocomplete-item-${index}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`cursor-pointer py-1 px-2 hover:bg-gray-100 ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSelectItem(item)}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
