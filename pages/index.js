import {useState,useEffect} from "react"
import openDB from "../lib/indexdb"
import query from '../components/query.js';
import Addbook from '../components/addBook';
import Page from '../components/page';
import Input from '../components/input';
import IndexContent from '../components/indexContent';
// this is my function
export default function Index() {
  const [search,setSearch] = useState(false)
  const [data,setData] = useState(null)
  const [id,setId]=useState(-1)
  const [detail,setDetail]=useState(-1)
  const [description,setDescription]=useState(null)
  const [reset,setReset]=useState(false)
  const [inputData,setInputData]=useState(null)
  const [searchData,setSearchData]=useState(null)

  useEffect(()=>{
    if (!data)return ;
    var _arr = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().indexOf(inputData)>-1&&inputData) _arr.push(data[i])
    }
    setSearchData(_arr)
  },[inputData])

  useEffect(()=>{
    var db
    openDB()
    .then((_db)=>{
      db=_db;
      return query(db,'blobs',()=>true)
    })
    .then((_data)=>{
      for (var i = 0; i < _data.length; i++) {
        _data[i].src=URL.createObjectURL(_data[i].cover)
      }
      setData(_data)
      db.close_db()
    })
  },[reset])
  if (!data) return (<div className="fixed flex inset-0 place-content-center place-items-center">loading...</div>)
  if (id>-1) return (<Page back={setId} id={id} data={data}/>)
  for (var i = 0; i < data.length; i++) {
    if (!data[i].i)data[i].i=i
  }
  return (
    <div className="m-3 space-y-3">
      <div onTouchStart={(e)=>e.target.start=e.changedTouches[0].clientX}
      onTouchEnd={(e)=>{
        var start = e.target.start
        var end=e.changedTouches[0].clientX
        var _length=end-start
        if (_length>150) {
          if (searchData)setSearchData(null)
          setSearch(!search)
        }

      }}>
      {!search&&(<Addbook setReset={setReset} reset={reset} setData={setData} data={data}/>)}
      {
        search&&(
          <input className="mt-2 px-1 block border-2 border-solid w-full" type="text" name="" value={inputData} onChange={(e)=>{
            setInputData(e.target.value)
          }}/>
        )
      }
        {
          search&&searchData&&searchData.map((item,i)=>{
            return (
              <div className="flex flex-col items-center">
                <div className="mt-4 mb-2 relative w-[160px] h-[90px] shrink-0 overflow-hidden" onClick={()=>{
                  setId(item.i)
                  setSearch(null)
                  setSearchData(null)
                }}>
                  <img src={item.src} className="absolute inset-0"/>
                </div>
                <div className="mb-4">
                  <div className="text-center text-2xl max-h-[3.75rem] overflow-hidden text-[18px]">{item.title}</div>
                </div>
              </div>
            )
          })
        }
        <div className={`${search?"hidden":""}`}>
          {
            data&&data.map((item,i)=>{
              return (
                <div key={i} style={{'marginTop':'30px','marginBottom':'30px'}} className="mx-5 border-2 border-black bg-transparent flex flex-col items-center" onContextMenu={()=>{
                  openDB()
                  .then((db)=>{
                    return new Promise(function (suc,fai) {
                      db.delete({
                        tableName: 'blobs',
                        condition: recorditem => {
                          return recorditem.id == item.id
                        },
                        success: res => {
                          suc()
                          console.log('blobs删除成功')
                        }
                      })
                    })
                  })
                  var _arr=[]
                  if (data.length==1) localStorage.removeItem('seting')
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].id!=item.id) _arr.push(data[i])
                    else {
                      localStorage.removeItem(data[i].id)
                    }
                  }
                  setData(_arr)
                }}>
                <div className='absolute mb-5 left-[80%]' onClick={()=>{
                  var reader = new FileReader();
                  reader.readAsText(item.data)
                  reader.onload=function () {
                    setDescription(JSON.parse(reader.result))
                    if (detail!=i||detail<0)setDetail(i)
                    else setDetail(-1)
                  }
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
                </div>

                {
                  detail==i&&(
                    <div className='flex flex-col items-center'>
                    <div className="mt-4 mb-2 relative w-[160px] h-[90px] shrink-0 overflow-hidden">
                    <img src={item.src} onClick={()=>{
                      setDetail(-1)
                      setId(item.i)
                    }} className="absolute inset-0" />
                    </div>
                      <div>
                        <div className='text-2xl text-center overflow-hidden mb-[10px]'>Title: {description.title}</div>
                        <div className='text-2xl text-center overflow-hidden mb-[10px]'>Owner: {description.owner}</div>
                        <div className='text-2xl text-center overflow-hidden mb-[10px]' onClick={()=>open(description.owner_url)}>Owners Link</div>
                        <div className='text-2xl text-center overflow-hidden mb-[10px]'>Description: {description.description}</div>
                      </div>
                    </div>
                  )
                }

                {
                  detail!=i&&(
                    <div className="flex flex-col items-center">
                      <div className="mt-4 mb-2 relative w-[160px] h-[90px] shrink-0 overflow-hidden" onClick={()=>setId(item.i)}>
                        <img src={item.src} className="absolute inset-0" onClick={()=>setId(item.i)}/>
                      </div>
                      <div className="mb-4">
                        <div className="text-center text-2xl max-h-[3.75rem] overflow-hidden text-[18px]">{item.title}</div>
                      </div>
                    </div>
                  )
                }

                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
//<div>{item.owner}</div>
// git add .
// git commit -m "update"
// git push origin ver:main
