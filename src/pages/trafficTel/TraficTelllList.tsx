import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import { TrafficTelTypes } from 'src/types/apps/userTypes'
import { Checkbox, FormControlLabel, FormGroup, ListItem } from '@mui/material'
import CommonList from 'src/components/CommonList'
import { v4 as uuidv4 } from 'uuid'

interface CellType {
  row: TrafficTelTypes
}

interface UserListProps {
  setData: React.Dispatch<React.SetStateAction<TrafficTelTypes[]>>
  filteredData: TrafficTelTypes[]
  data: TrafficTelTypes[]
}

const TraficTelllList: React.FC<UserListProps> = ({ filteredData, data, loading }) => {


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
      field: 'MorId',
      headerName: 'MorId',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.MorId}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 250,
      field: 'MorUsername',
      headerName: 'MorUsername',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.MorUsername}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'Customer',
      headerName: 'Customer',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Customer}
          </Typography>
        )
      }
    },
    {
        flex: 0.1,
        minWidth: 150,
        field: 'Note',
        headerName: 'Note',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Note}
            </Typography>
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 150,
        field: 'Traffic',
        headerName: 'Traffic',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.Traffic}
            </Typography>
          )
        }
      },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'TrafficCleared',
      headerName: 'Traffic Cleared',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel label={row.TrafficCleared} control={<Checkbox name='basic-unchecked' checked={row.TrafficCleared} />} />
          </FormGroup>
        )
      }
    },

    {
        flex: 0.1,
        minWidth: 110,
        field: 'Sales',
        headerName: 'Sales',
        renderCell: ({ row }: CellType) => {
          return (
            <FormGroup row>
              <FormControlLabel label={row.Sales} control={<Checkbox name='basic-unchecked' checked={row.Sales} />} />
            </FormGroup>
          )
        }
      },
  
  ]

  function getRowId(row: any) {
    return uuidv4()
  }

  return (
    <>
      <CommonList filteredData={filteredData} getRowId={getRowId} laoding={loading} data={data} columns={columns} />
    </>
  )
}

export default TraficTelllList
