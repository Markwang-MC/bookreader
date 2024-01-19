import {useState,useEffect} from 'react'
import Input from "../components/input"
export default function Content({setSearchArray,setContent,chapter,setCur,cur,text,setLastcur,id}) {
  const [data,setData]=useState(false)
  const [search,setSearch]=useState(true)
  const [reviewText,setReviewText]=useState(false)
  const [checkMarks,setCheckMarks]=useState(false)
  const [bookMark,setBookMark]=useState([])
  const [box,setBox]=useState(-1)
  useEffect(()=>{
    var _data = JSON.parse(localStorage.getItem(id)).bookMark
    if (_data.constructor.toString()=='function Array() { [native code] }') setBookMark(_data)
  },[])
  useEffect(()=>{
    if (data=='') setSearch(true)
  },[data])
  if (!bookMark) return (<div className="fixed flex inset-0 place-content-center place-items-center">loading...</div>)
  console.log(bookMark);
  return (
    <div className={`w-[100%]`}>
      <div className='flex place-items-center'
      onTouchStart={(e)=>e.target.start=e.changedTouches[0].clientX}
      onTouchEnd={(e)=>{
        var start=e.target.start
        var end=e.changedTouches[0].clientX
        var _length=end-start
        if (_length>150&&!checkMarks) {
          setCheckMarks(true)
        }
        else if (_length>150&&checkMarks) {
          setCheckMarks(false)
        }
      }}>
        <Input setData={setData}/>
        <input className="ml-3 text-white border-2 border-solid" type="submit" value="Search" onClick={()=>{
          if(!data)return;
          var _arr = []
          text.map((item,i)=>{
            if (item.text.toLowerCase().indexOf(data)>-1) _arr.push(item)
          })
          setReviewText(_arr)
          setSearch(false)
        }}/>
      </div>
      {
        search&&!checkMarks&&chapter.map((item,i)=>{
          return (
            <div key={i} className={`${cur>=item.i?'text-gray-400':'text-white'} mx-[10px] my-[10px]`} onClick={()=>{
              setCur(item.i)
              setContent(false)
            }} onContextMenu={()=>setBox(i)}>{item.text}</div>
          )
        })
      }

      {
        !search&&!checkMarks&&reviewText.map((item,i)=>{
          return (
            <div key={i} className='text-white mx-[10px] my-7' onClick={()=>{
              setLastcur(cur)
              setCur(item.i)
              setSearchArray(reviewText)
              setContent(false)
            }}>{item.text}</div>
          )
        })
      }

      {
        checkMarks&&bookMark.map((item,i)=>{
          return (
            <div key={i} className='mx-[10px] mt-7 mb-12'>
              <div className='text-white' onClick={()=>{
                setCur(item.i)
                setContent(false)
              }} onContextMenu={()=>{
                if (box<0)setBox(i)
                else if (box>-1&&box!=i)setBox(i)
                else setBox(-1)
              }}>{item.text}</div>
              {
                box==i&&(
                  <div className='my-3'>
                    <div className='text-white mx-[10px] absolute' onClick={()=>{
                      var _arr=[]
                      for (var i = 0; i < bookMark.length; i++) {
                        if (bookMark[i].text!=item.text) _arr.push(bookMark[i])
                      }
                      var _notes = JSON.parse(localStorage.getItem(id)).notes
                      localStorage.setItem(id,JSON.stringify({cur:cur,notes:_notes,bookMark:_arr}))
                      setBookMark(_arr)
                    }}>Delete</div>
                    <div className='left-[30%] text-white mx-[10px] absolute'>nan</div>
                  </div>
                )
              }
            </div>
          )
        })
      }

    </div>
  )
}
// {
//   checkMarks&&bookMark.map((item,i)=>{
//     return(<>hi</>)
//     return (
//       <div key={i} className='text-white mx-[10px] my-7' onClick={()=>{
//         setCur(item.i)
//         setContent(false)
//       }} onContextMenu={()=>{
//         var _arr=[]
//         for (var i = 0; i < bookMark.length; i++) {
//           if (bookMark[i].text!=item.text) _arr.push(bookMark[i])
//         }
//         setBookMark(_arr)
//       }}>{item.text}</div>
//     )
//   })
// }


function a() {
  var _arr = [1,2,3,4,5]
  var [a1,b1,c1]=_arr
  var obj = {a:1,b:2,c:3}
  var {a,b,c} = obj
}
