import {useState,useEffect} from 'react'
import Input from "../components/input"
import Page from './page.js';
export default function Search({back,text,cur,setCur}) {
  const [data,setData]=useState(false)
  const [reviewText,setReviewText]=useState(false)
  return (
    <div>
      <div className='mt-1 mb-2 rounded-full w-[20%] text-lg text-center bg-black text-white' onClick={()=>{
        back(false)
      }}>Back</div>
      <div className='flex place-items-center'>
        <Input setData={setData}/>
        <input type="submit" value="submit" onClick={()=>{
          if(!data)return;
          var _arr = []
          text.map((item,i)=>{
            if (item.text.indexOf(data)>-1) {
              _arr.push(item)
            }
          })
          setReviewText(_arr)
          console.log(_arr);
        }}/>
      </div>
      {
        reviewText&&reviewText.map((item,i)=>{
          return (
            <div key={i} className="my-[10px] text-xl rounded-md">{item.text}</div>
          )
        })
      }
    </div>
  )
}
