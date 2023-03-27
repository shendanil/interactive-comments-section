import React, { useState } from 'react'
import data from '../../data.json'

function AddComment(props) {

    return (
        <>
            {props.editMode || props.replyMode ?
                <div className='bg-white rounded-t-md px-6 pt-4 flex items-center justify-between gap-4 mt-4'>
                    <div className='flex items-center gap-4 w-full'>
                        <svg width="15" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5B21B6"/></svg>
                        <div className='w-0.5 h-10 bg-violet-800 rounded-sm'></div>
                        <div className='w-full'>
                            <p className='text-violet-800 font-semibold'>{props.editMode ? "Edit Message" : "Reply"}</p>
                            <p className='line-clamp-1'>{props.editingComment}</p>
                        </div>
                    </div>
                    <p className='text-violet-800 cursor-pointer' onClick={props.exitAnyMode}>✕</p>
                </div>
            : ''}
            <div className={`${!props.editMode && !props.replyMode ? 'rounded-md mt-4' : ''} bg-white rounded-b-md p-6 flex gap-4`} id="add-comment">
                <img className='w-12 h-12 sm:hidden' alt='' src={data.currentUser.image.png}></img>
                <form className='w-full flex align-top gap-4 sm:flex-wrap'>
                    <textarea
                        className='w-full h-24 border-2 px-4 py-2 rounded-md sm:order-1'
                        id='text-area'
                        onChange={props.handleChange}
                        value={props.textInput}
                        placeholder='Add a comment...'
                    />
                    <button className='bg-violet-800 text-white font-medium px-4 py-2 rounded-md h-fit hover:opacity-50 transition ease duration-200 sm:w-full' onClick={props.handleClick}>{props.btnText}</button>
                </form>
            </div>
        </>
    )
}

export default AddComment