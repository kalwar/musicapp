const Button = (props) => {
    return (
        <>
            {
                props.buttonTheme == 'WHITE' ? 
                    <button className='text-black bg-white text-sm font-semibold  rounded-full flex items-center justify-center py-1 px-4 capitalize gap-2 hover:scale-105'>{props.icon}  {props.button}</button> 
                    : 
                    <button className='text-white bg-black border-2 border-white text-sm font-semibold rounded-full flex items-center justify-center py-1 px-4 capitalize gap-2  hover:scale-105'>{props.icon}  {props.button}</button>
            }
        </>
    )
}

export default Button