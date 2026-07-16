import { useState } from "react";

export default function ChatBot() {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState({
    width: 380,
    height: 560
  });


  const sendMessage = async () => {

    if(!message.trim()) return;


    const userMessage = message;


    setChat(prev => [
      ...prev,
      {
        sender:"user",
        text:userMessage
      }
    ]);


    setMessage("");
    setLoading(true);


    try{

      const res = await fetch(
        "http://localhost:5000/api/chat",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            message:userMessage
          })
        }
      );


      const data = await res.json();


      setChat(prev => [
        ...prev,
        {
          sender:"bot",
          text:data.reply
        }
      ]);


    }
    catch(err){

      setChat(prev=>[
        ...prev,
        {
          sender:"bot",
          text:"Unable to connect with Herbal AI."
        }
      ]);

    }
    finally{
      setLoading(false);
    }

  };





  const resizeChat = (e)=>{

    const width =
      window.innerWidth - e.clientX - 24;


    const height =
      window.innerHeight - e.clientY - 24;


    setSize({

      width:Math.min(
        Math.max(width,320),
        650
      ),

      height:Math.min(
        Math.max(height,420),
        850
      )

    });

  };





  const startResize = (e)=>{

    e.preventDefault();


    const move = (event)=>{
      resizeChat(event);
    };


    const stop = ()=>{

      window.removeEventListener(
        "mousemove",
        move
      );

      window.removeEventListener(
        "mouseup",
        stop
      );

    };


    window.addEventListener(
      "mousemove",
      move
    );


    window.addEventListener(
      "mouseup",
      stop
    );

  };





return (

<>


{/* Floating Icon */}

{
!open &&

<div
className="
fixed bottom-6 right-6
z-[9999]
flex flex-col items-end gap-3
"
>


<div
className="
bg-black
border border-yellow-400
text-yellow-300
px-5 py-3
rounded-2xl
shadow-xl
animate-bounce
text-sm
"
>

🌿 Hi, I am Groq Herbal Assistant

<br/>

<span className="text-gray-400 text-xs">
Ask about herbs & traceability
</span>

</div>



<button

onClick={()=>setOpen(true)}

className="
w-24 h-24
rounded-full
bg-gradient-to-br
from-green-950
via-green-700
to-black
border-4
border-yellow-400
text-5xl
shadow-[0_0_35px_rgba(234,179,8,0.8)]
hover:scale-110
transition
animate-pulse
"

>

🌿

</button>


</div>

}






{/* Chat Box */}


{
open &&

<div

style={{
width:`${size.width}px`,
height:`${size.height}px`
}}

className="
fixed
bottom-6
right-6
z-[9999]
rounded-3xl
overflow-hidden
bg-black
border
border-yellow-400/40
shadow-2xl
flex
flex-col
"

>





{/* Header */}

<div

className="
flex
justify-between
items-center
px-5
py-4
bg-gradient-to-r
from-green-950
to-black
border-b
border-green-700
"

>


<div className="flex gap-3 items-center">


<div

className="
w-12
h-12
rounded-full
bg-green-800
border
border-yellow-400
flex
items-center
justify-center
text-2xl
"

>

🌱

</div>



<div>

<h2

className="
text-xl
font-bold
bg-gradient-to-r
from-yellow-300
to-yellow-500
bg-clip-text
text-transparent
"

>

Groq Herbal AI

</h2>


<p className="text-xs text-green-300">
● Online Assistant
</p>


</div>


</div>



<button

onClick={()=>setOpen(false)}

className="
text-gray-300
hover:text-yellow-400
text-2xl
"

>

✕

</button>


</div>






{/* Messages */}


<div

className="
flex-1
overflow-y-auto
p-4
bg-gradient-to-b
from-green-950
to-black
"

>


{
chat.length===0 &&

<div
className="
text-center
mt-20
text-gray-400
"
>

<div className="text-6xl">
🌿
</div>


<p className="text-yellow-300 mt-4">
Welcome to Herbal AI
</p>




</div>

}





{
chat.map((item,index)=>(


<div

key={index}

className={`
flex gap-2 mb-3
${item.sender==="user"
?"justify-end"
:"justify-start"}
`

}

>


{
item.sender==="bot" &&

<div
className="
w-8 h-8
rounded-full
bg-green-700
flex
items-center
justify-center
"
>
🌿
</div>

}



<div

className={`
max-w-[75%]
px-4 py-3
rounded-2xl
text-sm

${
item.sender==="user"

?
"bg-green-700 text-white rounded-br-none"

:

"bg-gray-900 border border-green-700 text-gray-200 rounded-bl-none"

}

`}

>

{item.text}

</div>


</div>


))

}





{
loading &&

<p className="text-green-300 text-sm">
🌱 Herbal AI is thinking...
</p>

}


</div>







{/* Input */}

<div

className="
p-4
bg-green-950
border-t
border-green-800
"

>

<div className="flex gap-2">


<input

value={message}

onChange={(e)=>setMessage(e.target.value)}

onKeyDown={(e)=>{
if(e.key==="Enter")
sendMessage();
}}

placeholder="Ask Herbal AI..."

className="
flex-1
px-4
py-3
rounded-xl
bg-black
border
border-green-700
text-white
outline-none
"

/>



<button

onClick={sendMessage}

className="
px-5
rounded-xl
bg-gradient-to-r
from-yellow-400
to-yellow-600
text-black
font-bold
"

>

➤

</button>


</div>

</div>





{/* Resize Handle */}

<div

onMouseDown={startResize}

className="
absolute
bottom-1
right-1
w-6
h-6
cursor-se-resize
text-yellow-400
text-xl
"

>



</div>



</div>

}


</>

);

}