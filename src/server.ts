import connectionHelper from './database/connection-helper'

connectionHelper.create().then(async () => {
  const app = (await (import('./app'))).default
  app.listen(3000, () => console.log('Server running on port 3000'))
}).catch((e) => {
  console.log(e)
})
