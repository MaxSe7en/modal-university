import AdminDashboard from '@/components/Admin/AdminDashboard/AdminDashboard'
import { AdminProvider } from '@/contexts/AdminContext'
import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
    <AdminProvider><AdminDashboard /></AdminProvider>
  )
}

export default index