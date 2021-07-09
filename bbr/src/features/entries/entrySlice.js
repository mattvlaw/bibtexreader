import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEntry, fetchEntries } from './entryAPI.js';

// export const populateEntries = createAsyncThunk(
//     'entries/fetchEntries',
//     async (dispatch) => {
//       const response = await fetchEntries();
//       // The value we return becomes the `fulfilled` action payload
//       return dispatch(response);
//     }
//   );

export const displayEntryIdSlice = createSlice({
  name: 'displayEntryId',
  initialState: null,
  reducers: {
    setDisplayEntryId: (state, action) => action.payload,
  }
});


// export const entrySlice = createSlice({
//     name: 'displayEntry',
//     initialState: {
//         title: "Paper Title",
//         author: "An Author",
//         abstract: "This is an abstract",
//         journal: "A Journal",
//         year: "2021",
//         ID: "",
//     },
//     reducers: {
//         setDisplayEntry: (state, action) => {
//             state.title=action.payload.title;
//             state.author=action.payload.author;
//             state.abstract=action.payload.abstract;
//             state.journal=action.payload.journal;
//             state.year=action.payload.year;
//             state.ID = action.payload.ID;
//         }
//     },

// });


export const entriesSlice = createSlice({
    name: 'entries',
    initialState: [],
    reducers: {
        setEntries: (state, action) => action.payload,
        setEntry: (state, action) => {
            let updateIndex = state.findIndex(e => e.ID === action.payload.ID);
            if (updateIndex > -1) {
                state[updateIndex] = action.payload;
            }
        },
        setEntryNotes: (state, action) => {
            let updateIndex = state.findIndex(e => e.ID === action.payload.ID);
            if (updateIndex > -1) {
                state[updateIndex].notes = action.payload.notes;
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(populateEntries.pending, (state) => {
    //         state.status = 'fetching';
    //     })
    //     .addCase(populateEntries.fulfilled, (state, action) => {
    //         state.status = 'idle';
    //         state.entries = action.payload;
    //     });
    // }

});

export const selectEntryId = (state) => state.displayEntryId;
export const selectEntryById = id => state => state.entries.find(e => e.ID === id);
export const selectNextUnsorted = (state) => {
    return state.entries.find(e => e.list === "unsorted");
}
export const selectEntryByIdOrNextUnsorted = id => state => {
  if(id!=null) {
    return selectEntryById(id)(state);
  }
  else{
    return selectNextUnsorted(state);
  }
};  



export const {setDisplayEntryId} = displayEntryIdSlice.actions;

export const {setEntries, setEntry, setEntryNotes} = entriesSlice.actions;

export const displayEntryIdReducer = displayEntryIdSlice.reducer;
export const entriesReducer = entriesSlice.reducer;


// Asynchronous thunk action
export function populateEntries() {
    return async dispatch => {
  
      try {
        const response = await fetch('http://localhost:5000/entries')
        const data = await response.json()
  
        dispatch(setEntries(data))
      } catch (error) {
        console.log("problem");
      }
    }
  }

export function updateEntryNotes(id, notes) {
  //update the note in the entry locally so we are not sending
  //a request to the server on each change
  return dispatch => {
    dispatch(setEntryNotes({ID:id, notes:notes}));
  }

}


export function updateEntry(id, list, notes) {
    return async dispatch => {
      const updates = {};
      if(list){
        updates.list = list;
      }
      if(notes){
        updates.notes = notes;
      }
      try {
        const response = await fetch('http://localhost:5000/entry/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updates)
        })
        const data = await response.json()
        dispatch(setEntry(data));
        dispatch(setDisplayEntryId(null));
      } catch (error) {
        console.log("problem");
      }
    }
  } 