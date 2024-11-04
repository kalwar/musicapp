import Button from '../Buttons/Button'

const CreatePlaylistReminder = (props) => {
  return (
    <div className='w-[95%] p-4 rounded-lg bg-[#242424] mt-3 '>
        <h2 className='text-md text-white font-semibold'>{props.title}</h2>
        <p className='text-sm text-white font-medium my-5'>{props.desc}</p>
        <Button button={props.button} buttonTheme='WHITE'/>
    </div>
  )
}

export default CreatePlaylistReminder