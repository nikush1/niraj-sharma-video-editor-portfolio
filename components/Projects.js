'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJ } from '@/lib/data';
import VideoModal from './VideoModal';
const COLORS=['#e7e4fb','#e7eddf','#ffe3d5','#dfe9ed','#ece9df','#f5dded','#dae4ed'];
function ProjectCard({project:p,index:i,onPlay,selected=false}){return <article className={selected?'selected-card':'archive-card'} role="listitem" style={{'--poster-color':COLORS[i%COLORS.length]}}><div className="work-card-top"><span>{String(i+1).padStart(2,'0')} / {p.c==='sf'?'SHORT FORM':'LONG FORM'}</span><span>{p.tags.filter(Boolean)[0]}</span></div><button className={`work-poster ${p.c}`} onClick={()=>onPlay(p)} aria-label={`Play video: ${p.t}`} data-cursor="PLAY"><div className="work-image-mat"><Image src={`/images/work-${p.y}.jpg`} alt={`${p.t} video preview`} width={480} height={360} sizes={selected?'(max-width: 800px) 84vw, 65vw':'(max-width: 700px) 90vw, 45vw'} className="work-image"/></div><span className="work-play"><span className="small-play" aria-hidden="true"/></span><span className="work-poster-caption">A NIRAJ SHARMA EDIT</span></button><div className="work-card-bottom"><div><h3>{p.t}</h3><p>{p.tags.filter(Boolean).join(' · ')}</p></div><a href={`https://www.youtube.com/watch?v=${p.y}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${p.t} on YouTube`} className="work-outside"><i className="fab fa-youtube" aria-hidden="true"/></a></div>{(p.brief||p.contribution||(p.result&&p.resultVerified))&&<dl className="project-context">{p.brief&&<><dt>Brief</dt><dd>{p.brief}</dd></>}{p.contribution&&<><dt>My contribution</dt><dd>{p.contribution}</dd></>}{p.result&&p.resultVerified&&<><dt>Result</dt><dd>{p.result}</dd></>}</dl>}</article>}
export default function Projects({featured=false,headingLevel='h2'}){
 const Heading=headingLevel;const [filter,setFilter]=useState('all');const [playing,setPlaying]=useState(null);
 const gallery=useRef(null);
 const projects=featured?PROJ.filter(p=>p.featured):PROJ;const filtered=projects.filter(p=>filter==='all'||p.c===filter);
 useEffect(()=>{
  if(!featured || !gallery.current)return;
  const stage=gallery.current;
  const viewport=stage.querySelector('.selected-viewport');
  const rail=stage.querySelector('.selected-rail');
  let frame;
  const update=()=>{
   frame=null;
   // GSAP owns the pinned progress. Native scrolling owns it on mobile,
   // smaller windows, reduced motion and saved or newly paused motion.
   if(viewport.classList.contains('is-pinned'))return;
   const max=Math.max(0,viewport.scrollWidth-viewport.clientWidth);
   const progress=max ? Math.min(1,Math.max(0,viewport.scrollLeft/max)) : 0;
   const count=rail.children.length;
   const index=count ? Math.min(count,1+Math.floor(progress*count)) : 0;
   const counter=stage.querySelector('.selected-index');
   if(counter)counter.textContent=`${String(index).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
   const bar=stage.querySelector('.selected-progress span');
   if(bar)bar.style.transform=`scaleX(${progress})`;
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  viewport.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  const modeObserver=new MutationObserver(schedule);
  modeObserver.observe(viewport,{attributes:true,attributeFilter:['class']});
  const sizeObserver=typeof ResizeObserver==='undefined' ? null : new ResizeObserver(schedule);
  sizeObserver?.observe(viewport);
  sizeObserver?.observe(rail);
  update();
  return()=>{
   viewport.removeEventListener('scroll',schedule);
   window.removeEventListener('resize',schedule);
   modeObserver.disconnect();
   sizeObserver?.disconnect();
   if(frame)cancelAnimationFrame(frame);
  };
 },[featured,projects.length]);
 return <section id={featured?'selected-work':'projects'} className={featured?'selected-section':'archive-section'}>{featured?<div ref={gallery} className="selected-stage"><div className="selected-heading c"><div><span className="section-kicker">01 — SELECTED WORK / 2025–26</span><Heading>Proof of <em>play.</em></Heading></div><div className="selected-side"><p>Made to be watched.<br/>Built to be felt.</p><span className="work-scroll-label">SCROLL TO EXPLORE THE COLLECTION</span></div></div><div className="selected-viewport" tabIndex={0} role="region" aria-label="Selected work carousel; scroll or swipe to explore"><div className="selected-rail" role="list">{projects.map((p,i)=><ProjectCard key={p.y} project={p} index={i} onPlay={setPlaying} selected/>)}</div></div><div className="selected-bottom c"><span className="selected-index">{projects.length ? '01' : '00'} / {String(projects.length).padStart(2,'0')}</span><div className="selected-progress" aria-hidden="true"><span/></div><Link className="underlined-link" href="/work">View all {PROJ.length} edits</Link></div></div>:<div className="c"><div className="archive-heading"><span className="section-kicker">THE COLLECTION / {PROJ.length} ORIGINAL EDITS</span><Heading>A little bit<br/>of <em>everything.</em></Heading><p>Brand films, social edits, creator stories.<br/>Pick a frame. See where it takes you.</p></div><div className="archive-toolbar"><div className="filt-row" role="group" aria-label="Filter projects by format">{[{key:'all',label:'All work'},{key:'sf',label:'Short form'},{key:'lf',label:'Long form'}].map(f=><button key={f.key} className={`flt${filter===f.key?' on':''}`} aria-pressed={filter===f.key} onClick={()=>setFilter(f.key)}>{f.label}<sup>{f.key==='all'?projects.length:projects.filter(p=>p.c===f.key).length}</sup></button>)}</div><span aria-live="polite">{filtered.length} PROJECTS</span></div><div className="archive-grid" role="list">{filtered.map((p,i)=><ProjectCard key={p.y} project={p} index={i} onPlay={setPlaying}/>)}</div></div>}{playing&&<VideoModal video={playing} onClose={()=>setPlaying(null)}/>}</section>;
}
