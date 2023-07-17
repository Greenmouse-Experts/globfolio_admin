import React, {FC} from 'react'

interface Props {
  size: number
  name: string
  text: string
}
const Initials:FC<Props> = ({size, name, text}) => {

  const nameRow = name?.split(' ')
    const firstLetter = nameRow[0]?.charAt(0)
    const lastLetter = nameRow[1]?.charAt(0)
  return (
    <div className='circle flex gap-x-[1px] justify-center items-center fw-600 bg-primary text-white' style={{width:size, height:size}}>
        <p style={{ fontSize: text}} className='uppercase'>{firstLetter}</p>
        <p style={{ fontSize: text}}  className='uppercase'>{lastLetter}</p>
    </div>
  )
}

export default Initials