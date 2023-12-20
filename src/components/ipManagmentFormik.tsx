import { useFormik } from 'formik'
import { accessPointSchema, comondiusSchema, ipAddressSchema, knotsSchema, nasSchema } from 'src/schema'

export const IpAddressformik = () => {
  let formik = useFormik({
    initialValues: {
      description: '',
      startIp: '',
      network: '',
      startIp1: '',
      reservedIps: '',
      active: false
    },
    validationSchema: ipAddressSchema,
    onSubmit: () => {}
  })
  return formik
}

export const AccessPointformik = ()=>{
 let formik = useFormik({
    initialValues: {
      ipAccessPoint: '',
      name: '',
      nas: '',
      node: ''
    },
    validationSchema: accessPointSchema,
    onSubmit: () => {}
  })
  
return formik

}
export const Condominiusformik = ()=>{
  let formik =useFormik({
    initialValues: {
      ipCpe: '',
      name: '',
      address: '',
      referent: '',
      accessPoint: ''
    },
    validationSchema: comondiusSchema,
    onSubmit: () => {}
  })
  return formik
}

export const Knotsformik = ()=> {
  let formik = useFormik({
    initialValues: {
      firstName: '',
      address: ''
    },
    validationSchema: knotsSchema,
    onSubmit: () => {}
  })
  return formik
}

export const Nasformik = ()=>{
  let formik = useFormik({
    initialValues: {
      ipNas: '',
      node: ''
    },
    validationSchema: nasSchema,
    onSubmit: () => {}
  })
  return formik
}
