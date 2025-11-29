'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  BarChart3,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Tag,
  Package,
  FileText,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Pricing', href: '/admin/pricing', icon: Tag },
  { name: 'Addons', href: '/admin/addons', icon: Package },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // If this is the login page, just render children without layout
  const isLoginPage = pathname === '/admin/login';

  // Check authentication on mount
  useEffect(() => {
    // Skip auth check for login page
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    const verifyAuth = async () => {
      try {
        // First check if token exists in localStorage
        const token = localStorage.getItem('adminToken');
        if (!token) {
          router.push('/admin/login');
          return;
        }

        // Verify token with server
        const response = await fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token invalid, clear and redirect
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
        }
      } catch {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router, isLoginPage]);

  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    const collapsed = localStorage.getItem('sidebarCollapsed');
    if (collapsed === 'true') {
      setSidebarCollapsed(true);
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue with logout even if API fails
    }
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  // Toggle sidebar collapsed state
  const toggleSidebarCollapse = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
  };

  // Render login page without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-800 border-t-ecospace-green animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-ecospace-green rounded-full animate-pulse" />
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-4 animate-pulse">Loading...</p>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-gray-900 border-r border-gray-800 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <Link href="/admin" className={`flex items-center gap-2 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
            <span className="text-white font-light">Podcast</span>
            <span className="text-ecospace-green font-light">Admin</span>
          </Link>
          {sidebarCollapsed && (
            <Link href="/admin" className="hidden lg:flex items-center justify-center w-full">
              <span className="text-ecospace-green font-bold text-xl">P</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                title={sidebarCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-ecospace-green/10 text-ecospace-green'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                } ${sidebarCollapsed ? 'lg:justify-center' : ''}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`font-light ${sidebarCollapsed ? 'lg:hidden' : ''}`}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle Button (Desktop Only) */}
        <button
          onClick={toggleSidebarCollapse}
          className="hidden lg:flex absolute top-20 -right-3 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-10"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 ${sidebarCollapsed ? 'lg:flex-col lg:gap-2' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-ecospace-green/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-ecospace-green" />
            </div>
            <div className={`flex-1 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
              <p className="text-white text-sm font-light">Admin</p>
              <p className="text-gray-500 text-xs">admin@ecospace.ae</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-white font-light text-lg lg:hidden text-center">
                Admin Panel
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-white text-sm font-light"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
