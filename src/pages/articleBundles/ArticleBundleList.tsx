import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { Alert, Box, Button } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Loading from 'src/components/Loading'
import { v4 as uuidv4 } from 'uuid'


interface ButtonConfig {
  label: string 
  onClick: () => void 
}

interface CardData {
  id: string
  title: string
  columns: GridColDef[] | null
  row: any[] | null
  service: string
  button: ButtonConfig | null
}

interface HomeCardProps {
  selectedCard: CardData | null
  loading: boolean;

}

const ArticleBundleList: React.FC<HomeCardProps> = ({ selectedCard ,loading }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)


  const handleButtonClick = () => {
    if (selectedCard && selectedCard.button && selectedCard.button.onClick) {
      selectedCard.button.onClick()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000); 
  }, [selectedCard,loading]);

  function getRowId(row: any) {
    return uuidv4()
  }

  return (
    <>
      {selectedCard && (
        <>
          {selectedCard && selectedCard.button && (
            <Button variant='contained' sx={{ marginBottom: '1em' }} onClick={handleButtonClick}>
              {selectedCard.button.label}
            </Button>
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
                          <DataGrid autoHeight columns={selectedCard.columns} rows={selectedCard.row} getRowId={getRowId}/>
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

export default ArticleBundleList
