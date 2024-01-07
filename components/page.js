import {createRef,useRef,useState,useEffect} from 'react'
import Content from './content.js';
import Notebook from './notebook.js';
import Search from './search.js';
import Set from './set.js';
export default function Page({back,id,data}) {
  console.log({id});
  const [selectI,setSelectI]=useState(null)
  const [text,setText]=useState(data[id])
  const [reviewText,setReviewText]=useState(null)
  const [cur,setCur]=useState(JSON.parse(localStorage.getItem(data[id].id)).cur)
  const [lastcur,setLastcur]=useState(null)
  const [chapter,setChapter]=useState(null)
  const [bookMark,setBookMark]=useState(JSON.parse(localStorage.getItem(data[id].id)).bookMark)
  const [content,setContent]=useState(false)
  const [searchArray,setSearchArray]=useState(false)
  const [search,setSearch]=useState(false)
  const [selection,setSelection]=useState(null)
  const [positon,setPosition]=useState(0)
  const [fontSize,setFontSize]=useState(JSON.parse(localStorage.getItem('seting')).fontSize)
  const [set,setSet]=useState(null)
  const [notes,setNotes]=useState(null)
  const [edit,setEdit]=useState(null)
  const [description,setDescription]=useState(null)
  const [firstPage,setFirstPage]=useState(false)

  var size=['text-lg','text-xl','text-2xl','text-3xl','text-4xl']
  var stick = useRef(null)
  useEffect(()=>{
    var reader = new FileReader();
    reader.readAsText(data[id].data)
    reader.onload=function () {
      setDescription(JSON.parse(reader.result))
    }
  },[])

  useEffect(()=>{
    var reader = new FileReader();
    reader.readAsText(data[id].text)
    reader.onload=function () {
      var result=reader.result
      var _arr=[]
      result=result.split('\n')
      result=result.map((item,i)=>{
        if (item.indexOf('##')>-1&&item.indexOf(',')>-1) _arr.push({text:item.slice(2),i:i})
        return item={text:item,i:i}
      })
      setText(result)
      setChapter(_arr);
    }
  },[])
  useEffect(()=>{
    if (!text.length) return
    var _arr = []
    for (var i = 0; i < text.length; i++) {
      if (i>cur-5&&i<cur+5) _arr.push(text[i])
    }
    if (search) setSearch(false)
    setReviewText(_arr)
    if (reviewText) setPosition((stick.current.clientWidth-65)*(cur/text.length))
  },[text,cur])

  useEffect(()=>{
    if (document.getElementById(cur)) {
      document.getElementById(cur).scrollIntoView({
          block: 'center',
          behavior: 'smooth'
      })
    }
  },[reviewText,notes,cur,set])

  var start;
  useEffect(()=>{
    if(!start)return;
    var _notes=JSON.parse(localStorage.getItem(data[id].id)).notes
    localStorage.setItem(data[id].id,JSON.stringify({cur:cur,notes:_notes,bookMark:bookMark}))
  },[bookMark])
  if (notes) return (<Notebook back={setNotes} data={data[id]} cur={cur} fontSize={fontSize} setCur={setCur}/>)
  if (set) return (<Set fontSize={fontSize} setFontSize={setFontSize} back={setSet}/>)
  if (!description||!chapter||cur==null||!reviewText) return (<div className="fixed flex inset-0 place-content-center place-items-center">loading...</div>)
  return (
    <div>
      {
        !firstPage&&(
          <div className="flex px-3 fixed z-50 h-[60px] inset-x-0 top-0 place-items-center bg-cyan-300"
          onTouchStart={(e)=>e.target.start=e.changedTouches[0].clientX}
          onTouchEnd={(e)=>{
            var start = e.target.start
            var end=e.changedTouches[0].clientX
            var _length=end-start
            if (_length>150)setNotes(true)
            if (_length<-150&&search) setEdit(true)
            // setSearch(false)
            // alert('noted')
          }}>
            <div className="grow-0 basis-14">
              <div style={{'backgroundImage':`url(${data[id].src})`}} className="bg-cover rounded w-[50px] h-[50px]" onClick={()=>{
                var _arr = JSON.parse(localStorage.getItem(data[id].id)).notes
                localStorage.setItem(data[id].id,JSON.stringify({cur:cur,notes:_arr,bookMark:bookMark}))
                back(-1)
              }}></div>
            </div>
            <div className='grow basis-14 px-3 text-xl text-center overflow-y-hidden'>
              {data[id].title}
            </div>
            <div className="grow-0 basis-14 flex place-content-end" onClick={()=>setContent(!content)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>
            </div>
          </div>
        )
      }
      {
        content&&(
          <div className={`pt-[65px] pb-[20px] bg-gray-700/95 fixed inset-0 overflow-y-auto`}>
            <Content setSearchArray={setSearchArray} setContent={setContent} chapter={chapter} setCur={setCur} cur={cur} text={text} setLastcur={setLastcur} id={data[id].id}/>
          </div>
        )
      }
      {
        edit&&(
          <div className='mx-3 flex h-[250px] mt-[65px] fixed inset-0 overflow-y-auto'>
            <textarea className="text-xl" name="name" rows="5" cols="25" onTouchStart={(e)=>{
              e.target.start=e.changedTouches[0].clientX
            }} onTouchEnd={(e)=>{
              var start=e.target.start
              var end=e.changedTouches[0].clientX
              var value=e.target.value
              var _length=end-start
              if (_length<-200){
                var _arr = JSON.parse(localStorage.getItem(data[id].id)).notes
                for (var i = 0; i < _arr.length; i++) {
                  if (_arr[i].text==search) return;
                }
                _arr.push({text:search,originText:text[selectI],notes:value})
                localStorage.setItem(data[id].id,JSON.stringify({cur:cur,notes:_arr,bookMark:bookMark}))
                alert('noted')
                setEdit(null)
              }
              if (_length>200)setEdit(null)
            }}></textarea>
          </div>
        )
      }
      <div ref={stick} className={`bg-cyan-300 h-[50px] top-[94%] flex items-center justify-around ${content?'':'inset-x-0 fixed'}`} onClick={(e)=>{
        // offsetX/width = cur/total
        var width=e.target.clientWidth-65
        var end = e.clientX
        if (end>width) return;
        const rect = event.target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        setPosition(offsetX)
        var _cur=Math.floor(text.length*offsetX/width)
        setCur(_cur)
      }}>

        <div style={{left:positon+'px'}} className={`${search?'hidden':'block'} h-8 absolute text-red-500 text-3xl my-[10px]`}>|</div>

        <div className={`${search?'block':'hidden'}`} onClick={()=>{
            open(`https://cn.bing.com/dict/search?q=${search}&qs=n&form=Z9LH5&sp=-1&pq=hello&sc=7-5&sk=&cvid=252FEB12646845369183BF171742E21F&ghsh=0&ghacc=0&ghpl=`)
            setSearch(false)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>

        <div className={`${search?'block':'hidden'}`} onClick={()=>{
          setBookMark([...bookMark,{text:text[selectI].text,i:selectI}])
          setSearch(false)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          </svg>
        </div>

        <div className={`${lastcur?'block':'hidden'} text-2xl`} onClick={()=>{
          for (var i = 0; i < searchArray.length; i++) {
            if (searchArray[i].i==cur) {
              setCur(searchArray[i+1].i)
            }
          }
        }}>+</div>
        <div className={`${lastcur?'block':'hidden'} text-2xl`} onClick={()=>{
          for (var i = 0; i < searchArray.length; i++) {
            if (searchArray[i].i==cur) {
              setCur(searchArray[i-1].i)
            }
          }
        }}>-</div>
        <div style={{'right':'5px'}} className='absolute w-[30px] flex justify-between items-center'>
          <div onClick={()=>{
            setSet(true)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
          </svg>
          </div>
        </div>
      </div>

      <div className="mx-[10px] mt-[70px]">
      {
        !firstPage&&reviewText&&reviewText.map((item,i)=>{
          return (
            <div key={i} id={item.i} className={`my-[10px] ${size[fontSize]} rounded-md ${cur!=item.i?'':lastcur&&cur==item.i?'bg-cyan-200':'bg-lime-300'}`} onClick={()=>{
              if(lastcur&&item.i==cur){
                setCur(lastcur)
                setLastcur(null)
                return;
              }
              else if (lastcur&&item.i!=cur) setLastcur(null)
              setCur(item.i)
              setSearch(false)
            }} onContextMenu={()=>{
              setSelection(window.getSelection())
              if (!selection) return;
              if (selection.type=='Range') {
                setSearch(selection.toString())
                setSelectI(item.i)
              }
              else setSearch(null)
            }}>{item.text}</div>
          )
        })
      }
      </div>
    </div>
  )
}
