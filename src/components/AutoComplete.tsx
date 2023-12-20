import { Autocomplete, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const AutoComplete = ({ onChange, selectedOption, cardData,dataService,serviceOption ,handleServiceChange}) => {
  return (
    <>
        
        <Autocomplete
          autoHighlight
          id='add-members'
          options={cardData}
          getOptionLabel={option => option.title || ''}
          disableClearable
          renderInput={params => <TextField {...params} size='small' sx={{ width: '300px' }} />}
          value={selectedOption}
          onChange={onChange}
        />
    </>
  )
}

export default AutoComplete
