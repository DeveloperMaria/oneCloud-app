import React from 'react'
import { Grid, TextField } from '@mui/material'
import toast from 'react-hot-toast'
import DialogBox from './DialogBox'
import { addArticle, updateArticle } from 'src/pages/articleBundles/api'

const ArticleComponent = ({
  setArticleData,
  IPId,
  setIPId,
  setShow1,
  setTitle,
  show1,
  title,
  formik
}) => {
  const resetFormFields = () => {
    formik.resetForm()
  }

  const handleSubmitFormik = async (event: React.FormEvent) => {
    event.preventDefault()
    const { Description, Price } = formik.values

    try {
      const newArticleData = {
        Description,
        Price: parseInt(Price, 10)
      }

      if (IPId) {
        const updateArticles = await updateArticle(IPId, newArticleData)
        const updatedData = updateArticles.data
        setArticleData(prevData => prevData.map(partner => (partner.id === updatedData.id ? updatedData : partner)))

        toast.success('Article updated successfully')
      } else {
        const addedArticles = await addArticle(newArticleData)
        setArticleData(prevData => [...prevData, addedArticles.data])

        toast.success('Article added successfully')
      }
      setShow1(false)
      resetFormFields()
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  const handleCloseDialog = () => {
    if (!IPId) {
      setShow1(false)
      resetFormFields()
    } else {
      resetFormFields()
      setIPId(null)
      setShow1(false)
      setTitle('Add New Article')
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
            type='number'
            label='Price'
            name='Price'
            id='Price'
            value={formik.values.Price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.Price && Boolean(formik.errors.Price)}
            helperText={formik.touched.Price && formik.errors.Price}
          />
        </Grid>
      </Grid>
    </DialogBox>
  )
}

export default ArticleComponent
