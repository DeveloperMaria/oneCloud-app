import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { NetMapType } from 'src/types/apps/userTypes'
import NetMapList from './NetMapList'
import {  FormControl, InputLabel, MenuItem } from '@mui/material'
import DialogBox from 'src/components/DialogBox'
import { addNetMap, getAllNetMap, updateNetMap } from './api'
import toast from 'react-hot-toast'


const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const index = () => {
  // ** States
  const [data, setData] = useState<NetMapType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<NetMapType[]>([])
  const [title, setTitle] = useState('Add New NetMap') 
  const [svlanId, setSvlanId] = useState<string>('')
  const [clli, setClli] = useState<string>('')
  const [svlanCode, setSvlanCode] = useState<string>('')
  const [service, setService] = useState<string>('')
  const [startFrom, setStartFrom] = useState<number>()
  const [netMapId, setNetMapId] = useState<string | null>(null)
  const [isSvlanIdDisabled, setIsSvlanIdDisabled] =useState<boolean>(false);



  const handleSvlanId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSvlanId(e.target.value);
  }; 
  const handleClli = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClli(e.target.value);
  };
  const handleSvlanCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSvlanCode(e.target.value);
  };
  const handleService = (e: React.ChangeEvent<{ value: unknown }>) => {
    setService(e.target.value as string);
  };
  
  const handleStartFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setStartFrom(isNaN(value) ? undefined : value);
  };
  


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
    if ('') {
      setShow(true)
    }
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
  
      let newNetMap = {
        svlanId,
        clli,
        svlanCode,
        service,
        startFrom
      };
  
  
      if (netMapId) {
        const updatedNetMap = await updateNetMap(netMapId, newNetMap);
        setIsSvlanIdDisabled(true);
        setData(prevData =>
          prevData.map(netMap => (netMap.id === updatedNetMap.id ? updatedNetMap : netMap))
        );
  
        toast.success('NetMap updated successfully');
      } else {
        const addedUser = await addNetMap(newNetMap);
        setData(prevData => [...prevData, addedUser]);
  
        toast.success('NetMap added successfully');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)    } finally {
      setSvlanId('')
      setSvlanCode('')
      setService('')
      setStartFrom(undefined)
      setClli('')
      setIsSvlanIdDisabled(false);
      setNetMapId(null)
      setShow(false)
      setTitle('Add New NetMap')
    }
  };
  
  const handleCloseDialog = () => {
    if (!setNetMapId) {
      setShow(false)
    } else {
      setSvlanId('')
      setSvlanCode('')
      setService('')
      setStartFrom(undefined)
      setClli('')
      setIsSvlanIdDisabled(false);
      setNetMapId(null)
      setShow(false)
      setTitle('Add New NetMap')
    }
  }

  const handleEdit = (netMap: NetMapType) => {
    setSvlanId(netMap.svlanId)
    setSvlanCode(netMap.svlanCode)
    setService(netMap.service)
    setStartFrom(netMap.startFrom)
    setClli(netMap.clli)
    setNetMapId(netMap.id)
    setShow(true)
    setIsSvlanIdDisabled(true);
    setTitle('Update NetMap')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllNetMap()
        setData(allData)
      } catch (error) {
        console.error('Error fetching NetMap:', error)
      }
    }

    fetchData()
  }, [])


  return (
    <Box sx={{ pt: 2, pl: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => setShow(true)}>
            Add NetMap
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
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        title={title}
      >
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='SVLanId'  value={svlanId}  disabled={isSvlanIdDisabled} onChange={handleSvlanId}/>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='CLLI' value={clli} onChange={handleClli}  />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='SVLanCode' value={svlanCode} onChange={handleSvlanCode}  />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField type='number' fullWidth label='StartFrom' value={startFrom} onChange={handleStartFrom}  />
            </Grid>
            <Grid item sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='service-select'>Service</InputLabel>
                <Select
                  fullWidth
                  label='Service'
                  value={service}
                  onChange={handleService}
                  labelId='service-select'
 
                >
                  <MenuItem value='ADSL'>ADSL</MenuItem>
                  <MenuItem value='FIBER'>FIBER</MenuItem>
                </Select>
              </FormControl>
            </Grid>

           
          </Grid>
   
      </DialogBox>

 

      <NetMapList handleEdit={handleEdit} setData={setData}  filteredData={filteredData} data={data} />
    </Box>
  )
}

export default index
