import { useState, useEffect } from 'react'
import data from '../../data.json'
import Comment from './Comment'
import AddComment from './AddComment'

function CommentSection() {
    
    const [commentsArr, setCommentsArr] = useState(data.comments)

    const [textInput, setTextInput] = useState('')
    
    const [editingComment, setEditingComment] = useState('')
    const [replyTo, setReplyTo] = useState('')
    
    const [editMode, setEditMode] = useState(false)    
    const [replyMode, setReplyMode] = useState(false)

    const [votedComments, setVotedComments] = useState([])


    function getRepliedComment(id) {
        const lookingInReplies = () => {
            const commentsWithReplies = []
            for (let i = 0; i < commentsArr.length; i ++) {
                if (commentsArr[i].replies.length > 0) {
                    commentsWithReplies.push(commentsArr[i])
                }
            }
            for (let i = 0; i < commentsWithReplies.length; i ++) {
                for (let n = 0; n < commentsWithReplies[i].replies.length; n ++) {
                    if (commentsWithReplies[i].replies[n].id === id) {
                        return commentsWithReplies[i]
                    }
                }
            }
        }
        return lookingInReplies()
    }


    function getChosenComment(id) {
        const lookingInComments = commentsArr.find(el => el.id === id)
        const lookingInReplies = () => {
            const commentsWithReplies = []
            for (let i = 0; i < commentsArr.length; i ++) {
                if (commentsArr[i].replies.length > 0) {
                    commentsWithReplies.push(commentsArr[i])
                }
            }
            for (let i = 0; i < commentsWithReplies.length; i ++) {
                for (let n = 0; n < commentsWithReplies[i].replies.length; n ++) {
                    if (commentsWithReplies[i].replies[n].id === id) {
                        return commentsWithReplies[i].replies[n]
                    }
                }
            }
        }
        return lookingInComments ? lookingInComments : lookingInReplies()
    }

    function getScoreOfReply(id) {
        const indexOfRepliedComment = data.comments.findIndex(el => el.id === getRepliedComment(id).id)
        const replyInArr = data.comments[indexOfRepliedComment].replies
        const indexOfReply = replyInArr.findIndex(el => el.id === getChosenComment(id).id)
        const thisReply = replyInArr[indexOfReply]
        return thisReply ? thisReply.score : ''
    }
    function getScoreOfComment(id) {
        const indexOfRepliedComment = data.comments.findIndex(el => el.id === getChosenComment(id).id)
        const thisComment = data.comments[indexOfRepliedComment]
        return thisComment ? thisComment.score : ''
    }
    
    function updateScore(id, action) {
        if (getChosenComment(id).replyingTo) {
            setCommentsArr(prevDataArr => {
                const newArr = prevDataArr.map(item => {
                    if (item.id === getRepliedComment(id).id) {
                        const newReplies = getRepliedComment(id).replies.map(reply => {


                            if (reply.id === id) {
                                if(getScoreOfReply(id)) {
                                    return {
                                        ...reply,
                                        score: action === true ?
                                            getScoreOfReply(id) + 1 :
                                            action === false ?
                                            getScoreOfReply(id) - 1 :
                                            getScoreOfReply(id)
                                    }
                                } else {
                                    return {
                                        ...reply,
                                        score: action === true ? 1 : action === false ? -1 : 0
                                    }
                                }
                            } else {
                                return reply
                            }
                        })
                        return {...item, replies: newReplies}
                    } else {
                        return item
                    }
                })
                return newArr
            })
        } else {
            setCommentsArr(prevDataArr => {
                const newArr = prevDataArr.map(item => {
                    if (item.id === id) {
                        if(getScoreOfComment(id)) {
                            return {
                                ...item,
                                score: action === true ?
                                getScoreOfComment(id) + 1 :
                                action === false ?
                                getScoreOfComment(id) - 1 :
                                getScoreOfComment(id)
                            }
                        } else {
                            return {
                                ...item,
                                score: action === true ? 1 : action === false ? -1 : 0
                            }
                        }
                    } else {
                        return item
                    }
                })
                return newArr
            })
        }
        setVotedComments(prevComment => {
            const newArr = [...prevComment]
            if (!newArr.find(el => el.id === id)) {
                newArr.push({id: id, upvoted: action})
                return newArr
            } else {
                return newArr.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            upvoted: action
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }


    function upvote(id) {
        // If comment hasn't been upvoted or voted:
        if (!votedComments.find(el => el.id === id) || votedComments.find(el => el.id === id && !el.upvoted)) {
            updateScore(id, true)
        } else {
            updateScore(id, undefined)
        }
    }


    function downvote(id) {
        // If comment hasn't been downvoted or voted:
        if (!votedComments.find(el => el.id === id) || votedComments.find(el => el.id === id && (el.upvoted || el.upvoted === undefined))) {
            updateScore(id, false)
        } else {
            updateScore(id, undefined)
        }
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
        // Edit a comment
        if (editMode && textInput.length > 0) {
            editingComment.content = textInput
            exitAnyMode()

        // Add a reply
        } else if (replyMode && textInput.length > 0) {

            // Reply to a reply
            if (editingComment.replyingTo) {
                const index = commentsArr.indexOf(replyTo)
                editingComment.replies = []
                setCommentsArr(prevArr => {
                    const repliesArr = [...replyTo.replies]
                    const indexOfNewReply = replyTo.replies.indexOf(editingComment) + 1
                    repliesArr.splice(indexOfNewReply, 0, {
                        id: maxId + 1,
                        content: textInput,
                        createdAt: "today",
                        score: 0,
                        replyingTo: editingComment.user.username,
                            user: {
                                image: data.currentUser.image,
                                username: data.currentUser.username
                            }
                    })
                    setMaxId(prevId => prevId + 1)
                    return prevArr.map((comment, i) => {
                        if (i === index) {
                            return {...comment, replies: repliesArr}
                        }
                        return comment
                    })
                })

            // Reply to a comment
            } else {
                const index = commentsArr.indexOf(editingComment)
                setCommentsArr(prevArr => {
                    const repliesArr = [...editingComment.replies]
                    repliesArr.unshift({
                        id: maxId + 1,
                        content: textInput,
                        createdAt: "today",
                        score: 0,
                        replyingTo: editingComment.user.username,
                        user: {
                            image: data.currentUser.image,
                            username: data.currentUser.username
                        }
                    })
                    setMaxId(prevId => prevId + 1)
                    return prevArr.map((comment, i) => {
                        if (i === index) {
                            return {...comment, replies: repliesArr}
                        }
                        return comment
                    })
                })
            }
            exitAnyMode()

        // Add a comment
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
        setTextInput('')
    }


    function deleteComment(id) {
        const commentToEdit = getRepliedComment(id)
        if (commentToEdit) {
            setCommentsArr(prevArr => {
                const index = prevArr.indexOf(commentToEdit)
                return prevArr.map((comment, i) => {
                    if (i === index) {
                        const indexOfReply = commentToEdit.replies.indexOf(getChosenComment(id))
                        const editedReplies = comment.replies.map((reply, n) => {
                            return n !== indexOfReply ? reply : null
                        }).filter(Boolean) // solving by ChatGPT :)
                        return { ...comment, replies: editedReplies }
                    }
                    return comment
                })
            })
        } else {
            const index = commentsArr.indexOf(getChosenComment(id))
            setCommentsArr(prevArr => {
                const newArr = []
                for (let i = 0; i < prevArr.length; i ++) {
                    i !== index ? newArr.push(prevArr[i]) : ''
                }
                return newArr
            })
        }
        editMode ? exitAnyMode() : ''
    }


    function exitAnyMode() {
        setEditMode(false)
        setReplyMode(false)
        setTextInput('')
    }


    function editComment(id) {
        exitAnyMode()
        setEditingComment(getChosenComment(id))
        setTextInput(getChosenComment(id).content)
        setEditMode(true)
    }


    function replyToComment(id) {
        exitAnyMode()
        setEditingComment(getChosenComment(id))
        setReplyTo(getRepliedComment(id))
        setReplyMode(true)
    }



    
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
                            replyToComment={() => replyToComment(item.id)}
                        />
                        {
                            item.replies.map(reply => (
                                <Comment
                                    key={reply.id}
                                    id={reply.id}
                                    score={reply.score}
                                    image={reply.user.image.png}
                                    username={reply.user.username}
                                    createdAt={reply.createdAt}
                                    replyingTo={reply.replyingTo}
                                    content={reply.content}

                                    style="ml-16"
                                    sm_style="ml-8"
                        
                                    upvote={() => upvote(reply.id)}
                                    downvote={() => downvote(reply.id)}
                                    deleteComment={() => deleteComment(reply.id)}
                                    editComment={() => editComment(reply.id)}
                                    replyToComment={() => replyToComment(reply.id)}
                                />
                            ))
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
