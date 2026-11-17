import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
interface Props {
    heading: string
    eyebrow: string
    description: string
    accent: string
    imageOne: string
    imageTwo: string
    imageThree: string
    style?: React.CSSProperties
}

const defaults = [
    "https://images.unsplash.com/photo-1731102310768-a7cefa21d489?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
    "https://images.unsplash.com/photo-1602323947593-41c553ff34d0?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
    "https://images.unsplash.com/photo-1760003024022-b07fd745aa1a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
]

export default function SignalInterference(props: Props) {
    const {
        heading = "INTERRUPT THE IMAGE.",
        eyebrow = "TRANSMISSION / 002",
        description = "Control the distortion. Choose your identity. The signal belongs to you.",
        accent = "#ED321D",
        imageOne = defaults[0],
        imageTwo = defaults[1],
        imageThree = defaults[2],
        style,
    } = props
    const reducedMotion = useReducedMotion()
    const ref = React.useRef<HTMLDivElement>(null)
    const [panelWidth, setPanelWidth] = React.useState(1200)
    const compact = panelWidth < 950
    const [selected, setSelected] = React.useState(0)
    const [intensity, setIntensity] = React.useState(32)
    const [corrupted, setCorrupted] = React.useState(false)
    const [scanX, setScanX] = React.useState(52)
    const [hovering, setHovering] = React.useState(false)
    const [moment, setMoment] = React.useState(0)
    React.useEffect(() => {
        if (typeof window === "undefined") return
        try { if (window.sessionStorage.getItem("ns-mode") === "offline") setCorrupted(true) } catch {}
        const handleSignalMode = (e: Event) => {
            const custom = e as CustomEvent<{ disconnected: boolean }>
            setCorrupted(Boolean(custom.detail?.disconnected))
        }
        window.addEventListener("ns-mode", handleSignalMode)
        return () => window.removeEventListener("ns-mode", handleSignalMode)
    }, [])
    const images = [imageOne || defaults[0], imageTwo || defaults[1], imageThree || defaults[2]]
    const names = ["CONTROL / LOST", "AFTER / IMAGE", "BODY / STATIC"]
    const effectiveIntensity = corrupted ? 94 : intensity

    React.useEffect(() => {
        const el = ref.current
        if (!el || typeof ResizeObserver === "undefined") return
        const resize = new ResizeObserver(entries => {
            const width = entries[0]?.contentRect?.width || el.clientWidth
            setPanelWidth(width)
        })
        resize.observe(el)
        setPanelWidth(el.clientWidth)
        return () => resize.disconnect()
    }, [])

    React.useEffect(() => {
        if (!moment) return
        const t = setTimeout(() => setMoment(0), 420)
        return () => clearTimeout(t)
    }, [moment])

    const choose = (i: number) => {
        if (selected !== i) {
            setSelected(i)
            if (!reducedMotion) setMoment(i + 1)
        }
    }
    const mono: React.CSSProperties = {
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.075em",
        lineHeight: 1.45,
    }
    const pale = "#F3EEE8"
    const img = images[selected]
    const previewHeight = compact ? (panelWidth < 500 ? 470 : 510) : "100%"

    return (
        <div ref={ref} style={{
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            minHeight: 670,
            background: "#101010",
            color: pale,
            fontFamily: "'Space Grotesk',sans-serif",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            ...style,
        }}>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: compact ? "18px 20px" : "20px 44px",
                borderBottom: "1px solid #343434", gap: 16, flexWrap: "wrap",
            }}>
                <span style={{...mono, color: accent}}>{eyebrow}</span>
                <span style={{...mono, color: "#A09A94"}}>AN INTERACTIVE EXPERIMENT &nbsp; [ DRAG / TAP / SELECT ]</span>
            </div>
            <div style={{
                display: "grid", flex: "1 1 auto", minHeight: 0,
                gridTemplateColumns: compact ? "minmax(0, 1fr)" : "minmax(0, 0.88fr) minmax(0, 1.12fr)",
            }}>
                <div style={{
                    display:"flex", flexDirection:"column", justifyContent:"space-between",
                    minWidth:0, gap:20,
                    padding: compact ? "32px 20px 28px" : "48px 44px 40px",
                    borderRight: compact ? "none" : "1px solid #343434",
                }}>
                    <div>
                        <div style={{...mono, color:accent, marginBottom:22}}>/// USER INPUT REQUIRED</div>
                        <h2 style={{
                            padding:0, margin:"0 0 16px", fontFamily:"'Syne', sans-serif",
                            fontSize: compact ? (panelWidth < 500 ? 32 : 50) : 43,
                            fontWeight:800, letterSpacing:"-0.07em", lineHeight:1.01,
                            maxWidth:520,
                        }}>{heading}</h2>
                        <p style={{
                            fontSize: compact ? 14 : 15, lineHeight:1.5,
                            margin:0, maxWidth:400, color:"#ACA7A2"
                        }}>{description}</p>
                    </div>
                    <div style={{marginTop: compact ? 8 : 24}}>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, marginBottom:12}}>
                            <span style={{...mono, color:"#DAD7D3"}}>01 / SELECT TRANSMISSION</span>
                            <span style={{...mono, color:accent}}>0{selected + 1} / 03</span>
                        </div>
                        <div role="tablist" aria-label="Select fashion look" style={{
                            display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:7,
                        }}>
                            {names.map((name,i)=><button key={i} role="tab"
                                aria-selected={selected===i}
                                onClick={()=>choose(i)}
                                style={{
                                    cursor:"pointer", appearance:"none",
                                    border:selected===i ? "1px solid "+accent:"1px solid #494543",
                                    background:selected===i?accent:"#1B1B1B", color:selected===i?"#090909":"#E2DDDA",
                                    padding:compact?"12px 5px":"14px 7px",
                                    fontFamily:"'DM Mono',monospace", fontSize:compact?10:11,
                                    fontWeight:500, letterSpacing:"0.02em", textAlign:"center",
                                    transition: reducedMotion ? "none" : "background 200ms,border 200ms",
                                }}>0{i+1}</button>)}
                        </div>
                        <div style={{...mono,color:"#B5AEAA",marginTop:9,marginBottom:28}}>{names[selected]}</div>
                        <label htmlFor="ns-interference-level" style={{
                            display:"flex",justifyContent:"space-between",alignItems:"center",
                            ...mono, color:"#DAD7D3", marginBottom:12,
                        }}>
                            <span>02 / DISTORT THE SIGNAL</span>
                            <span style={{color:accent}}>{String(effectiveIntensity).padStart(2,"0")}%</span>
                        </label>
                        <input id="ns-interference-level" type="range" min="0" max="100" step="1"
                            aria-label="Image distortion intensity"
                            value={intensity}
                            onChange={e=>{setIntensity(Number(e.target.value));setCorrupted(false)}}
                            style={{width:"100%", accentColor:accent, cursor:"ew-resize",height:22,display:"block"}}
                        />
                        <div style={{display:"flex",justifyContent:"space-between",...mono,color:"#6D6A67",marginTop:6}}>
                            <span>STABLE / 00</span><span>LOST / 100</span>
                        </div>
                        <button type="button" onClick={()=>setCorrupted(v=>!v)} aria-pressed={corrupted}
                            style={{
                                width:"100%", marginTop:29, padding:"17px 16px", display:"flex",
                                alignItems:"center",justifyContent:"space-between",gap:12,
                                border:"1px solid "+accent,background:corrupted?accent:"transparent",
                                color:corrupted?"#080808":pale,cursor:"pointer",
                                fontFamily:"'DM Mono',monospace",fontWeight:600,fontSize:12,letterSpacing:"0.07em",
                            }}
                        ><span>{corrupted?"RESTORE PREVIOUS SIGNAL":"FORCE SIGNAL FAILURE"}</span><span aria-hidden="true">{corrupted?"↺":"↗"}</span></button>
                    </div>
                </div>
                <div
                    onPointerMove={e=>{
                        if(reducedMotion)return
                        const rect=e.currentTarget.getBoundingClientRect()
                        setScanX(Math.max(0,Math.min(100,(e.clientX-rect.left)/rect.width*100)))
                    }}
                    onPointerEnter={()=>setHovering(true)}
                    onPointerLeave={()=>setHovering(false)}
                    aria-label={"Interactive preview: "+names[selected]}
                    style={{
                        position:"relative",overflow:"hidden",background:"#090909",minWidth:0,
                        minHeight:previewHeight, height: compact ? previewHeight : "100%",
                        isolation:"isolate",
                    }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.img
                            key={selected}
                            src={img}
                            alt={"Fashion editorial look "+(selected+1)+": "+names[selected]}
                            draggable={false}
                            initial={reducedMotion ? false : {opacity:0.6,scale:1.04,x:9}}
                            animate={{opacity:1,scale:1,x:0}}
                            exit={reducedMotion ? {opacity:1} : {opacity:0.2,scale:1.02,x:-12}}
                            transition={{duration:reducedMotion?0:0.28,ease:[0.22,1,0.36,1]}}
                            style={{
                                width:"100%",height:"100%",position:"absolute",inset:0,
                                objectFit:"cover",objectPosition:"center 28%",
                                filter:corrupted?"grayscale(.8) contrast(1.75)":"grayscale(0.12) contrast(1.12)",
                                userSelect:"none",
                            }}
                        />
                    </AnimatePresence>
                    {effectiveIntensity > 0 && !reducedMotion && [0,1,2,3,4,5,6].map((k)=>{
                        const top=[8,21,35,48,60,73,86][k]
                        const h=[7,5,11,4,7,6,8][k]
                        const offset = ((k%2===0?1:-1) * (7+(k*5)) * effectiveIntensity/100)
                        return <img key={"slice-"+k} src={img} alt="" aria-hidden="true" draggable={false}
                            style={{
                                pointerEvents:"none",position:"absolute",inset:0,width:"100%",height:"100%",
                                objectFit:"cover",objectPosition:"center 28%",
                                clipPath:"inset("+top+"% 0 "+(100-top-h)+"% 0)",
                                transform:"translateX("+offset+"px)",
                                filter:k%2===0?"sepia(1) saturate(5) hue-rotate(323deg) contrast(1.3)":"hue-rotate(135deg) contrast(1.5)",
                                mixBlendMode:"screen",
                                opacity:Math.min(.72, effectiveIntensity/125),
                                transition:"transform 180ms linear, opacity 180ms",
                            }}/>
                    })}
                    <div aria-hidden="true" style={{
                        position:"absolute",inset:0,pointerEvents:"none",
                        background:"repeating-linear-gradient(0deg,rgba(0,0,0,0.12) 0px,rgba(0,0,0,0.12) 1px,transparent 2px,transparent 6px)",
                        opacity:effectiveIntensity/145,
                    }}/>
                    {!reducedMotion && hovering && <div aria-hidden="true" style={{
                        pointerEvents:"none",position:"absolute",top:0,bottom:0,left:scanX+"%",width:1,
                        background:accent,boxShadow:"0 0 20px 2px "+accent,opacity:.85,
                    }}/>}
                    {!reducedMotion && moment>0 && <motion.div
                        key={"flash-"+moment}
                        initial={{opacity:0.6}} animate={{opacity:0}}
                        transition={{duration:.34}}
                        aria-hidden="true"
                        style={{position:"absolute",inset:0,background:accent,mixBlendMode:"difference",pointerEvents:"none"}}
                    />}
                    <div style={{position:"absolute",top:20,left:20,zIndex:5,display:"flex",alignItems:"center",gap:8}}>
                        <span style={{height:7,width:7,background:accent,borderRadius:10}}/>
                        <span style={{...mono,color:"#F6F0EC",background:"#070707B9",padding:"5px 8px"}}>LIVE / {corrupted?"SIGNAL LOST":"USER CONTROLLED"}</span>
                    </div>
                    <div style={{
                        position:"absolute",bottom:0,left:0,right:0,zIndex:5,
                        background:"linear-gradient(transparent,#080808E8)",
                        padding:compact?"46px 20px 22px":"80px 28px 28px",
                        display:"flex",justifyContent:"space-between",alignItems:"end",gap:16,
                    }}>
                        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:compact?23:29,letterSpacing:"-0.055em",lineHeight:1}}>
                            {names[selected]}
                        </span>
                        <span style={{...mono,color:"#D8D2CC",whiteSpace:"nowrap"}}>LOOK // 0{selected+1}</span>
                    </div>
                </div>
            </div>
            <div style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,
                flexWrap:"wrap",padding:compact?"13px 20px":"14px 44px",
                borderTop:"1px solid #363636",background:"#090909",
            }}>
                <span style={{...mono,color:"#898783"}}>NO SIGNAL © 2026 — THE VIEWER IS THE EDITOR</span>
                <span style={{...mono,color:accent}}>TRANSMISSION ACTIVE ▰▰▰</span>
            </div>
        </div>
    )
}

addPropertyControls(SignalInterference, {
    heading: {type:ControlType.String,title:"Headline",defaultValue:"INTERRUPT THE IMAGE."},
    eyebrow: {type:ControlType.String,title:"Eyebrow",defaultValue:"TRANSMISSION / 002"},
    description:{type:ControlType.String,title:"Description",defaultValue:"Control the distortion. Choose your identity. The signal belongs to you."},
    accent:{type:ControlType.Color,title:"Signal Red",defaultValue:"#ED321D"},
    imageOne:{type:ControlType.Image,title:"Look One"},
    imageTwo:{type:ControlType.Image,title:"Look Two"},
    imageThree:{type:ControlType.Image,title:"Look Three"},
})
