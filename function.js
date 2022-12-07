function sum(max) {
  let total = 0;
  for (let i = 1; i <= max; i++) {
    total += i;
  }
  return total;
}

console.log(sum(6));
