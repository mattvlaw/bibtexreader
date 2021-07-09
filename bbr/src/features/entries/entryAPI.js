export const bibtexURL = 'http://localhost:5000/'

export function fetchEntry(key) {
  return  fetch(bibtexURL + 'entry/' + key)
  .then(response => response.json());
}

export function fetchEntries() {
  return  fetch(bibtexURL + 'entries')
  .then(response => response.json());
}