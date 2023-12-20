import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import Select from '@mui/material/Select'
import { MassSendingTypes } from 'src/types/apps/userTypes'
import DialogBox from 'src/components/DialogBox'
import { getAllUser } from './api'

import MassSending from './MassSending'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const index = () => {
  // ** States
  const [data, setData] = useState<MassSendingTypes[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<MassSendingTypes[]>([])
  const [partner, setPartner] = useState<string>('')
  const [title, setTitle] = useState('Add Filter')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setFirstName] = useState<string>('')
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllUser()
        console.log('allData', allData)
        setData(allData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleButtonClick = () => {
    setShow(true)
    if (!userId) {
      setShow(true)
    }
  }

  const handleSubmit = () => {}

  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }}>
            Next
          </Button>
          <Button variant='contained' onClick={() => setShow(true)}>
            Empty Filter
          </Button>
        </Box>
      </Box>

      <DialogBox
        open={show}
        onClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title={title}
      >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='First Name' value={name} onChange={e => setFirstName(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Email' value={email} onChange={e => setEmail(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField fullWidth label='Password' value={password} onChange={e => setPassword(e.target.value)} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id='partner-select'>Partner</InputLabel>
              <Select
                fullWidth
                label='Partner'
                value={partner}
                onChange={e => setPartner(e.target.value)}
                labelId='partner-select'
              >
                <MenuItem value='One Cloud'>One Cloud</MenuItem>
                <MenuItem value='One Cloud Digital LTD'>One Cloud Digital LTD</MenuItem>
                <MenuItem value='Televoip'>Televoip</MenuItem>
                <MenuItem value='Voiped Wholesale BV'>Voiped Wholesale BV</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogBox>

      <MassSending setData={setData} loading={loading}  filteredData={filteredData} data={data} />
    </Box>
  )
}

export default index
