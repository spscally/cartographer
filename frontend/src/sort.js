function dateCompare(a, b) {
  if (a.date < b.date) return -1;
  else if (a.date > b.date) return 1;
  return 0;
}

export function dateSort(objects) {
  objects.sort(dateCompare);
}

function ddcCompare(a, b) {
  if (a.ddc < b.ddc) return -1;
  else if (a.ddc > b.ddc) return 1;
  return 0;
}

export function ddcSort(objects) {
  objects.sort(ddcCompare);
}
