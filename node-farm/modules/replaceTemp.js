export function replaceTemp(temp, el) {
  let output = temp;
  output = output.replaceAll('{%IMAGE%}', el.image);
  output = output.replaceAll('{%PRODUCTNAME%}', el.productName);
  output = output.replaceAll('{%QUANTITY%}', el.quantity);
  output = output.replaceAll('{%PRICE%}', el.price);
  output = output.replaceAll('{%ID%}', el.id);
  output = output.replaceAll('{%DESCRIPTION%}', el.description);
  output = output.replaceAll('{%FROM%}', el.from);
  output = output.replaceAll('{%NUTRIENTS%}', el.nutrients);
  if (el.organic) output = output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');

  return output;
}
