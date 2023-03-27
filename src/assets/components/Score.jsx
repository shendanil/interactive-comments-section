function Score(props) {
        
    return (
        <div className={"bg-violet-100 h-fit rounded-md flex flex-col justify-center items-center other:w-10 sm:w-fit sm:flex-row-reverse sm:mt-2"}>
            <p className="w-full text-center other:rounded-t-md sm:rounded-r-md text-violet-300 font-semibold py-1 sm:px-2 select-none hover:bg-violet-200 cursor-pointer transition ease duration-200" id='upvote' onClick={props.upvote}>+</p>
            <p className="text-violet-800 font-semibold py-1 sm:w-fit sm:px-2">{props.score}</p>
            <p className="w-full text-center other:rounded-b-md sm:rounded-l-md text-violet-300 font-semibold py-1 sm:px-2 select-none hover:bg-violet-200 cursor-pointer transition ease duration-200" id='downvote' onClick={props.downvote}>-</p>
        </div>
    )
}

export default Score