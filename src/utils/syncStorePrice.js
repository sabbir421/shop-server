const {
  getStoreByCountry,
  updateLuggagePrice,
} = require("../models/luggageModel");

exports.syncStorePrice = async (country, newPrice, newTax) => {
  const storeList = await getStoreByCountry(country);
  for (let store of storeList) {
    let price = (store.price = newPrice);
    let tax = (store.tax = newTax);

    // Save the updated store back to the database

    await updateLuggagePrice(country, price, tax );
    // console.log(store);
  }
};
