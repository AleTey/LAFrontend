export const useOrderAmountPerSize = (amountPerSize) => {

  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const orderKeys = Object.keys(amountPerSize)
    .filter(key => sizes.includes(key))
    .sort((a, b) => sizes.indexOf(a) - sizes.indexOf(b));

  const orderedAmountPerSize = {};
  orderKeys.forEach(key => {
    orderedAmountPerSize[key] = amountPerSize[key]
  })

  return orderedAmountPerSize;

}