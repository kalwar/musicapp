import SongCardSkeleton from "./SongCardSkeleton.jsx"
import './songCardSkeleton.css'

const LoadingSkeletonRow = () => {
    return (
     <div className="my-5">
        <span className="w-1/12 h-4 rounded-sm bg-[#2D2D2D] mb-3"></span>
       <div className='flex overflow-y-hidden items-center justify-start gap-3 flex-nowrap overflow-x-scroll m-3'  id="songCardSkeleton">
        <SongCardSkeleton />
        <SongCardSkeleton />
        <SongCardSkeleton />
        <SongCardSkeleton />
        <SongCardSkeleton />
        <SongCardSkeleton />
        <SongCardSkeleton />
      </div>
     </div>
    )
  }

  export default LoadingSkeletonRow;