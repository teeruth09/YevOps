import { createContext } from 'react'
import { useBoolean } from 'usehooks-ts'

export const SidebarContext = createContext()

// eslint-disable-next-line react/prop-types
const SidebarProvider = ({ children }) => {
  const sidebar = useBoolean()

  return (
    <SidebarContext.Provider value={{ sidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
