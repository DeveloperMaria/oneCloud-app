import { useState, ReactNode, useContext, useEffect } from 'react'
import Image from 'next/image'
import logo from 'public/images/logo-2.png'
import logo1 from 'public/images/logo-1.png'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Icon from 'src/@core/components/icon'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { AuthContext } from 'src/context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { schema } from 'src/schema'

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { mt: theme.spacing(8) }
}))
const ContainerBox = styled('div')(({ theme }) => ({
  // height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('lg')]: {
    width: '40%',
    margin: 'auto'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '0em 1em',
    marginBottom: '3em',
    height: '0',
    marginTop: '2em'
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '3em',
    height: '0',
    marginTop: '2em'
  }
}))
const FlexContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: '0'
  }
}))
const ImageBox = styled('div')(({ theme }) => ({
  padding: '1.5em 0em 0em 1em',
  [theme.breakpoints.up('md')]: {
    paddingBottom: '2em'
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: '1em',
    paddingTop: '1em'
  }
}))

const BoxWrap = styled('div')(({ theme }) => ({
  padding: '2.5em',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('md')]: {
    padding: '1.5em 1em'
  }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))



interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const authContext = useContext(AuthContext)
  const router = useRouter()

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Choose the logo based on dark mode
  const logoSrc = isDarkMode ? logo1 : logo

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (formData: FormData) => {
    try {
  await authContext.login({ ...formData, rememberMe })
        router.push('/home')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    if (authContext.user) {
      router.push('/home')
    }
  }, [authContext.user, router])

  return (
    <Box>
      <ImageBox>
        <Link href='/home'>
        <Image src={logoSrc} alt='logo image' priority={true} height={100}/>
        </Link>
      </ImageBox>

      <ContainerBox className='container-box'>
        <FlexContainer>
          <BoxWrap
            sx={{
              backgroundColor: 'background.paper'
            }}
          >
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Welcome to {themeConfig.templateName}! 👋🏻</TypographyStyled>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>

            <form noValidate  onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='you@gmail.com'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  defaultValue=''
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 4,
                  pt: 3,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
              </Box>
              <Button fullWidth size='large' type='submit' variant='contained'>
                Login
              </Button>
            </form>
          </BoxWrap>
        </FlexContainer>
      </ContainerBox>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
