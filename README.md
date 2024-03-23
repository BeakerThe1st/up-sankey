# Up Sankey
A simple webapp to generate a sankey diagram of your all-time spending via the Up API. Functionality is extremely basic, and will be improved before it is published.

![Up Sankey Demo](https://i.imgur.com/Vl90y4n.png)

## Installation/Usage
1. Install [node & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Install dependencies with `npm install`
3. Use `npm run preview` to run the app locally.
4. Obtain and enter your [Up API Personal Access Token](https://api.up.com.au/)

## TODO
- Add logout button to clear token from localStorage
- Add user help text to login page
- Add option to ignore/display uncategorised charges
- Extend beyond just charges and show breakdown of transfers to Savers 

## Uses
- React
- Nivo
- TypeScript
- Vite
- Tailwind CSS
- Axios