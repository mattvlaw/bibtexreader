import React from 'react';
import logo from './logo.svg';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FilteredList } from './features/filteredList/FilteredList';
import { EntryDialog } from './features/entries/EntryDialog';
import {Counter} from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Typography variant="h3" component="h3">BibtexReader</Typography> */}
      </header>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <FilteredList listName="Included" list="included" />
        </Grid>
        <Grid item xs={6}>
          <EntryDialog />
          <FilteredList listName="" list="unsorted" />
        </Grid>
        <Grid item xs={3}>
        <FilteredList listName="Excluded" list="excluded" />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
