import {useState,useEffect} from 'react'
export default function Input({setData}) {
  const [change,setChange] = useState('')
  return (
      <input className="ml-1 block border-2 border-solid" type="text" name="" value={change} onChange={(e)=>{
        setChange(e.target.value)
      }} onBlur={()=>{
        if (change==''){
          setData(false)
         }
        setData(change)
      }}/>
  )
}
