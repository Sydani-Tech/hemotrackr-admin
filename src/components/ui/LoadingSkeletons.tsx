export const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
            ))}
        </div>
    </div>
);

export const SkeletonList = ({ items = 3 }: { items?: number }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
        {Array.from({ length: items }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
        ))}
    </div>
);
