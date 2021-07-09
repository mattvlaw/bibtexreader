import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEntries } from '../entries/entryAPI';


export const selectList = list => state => {
    return state.entries.filter(entry => entry.list === list);
}

