'use client';
import { useState } from "react";

export default function Home() {
  const nameList: string[] = ['Nikita Khruchev', 'Harry S Truman', 'Catherine Margaret', 'Anna Vasquez', 'Marlo Hendricks'];

  const [suggestionList, setSuggestionList] = useState<string[]>(nameList);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const handleInputClick = () => {
    setShowSuggestion(true);
  };

  const handleOutOfFocus = () => {
    setTimeout((() => setShowSuggestion(false)), 100);
  };

  const handleOptionClick = (name: string) => {
    setSelectedList([...selectedList, name]);
    setSuggestionList(suggestionList.filter((item) => item !== name));
    setShowSuggestion(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div>This will be the input box</div>
      <div className="w-1/2 border-2 border-gray-300 rounded-md mt-4 p-4">
        {
          selectedList.length > 0 &&
          selectedList.map((name, index) => (
            <li className="list-none" key={`option-${index}-${name}`}>{name}</li>
            )
          )
        }
        {
          suggestionList.length > 0 &&
          <input className="w-3/5 outline-none" type="text" placeholder="Type a name here" onClick={handleInputClick} onBlur={handleOutOfFocus} />
        }
      </div>
      {
        showSuggestion && (
          <div className="w-1/2 border-2 border-gray-300 mt-1 rounded-md p-2">
            {
              suggestionList.map((name, index) => (
                <div key={index} className="p-2 border-b-2 last:border-b-0 hover:bg-blue-300 cursor-pointer border-gray-300"
                  onClick={() => handleOptionClick(name)}>{name}</div>
              ))
            }
          </div>
        )
      }
    </main>
  )
}
