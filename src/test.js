const groupedCodes = [];
const displayedData = [];

const data = [{
    "code": "AFAIK",
        "price": 136.61
    },
    {
        "code": "AKA",
        "price": 102.66
    },
    {
        "code": "CAD",
        "price": 136.13
    },
    {
        "code": "GMAO",
        "price": 85.41
    },
    {
    "code": "AFAIK",
        "price": 136.61
    },
    {
    "code": "AKA",
    "price": 136.61
}];

// push to data array every 2 seconds
// pass groupedCodes as prop to Summary component
// displayedData is the data shown to the Log component if Pause is disabled, only append here if Pause is disabled


const result = data.reduce((acc, d) => {
  const found = acc.find(a => a.code === d.code);
  const price = { price: d.price }; // the element in data property
  if (!found) {
    acc.push({code: d.code, data: [price]}) // not found, so need to add data property
  }
  else {
    found.data.push(price) // if found, that means data property exists, so just push new element to found.data.
  }
  return acc;
}, []);

console.log(result);