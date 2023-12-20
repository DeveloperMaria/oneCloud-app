// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      icon: 'mdi:home-outline',
      title: 'Home',
      path: '/home'
    },
    {
      icon: 'mdi:apps',
      title: 'My Menu',
      children: [
        {
          title: 'List of Services',
          icon: 'mdi:email-outline',
          path: '/services'
        }
      ]
    },
    {
      title: 'Clients',
      icon: 'mdi:palette-swatch-outline',
      path: '/client'
    },
    {
      icon: 'mdi:file-document-outline',
      title: 'Ticket Management',
      path: '/ticket'
    },
    {
      title: 'Billing',
      icon: 'mdi:checkbox-marked-outline',
      children: [
        {
          title: 'Items to be Invoiced',
          icon: 'mdi:form-select',
          path: '/iteminvoiced'
        },
        {
          icon: 'mdi:cube-outline',
          title: 'Invoices',
          path: '/invoices'
        },
        {
          title: 'Credit Notes',
          path: '/creditNotes',
          icon: 'mdi:notes'
        },
        {
          title: 'Creation of Articles/Bundles',
          path: '/articleBundles',
          icon: 'mdi:transit-connection-horizontal'
        },
        {
          title: 'Invoice Summary',
          icon: 'mdi:grid-large',
          path: '/invoiceSummary'
        },
        {
          title: 'Providers',
          icon: 'mdi:assistant',
          path: '/providers'
        },
        {
          title: 'Passive Invoices',
          icon: 'mdi:grid',
          path: '/passiveInvoices'
        }
      ]
    },
    {
      title: 'NOC',
      icon: 'mdi:chart-donut',
      children: [
        {
          title: 'IP Management',
          icon: 'mdi:chart-line',
          path: '/ipManagement'
        },
        {
          title: 'Monitored Services',
          icon: 'mdi:chart-bell-curve-cumulative',
          path: '/monitoredService'
        },
        {
          title: 'Inventions Grid',
          path: '/inventionGrid',
          icon: 'mdi:grid'
        },
        {
          title: 'Inventions Calendar',
          path: '/inventionCalendar',
          icon: 'mdi:chart-bell-curve'
        }
      ]
    },
    {
      title: 'Admin Menu',
      icon: 'mdi:dots-horizontal',
      children: [
        {
          path: '/controlPanel',
          icon: 'mdi:shield-outline',
          title: 'Control Panel'
        },
        {
          title: 'Editor',
          icon: 'mdi:edit',
          path: '/editor'
        },
        {
          title: 'Users List',
          icon: 'mdi:menu',
          path: '/userList'
        },
        {
          title: 'Partner List',
          icon: 'mdi:account-details',
          path: '/partnerList'
        },
        {
          title: 'NetMap - VLan',
          icon: 'mdi:access-point-network',
          path: '/netMap'
        },
        {
          title: 'Import Traffic Tel',
          icon: 'mdi-light:alarm-panel',
          path: '/trafficTel'
        },
        {
          title: 'CDR',
          icon: 'prime:book',
          path: '/cdr'
        },
        {
          title: 'Message Queue',
          icon: 'mdi:message',
          path: '/messageQueue'
        },
        {
          title: 'Mass Sending',
          icon: 'mdi:people',
          path: '/massSending'
        },
        {
          title: 'Various',
          icon: 'mdi:map',
          path: '/various'
        },
        {
          title: 'Templates',
          icon: 'mdi:assignment',
          path: '/template'
        },
        {
          title: 'Log',
          icon: 'ic:baseline-ballot',
          path: '/log'
        },
        {
          title: 'Import/export Client and Services',
          icon: 'mdi:login',
          path: '/importClient'
        }
      ]
    }
  ]
}

export default navigation
