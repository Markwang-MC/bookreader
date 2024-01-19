export default function indexContent({search,setId,setDetail,detail,description,setDescription,data,setData}) {
  console.log({data});
  return (
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
                  console.log(data[i]);
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
                  setId(i)
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
                <div className="mt-4 mb-2 relative w-[160px] h-[90px] shrink-0 overflow-hidden" onClick={()=>setId(i)}>
                <img src={item.src} className="absolute inset-0" onClick={()=>{
                  console.log(i);
                  setId(i)
                }}/>
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
  )
}
