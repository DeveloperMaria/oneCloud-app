import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import UserList from './UserList';
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar';
import DialogBox from 'src/components/DialogBox';
import { useFormik } from 'formik';
import { userSchema } from 'src/schema';
import { getAllUser, addUser, updateUser } from './api';
import toast from 'react-hot-toast';
import { PermissionColumns } from 'src/components/UserPermissionColumn';
import { UsersType } from 'src/types/apps/userTypes';

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const index = () => {
  const [data, setData] = useState<UsersType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [show1, setShow1] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<UsersType[]>([])
  const [title, setTitle] = useState('Add New User')
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [resettingPassword, setResettingPassword] = useState<boolean>(false)




  const isEditMode = !!userId

  const resetFormFields = () => {
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      partner: '',
      active: false,
      role: 'admin'
    },
    validationSchema: userSchema,
    onSubmit: async () => {
      try {
        const newUserData = {
          email: formik.values.email,
          name: formik.values.name,
          partner: formik.values.partner,
          password: formik.values.password,
          role: 'admin',
          active: formik.values.active
        }

        if (userId) {
          const updatedUser = await updateUser(userId, newUserData)
          setData(prevData => prevData.map(user => (user.id === updatedUser.id ? updatedUser : user)))
          toast.success('User updated successfully')
        } else {
          const addedUser = await addUser(newUserData)
          setData(prevData => [...prevData, addedUser[0]])
          toast.success('User added successfully')
        }
        setShow(false)
        resetFormFields()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.error(errorMessage)
      }
    }
  })

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleEdit = (user: UsersType) => {
    setUserId(user.id)
    setTitle('Update User')
    setResettingPassword(isEditMode)

    formik.setValues({
      email: user.email,
      name: user.name,
      password: user.password,
      partner: user.partner,
      active: user.active,
      role: 'admin'
    })

    setShow(true)
  }

  const handleButtonClick = () => {
    if (!userId) {
      setShow(true)
    }
    
  }

  const handleCloseDialog = () => {
    if (!userId) {
      setShow(false)
      resetFormFields()
    } else {
      resetFormFields()
      setUserId(null)
      setShow(false)
      setTitle('Add New User')
    }
  }
 

  const handlePasswordReset = async () => {
    try {
      if (!userId) {
        toast.error('Cannot reset password for a new user.')
        return
      }
      setResettingPassword(true)
      formik.setFieldValue('password', '');
        } catch (error) {
      toast.error('Failed to reset password.')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllUser()
        setData(allData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  const handleSubmitFormik = (event: React.FormEvent) => {
    event.preventDefault()
    formik.handleSubmit()
  }

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow(true)}>
            Add User
          </Button>
          <Button variant='contained'  onClick={() => setShow1(true)}>
            Permissions
          </Button>
        </Box>
        <QuickSearchToolbar
          value={searchText}
          clearSearch={() => handleSearch('')}
          onChange={event => handleSearch(event.target.value)}
        />
      </Box>

      <DialogBox
        open={show}
        onClose={handleCloseDialog}
        handleSubmit={handleSubmitFormik}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth            
              label='First Name'
              name='name'
              id='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name='email'
              id='email'
              type='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          {isEditMode ? (
            <Grid item sm={6} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                name='password'
                id='password'
                type='password'
                label='Password'
                value={isEditMode && !resettingPassword ? '' : formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!resettingPassword}
                InputProps={{
                  endAdornment: !resettingPassword && (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onMouseDown={e => e.preventDefault()} onClick={handlePasswordReset}>
                        <Button>Reset</Button>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          ) : (
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name='password'
                id='password'
                type='password'
                label='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          )}

          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='partner-select'>Partner</InputLabel>
              <Select
                fullWidth
                name='partner'
                id='partner'
                label='Partner'
                value={formik.values.partner}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.partner && Boolean(formik.errors.partner)}
                helperText={formik.touched.partner && formik.errors.partner}
                labelId='partner-select'
              >
                <MenuItem value='One Cloud'>One Cloud</MenuItem>
                <MenuItem value='One Cloud Digital LTD'>One Cloud Digital LTD</MenuItem>
                <MenuItem value='Televoip'>Televoip</MenuItem>
                <MenuItem value='Voiped Wholesale BV'>Voiped Wholesale BV</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormGroup>
              <FormControlLabel
                label='active'
                control={
                  <Checkbox
                    name='active'
                    id='active'
                    checked={formik.values.active}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogBox>

      <PermissionColumns show1={show1} setShow1={setShow1} />

      <UserList setData={setData} loading={loading} onEdit={handleEdit} filteredData={filteredData} data={data} />
    </Box>
  )
}

export default index
