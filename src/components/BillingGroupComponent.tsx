import React from 'react'
import {
  Grid,
  TextField
} from '@mui/material'
import toast from 'react-hot-toast'
import DialogBox from './DialogBox'
import { addBillingGroup, updateBillingGroup } from 'src/pages/editor/api'

const BillingGroupComponent = ({ setShow5, setTitle, show5, title, IPId, setIPId, setBillingGroupData, formik }) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const {
        firstName,
        Monthinadvance,
        Daytoexpiry,
        TransmitterCode,
        Name,
        Address,
        PostalCode,
        Common,
        Province,
        Telephone,
        CrimeCode,
        Bank,
        IBAN,
        PostalAccount,
        Email,
        VATNumber,
        TaxIDCode,
        SepaCodeCUC,
        SepaCreditorCode,
        DD1stUnpaidNotice,
        DD2stUnpaidNotice,
        GGServicesBlock,
        Nation
      } = formik.values
      const newPartnerData = {
        firstName,
        Monthinadvance,
        Daytoexpiry,
        TransmitterCode,
        Name,
        Address,
        PostalCode,
        Common,
        Province,
        Telephone,
        CrimeCode,
        Bank,
        IBAN,
        PostalAccount,
        Email,
        VATNumber,
        TaxIDCode,
        SepaCodeCUC,
        SepaCreditorCode,
        DD1stUnpaidNotice,
        DD2stUnpaidNotice,
        GGServicesBlock,
        Nation
      }

      if (IPId) {
        const updatedBillingGroup = await updateBillingGroup(IPId, newPartnerData)
        const updatedData = updatedBillingGroup.data

        setBillingGroupData(prevData =>
          prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner))
        )

        toast.success('Billing Group updated successfully')
      } else {
        const addedPartner = await addBillingGroup(newPartnerData)
        setBillingGroupData(prevData => [...prevData, addedPartner.data])

        toast.success('Billing Group added successfully')
      }
      setShow5(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow5(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow5(false)
      setTitle('Add New Billing Group')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow5(true)
    }
  }

  return (
    <DialogBox
      open={show5}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='First name'
            name='firstName'
            id='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Months in advance'
            name='Monthinadvance'
            id='Monthinadvance'
            value={formik.values.Monthinadvance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Monthinadvance && Boolean(formik.errors.Monthinadvance)}
            helperText={formik.touched.Monthinadvance && formik.errors.Monthinadvance}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Days to expiry'
            name='Daytoexpiry'
            id='Daytoexpiry'
            value={formik.values.Daytoexpiry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Daytoexpiry && Boolean(formik.errors.Daytoexpiry)}
            helperText={formik.touched.Daytoexpiry && formik.errors.Daytoexpiry}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Transmitter Code'
            name='TransmitterCode'
            id='TransmitterCode'
            value={formik.values.TransmitterCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.TransmitterCode && Boolean(formik.errors.TransmitterCode)}
            helperText={formik.touched.TransmitterCode && formik.errors.TransmitterCode}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Name'
            name='Name'
            id='Name'
            value={formik.values.Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Name && Boolean(formik.errors.Name)}
            helperText={formik.touched.Name && formik.errors.Name}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Address'
            name='Address'
            id='Address'
            value={formik.values.Address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Address && Boolean(formik.errors.Address)}
            helperText={formik.touched.Address && formik.errors.Address}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='POSTAL CODE'
            type='number'
            name='postalCode'
            id='postalCode'
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
            helperText={formik.touched.postalCode && formik.errors.postalCode}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Common'
            name='Common'
            id='Common'
            value={formik.values.Common}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Common && Boolean(formik.errors.Common)}
            helperText={formik.touched.Common && formik.errors.Common}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Prov.'
            name='Province'
            id='Province'
            value={formik.values.Province}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Province && Boolean(formik.errors.Province)}
            helperText={formik.touched.Province && formik.errors.Province}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Nation'
            name='Nation'
            id='Nation'
            value={formik.values.Nation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Nation && Boolean(formik.errors.Nation)}
            helperText={formik.touched.Nation && formik.errors.Nation}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Telephone'
            type='number'
            name='Telephone'
            id='Telephone'
            value={formik.values.Telephone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Telephone && Boolean(formik.errors.Telephone)}
            helperText={formik.touched.Telephone && formik.errors.Telephone}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='REA code'
            name='CrimeCode'
            id='CrimeCode'
            value={formik.values.CrimeCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.CrimeCode && Boolean(formik.errors.CrimeCode)}
            helperText={formik.touched.CrimeCode && formik.errors.CrimeCode}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Bank'
            name='Bank'
            id='Bank'
            value={formik.values.Bank}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Bank && Boolean(formik.errors.Bank)}
            helperText={formik.touched.Bank && formik.errors.Bank}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='IBAN'
            name='IBAN'
            id='IBAN'
            value={formik.values.IBAN}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.IBAN && Boolean(formik.errors.IBAN)}
            helperText={formik.touched.IBAN && formik.errors.IBAN}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Postal account'
            name='PostalAccount'
            id='PostalAccount'
            value={formik.values.PostalAccount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.PostalAccount && Boolean(formik.errors.PostalAccount)}
            helperText={formik.touched.PostalAccount && formik.errors.PostalAccount}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='VAT number'
            name='VATNumber'
            id='VATNumber'
            value={formik.values.VATNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.VATNumber && Boolean(formik.errors.VATNumber)}
            helperText={formik.touched.VATNumber && formik.errors.VATNumber}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Tax ID code'
            type='number'
            name='TaxIDCode'
            id='TaxIDCode'
            value={formik.values.TaxIDCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.TaxIDCode && Boolean(formik.errors.TaxIDCode)}
            helperText={formik.touched.TaxIDCode && formik.errors.TaxIDCode}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Sepa Code CUC'
            name='SepaCodeCUC'
            id='SepaCodeCUC'
            value={formik.values.SepaCodeCUC}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.SepaCodeCUC && Boolean(formik.errors.SepaCodeCUC)}
            helperText={formik.touched.SepaCodeCUC && formik.errors.SepaCodeCUC}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Sepa Creditor Code'
            name='SepaCreditorCode'
            id='SepaCreditorCode'
            value={formik.values.SepaCreditorCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.SepaCreditorCode && Boolean(formik.errors.SepaCreditorCode)}
            helperText={formik.touched.SepaCreditorCode && formik.errors.SepaCreditorCode}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='E-mail'
            type='email'
            name='Email'
            id='Email'
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Email && Boolean(formik.errors.Email)}
            helperText={formik.touched.Email && formik.errors.Email}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Unpaid on 1st Notice'
            type='number'
            name='DD1stUnpaidNotice'
            id='DD1stUnpaidNotice'
            value={formik.values.DD1stUnpaidNotice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.DD1stUnpaidNotice && Boolean(formik.errors.DD1stUnpaidNotice)}
            helperText={formik.touched.DD1stUnpaidNotice && formik.errors.DD1stUnpaidNotice}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            type='number'
            label='Unpaid days 2nd Notice'
            name='DD2stUnpaidNotice'
            id='DD2stUnpaidNotice'
            value={formik.values.DD2stUnpaidNotice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.DD2stUnpaidNotice && Boolean(formik.errors.DD2stUnpaidNotice)}
            helperText={formik.touched.DD2stUnpaidNotice && formik.errors.DD2stUnpaidNotice}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Unpaid days Block'
            type='number'
            name='GGServicesBlock'
            id='GGServicesBlock'
            value={formik.values.GGServicesBlock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GGServicesBlock && Boolean(formik.errors.GGServicesBlock)}
            helperText={formik.touched.GGServicesBlock && formik.errors.GGServicesBlock}
          />
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default BillingGroupComponent
