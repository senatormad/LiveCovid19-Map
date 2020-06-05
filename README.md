## LiveCovid19 Map
### React project - Fetching data from [COVID-19](https://covid19-api.com/) api, storing them in [Redux](https://redux.js.org/) and displaying them on google maps

[Technologies](#technologies) | [Prerequisites](#prerequisites) | [How To Use](#how-to-use) | [License](#license)

#### Technologies
___
*   [Node.js](https://nodejs.org/)
*   [Yarn](https://yarnpkg.com/)
*   [webpack](https://webpack.js.org/)
*   [React](https://reactjs.org/)
*   [Redux](https://redux.js.org/)
*   [google-map-react](https://github.com/google-map-react/google-map-react/)

#### Prerequisites
___
To use or/and test this app, you have to install NodeJS on your machine. How to install Node you can see [here](https://nodejs.org/en/download/package-manager/).

### How To Use
___

*   Clone this repository:
```shell
$ git clone https://github.com/senatormad/LiveCovid19-Map
```
*   Go into the repository:
```shell
$ cd LiveCovid19-Map/
```
*   Install dependencies:
```shell
$ yarn install
```
*   Create .env file in project root and insert next values with your RapidAPI key:
```markdown
#.env
REACT_APP_DOC_TITLE = "LiveCovid19.World"
REACT_APP_RAPIDAPI_URL_ALL_COUNTRIES = "https://covid-19-data.p.rapidapi.com/country/all?format=undefined"
REACT_APP_RAPIDAPI_URL_TOTALS = "https://covid-19-data.p.rapidapi.com/totals?format=json"
REACT_APP_RAPIDAPI_HOST = "covid-19-data.p.rapidapi.com"
REACT_APP_RAPIDAPI_KEY = "<< YOUR RAPID API KEY >>"
REACT_APP_GOOGLEMAPS_API_KEY = "<< YOUR GOOGLE MAPS API KEY >>"
```
*   And now you can start app:
```shell
$ yarn start
```
*   Or you can build app:
```shell
$ yarn build
```

### License
___
[MIT License](https://github.com/senatormad/LiveCovid19-Map/blob/master/LICENSE)