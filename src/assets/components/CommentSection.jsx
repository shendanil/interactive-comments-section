import { useState, useEffect } from 'react'
import data from '../../data.json'
import Comment from './Comment'
import AddComment from './AddComment'
import { render } from 'react-dom'

function CommentSection() {
    
    // console.log(data)
    
    const [commentsArr, setCommentsArr] = useState(data.comments)
    
    const [repliesArr, setRepliesArr] = useState(() => {
        const commentWithReplies = commentsArr.find(comment => comment.replies.length !== 0);
        return commentWithReplies ? commentWithReplies.replies : [];
    })

    console.log(commentsArr)
    console.log(repliesArr)

    const [textInput, setTextInput] = useState('')
    

    const [editMode, setEditMode] = useState(false)    
    const [replyMode, setReplyMode] = useState(false)

    const [editingComment, setEditingComment] = useState('')
    const [replyingComment, setReplyingComment] = useState('')


    const replies = repliesArr.map(item => {
        return (
            <Comment
                key={item.id}
                id={item.id}
                score={item.score}
                image={item.user.image.png}
                username={item.user.username}
                createdAt={item.createdAt}
                replyingTo={item.replyingTo}
                content={item.content}

                style="ml-16"
    
                upvote={() => upvote(item.id)}
                downvote={() => downvote(item.id)}
                deleteComment={() => deleteComment(item.id)}
                editComment={() => editComment(item.id)}
                reply={() => reply(item.id)}
            />
        )
    })

    // console.log(dataArr)
    // console.log(repliesArr)
    // console.log(commentsArr)


    function getEditingElement() {
        if(data.comments[data.comments.indexOf(editingComment)]) {
            return data.comments[data.comments.indexOf(editingComment)]
        } else {
            const commentWithReplies = data.comments.find(el => el.replies.length > 0)
            const index = commentWithReplies.replies.indexOf(editingComment)
            return commentWithReplies.replies[index]
        }
    }

    function getChosenComment(id) {
        const lookingInComments = commentsArr.find(el => el.id === id)
        const lookingInReplies = () => {
            const commentWithReplies = commentsArr.find(comment => comment.replies.length !== 0)
            return commentWithReplies ? commentWithReplies.replies.find(el => el.id === id) : []
        }
        return lookingInComments ? lookingInComments : lookingInReplies()
    }

    function getContentOfChosenComment(id) {
        return getChosenComment(id).content
    }



    function upvote(id) {
        function updateScore(setArr) {
            setArr(prevDataArr => {
                const newArr = prevDataArr.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            score: item.score + 1
                        }
                    } else {
                        return item
                    }
                })
                return newArr
            })
        }

        updateScore(setCommentsArr)
        updateScore(setRepliesArr)
    }

    function downvote(id) {
        function updateScore(setArr) {
            setArr(prevDataArr => {
                const newArr = prevDataArr.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            score: item.score - 1
                        }
                    } else {
                        return item
                    }
                })
                return newArr
            })
        }

        updateScore(setCommentsArr)
        updateScore(setRepliesArr)
    }

    
    
    // finding the largest id in comments array
    let idCommentsArr = data.comments.map(obj => obj.id)
    const idRepliesArr = () => {
        const commentWithReplies = commentsArr.find(comment => comment.replies.length !== 0)
        return commentWithReplies ? commentWithReplies.replies.map(obj => obj.id) : []
    }
    let idArr = idCommentsArr.concat(idRepliesArr())
    const [maxId, setMaxId] = useState(Math.max(...idArr))
    
    
    function handleClick(e) {
        e.preventDefault()
        
        if (editMode && textInput.length > 0) {
            getEditingElement().content = textInput
            setEditMode(false)

        } else if (replyMode && textInput.length > 0) {
            // reply is added, but isn't displayed
            console.log(getEditingElement())

            function addReply() {
                if (getEditingElement().hasOwnProperty("replies")) {
                    const newArrOfReplies = [...repliesArr]
                    newArrOfReplies.unshift({
                        id: maxId + 1,
                        content: textInput,
                        createdAt: "today",
                        replies: [],
                        score: 0,
                            user: {
                                image: data.currentUser.image,
                                username: data.currentUser.username
                            }
                    })
                    setMaxId(prevId => prevId + 1)
                    return newArrOfReplies
                }
            }

            console.log(addReply())
            setRepliesArr(addReply())


            // if (getEditingElement().hasOwnProperty("replies")) {
            //     getEditingElement().replies.unshift({
            //         id: 123,
            //         content: textInput,
            //         createdAt: "today",
            //         replies: [],
            //         score: 0,
            //             user: {
            //                 image: data.currentUser.image,
            //                 username: data.currentUser.username
            //             }
            //     })
            // } else {
            //     getEditingElement().replies = []
            //     getEditingElement().replies.unshift({
            //         id: 123,
            //         content: textInput,
            //         createdAt: "today",
            //         replies: [],
            //         score: 0,
            //             user: {
            //                 image: data.currentUser.image,
            //                 username: data.currentUser.username
            //             }
            //     })
            // }
            setReplyMode(false)
            
        } else if (textInput.length > 0) {
            commentsArr.push({
                id: maxId + 1,
                content: textInput,
                createdAt: "today",
                replies: [],
                score: 0,
                    user: {
                        image: data.currentUser.image,
                        username: data.currentUser.username
                    }
            })
            setMaxId(prevId => prevId + 1)
        }
        // console.log(data.comments)
        setTextInput('')
    }


    function deleteComment(id) {        
        function deleteCommentIn(setArr, arr) {
            const index = arr.indexOf(getChosenComment(id))
            setArr(prevArr => {
                const newArr = []
                for (let i = 0; i < prevArr.length; i ++) {
                    i !== index ? newArr.push(prevArr[i]) : ''
                }
                return newArr
            })
        }
        editMode ? exitAnyMode(id) : ''
        deleteCommentIn(setCommentsArr, commentsArr)
        deleteCommentIn(setRepliesArr, repliesArr)
    }




    function editComment(id) {
        setEditingComment(getChosenComment(id))
        setTextInput(getContentOfChosenComment(id))
        setEditMode(true)
    }

    function exitAnyMode(id) {
        setEditMode(false)
        setReplyMode(false)
        setTextInput('')
    }

    // console.log(replyMode)

    function reply(id) {
        setEditingComment(getChosenComment(id))
        console.log(getEditingElement())

        setReplyMode(true)
    }


    
    // console.log(data.comments)


    return (
        <>
            <div className='flex flex-col gap-4'>
                {commentsArr.map(item => (
                    <div key={item.id} className='flex flex-col gap-4' id='comment-section'>
                        <Comment
                            id={item.id}
                            score={item.score}
                            image={item.user.image.png}
                            username={item.user.username}
                            createdAt={item.createdAt}
                            content={item.content}

                            upvote={() => upvote(item.id)}
                            downvote={() => downvote(item.id)}
                            deleteComment={() => deleteComment(item.id)}
                            editComment={() => editComment(item.id)}
                            reply={() => reply(item.id)}
                        />
                        {
                            item.replies.length > 0 && replies
                        }
                    </div>
                ))}
            </div>
            <AddComment
                handleChange={(e) => setTextInput(e.target.value)}
                textInput={textInput}
                handleClick={handleClick}

                editingComment={editingComment.content}
                btnText={editMode ? "Submit" : replyMode ? "Reply" : "Send"}
                editMode={editMode}
                replyMode={replyMode}
                exitAnyMode={exitAnyMode}
            />
        </>
    )
}

export default CommentSection