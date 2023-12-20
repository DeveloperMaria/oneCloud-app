import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Loading from './Loading';


interface CommonListProps {
  filteredData: any[]; 
  data: any[];
  columns: GridColDef[]; 
  loading: boolean;
  
}

const CommonList: React.FC<CommonListProps> = ({
  filteredData,
  data,
  columns,
  loading,
  getRowId
}) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000); 
  }, [data]);

  return (
    <Grid container spacing={6} sx={{ marginTop: '0.4em' }}>
      <Grid item xs={12}>
        <Card>
        {loading || !isLoaded ? (
            <Loading />
          ) : (
              <DataGrid
                autoHeight
                columns={columns}
                pageSizeOptions={[7, 10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                getRowId={getRowId}             
                rows={filteredData.length ? filteredData : data}
                disableColumnSelector
                 />
            )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CommonList;
