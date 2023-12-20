import Typography from '@mui/material/Typography'
import { DataGrid} from '@mui/x-data-grid'
import { TelevoipTypes } from 'src/types/apps/userTypes'
import { Alert, Card, CardContent, Grid } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import Loading from 'src/components/Loading'




interface UserListProps {
    setTelevoipData: React.Dispatch<React.SetStateAction<TelevoipTypes[]>>
  filteredData: TelevoipTypes[]
  data: TelevoipTypes[]
}

const ItemInvoicedList: React.FC<UserListProps> = ({ selectedCard, loading }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)


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
                          <DataGrid autoHeight checkboxSelection columns={selectedCard.columns} rows={selectedCard.row} getRowId={getRowId}/>
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

export default ItemInvoicedList
