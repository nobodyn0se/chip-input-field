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
