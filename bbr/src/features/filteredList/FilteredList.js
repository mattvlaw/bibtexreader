import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, IconButton, Button } from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
import { setDisplayEntryId, updateEntry } from '../entries/entrySlice';
import { selectList } from './filterSlice';
import CloseIcon from '@material-ui/icons/Close';

export function FilteredList(props){
    const listEntries = useSelector(selectList(props.list));
    const dispatch = useDispatch();
    console.log("HELHLEHL", listEntries);
    return <div>
        <Typography variant="h5" color="inherit">{props.listName}</Typography>
        <Typography variant="subtitle1" color="inherit" align="left" style={{"marginLeft":"10px"}}>{listEntries.length} Entries:</Typography>
        <List>
            {listEntries.map((entry,i) => <ListItem 
                                            key={i}
                                          >
                                              <Button
                                                onClick={() => {
                                                    console.log("dispatching");
                                                    dispatch(setDisplayEntryId(entry.ID));
                                                }}
                                              >
                                                {entry.ID}
                                              </Button>
                                                
                                                {props.listName && <IconButton
                                                    onClick = {() => dispatch(updateEntry(entry.ID,'unsorted', null))}
                                                                    >
                                                                        <CloseIcon />
                                                                    </IconButton>}
                                            </ListItem>)}
        </List>
    </div>
}