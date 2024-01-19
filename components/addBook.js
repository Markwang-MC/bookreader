import {useEffect,useState,useRef} from "react"
import openDB from "../lib/indexdb"
import query from '../components/query.js';
export default function AddBook({setReset,reset,setData,data}) {
  const [infos,setInfos] = useState(null)
  const [blobs,setBlobs] = useState(null)
  const [add,setAdd]=useState(false)
  var input = useRef(null)
  // useEffect(()=>{
  //   openDB()
  //   .then((_db)=>{
  //     _db.delete_db()
  //   })
  //
  // },[])
  return (
    <div>
      <div className='rounded-lg text-xl w-[100%] text-center bg-slate-400 h-8' onClick={()=>{
        input.current.click()
      }}>+</div>
      <input ref={input} className="hidden block border-2 border-solid" type='file' multiple placeholder='files' name="files" onChange={(e)=>{
        e.preventDefault()
        var form = e.target
        var {title,files} = form
        var text,cover,_data
        for (var i = 0; i < files.length; i++) {
          if (files[i].name=='cover.jpg') cover=files[i]
          else if (files[i].name=='text.md') text=files[i]
          else if (files[i].name=='data.json') _data=files[i]
        }
        var reader = new FileReader();
        reader.readAsText(_data)
        reader.onload=function () {
          var result=reader.result
          result=JSON.parse(result)
          var obj={owner:result.owner,title:result.title,id:result.id,data:_data,text:text,cover:cover}
          var _arr=data?data:[];
          _arr.push(obj)
          // for (var i = 0; i < _arr.length; i++) {
          //   if (!_arr[i].i)_arr[i].i=i
          // }
          openDB()
          .then((db)=>{
            db.insert({
                tableName: 'blobs',
                data: _arr,
                success: () => {
                  console.log('添加成功')
                  setData(_arr)
                  setReset(!reset)
                }
              })
            })
            var _obj = JSON.stringify({cur:0,notes:[],bookMark:[]})
            localStorage.setItem(obj.id,_obj)
            if(!JSON.parse(localStorage.getItem('seting'))){
              _obj = JSON.stringify({fontSize:1})
              localStorage.setItem('seting',_obj)
            }
        }
      }}/>
    </div>
  )
}


//The Murder of Roger Ackroyd
//
// function useLocal(key,default) {
//   const [data,setData] = useState(null)
//   useEffect(()=>{
//     var _data = localStorage.getItem(key)
//     _data = _data?JSON.parse(_data):default
//     setData(_data)
//   },[])
//   useEffect(()=>{
//     localStorage.setItem(key,JSON.stringify(data))
//   },[data])
//   return [data,setData]
// }
// const [favor,setFavor] = useLocal("favorate",{key,0})
