import React from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import PageWrapper from "./components/layout/PageWrapper"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import "./connection.ts"
import { AppProvider } from "./context/AppContext.tsx"
import { useAppContext } from "./hooks/context/useAppContext"
import { useSyncAccount } from "./hooks/useSyncAccount"
import { useEffect } from "react"

const ProtectedRoute = ({ children, requireOwner = false }: { children: React.ReactNode, requireOwner?: boolean }) => {
	const { state } = useAppContext()
	
	if (!state.isConnected) {
		return <Navigate to="/" replace />
	}
	
	if (requireOwner && state.walletAddress?.toLowerCase() !== state.owner?.toLowerCase()) {
		return <Navigate to="/dashboard" replace />
	}
	
	return <>{children}</>
}

const AppRoutes: React.FC = () => {
	const location = useLocation()
	const currentPath = location.pathname
	const { sync } = useSyncAccount()
	const { state } = useAppContext()

	useEffect(() => {
		sync() // Syncs supply regardless, then handles wallet specifics
	}, [state.walletAddress, sync])

	return (
		<PageWrapper isDashboard={currentPath !== "/" && currentPath !== ""}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
				<Route path="/faucet" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
				<Route path="/history" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
				<Route path="/leaderboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
				<Route path="/settings" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
				<Route path="/admin" element={<ProtectedRoute requireOwner><Admin /></ProtectedRoute>} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</PageWrapper>
	)
}

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AppProvider>
				<AppRoutes />
				<ToastContainer />
			</AppProvider>
		</BrowserRouter>
	)
}

export default App
