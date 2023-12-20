import React from 'react';
import CardContent from '@mui/material/CardContent';
import { Alert, Box } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface CardData {
  id: number;
  title: string;
  columns: GridColDef[] | null;
  row: any[] | null;
  service: string;
}

interface HomeCardProps {
  selectedCard: CardData | null;
  filteredData: CardData[];
  filterData: any[];
  data: any[];
}

const HomeCard: React.FC<HomeCardProps> = ({ selectedCard, filteredData, filterData, data }) => {
  const displayedCard = selectedCard ? filteredData.find((card) => card.title === selectedCard.title) : null;
  
  // Determine whether to use filterData or displayedCard data
  const rowsToDisplay = filterData.length > 0 ? filterData : (displayedCard ? displayedCard.row || [] : []);

  return (
    <>
      {displayedCard && (
        <Card key={displayedCard.id} sx={{ marginBottom: '3em', height: displayedCard.row ? 'auto' : '25rem' }}>
          <Box
            sx={{
              py: 4,
              pl: 5,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: '#9155FD',
              color: '#fff',
            }}
          >
            {displayedCard.title}
          </Box>

          <CardContent sx={{ p: (theme) => `${theme.spacing(3, 5.25, 4)} !important` }}>
            <Typography sx={{ mb: 2 }}>
              <Box>
                {displayedCard.columns != null || rowsToDisplay.length > 0 ? (
                  <>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <DataGrid autoHeight columns={displayedCard.columns || []} hideFooter rows={rowsToDisplay} />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Alert
                    severity="info"
                    sx={{
                      color: '#fc584c',
                      background: '#ffe9e8',
                      '& .MuiAlert-icon': {
                        display: 'none',
                      },
                    }}
                  >
                    {displayedCard.service}
                  </Alert>
                )}
              </Box>
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HomeCard;
