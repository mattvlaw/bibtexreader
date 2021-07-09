// A mock function to mimic making an async request for data
export function fetchEntries(amount = 1) {
    fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
}

export function setInclusion(entryId){
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: true}), 500)
    )
}
  