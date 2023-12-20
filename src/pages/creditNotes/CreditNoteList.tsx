import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Loading from 'src/components/Loading'
import { v4 as uuidv4 } from 'uuid'

interface ButtonConfig {
  name1: string
  name2: string
  name3: string
  name4: string
  name5: string
  name6: string
  name7: string
  name8: string
}

interface CardData {
  id: string
  title: string
  columns: GridColDef[] | null
  row: any[] | null
  service: string
  dropDown: ButtonConfig | null
}

interface HomeCardProps {
  selectedCard: CardData | null
  loading: boolean
}

const CreditNoteList: React.FC<HomeCardProps> = ({ selectedCard, loading }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [dropDown, setDropDown] = useState<string>('') // Initialize state for dropdown value



  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [selectedCard, loading])

  function getRowId(row: any) {
    return uuidv4()
  }

  return (
    <>
      {selectedCard && (
        <>
          {selectedCard && selectedCard.dropDown && (
          <FormControl sx={{mb:5}}>
              <InputLabel id='generate-select'>Generate File</InputLabel>
              <Select
                fullWidth
                label='Generate File'
                value={dropDown}
                onChange={e => setDropDown(e.target.value as string)}
                labelId='generate-select'
              >
                {Object.values(selectedCard.dropDown).map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Card key={selectedCard.id} sx={{ marginBottom: '3em', height: selectedCard.row ? 'auto' : '25rem' }}>
            <Box
              sx={{
                py: 4,
                pl: 5,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: '#9155FD',
                color: '#fff'
              }}
            >
              {selectedCard.title}
            </Box>

            {!isLoaded ? (
              <Loading />
            ) : (
              <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                <Typography sx={{ mb: 2 }}>
                  <Box>
                    {selectedCard && selectedCard.columns && selectedCard.row && selectedCard.row.length > 0 ? (
                      <>
                        <Grid container spacing={6}>
                          <Grid item xs={12}>
                            <DataGrid
                              autoHeight
                              columns={selectedCard.columns}
                              rows={selectedCard.row}
                              getRowId={getRowId}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <Alert severity='info'>{selectedCard?.service || 'No data available'}</Alert>
                    )}
                  </Box>
                </Typography>
              </CardContent>
            )}
          </Card>
        </>
      )}
    </>
  )
}

export default CreditNoteList
