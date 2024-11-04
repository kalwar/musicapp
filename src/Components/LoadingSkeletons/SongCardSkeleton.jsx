const SongCardSkeleton = () => {
    return (
        <div className='w-[220px] h-[300px] p-5 rounded-lg bg-[#212121] flex items-center flex-col gap-3'>
            <div className='w-[180px] h-[180px] rounded-sm bg-[#2D2D2D]'>
            </div>
            <div className='h-8 w-full'>
                <div className='w-full h-4 rounded-sm bg-[#2D2D2D] mb-3'></div>
                <div className='w-full h-4 rounded-sm bg-[#2D2D2D]'></div>
            </div>
        </div>
    )
}

export default SongCardSkeleton