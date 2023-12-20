// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { SelectChangeEvent } from '@mui/material/Select'
import Icon from 'src/@core/components/icon'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { PartnerType } from 'src/types/apps/userTypes'
import { rows } from 'src/@fake-db/partner-data'
import Push from './Push'


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
  const [data] = useState<PartnerType[]>(rows)
  const [show, setShow] = useState<boolean>(false)
  const [show1, setShow1] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)

  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<PartnerType[]>([])


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


  return (
    <Box sx={{ pt: 1, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow(true)}>
            E-mail
          </Button>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow1(true)}>
            Push
          </Button>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow2(true)}>
           SMS
          </Button>
        
        </Box>
        <QuickSearchToolbar
          value={searchText}
          clearSearch={() => handleSearch('')}
          onChange={event => handleSearch(event.target.value)}
        />
      </Box>

      <Push setShow={setShow}  filteredData={filteredData} data={data} />
    </Box>
  )
}

export default index
