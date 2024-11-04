import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useNavigate } from 'react-router'

const LeftNav = () => {
    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-between'>
            <div className="slider mx-2 rounded-full px-2 py-3 hover:bg-[#242424]" onClick={() => navigate(-1)}>
                <AiOutlineLeft className='text-lg mx-1 ' />
            </div>
            <div className="slider mx-2 rounded-full px-2 py-3 hover:bg-[#242424]" onClick={() => navigate(+1)}>
                <AiOutlineRight className='text-lg mx-1 ' />
            </div>
        </div>
    )
}

export default LeftNav