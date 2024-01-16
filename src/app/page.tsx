'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const nameList: string[] = ['Nikita Khruchev', 'Harry S Truman', 'Catherine Margaret', 'Anna Vasquez', 'Marlo Hendricks'];

  const [suggestionList, setSuggestionList] = useState<string[]>(nameList);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const [predictionList, setPredictionList] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [debouncedInput, setDebouncedInput] = useState<string>('');

  const handleInputClick = () => {
    setShowSuggestion(true);
  };

  const handleOutOfFocus = () => {
    const focusTimeout = setTimeout((() => setShowSuggestion(false)), 100);
    setSearchQuery('');
  };

  const handleOptionClick = (name: string) => {
    console.log(`Option ${name} clicked`);
    setSelectedList([...selectedList, name]);
    console.log(selectedList);

    setSuggestionList(suggestionList.filter((item) => item !== name));
    setPredictionList(predictionList.filter((item) => item !== name));
    console.log(predictionList);

    setShowSuggestion(false);
  };

  const handleDeleteClick = (name: string) => {
    setSelectedList(selectedList.filter((item) => item !== name));
    setSuggestionList([...suggestionList, name]);
    setPredictionList([...predictionList, name]);
  };

  const handleInputSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setDebouncedInput(searchQuery);
    }, 700);
    return () => clearTimeout(debounceTime);
  }, [searchQuery]);


  useEffect(() => {
    let predictions = suggestionList.filter((item) => {
      return (searchQuery === '') ? suggestionList :
      item.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setPredictionList(predictions);
  }, [searchQuery]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div>This will be the input box</div>
      <div className="w-1/2 border-2 border-gray-300 rounded-md mt-4 p-3">

        {
          selectedList.length > 0 &&
          selectedList.map((name, index) => (
            <li className="list-none p-1" key={`option-${name}`}>
              <div className="bg-zinc-400 max-w-fit rounded-3xl whitespace-nowrap p-2">{name}
              <button onClick={() => handleDeleteClick(name)} className="ml-2 inline align-middle"><IconCloseCircleOutline/></button></div></li>
            )
          )
        }
        {
          suggestionList.length > 0 &&
          <input className="w-3/5 outline-none" type="text" placeholder="Type a name here"
          value={searchQuery} onChange={handleInputSearch} onClick={handleInputClick} onBlur={handleOutOfFocus} />
        }
      </div>
      {
        showSuggestion && (
          <div className="w-1/2 border-2 border-gray-300 mt-1 rounded-md p-2">
            {
              predictionList.map((name, index) => (
                <div key={`option-${name}`} className="p-2 border-b-2 last:border-b-0 hover:bg-blue-300 cursor-pointer border-gray-300"
                  onClick={() => handleOptionClick(name)}>{name}</div>
              ))
            }
          </div>
        )
      }
    </main>
  )
}

const IconCloseCircleOutline = (props: any) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M320 320L192 192M192 320l128-128"
      />
    </svg>
  );
}
