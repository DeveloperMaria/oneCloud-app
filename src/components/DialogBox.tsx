// DialogBox.js

import React, { forwardRef, ReactElement } from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Icon from 'src/@core/components/icon'
import { Button } from '@mui/material'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogBox = ({
  open,
  onClose,
  handleSubmit,
  handleButtonClick,
  title,
  children
}: {
  open: boolean
  onClose: () => void
  handleSubmit: () => void
  handleButtonClick: () => void
  title: string
  children: React.ReactNode
}) => {


  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={onClose}
      TransitionComponent={Transition}
      onBackdropClick={onClose}
    >
      <form action='' noValidate onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Typography variant='h5' sx={{ mb: 3,textAlign:'center',marginBottom:'1em' }}>
            {title}
          </Typography>
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'end',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button
            variant='contained'
            sx={{ mr: 1 }}
            type='submit'
            onClick={() => {
              handleButtonClick()
            }}
          >
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClose}>
            Discard
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogBox
