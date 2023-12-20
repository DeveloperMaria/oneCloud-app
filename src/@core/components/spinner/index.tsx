// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
import logo from 'public/images/logo-2.png'
import logo1 from 'public/images/logo-1.png'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark';

  const logoSrc = isDarkMode ? logo1 : logo


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
        <Image src={logoSrc} alt='logo image' priority={true}/>
      <CircularProgress disableShrink  />
    </Box>
  )
}

export default FallbackSpinner
