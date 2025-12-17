
'use client';

import { RegistrationsChart } from "@/components/dashboard/registrations-chart"
import { SalesChart } from "@/components/dashboard/sales-chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IndianRupee, Users, ShoppingCart, AlertTriangle } from "lucide-react"
import { useEffect, useState } from 'react'

export function AdminDashboardContent() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>({})

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    const fetchAudit = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/audit', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
        if (!res.ok) throw new Error('Failed to load audit')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Failed to load admin audit', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAudit()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '—' : `₹${stats.revenue || 0}`}</div>
            <p className="text-xs text-muted-foreground">Aggregated from payments and orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registrations
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '—' : stats.registrationsCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">Total event registrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Merch Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '—' : stats.merchOrdersCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">Orders completed: {loading ? '—' : stats.merchRevenue ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Banned Users
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">—</div>
            <p className="text-xs text-muted-foreground">Security events (not tracked)</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <RegistrationsChart />
        <SalesChart />
      </div>
    </div>
  )
}
