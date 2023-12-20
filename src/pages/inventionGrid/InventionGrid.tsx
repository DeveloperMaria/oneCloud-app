import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { InvensionGridType } from 'src/types/apps/userTypes'
import CommonList from 'src/components/CommonList'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { deleteInvention } from './api'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

interface CellType {
  row: InvensionGridType
}

interface PassiveProps {
  handleEdit: (passive: InvensionGridType) => void
  setData: React.Dispatch<React.SetStateAction<InvensionGridType[]>>
  filteredData: InvensionGridType[]
  data: InvensionGridType[]
}

const InventionGrid: React.FC<PassiveProps> = ({ handleEdit, setData,loading, filteredData, data }) => {

 
  const handleDelete = async (passiveId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Technical Invention?')
    if (confirmDelete) {
      try {
        await deleteInvention(passiveId)
        setData(prevData => prevData.filter(passive => passive.id !== passiveId))

        toast.success('Technical Invention deleted successfully')
      } catch (error) {
        toast.error('Error deleting Technical Invention')
      }
    } else {
      window.alert('Deletion canceled')
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.id}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Supervisor',
      headerName: 'Supervisor',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Supervisor}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 120,
      field: 'Technician',
      headerName: 'Technician',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Technician}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'AppointmentDate',
      headerName: 'AppointmentDate',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.AppointmentDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'AppointmentDuration',
      headerName: 'AppointmentDuration',
      renderCell: ({ row }: CellType) => {
        return <Typography noWrap>{row.AppointmentDuration}</Typography>
      }
    },

    {
      flex: 0.1,
      minWidth: 120,
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
      minWidth: 120,
      field: 'Service',
      headerName: 'Service',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Service}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'Priority',
      headerName: 'Priority',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Priority}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'Contacts',
      headerName: 'Contacts',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Contacts}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'Address',
      headerName: 'Address',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Address}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: 'EstimatedPrice',
      headerName: 'EstimatedPrice',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.EstimatedPrice}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 140,
      field: 'NotifyCustomer',
      headerName: 'NotifyCustomer',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel
              label={row.NotifyCustomer}
              control={<Checkbox name='basic-unchecked' checked={row.NotifyCustomer} />}
            />
          </FormGroup>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
      field: 'Reminder',
      headerName: 'Reminder',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.Reminder}
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
      renderCell: ({ row }: CellType) => (
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

  function getRowId(row: any) {
    return uuidv4()
  }

  return <CommonList filteredData={filteredData} getRowId={getRowId} laoding={loading} data={data} columns={columns} />
}

export default InventionGrid
