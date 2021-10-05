**Currency Exchange web app**  - by Balog Robert.

demonstrative hosted version: https://currency-exchange-webapp.netlify.app/

Installation Steps:
```
    after cloning the Git repo, in the terminal/command prompt(cmd), 
    type "npm install" (without quotes) and wait for module installation,
    followed by "npm start" for running the dev server.
```


Project technical structure and functionality:

built with React.JS

**libraries:**
```
Material UI library  - used for quick stilling plus custom CSS;
exchangeratesapi API - provided API for fetching currencies rates;
```

**other complementary used imports:**
```
"react-country-flag" - for displaying country flags,
"country-data-query" - for fetching countries from its currencies;
"iso-country-currency" - for converting country to its ISO code (used by country-flag)
```


The project is split into its components like the diagram below:
Each component has  "Currency" at the start for differentiating with Material UI components.
```
-API:
  -CurrencyBuild

-App:
    -CurrencyCardGroup
        -CurrencyCard
    -CurrencyCardInput
        -CurrencyCardMenu
    -CurrencyModal
        -CurrencyItem
```

**-Fetching data:**

The getData() function from CurrencyBuild is called to build the array of currency objects which will be used by all the apps components. 
It's set to build 30 currencies (for now) and holds proprieties such as rate, currency name, country flag ISO code, etc.



**-Currency Cards:**
```
    On initial render the EURO currency card is present by default.
    The selected card can be done by the drop down menu or by the blue select button present on each card
    Closing is done by pressing the red X button. 
    The buttons are disabled if the card is the selected one.
```

**-Input **
```
    The input component allows the selection of the primary currency card, complementary to the card select button.
    The number input value is set to never reach zero or below or higher that 9999999.  
```

**-Modal**
```
    The modal holds all the present loaded currencies that are not already present as cards.
    The add button is disabled if no currencies are selected.
    Each item is clickable and shows a checkmark if is selected.
    The modal closes on selecting outside of it or by pressing the "add currencies" button. 

```
