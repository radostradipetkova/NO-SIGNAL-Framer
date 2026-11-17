import * as React from "react"
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
interface Props {
  coverImage?: string
  edition?: string
  headline?: string
  accent?: string
  style?: React.CSSProperties
}

const COVER = "https://images.unsplash.com/photo-1759401874731-1f5eab7acf8f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400"
const mono: React.CSSProperties = { fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: ".09em", lineHeight: 1.45 }

function moveTo(id: string) {
  if (typeof document !== "undefined") document.getElementById(id)?.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth"})
}
export default function NoSignalOpening({coverImage=COVER,edition="ISSUE 001 — THE INTERRUPTION",accent="#ED321D",style}:Props) {
  const ref=React.useRef<HTMLDivElement>(null)
  const [w,setW]=React.useState(1200)
  const [offline,setOffline]=React.useState(false)
  const reduced=useReducedMotion()
  const mobile=w<600, tablet=w<900
  const {scrollYProgress}=useScroll({target:ref,offset:["start start","end start"]})
  const imageShift=useTransform(scrollYProgress,[0,1],["0px","145px"])
  const headlineShift=useTransform(scrollYProgress,[0,1],["0px","-65px"])
  React.useEffect(()=>{
    const el=ref.current
    if(!el||typeof ResizeObserver==="undefined")return
    const obs=new ResizeObserver(items=>setW(items[0]?.contentRect.width||el.clientWidth))
    obs.observe(el);setW(el.clientWidth);return()=>obs.disconnect()
  },[])
  React.useEffect(()=>{
    if(typeof window==="undefined")return
    try {setOffline(window.sessionStorage.getItem("ns-mode")==="offline")} catch {}
  },[])
  const toggle=()=>{
    const val=!offline
    setOffline(val)
    try {window.sessionStorage.setItem("ns-mode",val?"offline":"online")}catch{}
    window.dispatchEvent(new CustomEvent("ns-mode",{detail:{disconnected:val}}))
  }
  const navItem=(label:string,id:string)=><button type="button" onClick={()=>moveTo(id)} style={{background:"transparent",color:"#F4F0EA",border:0,cursor:"pointer",padding:"12px 7px",...mono,fontSize:mobile?9:11,opacity:.88}}>{label}</button>
  return <div ref={ref} style={{width:"100%",height:"100%",position:"relative",overflow:"hidden",background:"#0B0B0B",color:"#F4F0EA",fontFamily:"'Space Grotesk',sans-serif",isolation:"isolate",...style}}>
    <div aria-hidden="true" style={{position:"absolute",inset:0,background:"#0B0B0B"}}/>
    <motion.img src={coverImage||COVER} alt="Avant-garde fashion model in mesh headwear photographed against a dramatic dark background"
      draggable={false} style={{position:"absolute",top:mobile?"7%":"-6%",right:mobile?"-35%":"-2%",height:mobile?"91%":"116%",width:mobile?"110%":"70%",objectFit:"cover",objectPosition:"55% 32%",opacity:offline?.55:1,filter:offline?"contrast(1.85) grayscale(1)":"contrast(1.22) saturate(.75)",userSelect:"none",y:reduced?0:imageShift}}/>
    <div aria-hidden="true" style={{position:"absolute",inset:0,background:mobile?"linear-gradient(180deg,#0B0B0BD8 0%,#0B0B0B00 31%,#0B0B0B8C 57%,#0B0B0B 90%)":"linear-gradient(90deg,#0B0B0B 0%,#0B0B0BC8 25%,#0B0B0B23 65%,#0B0B0B24 100%)"}}/>
    <div aria-hidden="true" style={{position:"absolute",inset:0,opacity:offline?.33:.08,pointerEvents:"none",background:"repeating-linear-gradient(0deg,transparent,transparent 4px,#000 5px,#000 6px)"}}/>
    {offline && !reduced && [13,26,43,57,79].map((y,i)=><div key={i} aria-hidden="true" style={{position:"absolute",left:0,right:0,top:y+"%",height:(3+i%3)+"%",background:i%2? "#f32a1a43":"#d7ecec33",mixBlendMode:"screen",transform:"translateX("+(i%2?14:-19)+"px)",clipPath:"polygon(0 0,100% 0,97% 100%,3% 100%)",pointerEvents:"none"}}/>)}
    <nav aria-label="NO SIGNAL primary navigation" style={{position:"absolute",top:0,left:0,right:0,height:mobile?70:87,display:"flex",alignItems:"center",justifyContent:"space-between",padding:mobile?"0 17px":"0 5%",borderBottom:"1px solid #FFFFFF38",gap:12,zIndex:5,background:"linear-gradient(#0606069A,transparent)"}}>
      <div style={{display:"flex",alignItems:"center",gap:mobile?8:22}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:mobile?23:36,letterSpacing:"-.08em",lineHeight:1}}>N/S</div>
        {!mobile&&<div style={{...mono,color:"#BAB8B4"}}>NO SIGNAL™<br/>UNREGISTERED STUDIO</div>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:mobile?3:18}}>
        {!mobile&&navItem("TRANSMISSION","ns-chapter")}
        {navItem("ARCHIVE","ns-archive")}
        {navItem("LAB","interference")}
        {!mobile&&navItem("MANIFESTO","manifesto")}
      </div>
      <button type="button" onClick={toggle} aria-pressed={offline} aria-label={offline?"Reconnect the NO SIGNAL experience":"Disconnect the NO SIGNAL experience"} style={{display:"flex",alignItems:"center",gap:mobile?5:10,padding:mobile?"9px 9px":"11px 15px",border:"1px solid "+accent,background:offline?accent:"#0B0B0BAA",color:offline?"#090909":"#F3F0E9",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:600,fontSize:mobile?9:11,letterSpacing:".04em",whiteSpace:"nowrap"}}>
        <span style={{width:6,height:6,borderRadius:"50%",background:offline?"#090909":accent}} aria-hidden="true"/>
        {offline?"RECONNECT":"DISCONNECT"} <span aria-hidden="true">↗</span>
      </button>
    </nav>
    <div style={{position:"absolute",top:mobile?98:121,left:mobile?18:"5%",right:mobile?18:"5%",display:"flex",alignItems:"start",justifyContent:"space-between",gap:20,zIndex:3}}>
      <div style={{...mono,color:accent,fontSize:mobile?10:12}}>[ {edition} ]<br/><span style={{color:"#D4D0CA"}}>EST. OUTSIDE THE ALGORITHM</span></div>
      <div style={{...mono,color:"#F0EAE5",fontSize:mobile?9:11,textAlign:"right"}}>STATUS : {offline?"FAILED":"UNSTABLE"}<br/>FRQ_404 / 2026</div>
    </div>
    <motion.div style={{position:"absolute",left:mobile?"5%":"4.3%",right:"3%",bottom:mobile?"16%":"14%",zIndex:3,y:reduced?0:headlineShift}}>
      <div style={{...mono,fontSize:mobile?10:13,marginBottom:mobile?18:26,color:accent}}>ALTERNATIVE TRANSMISSION / VOLUME 001</div>
      <div aria-label="NO SIGNAL" style={{fontFamily:"'Syne',sans-serif",fontWeight:800,lineHeight:.82,letterSpacing:"-.105em",fontSize:mobile?"19vw":tablet?"15.6vw":"clamp(125px,15.6vw,240px)",whiteSpace:"nowrap",userSelect:"none",textShadow:"0 4px 22px #0A0A0A40"}}>
        <div style={{position:"relative",width:"fit-content"}}>NO</div>
        <div style={{position:"relative",width:"fit-content",fontSize:mobile?"15.7vw":tablet?"12.5vw":"clamp(107px,13.5vw,210px)"}}>SIGNAL<span style={{color:accent}}>.</span></div>
        {offline&&<div aria-hidden="true" style={{position:"absolute",top:"53%",left:"0",fontSize:mobile?"19vw":tablet?"15.6vw":"clamp(125px,15.6vw,240px)",color:accent,clipPath:"inset(45% 0 35% 0)",transform:"translateX(10px)",opacity:.88}}>SIGNAL.</div>}
        </div>
      <div style={{display:"flex",flexDirection:mobile?"column":"row",alignItems:mobile?"start":"end",justifyContent:"space-between",gap:mobile?17:24,marginTop:mobile?23:39}}>
        <div style={{maxWidth:mobile?"290px":"540px",fontSize:mobile?15:19,fontWeight:500,lineHeight:1.28}}>FASHION DOESN’T NEED PERMISSION.<br/><span style={{color:"#B2ABA4"}}>IT NEEDS A SYSTEM TO BREAK.</span></div>
        <button type="button" onClick={()=>moveTo("ns-chapter")} style={{padding:"17px 22px",border:0,background:accent,color:"#090909",fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:700,letterSpacing:".07em",cursor:"pointer"}}>ENTER THE INTERRUPTION ↘</button>
      </div>
    </motion.div>
    <div aria-hidden="true" style={{position:"absolute",left:mobile?18:"5%",right:mobile?18:"5%",bottom:mobile?13:28,display:"flex",justifyContent:"space-between",...mono,color:"#D0CBC5",fontSize:mobile?8:11}}>
      <span>NO RIGHTS RESERVED TO CONFORM</span><span>[ SCROLL TO DECODE ↓ ]</span>
    </div>
    <AnimatePresence>
      {offline&&<motion.div key="failure-state" initial={{opacity:0,y:-28}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} transition={{duration:reduced?0:.35}} aria-live="polite" style={{position:"absolute",top:mobile?167:182,right:mobile?18:"5%",zIndex:4,padding:"10px 13px",background:accent,color:"#090909",...mono,fontSize:mobile?9:12,fontWeight:700}}>TRANSMISSION LOST / YOU ARE NOW FREE</motion.div>}
    </AnimatePresence>
  </div>
}
addPropertyControls(NoSignalOpening,{
 coverImage:{type:ControlType.Image,title:"Cover Image"},
 edition:{type:ControlType.String,title:"Edition",defaultValue:"ISSUE 001 — THE INTERRUPTION"},
 accent:{type:ControlType.Color,title:"Accent",defaultValue:"#ED321D"}
})
