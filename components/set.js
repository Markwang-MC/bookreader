export default function Set({setContentWidth,contentWidth,fontSize,setFontSize,back}) {
  var size=['text-lg','text-xl','text-2xl','text-3xl','text-4xl']
  var start
  var font=fontSize
  var width=contentWidth
   return (
    <div className='h-full w-full absolute top-[10%]' onContextMenu={()=>{
      var _obj = JSON.stringify({fontSize:fontSize})
      localStorage.setItem('seting',_obj)
      back(null)
    }}>
      <div className='w-full mb-5 '>
        <div className={`${size[fontSize]} overflow-hidden h-[10%] text-center my-5`}
        onTouchStart={(e)=>start=e.changedTouches[0].clientX}
        onTouchEnd={(e)=>{
          var end=e.changedTouches[0].clientX
          var _length=end-start
          if(_length>50) {
            if (fontSize++>size.length)return;
            setFontSize(fontSize++)
          }
          else if (_length<-50) {
            if (fontSize--<0)return;
            setFontSize(fontSize--)
          }
        }}>This is how it looks like</div>
      </div>
    </div>
  )
}
