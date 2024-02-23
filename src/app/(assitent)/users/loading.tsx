

export default function Loading() {
    const skeletons = Array.from({ length: 5 }, (_, i) => (
        <div className="bg-white shadow-base rounded-3xl w-full p-8" key={i}>
            <div className="skeleton w-1/4 bg-gray-100 h-3 rounded-8xl"></div>
            <div className="skeleton w-2/3 bg-gray-100 h-6 rounded-8xl my-2"></div>
            <div className="skeleton w-1/4 bg-gray-100 h-3.5 rounded-8xl"></div>
            <div className="flex justify-end mt-8 w-full gap-x-4">
                <div className="skeleton w-1/4 bg-gray-100 h-3 rounded-8xl"></div>
                <div className="skeleton w-1/4 bg-gray-100 h-3 rounded-8xl"></div>
            </div>
        </div>
    ));
    return (
        <div className="flex flex-col gap-y-8 mt-8">
            {skeletons}
        </div>
    );
}