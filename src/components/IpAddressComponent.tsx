import React, { useEffect } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import toast from 'react-hot-toast'
import { addIPList, updateIPList } from 'src/pages/ipManagement/api'
import DialogBox from './DialogBox'
import { useFormik } from 'formik'
import { ipAddressSchema } from 'src/schema'

const IpAddressComponent = ({ setIpListData, IPId, setIPId, setShow1, setTitle, show1, title, formik }) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { description, startIp, network, startIp1, reservedIps, active } = formik.values;
  
      const newPartnerData = {
        description,
        startIp,
        network,
        startIp1,
        reservedIps,
        active
      };
  
      if (IPId) {
        const updateiP = await updateIPList(IPId, newPartnerData);
        const updatedData = updateiP.data;
        setIpListData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)));
  
        toast.success('IP List updated successfully');
      } else {
        const addedPartner = await addIPList(newPartnerData);
        setIpListData(prevData => [...prevData, addedPartner.data]);
  
        toast.success('IP List added successfully');
      }
      setShow1(false);
      resetFormFields();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow1(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow1(false)
      setTitle('Add New IP List')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow1(true)
    }
  }



  return (
    <DialogBox
      open={show1}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Description'
            name='description'
            id='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='start-select'>Start IP</InputLabel>
            <Select
              fullWidth
              label='Start Ip'
              name='startIp'
              id='startIp'
              value={formik.values.startIp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startIp && Boolean(formik.errors.startIp)}
              labelId='start-select'
            >
              <MenuItem value='Dynamic Customer Ips'>Dynamic Customer Ips</MenuItem>
              <MenuItem value='Static Client Ips'>Static Client Ips</MenuItem>
              <MenuItem value='IP CPE'>IP CPE</MenuItem>
              <MenuItem value='IP AP'>IP AP</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Net / mask'
            name='network'
            id='network'
            value={formik.values.network}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.network && Boolean(formik.errors.network)}
            helperText={formik.touched.network && formik.errors.network}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Start IP'
            name='startIp1'
            id='startIp1'
            value={formik.values.startIp1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.startIp1 && Boolean(formik.errors.startIp1)}
            helperText={formik.touched.startIp1 && formik.errors.startIp1}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Reserved IPs'
            name='reservedIps'
            id='reservedIps'
            value={formik.values.reservedIps}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.reservedIps && Boolean(formik.errors.reservedIps)}
            helperText={formik.touched.reservedIps && formik.errors.reservedIps}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormGroup row>
            <FormControlLabel
              label='Active'
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
  )
}

export default IpAddressComponent
