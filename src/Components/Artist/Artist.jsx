import Img from '../LazyImages/Img'

const Artist = ({artist}) => {
  return (
    <div className='w-[250px]   flex flex-col items-center justify-center cursor-pointer bg-[#191818] hover:bg-[#2A2A2A] py-3 rounded-md mb-40' key={artist.id} >
        <div className='w-[200px] h-[200px] rounded-full flex items-center justify-center shadow-sm shadow-gray-100'>
            {/* <img src={artist.url} alt={artist.name} className=/> */}
            <Img src={artist.url} className='w-full h-full object-cover rounded-full'/>
        </div>
        <h1 className='text-md text-center font-semibold text-white mt-5'>{artist.name}</h1>
    </div>
  )
}

export default Artist