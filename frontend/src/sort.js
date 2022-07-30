function compare(a, b) {
  if (a.date < b.date) return -1;
  else if (a.date > b.date) return 1;
  return 0;
}

export function dateSort(objects) {
  objects.sort(compare);
}
