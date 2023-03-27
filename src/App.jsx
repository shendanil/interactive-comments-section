import { useState } from 'react'

import CommentSection from './assets/components/CommentSection'
import CommentSectionTest from './assets/components/CommentSectionTest'

import Attribution from './assets/components/Attribution'
import './index.css'

function App() {
  return (
    <div className='scroll-smooth bg-gradient-to-tr from-indigo-200 to-violet-100 h-full p-12 sm:p-4'>
      {/* <CommentSection /> */}
      <CommentSectionTest />
      <Attribution />
    </div>
  )
}

export default App
