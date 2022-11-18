import React from 'react'
import { Loader } from 'react-feather';
import "./LoaderStyle.css";


const LoaderWrapper = ({ is_shown }) => {

  return (
    <div className={`progress_bg ${is_shown ? 'loading' : ''}`}>
      <Loader className='icon' />
    </div>
  )
}

export default LoaderWrapper;