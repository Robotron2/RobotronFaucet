import React from "react"
import { LayoutDashboard, Droplet, History, Trophy, Settings, HelpCircle, FileText, User } from "lucide-react"
import clsx from "clsx"
import { Link, useLocation } from "react-router-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface SidebarProps {
	isCollapsed: boolean
	isMobileOpen: boolean
	setIsCollapsed: (v: boolean) => void
	setIsMobileOpen: (v: boolean) => void
}

const navItems = [
	{ name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
	{ name: "Faucet", icon: Droplet, path: "/faucet" },
	{ name: "History", icon: History, path: "/history" },
	{ name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
	{ name: "Settings", icon: Settings, path: "/settings" },
]

const bottomNavItems = [
	{ name: "Support", icon: HelpCircle, path: "/support" },
	{ name: "Docs", icon: FileText, path: "/docs" },
]

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, isMobileOpen, setIsCollapsed, setIsMobileOpen }) => {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<aside
			className={clsx(
				"h-screen fixed left-0 top-0 bg-[#111415] border-r border-slate-800/60 flex flex-col pt-6 pb-6 z-30 transition-all duration-300",
				isCollapsed ? "w-20" : "w-64",
				isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
			)}>
			{/* Mobile Close Button */}
			<button
				className="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white"
				onClick={() => setIsMobileOpen(false)}>
				<X size={20} />
			</button>

			{/* Logo */}
			<Link
				to={"/"}
				className={clsx(
					"px-8 mb-10 text-white font-bold text-xl tracking-wide flex items-center transition-all",
					isCollapsed && "px-0 justify-center",
				)}>
				{isCollapsed ? "R" : "ROBOTRON"}
			</Link>

			{/* Main Navigation */}
			<nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto overflow-x-hidden no-scrollbar">
				{navItems.map((item) => {
					const isActive = currentPath === item.path || (currentPath === "/admin" && item.name === "Settings") // Mock active state
					return (
						<Link
							key={item.name}
							to={item.path}
							title={isCollapsed ? item.name : undefined}
							className={clsx(
								"flex items-center rounded-lg text-sm font-medium transition-colors cursor-pointer",
								isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3",
								isActive
									? "bg-[#a3e2ff]/10 text-[#a3e2ff]"
									: "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30",
							)}>
							<item.icon size={18} className={isActive ? "text-[#a3e2ff] shrink-0" : "shrink-0"} />
							{!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
						</Link>
					)
				})}
			</nav>

			{/* Bottom Navigation */}
			<nav className="px-4 space-y-1 mb-6">
				{bottomNavItems.map((item) => (
					<Link
						key={item.name}
						to={item.path}
						title={isCollapsed ? item.name : undefined}
						className={clsx(
							"flex items-center rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-colors cursor-pointer",
							isCollapsed ? "justify-center py-2.5" : "gap-3 px-4 py-2.5",
						)}>
						<item.icon size={18} className="shrink-0" />
						{!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
					</Link>
				))}
			</nav>

			{/* Operator Module */}
			<div className="px-4">
				<div
					className={clsx(
						"flex items-center bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden transition-all",
						isCollapsed ? "p-2 justify-center" : "gap-3 px-4 py-3",
					)}>
					<div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 shrink-0">
						<User size={16} />
					</div>
					{!isCollapsed && (
						<div className="flex flex-col whitespace-nowrap">
							<span className="text-sm font-semibold text-slate-200 leading-tight">Operator</span>
							<span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
								Verified Node
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Desktop Collapse Toggle */}
			<button
				className="hidden md:flex absolute -right-3 top-8 w-6 h-6 bg-slate-800 rounded-full items-center justify-center text-slate-400 hover:text-white border border-slate-700 z-10"
				onClick={() => setIsCollapsed(!isCollapsed)}>
				{isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
			</button>
		</aside>
	)
}

export default Sidebar
