import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
interface Props { accent?:string; style?:React.CSSProperties }
const looks=[
 {id:"001",title:"CONTROL LOST",name:"A study in restraint.",category:"LOOK / 001 — NEURAL BLACK",type:"LEATHER / HARDWARE / SILENCE",primary:"https://images.unsplash.com/photo-1759401909241-f554229ed260?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",secondary:"https://images.unsplash.com/photo-1633815475307-884ad652b80b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200"},
 {id:"002",title:"AFTER IMAGE",name:"Color is an interruption.",category:"LOOK / 002 — RED FREQUENCY",type:"FORM / AFTERIMAGE / ENERGY",primary:"https://images.unsplash.com/photo-1602323947593-41c553ff34d0?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",secondary:"https://images.unsplash.com/photo-1771580425735-7d7ce2419745?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200"},
 {id:"003",title:"BODY STATIC",name:"Unidentified by design.",category:"LOOK / 003 — DARK MATTER",type:"SHAPE / LIGHT / ARMOR",primary:"https://images.unsplash.com/photo-1760003024022-b07fd745aa1a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",secondary:"https://images.unsplash.com/photo-1760476406421-84e41744026f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200"},
 {id:"004",title:"FREQUENCY ZERO",name:"Everything becomes possible.",category:"LOOK / 004 — HUMAN ERROR",type:"CHAOS / CONTACT / UNKNOWN",primary:"https://images.unsplash.com/photo-1765334667070-1a897664141e?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",secondary:"https://images.unsplash.com/photo-1783543918700-dee295d5d1ac?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200"},
]
const mono:React.CSSProperties={fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:500,letterSpacing:".09em",lineHeight:1.5}
export default function SignalArchive({accent="#ED321D",style}:Props){
 const ref=React.useRef<HTMLDivElement>(null)
 const [w,setW]=React.useState(1200)
 const [active,setActive]=React.useState(0)
 const [mode,setMode]=React.useState("ORIGINAL")
 const [alt,setAlt]=React.useState(false)
 const [offline,setOffline]=React.useState(false)
 const [showInfo,setShowInfo]=React.useState(true)
 const touchX=React.useRef<number|null>(null)
 const reduced=useReducedMotion()
 const mobile=w<650,tablet=w<980
 React.useEffect(()=>{const el=ref.current;if(!el||typeof ResizeObserver==="undefined")return;const ro=new ResizeObserver(es=>setW(es[0]?.contentRect.width||el.clientWidth));ro.observe(el);setW(el.clientWidth);return()=>ro.disconnect()},[])
 React.useEffect(()=>{
   try{setOffline(window.sessionStorage.getItem("ns-mode")==="offline")}catch{}
   const handle=(e:Event)=>setOffline(Boolean((e as CustomEvent<{disconnected:boolean}>).detail?.disconnected))
   window.addEventListener("ns-mode",handle);return()=>window.removeEventListener("ns-mode",handle)
 },[])
 const choose=(n:number)=>{setActive((n+looks.length)%looks.length);setAlt(false)}
 const look=looks[active]
 const filter=offline?"grayscale(1) contrast(1.85)":mode==="MONO"?"grayscale(1) contrast(1.38)":mode==="INFRARED"?"sepia(1) saturate(3) hue-rotate(300deg) contrast(1.3)":"contrast(1.08)"
 const button=(content:string,onClick:()=>void,highlight=false)=><button type="button" onClick={onClick} style={{border:"1px solid "+(highlight?accent:"#47423F"),padding:mobile?"12px":"13px 16px",background:highlight?accent:"transparent",color:highlight?"#090909":"#EAE7E1",cursor:"pointer",...mono,fontWeight:600}}>{content}</button>
 const next=()=>choose(active+1)
 const prev=()=>choose(active-1)
 return <section ref={ref} id="ns-archive" aria-label="NO SIGNAL interactive fashion archive" style={{width:"100%",height:"100%",overflow:"hidden",position:"relative",color:"#F3F0EB",background:"#EAE5DF",fontFamily:"'Space Grotesk',sans-serif",...style}}>
   <div style={{position:"absolute",top:0,left:0,width:mobile?10:19,height:"100%",background:accent,zIndex:1}} aria-hidden="true"/>
   <div style={{height:"100%",display:"flex",flexDirection:"column",background:"#E9E4DE"}}>
    <div style={{display:"flex",flexDirection:mobile?"column":"row",justifyContent:"space-between",gap:mobile?12:30,alignItems:mobile?"start":"end",padding:mobile?"30px 23px 18px":"45px 5% 32px",color:"#090909",borderBottom:"1px solid #292521"}}>
       <div><div style={{...mono,fontSize:10,color:"#B42B22",marginBottom:12}}>[ CHAPTER / 03 ]     THE ARCHIVE</div><h2 style={{fontFamily:"'Syne',sans-serif",fontSize:mobile?31:tablet?60:82,letterSpacing:"-.075em",lineHeight:.96,fontWeight:800,margin:0}}>NOT A LOOKBOOK<span style={{color:accent}}>.</span></h2></div>
       <div style={{...mono,color:"#544A45",maxWidth:mobile?"100%":220,fontSize:mobile?10:11}}>FOUR IDENTITIES. ZERO PERMISSIONS.<br/>SELECT, ALTER, OR SCRAMBLE YOUR SIGNAL.</div>
    </div>
    <div style={{flex:1,display:"grid",minHeight:0,gridTemplateColumns:mobile?"minmax(0,1fr)":"minmax(0,1.16fr) minmax(0,.84fr)",gridTemplateRows:mobile?"420px minmax(0,1fr)":"minmax(0,1fr)"}}>
       <div onPointerDown={e=>{touchX.current=e.clientX}} onPointerUp={e=>{if(touchX.current!==null){const d=e.clientX-touchX.current;if(Math.abs(d)>55){d<0?next():prev()};touchX.current=null}}}
         onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();next()}if(e.key==="ArrowLeft"){e.preventDefault();prev()}}}
         tabIndex={0} role="region" aria-label="Image gallery, use left and right arrow keys to change looks"
         style={{position:"relative",overflow:"hidden",height:mobile?"420px":"100%",minHeight:mobile?0:430,background:"#101010",outlineOffset:-4}}>
         <AnimatePresence mode="wait" initial={false}>
          <motion.img key={active+"-"+(alt?"alt":"main")} src={alt?look.secondary:look.primary} alt={"Fashion editorial photograph for "+look.title} draggable={false}
           initial={reduced?false:{opacity:.5,x:40,scale:1.05}} animate={{opacity:1,x:0,scale:1}} exit={reduced?{opacity:1}:{opacity:0,x:-35}} transition={{duration:reduced?0:.42,ease:[.22,1,.36,1]}}
           style={{width:"100%",height:"100%",position:"absolute",inset:0,objectFit:"cover",objectPosition:"center 30%",filter,transition:reduced?"none":"filter 300ms ease",userSelect:"none"}}/>
         </AnimatePresence>
         {offline&&<div aria-hidden="true" style={{position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 8px,#E5342A44 9px,transparent 11px)",mixBlendMode:"screen",pointerEvents:"none"}}/>}
         <div style={{position:"absolute",top:mobile?12:24,left:mobile?13:24,right:mobile?13:24,display:"flex",justifyContent:"space-between",gap:12,alignItems:"start"}}>
          <span style={{background:accent,color:"#090909",padding:"9px 11px",...mono,fontWeight:700}}>{look.category}</span><span style={{padding:"9px 10px",background:"#0A0A0AAA",...mono,color:"#F5F0EA"}}>{String(active+1).padStart(2,"0")} / 04</span>
         </div>
         <div style={{position:"absolute",left:0,right:0,bottom:0,padding:mobile?"70px 16px 18px":"110px 28px 29px",background:"linear-gradient(transparent,#090909CC)",display:"flex",justifyContent:"space-between",alignItems:"end",gap:16}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:mobile?32:tablet?37:52,letterSpacing:"-.065em",lineHeight:.98}}>{look.title}</span>
          <span style={{...mono,whiteSpace:"nowrap",color:"#EBE5E0"}}>{alt?"ALT FRAME":"ORIGINAL FRAME"}</span>
         </div>
       </div>
       <div style={{display:"flex",flexDirection:"column",minHeight:0,background:"#101010",padding:mobile?"23px 18px 32px":tablet?"26px 22px":"38px 38px 32px",gap:mobile?14:24}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
          <span style={{...mono,color:accent}}>ARCHIVE INDEX / 0{active+1}</span><span style={{...mono,color:"#8D8984"}}>STATUS: {offline?"CORRUPTED":"OPEN"}</span>
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:16}}>
         <div style={{color:"#9E9791",...mono}}>{look.type}</div>
         <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active} initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={reduced?{opacity:1}:{opacity:0,y:-12}} transition={{duration:reduced?0:.3}}>
           <h3 style={{margin:0,fontFamily:"'Syne',sans-serif",fontSize:mobile?36:tablet?41:56,letterSpacing:"-.06em",lineHeight:1.02,fontWeight:800}}>{look.name}</h3>
          </motion.div>
         </AnimatePresence>
         <div style={{maxWidth:370,color:"#918C85",fontSize:mobile?13:15,lineHeight:1.5}}>This is a fictional concept collection. Each frame has a second identity. There is no correct way to view it.</div>
        </div>
        <div>
          <div style={{...mono,color:"#A7A29A",marginBottom:11}}>SELECT AN IMAGE / 001—004</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:8}}>
          {looks.map((x,i)=><button type="button" key={x.id} onClick={()=>choose(i)} aria-label={"View look "+(i+1)+": "+x.title} aria-pressed={active===i}
             style={{height:mobile?72:tablet?86:106,padding:0,border:active===i?"2px solid "+accent:"2px solid #444",background:"#181818",cursor:"pointer",position:"relative",overflow:"hidden"}}>
             <img alt="" aria-hidden="true" src={x.primary} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%",opacity:active===i?1:.55}}/>
             <span aria-hidden="true" style={{position:"absolute",bottom:0,right:0,fontSize:10,padding:"2px 4px",background:active===i?accent:"#0A0A0A",color:active===i?"#090909":"white",fontFamily:"monospace"}}>{i+1}</span>
           </button>)}
          </div>
        </div>
        <div style={{borderTop:"1px solid #47423E",paddingTop:18}}>
         <div style={{display:"flex",justifyContent:"space-between",...mono,color:"#A7A29A",marginBottom:12}}><span>COLOR SYSTEM</span><span>{mode==="ORIGINAL"?"A / 03":mode==="MONO"?"B / 03":"C / 03"}</span></div>
         <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}>
          {["ORIGINAL","MONO","INFRARED"].map(m=>button(m,()=>setMode(m),mode===m))}
         </div>
         <div style={{display:"flex",gap:8,flexWrap:mobile?"wrap":"nowrap"}}>
          <div style={{flex:1}}>{button(alt?"RESTORE ORIGINAL ↶":"REVEAL ALTERNATE ↗",()=>setAlt(v=>!v),false)}</div>
          {button("←",prev)}{button("→",next,true)}
         </div>
         <div style={{...mono,fontSize:10,color:"#85817C",marginTop:10}}>SWIPE / ARROW KEYS / OR SELECT A LOOK</div>
        </div>
       </div>
    </div>
   </div>
  </section>
}
addPropertyControls(SignalArchive,{accent:{type:ControlType.Color,title:"Accent",defaultValue:"#ED321D"}})
