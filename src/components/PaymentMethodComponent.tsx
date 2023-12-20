import React, { useEffect } from 'react'
import { Grid, TextField } from '@mui/material'
import toast from 'react-hot-toast'
import DialogBox from './DialogBox'
import { addPaymentMethod, updatePaymentMethod } from 'src/pages/editor/api'

const PaymentMethodComponent = ({
  show4,
  setShow4,
  title,
  setTitle,
  IPId,
  setIPId,
  setPaymentMethodData,
  formik
}) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const { CommunicationCode, Description, InvoiceCodeEl, BillingNotes, Unpaidtext } = formik.values

      const newPartnerData = {
        CommunicationCode,
        Description,
        InvoiceCodeEl,
        BillingNotes,
        Unpaidtext
      }

      if (IPId) {
        const updatedPaymentMethod = await updatePaymentMethod(IPId, newPartnerData)
        const updatedData = updatedPaymentMethod.data

        setPaymentMethodData(prevData =>
          prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner))
        )

        toast.success('Payment Method updated successfully')
      } else {
        const addedPartner = await addPaymentMethod(newPartnerData)
        setPaymentMethodData(prevData => [...prevData, addedPartner.data])

        toast.success('Payment Method added successfully')
      }
      setShow4(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow4(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow4(false)
      setTitle('Add New Payment Method')
    }
  }
  const handleButtonClick = () => {
    if (!IPId) {
      setShow4(true)
    }
  }

  return (
    <DialogBox
      open={show4}
      onClose={handleCloseDialog}
      handleSubmit={handleSubmitFormik}
      handleButtonClick={handleButtonClick}
      title={title}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Communication Code'
            name='CommunicationCode'
            id='CommunicationCode'
            value={formik.values.CommunicationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.CommunicationCode && Boolean(formik.errors.CommunicationCode)}
            helperText={formik.touched.CommunicationCode && formik.errors.CommunicationCode}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Description'
            name='Description'
            id='Description'
            value={formik.values.Description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Description && Boolean(formik.errors.Description)}
            helperText={formik.touched.Description && formik.errors.Description}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Invoice Code El.'
            name='InvoiceCodeEl'
            id='InvoiceCodeEl'
            value={formik.values.InvoiceCodeEl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.InvoiceCodeEl && Boolean(formik.errors.InvoiceCodeEl)}
            helperText={formik.touched.InvoiceCodeEl && formik.errors.InvoiceCodeEl}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Billing Notes'
            name='BillingNotes'
            id='BillingNotes'
            value={formik.values.BillingNotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.BillingNotes && Boolean(formik.errors.BillingNotes)}
            helperText={formik.touched.BillingNotes && formik.errors.BillingNotes}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label='Unsolved text'
            name='Unpaidtext'
            id='Unpaidtext'
            value={formik.values.Unpaidtext}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Unpaidtext && Boolean(formik.errors.Unpaidtext)}
            helperText={formik.touched.Unpaidtext && formik.errors.Unpaidtext}
          />
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default PaymentMethodComponent
