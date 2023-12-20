import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { MassSendingTypes } from 'src/types/apps/userTypes'
import { Card, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import Loading from 'src/components/Loading'

interface CellType {
  row: MassSendingTypes
}

interface UserListProps {
  filteredData: MassSendingTypes[]
  data: MassSendingTypes[]
}

const MassSending: React.FC<UserListProps> = ({ filteredData, data, loading }) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [data])

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 150,
      field: 'ClientId',
      headerName: 'ClientId',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.ClientId}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Surname',
      headerName: 'Surname',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Surname}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Private',
      headerName: 'Private',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Private}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'Street',
      headerName: 'Street',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Street}
          </Typography>
        )
      }
    },
    {
        flex: 0.1,
        minWidth: 150,
        field: 'Common',
        headerName: 'Common',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Common}
            </Typography>
          )
        }
      },{
        flex: 0.1,
        minWidth: 150,
        field: 'PostalCode',
        headerName: 'Postal Code',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.PostalCode}
            </Typography>
          )
        }
      },{
        flex: 0.1,
        minWidth: 150,
        field: 'Province',
        headerName: 'Province',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Province}
            </Typography>
          )
        }
      },{
        flex: 0.1,
        minWidth: 150,
        field: 'CustomerStatus',
        headerName: 'Customer Status',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.CustomerStatus}
            </Typography>
          )
        }
      },{
        flex: 0.1,
        minWidth: 150,
        field: 'Profile',
        headerName: 'Profile',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Profile}
            </Typography>
          )
        }
      },{
        flex: 0.1,
        minWidth: 150,
        field: 'Guy',
        headerName: 'Guy',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Guy}
            </Typography>
          )
        }
      },{
        flex: 0.1,
        minWidth: 150,
        field: 'Billing',
        headerName: 'Billing',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Billing}
            </Typography>
          )
        }
      }, 
      {
        flex: 0.1,
        minWidth: 150,
        field: 'APName',
        headerName: 'APName',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.APName}
            </Typography>
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 150,
        field: 'ServiceStatus',
        headerName: 'ServiceStatus',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.ServiceStatus}
            </Typography>
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 150,
        field: 'App',
        headerName: 'App',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.App}
            </Typography>
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 150,
        field: 'Cell',
        headerName: 'Cell',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Cell}
            </Typography>
          )
        }
      },
  
  ]

  function getRowId(row: any) {
    return uuidv4()
  }

  return (
    <>
      <Grid container spacing={6} sx={{ marginTop: '0.4em' }}>
        <Grid item xs={12}>
          <Card>
            {loading || !isLoaded ? (
              <Loading />
            ) : (
              <DataGrid
                autoHeight
                columns={columns}
                checkboxSelection
                pageSizeOptions={[7, 10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                getRowId={getRowId}
                rows={filteredData.length ? filteredData : data}
              />
            )}
          </Card>
        </Grid>
      </Grid>{' '}
    </>
  )
}

export default MassSending
