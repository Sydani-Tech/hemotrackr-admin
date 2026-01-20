
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '../../../lib/utils';

const ProfileLayout = () => {
    const tabs = [
        { name: 'Profile', path: '/donor/profile', end: true },
        { name: 'Medical Record', path: '/donor/profile/medical-record' },
        { name: 'Donation History', path: '/donor/profile/history' },
        { name: 'Account Support', path: '/donor/profile/support' },
    ];

    return (
        <div className="flex gap-8 items-start">
            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-blue-500 min-h-[800px]">
                {/* Tabs Header */}
                <div className="flex items-center justify-between border-b border-gray-100 mb-8 pb-4">
                    <div className="flex gap-4 md:gap-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.path}
                                to={tab.path}
                                end={tab.end}
                                className={({ isActive }) => cn(
                                    "pb-2 text-sm font-medium transition-all whitespace-nowrap",
                                    isActive 
                                        ? "text-gray-900" 
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {({ isActive }) => (
                                    <div className={cn(
                                        "px-4 py-2 rounded-lg transition-all",
                                        isActive ? "bg-[#FFD600] font-bold shadow-sm" : ""
                                    )}>
                                        {tab.name}
                                    </div>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Page Content */}
                <div>
                    <Outlet />
                </div>
            </div>

            {/* Right Sidebar */}
            
        </div>
    );
};

export default ProfileLayout;

