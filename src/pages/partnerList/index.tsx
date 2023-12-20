import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material'
import QuickSearchToolbar from 'src/views/data-grid/QuickSearchToolbar'
import { PartnerType } from 'src/types/apps/userTypes'
import PartnerList from './PartnerList'
import { getAllPartners, addPartner, updatePartner } from './api'
import toast from 'react-hot-toast'
import DialogBox from 'src/components/DialogBox'
import { partnerSchema } from 'src/schema'
import { useFormik } from 'formik'


const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Index: React.FC = () => {
  const [data, setData] = useState<PartnerType[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<PartnerType[]>([])
  const [title, setTitle] = useState<string>('Add New Partner')
  const [partnerId, setPartnerId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

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

  const resetFormFields = () => {
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      businessName: '',
      contactSurname: '',
      contactName: '',
      landlineTel: '',
      telMobile: '',
      code: '',
      active: false
    },
    validationSchema: partnerSchema,
    onSubmit: async values => {
      try {
        const { landlineTel, telMobile, code, active } = values

        let newPartnerData = {
          businessName: values.businessName,
          contactSurname: values.contactSurname,
          contactName: values.contactName,
          landlineTel: parseInt(landlineTel, 10),
          telMobile: parseInt(telMobile, 10),
          code: code.toUpperCase(),
          active
        }

        if (partnerId) {
          const updatedPartner = await updatePartner(partnerId, newPartnerData)

          setData(prevData => prevData.map(partner => (partner.id === updatedPartner.id ? updatedPartner : partner)))

          toast.success('Partner updated successfully')
        } else {
          const addedPartner = await addPartner(newPartnerData)
          setData(prevData => [...prevData, addedPartner])

          toast.success('Partner added successfully')
        }
        setShow(false)
        resetFormFields()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.error(errorMessage)
      }
    }
  })

  const handleEditPartner = (partner: PartnerType) => {
    formik.setValues({
      businessName: partner.businessName,
      contactSurname: partner.contactSurname,
      contactName: partner.contactName,
      landlineTel: partner.landlineTel,
      telMobile: partner.telMobile,
      code: partner.code,
      active: partner.active
    })
    setPartnerId(partner.id)
    setShow(true)
    setTitle('Update Partner')
  }

  const handleCloseDialog = () => {
    partnerId ? resetFormFields() : setShow(false);
    resetFormFields();
    setPartnerId(partnerId ? null : partnerId);
    setShow(false);
  };

  const handleButtonClick = () => {
    !partnerId && setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPartners()
        setData(allData)
      } catch (error) {
        console.error('Error fetching partners:', error)
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
            Add Partner
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
              label='Business name'
              name='businessName'
              id='businessName'
              value={formik.values.businessName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.businessName && Boolean(formik.errors.businessName)}
              helperText={formik.touched.businessName && formik.errors.businessName}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label='Contact Surname'
              name='contactSurname'
              id='contactSurname'
              value={formik.values.contactSurname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactSurname && Boolean(formik.errors.contactSurname)}
              helperText={formik.touched.contactSurname && formik.errors.contactSurname}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label='Contact Name'
              name='contactName'
              id='contactName'
              value={formik.values.contactName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactName && Boolean(formik.errors.contactName)}
              helperText={formik.touched.contactName && formik.errors.contactName}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Landline Tel'
              name='landlineTel'
              id='landlineTel'
              value={formik.values.landlineTel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.landlineTel && Boolean(formik.errors.landlineTel)}
              helperText={formik.touched.landlineTel && formik.errors.landlineTel}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Tel Mobile'
              name='telMobile'
              id='telMobile'
              value={formik.values.telMobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.telMobile && Boolean(formik.errors.telMobile)}
              helperText={formik.touched.telMobile && formik.errors.telMobile}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              inputProps={{ maxLength: 3 }}
              label='Code (3 characters)'
              name='code'
              id='code'
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              inputMode='text'
            />
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

      <PartnerList
        setData={setData}
        onEdit={handleEditPartner}
        loading={!loading}
        filteredData={filteredData}
        data={data}
      />
    </Box>
  )
}

export default Index
