import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, TextField, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'; 
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { selectEntryId, selectEntryByIdOrNextUnsorted, updateEntry, updateEntryNotes } from './entrySlice';

export function EntryDialog(){
    const entryId = useSelector(selectEntryId);
    let entry;
    entry = useSelector(selectEntryByIdOrNextUnsorted(entryId));
    
    const dispatch = useDispatch();
    if(!entry){
        return <Typography variant="h2" color="inherit" align="center">Select an entry.</Typography>
    }
    else{
        console.log(entry);
        return <div height={600}>
            <Typography variant="subtitle2" color="inherit" align="center">Search String: {entry.query}</Typography>
            <Typography variant="h4" color="inherit" align="center">{entry.title}</Typography>
            <Typography variant="subtitle1" color="inherit" align="center">{entry.author}</Typography>
            <Typography variant="subtitle2" color="inherit" align="center">{entry.journal} {entry.year}</Typography>
            <Typography variant="subtitle2" color="inherit" align="center">{entry.keywords}</Typography>
            
            <div>
                <IconButton 
                    variant="extended"
                    onClick = {() => dispatch(updateEntry(entry.ID,'included', entry.notes))}
                >
                    <ArrowBackIosIcon /> Include
                </IconButton>
                <IconButton 
                    variant="extended"
                    onClick = {() => dispatch(updateEntry(entry.ID,'excluded', entry.notes))}
                >
                    Exclude <ArrowForwardIosIcon />
                </IconButton>
            </div>
            
            
            <Typography variant="body1" color="inherit" align="center">{entry.abstract}</Typography>
            <TextField
            id="outlined-textarea"
            label="Notes"
            value={entry.notes}
            onChange={(event) => dispatch(updateEntryNotes(entry.ID,event.target.value))}
            placeholder="Notes about this entry."
            multiline
            fullWidth
            variant="outlined"
            />
            
            
        </div>
    }
}