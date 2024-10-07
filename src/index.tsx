// --- Replace with your dashboard id and secret ---- //
const DASHBOARD_ID = 'd_6f57af52-7372-4114-9f87-8e6a00841622'
const DASHBOARD_SECRET = 'ds_c1d3c699-2760-4f91-9ec1-8a1a759c0d04'

import { useEffect, useState } from 'react'
import { AuthToken, Dashboard as Dash } from 'semaphor'
import 'semaphor/style.css' // IMPORTANT! Import the CSS file. This is the default style, you can customize it.
const TOKEN_URL = 'https://semaphor.cloud/api/v1/token'

export function Dashboard() {
  const [authToken, setAuthToken] = useState<AuthToken>()

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(TOKEN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dashboardId: DASHBOARD_ID,
            dashboardSecret: DASHBOARD_SECRET
          })
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const token = await response.json()
        if (token?.accessToken) {
          setAuthToken(token)
        }
      } catch (error) {
        console.error('There was an error!', error)
      }
    }
    fetchToken()
  }, [])

  return (
    <div>
      <Dash currentTheme="dark" authToken={authToken} />
    </div>
  )
}
