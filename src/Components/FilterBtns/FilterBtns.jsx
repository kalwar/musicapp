const FilterBtns = (props) => {
  return (
    <button key={props.label} className='py-1 px-3 text-md font-semibold text-white bg-[#2A2A2A] rounded-full mx-2'>
        {
            props.label
        }
    </button>
  )
}

export default FilterBtns