import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { TicketTypes } from 'src/types/apps/userTypes'
import CommonList from 'src/components/CommonList'
import { deleteTicket } from './api'
import toast from 'react-hot-toast'

interface CellType {
  row: TicketTypes
}

interface UserListProps {
  handleEdit: (ticket: TicketTypes) => void
  setData: React.Dispatch<React.SetStateAction<TicketTypes[]>>
  filteredData: TicketTypes[]
  data: TicketTypes[]
}

const TicketList: React.FC<UserListProps> = ({ handleEdit, setData, filteredData, data }) => {
  const handleDelete = async (ticketId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Ticket?')
    if (confirmDelete) {
      try {
        await deleteTicket(ticketId)
        setData(prevData => prevData.filter(ticket => ticket.id !== ticketId))

        toast.success('Ticket deleted successfully')
      } catch (error) {
        toast.error('Error deleting ticket')
      }
    } else {
      window.alert('Deletion canceled')
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 130,
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
      minWidth: 100,
      field: 'state',
      headerName: 'State',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.state}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'priority',
      headerName: 'Priority',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.priority}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'customer',
      headerName: 'Customer',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.customer}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'creation',
      headerName: 'Creation',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.creation}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'lastUpdate',
      headerName: 'Last Update',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.lastUpdate}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'closure',
      headerName: 'Closure',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.closure}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'service',
      headerName: 'Service',
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
      minWidth: 100,
      field: 'ticketType',
      headerName: 'Ticket Type',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.ticketType}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'brokenDown',
      headerName: 'Broken Down',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.brokenDown}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'description',
      headerName: 'Description',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.description}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'partner',
      headerName: 'Partner',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.partner}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'takingCharge',
      headerName: 'Taking Charge',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.takingCharge}
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

export default TicketList
