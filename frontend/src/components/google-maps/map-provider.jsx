import PropTypes from 'prop-types'

import { MAP_API } from '@/global-config'
import { APIProvider } from '@vis.gl/react-google-maps'

const MapProvider = ({ children }) => {
  if (!MAP_API) return <>{children}</>

  return <APIProvider apiKey={MAP_API}>{children}</APIProvider>
}

export default MapProvider

MapProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
}
