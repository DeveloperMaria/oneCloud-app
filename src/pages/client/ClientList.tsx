import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { ClientType } from 'src/types/apps/userTypes'
import CustomChip from 'src/@core/components/mui/chip'
import CommonList from 'src/components/CommonList'
import { deleteClient } from './api'
import toast from 'react-hot-toast'
import { ThemeColor } from 'src/@core/layouts/types'
import { statusOptions } from 'src/@fake-db/clientData'

interface CellType {
  row: ClientType
}

interface UserListProps {
  handleEdit: (passive: ClientType) => void
  setData: React.Dispatch<React.SetStateAction<ClientType[]>>
  filteredData: ClientType[]
  data: ClientType[]
}

interface StatusOption {
  id: number;
  status: string;
  color: ThemeColor; // Assuming ThemeColor is a type for color strings like 'primary', 'success', etc.
}

const statusObj: StatusObj = {};

statusOptions.forEach((statusItem: StatusOption) => {
  const { status, color } = statusItem;
  statusObj[status] = { title: status, color };
});

const ClientList: React.FC<UserListProps> = ({ handleEdit, setData, filteredData, data }) => {
  const handleDelete = async (clietId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Client?')
    if (confirmDelete) {
      try {
        await deleteClient(clietId)
        setData(prevData => prevData.filter(client => client.id !== clietId))

        toast.success('Client deleted successfully')
      } catch (error) {
        toast.error('Error deleting client')
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
        return <Typography variant='body2'>{row.id}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'surname',
      headerName: 'Name',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.surname}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'street',
      headerName: 'Address',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.street}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'city',
      headerName: 'City',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.province}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'serviceToBeActivate',
      headerName: 'Services To Be Activated',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.serviceToBeActivate}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'activateService',
      headerName: 'Active Services',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.activateService}
          </Typography>
        )
      }
    },

    {
      flex: 0.2,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        const statusLabel = row.status;
        const status = statusObj[statusLabel];
        const color = status ? status.color : 'defaultColor';
        return (
          <CustomChip
            size='small'
            skin='light'
            color={color}
            label={status ? status.title : statusLabel}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      sortable: false,
      field: 'actions',
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

  return (
    <CommonList
      handleEdit={handleEdit}
      onDelete={handleDelete}
      setData={setData}
      filteredData={filteredData}
      data={data}
      columns={columns}
    />
  )
}

export default ClientList
