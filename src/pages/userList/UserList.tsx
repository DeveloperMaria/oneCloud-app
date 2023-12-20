import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { UsersType } from 'src/types/apps/userTypes'
import { Checkbox, FormControlLabel, FormGroup, ListItem } from '@mui/material'
import CommonList from 'src/components/CommonList'
import { deleteUser, getAllUser } from './api'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthContext'

interface CellType {
  row: UsersType
}

interface UserListProps {
  setData: React.Dispatch<React.SetStateAction<UsersType[]>>
  filteredData: UsersType[]
  data: UsersType[]
}

const UserList: React.FC<UserListProps> = ({ filteredData, data, setData, loading, onEdit }) => {
  
  const authContext = useContext(AuthContext); 
  
  const handleDelete = async (userId: string, ) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this User?');
  
    if (confirmDelete) {
      try {
        const users = await getAllUser(); 
  
        if (users.length === 1) {
          toast.error('Cannot delete the last user.');
          return;
        }

        const currentUser = users.find(user => user.id === userId);
  
        if (!currentUser) {
          toast.error('User not found.');
          return;
        }
  
        if (currentUser.email === 'admin@gmail.com') {
          toast.error('This user cannot be deleted.');
          return;
        }
  
        await deleteUser(userId); 
        setData(prevData => prevData.filter(user => user.id !== userId));
        toast.success('User deleted successfully');
  
        const storedUserData = window.localStorage.getItem('userData');
        const loggedInUser = storedUserData ? JSON.parse(storedUserData) : null;
        if (loggedInUser && loggedInUser.id === userId) {
          authContext.logout();
        }
      } catch (error) {
        toast.error('Error deleting user');
      }
    } else {
      window.alert('Deletion canceled');
    }
  };
  


  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 250,
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
      minWidth: 250,
      field: 'name',
      headerName: 'First Name',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 250,
      field: 'email',
      headerName: 'UserName',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='body2' noWrap>
            {row.email}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 150,
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
      minWidth: 110,
      field: 'active',
      headerName: 'Active',
      renderCell: ({ row }: CellType) => {
        return (
          <FormGroup row>
            <FormControlLabel label={row.active} control={<Checkbox name='basic-unchecked' checked={row.active}/>} />
          </FormGroup>
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
              onEdit(row)
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

  return (
    <>
      <CommonList filteredData={filteredData} getRowId={getRowId} laoding={loading} data={data} columns={columns} />
    </>
  )
}

export default UserList
