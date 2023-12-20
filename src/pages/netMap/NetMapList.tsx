import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {  GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { NetMapType } from 'src/types/apps/userTypes'
import CommonList from 'src/components/CommonList'
import { deleteNetMap } from './api'
import toast from 'react-hot-toast'


interface CellType {
  row: NetMapType
}

interface NetMapProps {
  handleEdit: (netMap: NetMapType) => void
  setData: React.Dispatch<React.SetStateAction<NetMapType[]>>
  filteredData: NetMapType[] 
  data: NetMapType[] 
}


const NetMapList: React.FC<NetMapProps> = ({ handleEdit,setData, filteredData, data }) => {

  const handleDelete = async (netMapId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this NetMap?')
    if (confirmDelete) {
      try {
        await deleteNetMap(netMapId)
        setData(prevData => prevData.filter(user => user.id !== netMapId))

        toast.success('NetMap deleted successfully')
      } catch (error) {
        toast.error('Error deleting netMap')
      }
    } else {
      window.alert('Deletion canceled')
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 200,
      field: 'svlanId',
      headerName: 'SVLanId',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.svlanId}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'clli',
      headerName: 'CLLI',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.clli}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'svlanCode',
      headerName: 'SVLanCode',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.svlanCode}
          </Typography>
        )
      }
    },
    {
        flex: 0.1,
        minWidth: 150,
        field: 'service',
        headerName: 'Typology',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.service}
            </Typography>
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 150,
        field: 'startFrom',
        headerName: 'StartFrom',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography variant='body2' noWrap>
              {row.startFrom}
            </Typography>
          )
        }
      },
   

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'status',
      headerName: '',
      renderCell:({ row }: CellType) => (
        <>
          <IconButton
            onClick={() => {
              handleEdit(row)
            }}
          >
            <Icon icon='mdi:edit-outline' />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </>
      )
    }
  ]

  return (
    <CommonList
    filteredData={filteredData}
    data={data}
    columns={columns}
  />
  )
}

export default NetMapList
