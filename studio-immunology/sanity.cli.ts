import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6ug4wlfa',
    dataset: 'production'
  },
  deployment: {
    appId: 'c9u4szxm2k680hoeavzdh7xi',
    autoUpdates: true,
  },
  project: {
    basePath: '/studio'
  }
})
