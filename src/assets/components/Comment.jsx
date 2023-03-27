import data from '../../data.json'
import Score from "./Score"

function Comment(props) {
    return (
        <div className={`${"other:", props.style} ${"sm:", props.sm_style} bg-white rounded-md p-6 flex gap-4 sm:flex-col-reverse sm:relative`} id={props.id}>
            <Score
                upvote={props.upvote}
                score={props.score}
                downvote={props.downvote}
            />
            
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-center">
                    <div className="w-full flex items-center gap-4 sm:justify-between sm:-mt-4">
                        <div className='flex items-center gap-4'>
                            <img className="w-8" alt='' src={props.image} />
                            <h3 className="text-slate-800 font-semibold">{props.username}</h3>
                        </div>

                        {data.currentUser.username === props.username ?
                            <p className="px-1.5 m-0 rounded-sm bg-violet-800 text-white">you</p> :
                            ''
                        }

                        <p className="text-slate-400 leading-4 text-right sm:text-sm">{props.createdAt}</p>
                    </div>

                    {data.currentUser.username === props.username ?
                        <div className='flex gap-x-4 flex-wrap justify-end sm:absolute sm:bottom-7 sm:right-6'>
                            <div className="flex gap-2 items-center cursor-pointer hover:opacity-50 transition ease duration-200">
                            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#f43f5e"/></svg>
                                <p className="text-rose-500 font-semibold" onClick={props.deleteComment}>Delete</p>
                            </div>
                            <div className="flex gap-2 items-center cursor-pointer hover:opacity-50 transition ease duration-200">
                            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5B21B6"/></svg>
                                <p className="text-violet-800 font-semibold" onClick={props.editComment}><a href="#add-comment">Edit</a></p>
                            </div>
                        </div> :
                        
                        <div className="flex gap-2 items-center cursor-pointer hover:opacity-50 transition ease duration-200 sm:absolute sm:bottom-7 sm:right-6">
                            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5B21B6"/></svg>
                            <p className="text-violet-800 font-semibold" onClick={props.replyToComment}><a href="#add-comment">Reply</a></p>
                        </div>
                    }

                </div>
                <p className="text-slate-400 leading-7">
                    {props.replyingTo && <span className='text-violet-800 font-semibold'>@{props.replyingTo} </span>}
                    {props.content}
                </p>
            </div>
        </div>
    )
}

export default Comment