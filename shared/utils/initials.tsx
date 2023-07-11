import React, {FC} from 'react'

interface Props {
  size: number
  fname: string
  lname: string
  text: string
}
const Initials:FC<Props> = ({size, fname, lname, text}) => {

  return (
    <div className='circle flex justify-center items-center fw-600 bg-primary text-white' style={{width:size, height:size}}>
        <p style={{ fontSize: text}}>{fname.charAt(0)}</p>
        <p style={{ fontSize: text}}>{lname.charAt(0)}</p>
    </div>
  )
}

export default Initials