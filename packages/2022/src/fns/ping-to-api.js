import { apiUrl } from '../constants'

const pingToApi = async () => {
  const response = await fetch(apiUrl)
  await response.json()
}

export default pingToApi
