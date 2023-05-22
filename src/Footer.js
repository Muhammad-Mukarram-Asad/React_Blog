import React from 'react'

function Footer() {
    const today = new Date();

  return (
    <footer className='Footer'>
        <p>Copyright &copy; {`${today.getDate()} / ${today.getMonth()+1} / ${today.getFullYear()}`}</p>
    </footer>
  )
}

export default Footer
