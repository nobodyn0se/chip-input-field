This repo contains the codebase for a simple chip input field created in React without the use of third party UI libraries. Check it live @ https://chip-input-field.vercel.app/

## Getting Started

Clone the repo onto your local machine using the command:
```
git clone https://github.com/nobodyn0se/chip-input-field.git
```
Navigate to the project folder using ```cd chip-input-field```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How does it work?

- The page contains an input search box that lists some names when you click inside the search box. You can lookup keywords by typing into the input box which returns the search results that match the query.
- Multiple options can be selected. They appear as grey-bordered chips inside the input field with a remove button. Already selected items will not be shown as suggestions or search results. Upon removing them, the options reappear in the list.
- A debouncer is configured for the input search.

## Features
- Responsiveness
- Minimalistic

## Deployed on Vercel

Check out the deployment at https://chip-input-field.vercel.app/
