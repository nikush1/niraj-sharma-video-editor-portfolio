'use client';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { acquireBodyScrollLock } from '@/lib/bodyScrollLock';
const NAV=[{href:'/work',label:'The work'},{href:'/about',label:'The person'},{href:'/services',label:'What I do'},{href:'/process',label:'How I do it'},{href:'/reviews',label:'Good words'},{href:'/contact',label:'Say hello'}];

export default function Header(){
  const [open,setOpen]=useState(false);
  const panel=useRef(null);
  const pathname=usePathname();
  const close=useCallback(()=>setOpen(false),[]);
  const previousPath=useRef(pathname);
  useLayoutEffect(()=>{
    if(previousPath.current!==pathname){previousPath.current=pathname;setOpen(false);}
  },[pathname]);
  useLayoutEffect(()=>{
    if(!open || !panel.current)return;
    const dialog=panel.current;
    const priorFocus=document.activeElement;
    const releaseScroll=acquireBodyScrollLock();
    const onCancel=event=>{event.preventDefault();close();};
    // Native top-layer placement avoids clipping and stacking-context bugs.
    // Its focus trap also makes the page behind the menu inert automatically.
    if(!dialog.open) dialog.showModal();
    dialog.addEventListener('cancel',onCancel);
    dialog.querySelector('button')?.focus({preventScroll:true});
    return()=>{
      dialog.removeEventListener('cancel',onCancel);
      if(dialog.open)dialog.close();
      releaseScroll();
      if(priorFocus?.isConnected)priorFocus.focus({preventScroll:true});
    };
  },[open,close]);
  return <>
    <header id="hdr" className={open?'menu-is-open':''}>
      <div className="c"><nav aria-label="Primary navigation">
        <Link href="/" className="motion-logo" onClick={close} aria-label="Niraj Sharma home">niraj<span aria-hidden="true">®</span><small>EDITING<br/>WITH FEELING.</small></Link>
        <div className="header-right">
          <Link href="/work" className="desktop-nav-link">Selected work <sup>17</sup></Link>
          <Link href="/contact" className="desktop-nav-link">Let’s talk</Link>
          <button className="new-menu-toggle" aria-expanded={open} aria-controls={open?'creative-menu':undefined} aria-haspopup="dialog" onClick={()=>setOpen(value=>!value)}>{open?'Close':'Menu'}<span className={`menu-symbol ${open?'is-open':''}`} aria-hidden="true"><i/><i/></span></button>
        </div>
      </nav></div>
    </header>
    {open&&createPortal(<dialog ref={panel} id="creative-menu" className="menu-shell" aria-label="Navigation" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();close();}}}>
      <div className="menu-panel">
        <button className="menu-dialog-close" onClick={close} aria-label="Close navigation">Close <span aria-hidden="true">×</span></button>
        <div className="menu-links">{NAV.map((n,i)=><div className="menu-link-mask" key={n.href}><Link className="menu-big-link" style={{'--menu-order':i}} href={n.href} aria-current={pathname===n.href?'page':undefined} onClick={close}><sup>0{i+1}</sup>{n.label}<span aria-hidden="true">↗</span></Link></div>)}</div>
        <div className="menu-aside"><p>GOOD THINGS<br/>START WITH A<br/><em>conversation.</em></p><a href="mailto:nirajsharma.work@gmail.com">nirajsharma.work@gmail.com</a><span>DELHI NCR, INDIA<br/>OPEN TO GLOBAL COLLABORATIONS</span></div>
      </div>
    </dialog>,document.body)}
  </>;
}
