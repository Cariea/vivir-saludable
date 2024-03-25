
export default function UserInfoLoading() {
    return (
        <>
            <div className="relative flex flex-col bg-white rounded-3xl shadow-base items-center p-8 pt-0">
                <div className="relative -top-12 skeleton bg-gray-100 h-24 w-24 rounded-full"></div>
                <div className="skeleton bg-gray-100 w-1/4 h-3 rounded-full"></div>
                <div className="skeleton bg-gray-100 w-2/4 h-6 rounded-full my-2"></div>
                <div className="skeleton bg-gray-100 w-1/4 h-3 rounded-full"></div>
                <div className="mt-8 w-full rounded-full h-8 bg-gray-100 skeleton"></div>
            </div>
            <h2 className="font-bold text-primary-default mt-8 mb-4">Información Personal</h2>
            <div className="bg-white shadow-base rounded-3xl p-8 flex flex-col gap-y-4">
                <div>
                    <div className="skeleton bg-gray-100 rounded-full w-1/4 h-3 mb-2"></div>
                    <div className="skeleton bg-gray-100 rounded-full w-2/4 h-4"></div>
                </div>
                <div>
                    <div className="skeleton bg-gray-100 rounded-full w-1/4 h-3 mb-2"></div>
                    <div className="skeleton bg-gray-100 rounded-full w-2/4 h-4"></div>
                </div>
                <div>
                    <div className="skeleton bg-gray-100 rounded-full w-1/4 h-3 mb-2"></div>
                    <div className="skeleton bg-gray-100 rounded-full w-2/4 h-4"></div>
                </div>
                <div>
                    <div className="skeleton bg-gray-100 rounded-full w-1/4 h-3 mb-2"></div>
                    <div className="skeleton bg-gray-100 rounded-full w-2/4 h-4"></div>
                </div>
            </div>
        </>
    );
}
