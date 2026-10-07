'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VideoModal from './VideoModal';
const CARDS=[{id:'_-4noehZq8I',label:'THE HOOK',c:'a'},{id:'3CpnoEG3v5w',label:'THE DETAIL',c:'b'},{id:'xGTHW280XRo',label:'THE STORY',c:'c'},{id:'qJqqkw1suTk',label:'THE FEELING',c:'d'}];
export default function Hero(){
 const root=useRef(null); const [playing,setPlaying]=useState(false);
 const move=e=>{if(e.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='paused')return;const r=e.currentTarget.getBoundingClientRect();root.current?.style.setProperty('--mx',`${(e.clientX-r.left-r.width/2)/26}px`);root.current?.style.setProperty('--my',`${(e.clientY-r.top-r.height/2)/26}px`);};
 const reset=()=>{root.current?.style.setProperty('--mx','0px');root.current?.style.setProperty('--my','0px');};
 return <section ref={root} className="playground-hero" id="home" onPointerMove={move} onPointerLeave={reset}><div className="hero-topnote"><span>NIRAJ KUMAR SHARMA<br/><b>VIDEO EDITOR AT BEASTLIFE</b></span><span>BASED IN INDIA.<br/>CREATING FOR EVERYWHERE.</span></div>
 <div className="hero-center"><div className="hero-mini-label"><span className="mini-burst" aria-hidden="true">✳</span> A LITTLE UNEXPECTED. ALWAYS INTENTIONAL.</div><h1><span className="hero-headline-line"><span>Serious edits.</span></span><span className="hero-headline-line"><span>Playful <em>mind.</em></span></span></h1><p>I edit Meta ads, UGC and product videos for D2C brands. Based in Delhi NCR, working with brands and agencies internationally.</p><div className="hero-main-actions"><Link href="/work" className="pill-button coral-button">View my work</Link><button className="hero-reel-link" type="button" onClick={()=>setPlaying(true)}><span className="small-play" aria-hidden="true"/>Watch my showreel</button><Link href="/contact" className="underlined-link">Let’s talk</Link></div></div>
 <div className="hero-orbit" aria-hidden="true">{CARDS.map((p,i)=><div key={p.id} className={`orbit-card orbit-${p.c}`} data-orbit={i}><div className="orbit-photo"><Image src={`/images/work-${p.id}.jpg`} width={480} height={360} sizes="(max-width: 650px) 76px, 205px" alt="" priority={i<2}/></div><span>{p.label}<b>0{i+1}</b></span></div>)}<div className="hero-sticker"><span>GOOD<br/>STUFF<br/>INSIDE.</span><i className="fas fa-asterisk"/></div><div className="hero-pencil-note">a frame of mind.</div></div>
 <div className="hero-floor"><span>UGC / META ADS / STORIES</span><a href="#selected-work" className="scroll-cue"><span className="scroll-cue-line"/>SCROLL TO FEEL IT</a><button className="replay-link" onClick={()=>window.dispatchEvent(new Event('portfolio:replay'))}>Replay the entrance <i className="fas fa-redo" aria-hidden="true"/></button></div>
 {playing&&<VideoModal video={{y:'b9DFOfJUSyE',t:'Editing showreel · 2025',c:'lf'}} onClose={()=>setPlaying(false)}/>}</section>;
}
