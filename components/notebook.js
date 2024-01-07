import {createRef,useRef,useState,useEffect} from 'react'
export default function Notebook({back,data,cur,fontSize,setCur}) {
  var size=['text-lg','text-xl','text-2xl','text-3xl','text-4xl']
  const [notes,setNotes]=useState(null)
  const [originalText,setOriginalText]=useState(-1)
  useEffect(()=>{
    setNotes(JSON.parse(localStorage.getItem(data.id)).notes)
  },[])
  if (!notes) return (<div className="fixed flex inset-0 place-content-center place-items-center">loading...</div>)
  if (notes.length==0) return (<div className="fixed flex inset-0 place-content-center place-items-center" onClick={()=>back()}>{`You didn't have any nots yet, Click here to return`}</div>)
  return (
    <div>
      <div className={`${size[fontSize]} text-center mt-3 mb-[10px]`} onClick={()=>back(null)}>Back</div>
      {
        notes.map((item,i)=>{
          return (
            <div key={i} onContextMenu={()=>{
              if (originalText<0)setOriginalText(i)
              else if (originalText>-1) setOriginalText(-1)
            }}>
              <div className='my-4 pl-[20px] pr-[30px] flex justify-between'>
                <div className={size[fontSize]} onClick={()=>{
                  open(`https://cn.bing.com/dict/search?q=${item.text}&qs=n&form=Z9LH5&sp=-1&pq=hello&sc=7-5&sk=&cvid=252FEB12646845369183BF171742E21F&ghsh=0&ghacc=0&ghpl=`)
                }}>{item.text}</div>
                <div className={`${size[fontSize]} rounded border-black border-2 px-3`} onClick={()=>{
                  var _arr = []
                  for (var i = 0; i < notes.length; i++) {
                    if (notes[i].text!=item.text)_arr.push(notes[i])
                  }
                  setNotes(_arr)
                  localStorage.setItem(data.id,JSON.stringify({cur:cur,notes:_arr}))
                }}>Delete</div>
              </div>
              {
                originalText==i&&(
                  <div className={`${size[fontSize]} text-green-400 px-3`} onClick={()=>{
                    setCur(item.originText.i)
                    back(null)
                  }}>{item.originText.text}</div>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}
