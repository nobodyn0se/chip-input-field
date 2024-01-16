'use client';

import { useEffect, useRef, useState } from "react";
import React from "react";
import IconCloseCircleOutline from "./components/CloseIcon";

export default function Home() {
  const nameList: string[] = ['Nikita Khruchev', 'Harry S Truman', 'Catherine Margaret', 'Anna Vasquez', 'Marlo Hendricks'];

  const [suggestionList, setSuggestionList] = useState<string[]>(nameList);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const [predictionList, setPredictionList] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [debouncedInput, setDebouncedInput] = useState<string>('');

  const newRef = useRef<any>(null);

  // detects and handles click outside the input box
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e: any) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      handleOutOfFocus();
    }
  };

  const handleInputClick = () => {
    setShowSuggestion(true);
  };

  const handleOutOfFocus = () => {
    setShowSuggestion(false);
    setSearchQuery('');
  };

  const handleOptionClick = (name: string) => {
    setSelectedList([...selectedList, name]);

    setSuggestionList(suggestionList.filter((item) => item !== name));
    setPredictionList(predictionList.filter((item) => item !== name));

    setSearchQuery('');
    setShowSuggestion(false);
  };

  const handleDeleteClick = (name: string) => {
    setSelectedList(selectedList.filter((item) => item !== name));
    setSuggestionList([...suggestionList, name]);
    setPredictionList([...predictionList, name]);
    setSearchQuery('');
  };

  const handleInputSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setDebouncedInput(searchQuery);
    }, 700);

    // filters the search results
    const predictions = suggestionList.filter((item) => {
      return (searchQuery === '') ? suggestionList :
        item.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setPredictionList(predictions);

    return () => clearTimeout(debounceTime);
  }, [searchQuery]);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start p-24">
      <div>Click the input box to view names or type for search suggestions</div>
      <div ref={newRef} className="w-1/2">
        <div className="flex flex-wrap border-2 border-gray-300 rounded-md mt-4 p-3">

          {/* Displays selected names in the form of chips */}
          {
            selectedList.length > 0 &&
            selectedList.map((name, index) => (
              <li className="list-none m-1 p-1" key={`option-${name}`}>
                <div className="bg-zinc-400 max-w-fit rounded-3xl whitespace-nowrap p-2">{name}
                  <button onClick={() => handleDeleteClick(name)} className="ml-2 inline align-middle"><IconCloseCircleOutline /></button></div></li>
            )
            )
          }
          {
            suggestionList.length > 0 &&
            <input className="outline-none mt-1" type="text" placeholder="Type a name here"
              value={searchQuery} onChange={handleInputSearch} onClick={handleInputClick} />
          }
        </div>
        {
          showSuggestion && (
            <div className="border-2 border-gray-300 mt-1 rounded-md p-2">
              {
                predictionList.length > 0 ?
                  predictionList.map((name, index) => (
                    <div key={`option-${name}`} className="p-2 border-b-2 last:border-b-0 hover:bg-blue-300 cursor-pointer border-gray-300"
                      onClick={() => handleOptionClick(name)}>{name}</div>
                  )) : <div className="p-2 border-b-2 last:border-b-0 text-center text-slate-400 border-gray-300">No results found</div>
              }
            </div>
          )
        }
        </div>

    </main>
  )
}
