// --- Replace with your dashboard id and secret ---- //
const DASHBOARD_ID = 'd_a1a5275b-5ded-411c-a2bb-bfafd55e7b26'
const DASHBOARD_SECRET = 'ds_13353da5-e413-46cb-a8af-fd58192aab11'
import { Retool } from '@tryretool/custom-component-support'

import { useEffect, useState } from 'react'
import { AuthToken, Dashboard as Dash } from 'semaphor'
import 'semaphor/style.css' // IMPORTANT! Import the CSS file. This is the default style, you can customize it.
const TOKEN_URL = 'https://semaphor.cloud/api/v1/token'

export function Dashboard() {
  const [authToken, setAuthToken] = useState<AuthToken>()

  const [dashboardId, _setDashboardId] = Retool.useStateString({
    name: 'ID'
  })

  const [dashboardSecret, _setDashboardSecret] = Retool.useStateString({
    name: 'Secret'
  })

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(TOKEN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dashboardId: dashboardId, //DASHBOARD_ID,
            dashboardSecret: dashboardSecret
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
