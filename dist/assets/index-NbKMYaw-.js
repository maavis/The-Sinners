(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const _t={logo:{imageUrl:"https://i.imgur.com/s1hSAjx.png",altText:"THE SINNERS Official Band Logo"},hero:{albumSubtitle:"9MM HATE YAYINDA",albumTitle:"MADE OF SIN"}},ce="parrhesia_tour_events",ie=[{id:"evt_101",date:"2026-10-24",time:"20:00",venue:"Sick New World Festival",city:"Fort Worth",country:"TX, USA",status:"SATIŞTA",ticketUrl:"https://tickets.example.com/snw",rsvpUrl:"",description:"Headline Stage Performance",images:[],isFeatured:!0,visible:!0,createdAt:"2026-08-10T12:00:00.000Z"},{id:"evt_102",date:"2026-11-15",time:"21:00",venue:"Accor Stadium",city:"Sydney",country:"Australia",status:"SATIŞTA",ticketUrl:"https://tickets.example.com/sydney",rsvpUrl:"",description:"Oceania Tour Opening Night",images:[],isFeatured:!1,visible:!0,createdAt:"2026-08-10T12:30:00.000Z"},{id:"evt_103",date:"2026-12-05",time:"20:30",venue:"O2 Brixton Academy",city:"London",country:"UK",status:"TÜKENDİ",ticketUrl:"https://tickets.example.com/london",rsvpUrl:"",description:"Winter Solstice Special Show",images:[],isFeatured:!0,visible:!0,createdAt:"2026-08-10T13:00:00.000Z"},{id:"evt_104",date:"2025-05-18",time:"20:00",venue:"Wembley Arena",city:"London",country:"UK",status:"TÜKENDİ",ticketUrl:"",rsvpUrl:"",description:"Sanguivore Ritual Tour",images:["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80"],isFeatured:!1,visible:!0,createdAt:"2025-05-01T10:00:00.000Z"},{id:"evt_105",date:"2025-03-12",time:"21:00",venue:"Bataclan",city:"Paris",country:"France",status:"TÜKENDİ",ticketUrl:"",rsvpUrl:"",description:"European Headline Tour",images:["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80"],isFeatured:!1,visible:!0,createdAt:"2025-03-01T10:00:00.000Z"}];function q(){const t=localStorage.getItem(ce);if(!t)return localStorage.setItem(ce,JSON.stringify(ie)),ie;try{return JSON.parse(t)}catch(e){return console.error("Error parsing tour events:",e),ie}}function Jt(t){localStorage.setItem(ce,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("tour-data-updated"))}function ba(t){const e=q(),i={id:"evt_"+Date.now(),date:t.date||new Date().toISOString().split("T")[0],time:t.time||"20:00",venue:t.venue||"",city:t.city||"",country:t.country||"",status:t.status||"SATIŞTA",ticketUrl:t.ticketUrl||"",rsvpUrl:"",description:t.description||"",images:Array.isArray(t.images)?t.images:[],isFeatured:!!t.isFeatured,visible:t.visible!==!1,createdAt:new Date().toISOString()};return e.push(i),Jt(e),i}function ha(t,e){const i=q(),a=i.findIndex(s=>s.id===t);return a!==-1?(i[a]={...i[a],...e},Jt(i),i[a]):null}function ya(t){let e=q();e=e.filter(i=>i.id!==t),Jt(e)}function Sa(t){const e=q(),i=e.find(a=>a.id===t);i&&(i.visible=!i.visible,Jt(e))}function Qe(){const t=q(),e=new Date().toISOString().split("T")[0],i=t.filter(s=>s.date>=e).sort((s,n)=>s.date.localeCompare(n.date)),a=t.filter(s=>s.date<e).sort((s,n)=>n.date.localeCompare(s.date));return{upcoming:i,past:a}}const at="parrhesia_releases",et=[{id:"rel_9mm_hate",title:"9MM HATE",artist:"THE SINNERS",year:"2026",releaseDate:"18 OCAK 2026",type:"ALBUM",coverUrl:"https://i.imgur.com/ADvecY4.gif",description:"The Sinners' flagship 2026 dark alternative / gothic rock album featuring 8 raw, high-contrast tracks.",status:"PUBLISHED",featured:!0,tracks:[{id:"trk_101",title:"Parrhesia!",duration:"03:56",durationSec:236,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"},{id:"trk_102",title:"Wasn't Me",duration:"03:23",durationSec:203,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"},{id:"trk_103",title:"Betrayal",duration:"03:34",durationSec:214,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"},{id:"trk_104",title:"I'm Not Okay",duration:"03:25",durationSec:205,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"},{id:"trk_105",title:"For the Night",duration:"03:25",durationSec:205,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"},{id:"trk_106",title:"Way to Heaven",duration:"05:57",durationSec:357,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"},{id:"trk_107",title:"Still Standing",duration:"04:12",durationSec:252,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"},{id:"trk_108",title:"No Longer Quiet",duration:"03:45",durationSec:225,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",releaseId:"rel_9mm_hate",releaseTitle:"9MM HATE",type:"ALBUM"}]},{id:"rel_cruel",title:"CRUEL",artist:"THE SINNERS",year:"2025",releaseDate:"05 KASIM 2025",type:"SINGLE",coverUrl:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",description:"Heavy guitar riffs and visceral vocals leading the Sanguivore Era.",status:"PUBLISHED",featured:!1,tracks:[{id:"trk_201",title:"Cruel",duration:"04:15",durationSec:255,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",releaseId:"rel_cruel",releaseTitle:"CRUEL",type:"SINGLE"},{id:"trk_202",title:"Cruel (Instrumental)",duration:"04:15",durationSec:255,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",releaseId:"rel_cruel",releaseTitle:"CRUEL",type:"SINGLE"}]},{id:"rel_its_the_way",title:"IT'S THE WAY",artist:"THE SINNERS",year:"2025",releaseDate:"14 AĞUSTOS 2025",type:"SINGLE",coverUrl:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",description:"Atmospheric post-punk anthem with sweeping synth basslines.",status:"PUBLISHED",featured:!1,tracks:[{id:"trk_301",title:"It's the Way",duration:"03:48",durationSec:228,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",releaseId:"rel_its_the_way",releaseTitle:"IT'S THE WAY",type:"SINGLE"}]},{id:"rel_survive",title:"SURVIVE",artist:"THE SINNERS",year:"2025",releaseDate:"20 ŞUBAT 2025",type:"EP",coverUrl:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",description:"The foundational 3-track EP defining The Sinners' signature gothic sound.",status:"PUBLISHED",featured:!1,tracks:[{id:"trk_401",title:"Survive",duration:"04:02",durationSec:242,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",releaseId:"rel_survive",releaseTitle:"SURVIVE",type:"EP"},{id:"trk_402",title:"Darkness Echoes",duration:"03:50",durationSec:230,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",releaseId:"rel_survive",releaseTitle:"SURVIVE",type:"EP"},{id:"trk_403",title:"Bloodline",duration:"04:30",durationSec:270,audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",releaseId:"rel_survive",releaseTitle:"SURVIVE",type:"EP"}]}];C();function C(){const t=localStorage.getItem(at);if(!t)return localStorage.setItem(at,JSON.stringify(et)),et;try{const e=JSON.parse(t);if(!Array.isArray(e)||e.length===0||!e[0].tracks||e[0].tracks.length===0)return localStorage.setItem(at,JSON.stringify(et)),et;let i=!1;return e.forEach(a=>{a.artist==="PARRHESIA"&&(a.artist="THE SINNERS",i=!0),a.description&&a.description.includes("Parrhesia")&&(a.description=a.description.replace(/Parrhesia/g,"The Sinners"),i=!0)}),i&&localStorage.setItem(at,JSON.stringify(e)),e}catch(e){return console.error("Error parsing music releases:",e),localStorage.setItem(at,JSON.stringify(et)),et}}function ye(t){localStorage.setItem(at,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("music-data-updated"))}function Ea(t){const e=C(),i={id:"rel_"+Date.now(),title:t.title||"UNTITLED RELEASE",artist:t.artist||"THE SINNERS",year:t.year||new Date().getFullYear().toString(),releaseDate:t.releaseDate||new Date().toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"}).toUpperCase(),type:t.type||"SINGLE",coverUrl:t.coverUrl||"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",description:t.description||"",status:t.status||"PUBLISHED",featured:t.featured||!1,tracks:t.tracks||[]};return i.featured&&e.forEach(a=>a.featured=!1),e.unshift(i),ye(e),i}function Xe(t,e){const i=C(),a=i.findIndex(s=>s.id===t);return a!==-1?(e.featured&&i.forEach(s=>s.featured=!1),i[a]={...i[a],...e},ye(i),i[a]):null}function Aa(t){let e=C();e=e.filter(i=>i.id!==t),ye(e)}function Zt(){const t=C(),e=[];return t.forEach(i=>{i.status!=="DRAFT"&&(i.tracks||[]).forEach(a=>{e.push({...a,coverUrl:i.coverUrl,artist:i.artist,year:i.year,type:i.type})})}),e}const ta="parrhesia_fav_tracks";function Ft(){try{const t=localStorage.getItem(ta);return t?JSON.parse(t):[]}catch{return[]}}function ea(t){const e=Ft(),i=e.indexOf(t);return i!==-1?e.splice(i,1):e.push(t),localStorage.setItem(ta,JSON.stringify(e)),window.dispatchEvent(new CustomEvent("favorites-updated")),e.includes(t)}const Mt="parrhesia_journal_entries",se=[{id:"upd_104",date:"12 AUG 2026",category:"ESSAY // DISCOGRAPHY",title:"THE ANALOG RESONANCE OF 9MM HATE",body:`The tape machine doesn't forgive. In an era dominated by surgical digital precision, 9MM HATE was built on physical friction, magnetic tape saturation, and room spill. Every track was tracked live through custom valve preamps directly to a vintage 24-track 2-inch tape machine.

We spent weeks tuning the room to reflect raw low-frequency pressure without losing the high-register guitar decay. What you hear on the record is the unedited sonic footprint of three human beings occupying the same room at midnight.`,image:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",meta:"LONDON // ANALOG SESSION 04",tracklist:["01 Parrhesia!","02 Wasn't Me","03 Betrayal","04 I'm Not Okay"],links:[{name:"SPOTIFY",url:"https://spotify.com"},{name:"APPLE MUSIC",url:"https://apple.com"},{name:"BANDCAMP",url:"https://bandcamp.com"}],createdAt:"2026-08-12T10:00:00.000Z"},{id:"upd_101",date:"11 AUG 2026",category:"STUDIO DIARY",title:"WE'RE STILL HERE. ROOM LOUDNESS & SPECTRUM.",body:`The room has been getting louder. Tape reels spinning late into the morning. Analog synths warming up for the upcoming European tour cycle. We built this space to test sound pressure limits and emotional boundaries.

No pitch correction, no quantization grids. Just heavy bass frequencies bouncing off brutalist concrete walls.`,image:"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",meta:"01:42 // THE SINNERS STUDIO",tracklist:["01 Sound Test Alpha","02 Sub-bass Feedback"],links:[{name:"SPOTIFY",url:"https://spotify.com"},{name:"SOUNDCLOUD",url:"https://soundcloud.com"}],createdAt:"2026-08-11T01:42:00.000Z"},{id:"upd_102",date:"04 AUG 2026",category:"ESSAY // NOISE ARCHIVE",title:"NO NEWS. JUST PURE UNFILTERED NOISE.",body:`Reflections on modern music aesthetics, feedback loops, and dynamic tension. Why raw noise remains the purest expression of unfiltered truth in recorded audio.

When silence breaks, it shouldn't apologize. It should demand full presence.`,image:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",meta:"03:15 // NIGHT TRANSMISSION",tracklist:["01 Feedback Loop I","02 Industrial Decay"],links:[{name:"BANDCAMP",url:"https://bandcamp.com"}],createdAt:"2026-08-04T03:15:00.000Z"},{id:"upd_103",date:"28 JUL 2026",category:"PHOTOGRAPHY // FIELD RECORDINGS",title:"BERLIN INDUSTRIAL SOUNDSCAPE SESSIONS",body:"Field recordings captured across abandoned industrial complexes in East Berlin. Low-frequency hums, resonant acoustic cavities, and metallic decay merged into the atmospheric layers of our upcoming releases.",image:"https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",meta:"BERLIN // FIELD RECORDINGS",tracklist:["01 Berlin Ambient Decay"],links:[{name:"YOUTUBE",url:"https://youtube.com"}],createdAt:"2026-07-28T22:00:00.000Z"}];function U(){const t=localStorage.getItem(Mt);if(!t)return localStorage.setItem(Mt,JSON.stringify(se)),se;try{const e=JSON.parse(t);let i=!1;return e.forEach(a=>{a.meta&&a.meta.includes("PARRHESIA")&&(a.meta=a.meta.replace(/PARRHESIA/g,"THE SINNERS"),i=!0)}),i&&localStorage.setItem(Mt,JSON.stringify(e)),e}catch(e){return console.error("Error parsing journal entries:",e),se}}function Se(t){localStorage.setItem(Mt,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("updates-data-updated"))}function La(t){const e=U(),i={id:"upd_"+Date.now(),date:t.date||new Date().toLocaleDateString("en-US",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase(),category:t.category||"TRANSMISSION // JOURNAL",title:t.title||"",body:t.body||"",image:t.image||"",meta:t.meta||"",status:t.status||"PUBLISHED",featured:t.featured||!1,tracklist:t.tracklist||[],links:t.links||[],createdAt:new Date().toISOString()};return i.featured&&e.forEach(a=>a.featured=!1),e.unshift(i),Se(e),i}function aa(t,e){const i=U(),a=i.findIndex(s=>s.id===t);return a!==-1?(e.featured&&i.forEach(s=>s.featured=!1),i[a]={...i[a],...e},Se(i),i[a]):null}function Ia(t){let e=U();e=e.filter(i=>i.id!==t),Se(e)}const Ot="parrhesia_about_data",ne={slides:[{id:"slide_1",url:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80",caption:"STUDIO TRANSMISSIONS"},{id:"slide_2",url:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80",caption:"NIGHT REHEARSALS"},{id:"slide_3",url:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",caption:"LIVE ATMOSPHERE"},{id:"slide_4",url:"https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1920&q=80",caption:"DARKNESS & NOISE"}],bioParagraphs:["The Sinners is an alternative / gothic rock entity existing at the intersection of raw sonic aggression, atmospheric textures, and uncompromising artistic expression.","Formed in shadow, the band merges heavy distorted baritone instrumentation with hypnotic editorial visual aesthetics. Every record, performance, and visual transmission is created as a complete atmospheric experience.","Truth spoken clearly without compromise. No news, just noise."]};function X(){const t=localStorage.getItem(Ot);if(!t)return localStorage.setItem(Ot,JSON.stringify(ne)),ne;try{const e=JSON.parse(t);return e.bioParagraphs&&e.bioParagraphs.some(i=>i.includes("Parrhesia"))&&(e.bioParagraphs=e.bioParagraphs.map(i=>i.replace(/Parrhesia/g,"The Sinners")),localStorage.setItem(Ot,JSON.stringify(e))),e}catch{return ne}}function Qt(t){localStorage.setItem(Ot,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("about-data-updated"))}function Ta(t){const e=X(),i={id:"slide_"+Date.now(),url:t};return e.slides.push(i),Qt(e),i}function ka(t,e){const i=X(),a=i.slides.findIndex(s=>s.id===t);return a!==-1?(i.slides[a].url=e,Qt(i),i.slides[a]):null}function wa(t){const e=X();e.slides=e.slides.filter(i=>i.id!==t),Qt(e)}function Na(t){const e=X();e.bioParagraphs=t,Qt(e)}const $t="parrhesia_social_links_v4",Ra={generic:'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'},mt=[{id:"soc_1",name:"Facebrowser",url:"https://face-tr.gta.world/page/parrhesia",iconUrl:"/icons/facebrowser.ico"},{id:"soc_2",name:"Youtube",url:"https://www.youtube.com/@parrhesiatheband",iconUrl:"/icons/youtube.png"},{id:"soc_3",name:"Soundloop",url:"https://soundloop.app",iconUrl:"/icons/soundloop.png"},{id:"soc_4",name:"LS Chat",url:"https://chat-tr.gta.world/app/s/107/5398",iconUrl:"/icons/lschat.svg"},{id:"soc_5",name:"SanMail",url:"https://mail-tr.gta.world/compose?to=mail%40parrhesia.com",iconUrl:"/icons/sanmail.png"}];function Ma(t){const e=(t.url||"").toLowerCase(),i=(t.name||"").toLowerCase().replace(/\s+/g,"");let a=t.iconUrl&&t.iconUrl.trim()!==""?t.iconUrl.trim():"";return a||(i.includes("facebrowser")||e.includes("face-tr.gta.world")?a="/icons/facebrowser.ico":i.includes("youtube")||e.includes("youtube.com")?a="/icons/youtube.png":i.includes("soundloop")||e.includes("soundloop.app")?a="/icons/soundloop.png":i.includes("chat")||e.includes("chat-tr.gta.world")?a="/icons/lschat.svg":(i.includes("mail")||e.includes("mail-tr.gta.world"))&&(a="/icons/sanmail.png")),a?a.startsWith("<svg")?a:`<img src="${qe(a)}" alt="${qe(t.name||"Social Icon")}" class="header-social-icon-img" onerror="this.onerror=null; this.src='https://www.google.com/s2/favicons?domain=${encodeURIComponent(t.url)}&sz=64';" />`:Ra.generic}function It(){const t=localStorage.getItem($t);if(!t)return localStorage.setItem($t,JSON.stringify(mt)),mt;try{const e=JSON.parse(t);return!Array.isArray(e)||e.length===0?(localStorage.setItem($t,JSON.stringify(mt)),mt):e}catch{return mt}}function Ee(t){localStorage.setItem($t,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("socials-data-updated"))}function Oa({name:t,url:e,iconUrl:i}){const a=It(),s={id:"soc_"+Date.now(),name:t||"Social Link",url:e||"#",iconUrl:i||""};return a.push(s),Ee(a),s}function $a(t,{name:e,url:i,iconUrl:a}){const s=It(),n=s.findIndex(r=>r.id===t);return n!==-1?(s[n]={...s[n],name:e!==void 0?e:s[n].name,url:i!==void 0?i:s[n].url,iconUrl:a!==void 0?a:s[n].iconUrl},Ee(s),s[n]):null}function Da(t){const i=It().filter(a=>a.id!==t);Ee(i)}function qe(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ue="parrhesia_media_library",oe=[{id:"med_101",name:"9MM HATE Cover Artwork",url:"https://i.imgur.com/ADvecY4.gif",type:"IMAGE",size:"1.4 MB",dimensions:"1200 x 1200",createdAt:"2026-08-01T10:00:00.000Z"},{id:"med_102",name:"Cruel Single Artwork",url:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",type:"IMAGE",size:"850 KB",dimensions:"1200 x 800",createdAt:"2026-08-02T11:00:00.000Z"},{id:"med_103",name:"It's The Way Cover",url:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",type:"IMAGE",size:"920 KB",dimensions:"1200 x 800",createdAt:"2026-08-03T12:00:00.000Z"},{id:"med_104",name:"Survive EP Cover",url:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",type:"IMAGE",size:"780 KB",dimensions:"1200 x 800",createdAt:"2026-08-04T13:00:00.000Z"},{id:"med_105",name:"Berlin Studio Session Photo",url:"https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",type:"IMAGE",size:"1.1 MB",dimensions:"1200 x 800",createdAt:"2026-08-05T14:00:00.000Z"}];function St(){const t=localStorage.getItem(ue);if(!t)return localStorage.setItem(ue,JSON.stringify(oe)),oe;try{return JSON.parse(t)}catch{return oe}}function ia(t){localStorage.setItem(ue,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("media-data-updated"))}function Ca({name:t,url:e,type:i="IMAGE",size:a="500 KB",dimensions:s="1200 x 800"}){const n=St(),r={id:"med_"+Date.now(),name:t||"Uploaded Asset",url:e,type:i,size:a,dimensions:s,createdAt:new Date().toISOString()};return n.unshift(r),ia(n),r}function Ba(t){const e=[];return q().forEach(n=>{n.images&&n.images.includes(t)&&e.push(`Tour Event: ${n.venue} (${n.city})`)}),C().forEach(n=>{n.coverUrl===t&&e.push(`Release Cover: ${n.title}`)}),U().forEach(n=>{n.image===t&&e.push(`Transmission: ${n.title}`)}),e}function Ua(t){let e=St();e=e.filter(i=>i.id!==t),ia(e)}const me="parrhesia_admin_activity_log",re=[{id:"act_1",action:"RELEASE CREATED",details:'Release "9MM HATE" (Album) published',user:"ADMIN",timestamp:new Date(Date.now()-36e5*2).toISOString()},{id:"act_2",action:"TOUR DATE UPDATED",details:'Tour Event "Sick New World Festival" set to SATIŞTA',user:"ADMIN",timestamp:new Date(Date.now()-36e5*5).toISOString()},{id:"act_3",action:"TRANSMISSION PUBLISHED",details:'Transmission "THE ANALOG RESONANCE OF 9MM HATE" published',user:"ADMIN",timestamp:new Date(Date.now()-36e5*12).toISOString()}];function sa(){const t=localStorage.getItem(me);if(!t)return localStorage.setItem(me,JSON.stringify(re)),re;try{return JSON.parse(t)}catch{return re}}function L(t,e){const i=sa(),a={id:"act_"+Date.now(),action:t,details:e,user:"ADMIN",timestamp:new Date().toISOString()};i.unshift(a),i.length>50&&i.pop(),localStorage.setItem(me,JSON.stringify(i)),window.dispatchEvent(new CustomEvent("activity-log-updated"))}const Dt="parrhesia_cms_settings",j={siteTitle:"The Sinners - Made of Sin",artistName:"THE SINNERS",contactEmail:"booking@thesinners.com",maintenanceMode:!1,autoPublishSchedule:!0,defaultPlayerVolume:.8};function xa(){const t=localStorage.getItem(Dt);if(!t)return localStorage.setItem(Dt,JSON.stringify(j)),j;try{const e=JSON.parse(t);let i=!1;return(!e.siteTitle||e.siteTitle.includes("parrhesia")||e.siteTitle.includes("your local band"))&&(e.siteTitle=j.siteTitle,i=!0),(!e.artistName||e.artistName.includes("PARRHESIA"))&&(e.artistName=j.artistName,i=!0),i&&localStorage.setItem(Dt,JSON.stringify({...j,...e})),{...j,...e}}catch{return j}}function qa(t){localStorage.setItem(Dt,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("settings-updated"))}const pe="parrhesia_footer_data",pt={line1:"© DEVIL'S GRIN RECORDS 2026",line2:"MADE OF SIN",line4:"© 2026 The Sinners",privacyPolicyUrl:"#",termsConditionsUrl:"#",aiUsageUrl:"#"};function Ae(){try{const t=localStorage.getItem(pe);if(t){const e=JSON.parse(t);let i=!1;return(!e.line2||e.line2.includes("COMA")||e.line2.includes("UNSPOKEN")||e.line2.includes("WE BUILT A WORLD"))&&(e.line2=pt.line2,i=!0),(!e.line4||e.line4.includes("Sony Music")||e.line4.includes("Parrhesia"))&&(e.line4=pt.line4,i=!0),i&&localStorage.setItem(pe,JSON.stringify({...pt,...e})),{...pt,...e}}}catch(t){console.error("Error reading footer data:",t)}return{...pt}}function Pa(t){try{const i={...Ae(),...t};return localStorage.setItem(pe,JSON.stringify(i)),window.dispatchEvent(new CustomEvent("footer-data-updated",{detail:i})),i}catch(e){return console.error("Error updating footer data:",e),null}}const Vt={sessionKey:"parrhesia_admin_auth",verifyPassword:t=>t==="mavisim"};function A(t,e="success"){let i=document.getElementById("admin-toast-container");i||(i=document.createElement("div"),i.id="admin-toast-container",i.className="admin-toast-container",document.body.appendChild(i));const a=document.createElement("div");a.className=`admin-toast ${e==="danger"?"toast-danger":"toast-success"}`,a.innerHTML=`
    <span class="toast-icon">${e==="danger"?"✕":"✓"}</span>
    <span class="toast-message">${f(t)}</span>
  `,i.appendChild(a),setTimeout(()=>{a.classList.add("toast-show")},10),setTimeout(()=>{a.classList.remove("toast-show"),setTimeout(()=>a.remove(),300)},3200)}function Ha(){dt(),window.addEventListener("popstate",()=>{dt()})}function dt(){const t=window.location.pathname,e=t==="/admin"||t.startsWith("/admin/"),i=document.querySelector(".site-container"),a=document.querySelector(".mobile-header"),s=document.getElementById("admin-portal-root");if(s)if(e){if(i&&i.classList.add("hidden"),a&&a.classList.add("hidden"),s.classList.remove("hidden"),!Ka()){Ga(s);return}t==="/admin/tour"?nt(s):t==="/admin/music"||t.startsWith("/admin/music/")?ot(s):t==="/admin/updates"||t==="/admin/news"?rt(s):t==="/admin/media"?Xt(s):t==="/admin/about"?Yt(s):t==="/admin/socials"||t==="/admin/social"?Le(s):t==="/admin/footer"?Xa(s):t==="/admin/settings"?Ja(s):_a(s)}else i&&i.classList.remove("hidden"),a&&a.classList.remove("hidden"),s.classList.add("hidden"),s.innerHTML=""}function Ka(){return sessionStorage.getItem(Vt.sessionKey)==="true"}function na(t){t?sessionStorage.setItem(Vt.sessionKey,"true"):sessionStorage.removeItem(Vt.sessionKey)}function za(t){window.location.pathname!==t&&window.history.pushState(null,"",t),dt()}function Ga(t){t.innerHTML=`
    <div class="admin-login-wrapper">
      <div class="admin-login-card">
        <div class="admin-login-title">THE SINNERS CMS</div>
        <div class="admin-login-sub">ADMINISTRATION PORTAL</div>
        <form id="admin-login-form">
          <div class="admin-form-group">
            <label class="admin-label" for="admin-password-input">Security Password</label>
            <input 
              type="password" 
              id="admin-password-input" 
              class="admin-input" 
              placeholder="Enter password..." 
              autocomplete="current-password" 
              autofocus 
              required 
            />
          </div>
          <button type="submit" class="admin-btn admin-btn-primary" style="width: 100%;">LOGIN TO CMS</button>
          <div id="admin-error" class="admin-error-msg"></div>
        </form>
      </div>
    </div>
  `;const e=t.querySelector("#admin-login-form"),i=t.querySelector("#admin-password-input"),a=t.querySelector("#admin-error");e&&i&&e.addEventListener("submit",s=>{s.preventDefault();const n=i.value;Vt.verifyPassword(n)?(na(!0),L("LOGIN","Administrator logged into CMS"),a&&(a.textContent=""),dt()):(a&&(a.textContent="Invalid password."),i.value="",i.focus())})}function H(t){return`
    <aside id="admin-sidebar" class="admin-sidebar">
      <div>
        <div class="admin-sidebar-brand">
          <div class="admin-brand-title">THE SINNERS CMS</div>
          <div class="admin-brand-sub">Central Content Management</div>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">DASHBOARD</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/dashboard" class="admin-link ${t==="/admin"||t==="/admin/dashboard"?"active":""}">Dashboard</a>
            </li>
          </ul>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">CONTENT</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/tour" class="admin-link ${t==="/admin/tour"?"active":""}">Tour</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/music" class="admin-link ${t==="/admin/music"?"active":""}">Music</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/updates" class="admin-link ${t==="/admin/updates"?"active":""}">UPD//T3</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/about" class="admin-link ${t==="/admin/about"?"active":""}">About</a>
            </li>
          </ul>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">MEDIA</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/media" class="admin-link ${t==="/admin/media"?"active":""}">Media Library</a>
            </li>
          </ul>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">SYSTEM</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/footer" class="admin-link ${t==="/admin/footer"?"active":""}">Footer</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/socials" class="admin-link ${t==="/admin/socials"?"active":""}">Social Links</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/settings" class="admin-link ${t==="/admin/settings"?"active":""}">Settings</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="sidebar-footer">
        <button id="admin-logout-btn" class="admin-logout-link">Log Out</button>
      </div>
    </aside>
  `}function K(t){t.querySelectorAll(".admin-link").forEach(n=>{n.addEventListener("click",r=>{r.preventDefault();const o=n.getAttribute("href");za(o)})});const i=t.querySelector("#admin-mobile-toggle-btn"),a=t.querySelector("#admin-sidebar");i&&a&&i.addEventListener("click",()=>{a.classList.toggle("is-open")});const s=t.querySelector("#admin-logout-btn");s&&s.addEventListener("click",()=>{na(!1),L("LOGOUT","Administrator logged out"),dt()})}function _a(t){const e=q(),i=e.filter(d=>d.visible&&(d.status==="SATIŞTA"||d.status==="UPCOMING")),a=C(),s=Zt(),n=U(),r=St(),o=sa().slice(0,8);t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Dashboard Overview</h1>
            <p class="admin-page-desc">Central Content & System Activity Summary</p>
          </div>
        </div>

        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <div class="admin-stat-label">TOUR EVENTS</div>
            <div class="admin-stat-val">${e.length}</div>
            <div class="admin-stat-sub">${i.length} upcoming shows</div>
          </div>

          <div class="admin-stat-card">
            <div class="admin-stat-label">DISCOGRAPHY</div>
            <div class="admin-stat-val">${a.length}</div>
            <div class="admin-stat-sub">${s.length} tracks published</div>
          </div>

          <div class="admin-stat-card">
            <div class="admin-stat-label">TRANSMISSIONS</div>
            <div class="admin-stat-val">${n.length}</div>
            <div class="admin-stat-sub">UPD//T3 journal records</div>
          </div>

          <div class="admin-stat-card">
            <div class="admin-stat-label">MEDIA ASSETS</div>
            <div class="admin-stat-val">${r.length}</div>
            <div class="admin-stat-sub">Uploaded image files</div>
          </div>
        </div>

        <div class="admin-content-section" style="margin-top: 2.5rem;">
          <h2 class="admin-section-subtitle">RECENT ACTIVITY LOG</h2>
          <div class="admin-activity-list">
            ${o.length>0?o.map(d=>`
              <div class="admin-activity-item">
                <div class="activity-left">
                  <span class="activity-badge">${f(d.action)}</span>
                  <span class="activity-details">${f(d.details)}</span>
                </div>
                <span class="activity-time">${new Date(d.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})} — ${new Date(d.timestamp).toLocaleDateString()}</span>
              </div>
            `).join(""):'<div class="admin-empty-state">No recent activity recorded.</div>'}
          </div>
        </div>
      </main>
    </div>
  `,K(t)}let $="ALL",kt="";function nt(t){const e=q(),i=new Date().toISOString().split("T")[0];let a=e.filter(c=>$==="UPCOMING"?c.date>=i:$==="PAST"?c.date<i:$==="SOLD_OUT"?c.status==="TÜKENDİ"||c.status==="SOLD OUT":$==="DRAFT"?!c.visible:$==="PUBLISHED"?c.visible:!0);if(kt.trim()){const c=kt.toLowerCase().trim();a=a.filter(l=>l.venue&&l.venue.toLowerCase().includes(c)||l.city&&l.city.toLowerCase().includes(c)||l.country&&l.country.toLowerCase().includes(c))}t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/tour")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Tour Management</h1>
            <p class="admin-page-desc">Create, Edit, Publish and Manage Upcoming & Past Tour Events</p>
          </div>
          <div class="admin-header-actions" style="display: flex; gap: 0.75rem;">
            <button id="btn-add-upcoming-event" class="admin-btn admin-btn-primary">+ GELECEK ETKİNLİK (UPCOMING)</button>
            <button id="btn-add-past-event" class="admin-btn admin-btn-secondary" style="border-color: #d92b2b; color: #ffffff; background: rgba(217, 43, 43, 0.15);">+ GEÇMİŞ ETKİNLİK (PAST)</button>
          </div>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="tour-search-input" class="admin-input" placeholder="Search event, venue, or city..." value="${f(kt)}" />
          </div>

          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${$==="ALL"?"active":""}" data-filter="ALL">TÜMÜ (${e.length})</button>
            <button class="admin-filter-btn ${$==="UPCOMING"?"active":""}" data-filter="UPCOMING">GELECEK ETKİNLİKLER</button>
            <button class="admin-filter-btn ${$==="PAST"?"active":""}" data-filter="PAST">GEÇMİŞ ETKİNLİKLER</button>
            <button class="admin-filter-btn ${$==="SOLD_OUT"?"active":""}" data-filter="SOLD_OUT">TÜKENDİ</button>
            <button class="admin-filter-btn ${$==="PUBLISHED"?"active":""}" data-filter="PUBLISHED">PUBLISHED</button>
            <button class="admin-filter-btn ${$==="DRAFT"?"active":""}" data-filter="DRAFT">DRAFTS</button>
          </div>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ZAMAN / DÖNEM</th>
                <th>TARIH</th>
                <th>MEKAN & ETKİNLİK</th>
                <th>ŞEHİR / ÜLKE</th>
                <th>DURUM</th>
                <th>FOTOĞRAFLAR</th>
                <th>YAYIN</th>
                <th>İŞLEMLER</th>
              </tr>
            </thead>
            <tbody>
              ${Fa(a,i)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,K(t);const s=t.querySelector("#tour-search-input");s&&(s.oninput=c=>{kt=c.target.value,nt(t)}),t.querySelectorAll(".admin-filter-btn").forEach(c=>{c.onclick=()=>{$=c.getAttribute("data-filter")||"ALL",nt(t)}});const r=t.querySelector("#btn-add-upcoming-event");r&&(r.onclick=()=>le(null,t,"UPCOMING"));const o=t.querySelector("#btn-add-past-event");o&&(o.onclick=()=>le(null,t,"PAST")),t.querySelectorAll(".btn-edit-event").forEach(c=>{c.onclick=()=>{const l=c.getAttribute("data-id"),p=q().find(g=>g.id===l);p&&le(p,t)}}),t.querySelectorAll(".btn-toggle-event").forEach(c=>{c.onclick=()=>{const l=c.getAttribute("data-id");Sa(l),L("TOUR UPDATED",`Visibility toggled for tour event ${l}`),A("✓ TOUR EVENT VISIBILITY UPDATED"),nt(t)}}),t.querySelectorAll(".btn-delete-event").forEach(c=>{c.onclick=()=>{const l=c.getAttribute("data-id"),p=q().find(g=>g.id===l);p&&Ie(p,"TOUR",t)}})}function Fa(t,e){return t.length===0?'<tr><td colspan="8" class="admin-empty-cell">Filtreye uygun etkinlik bulunamadı.</td></tr>':t.map(i=>{const a=i.date<e,s=(i.images||[]).length,n=a?"TAMAMLANDI":i.status||"SATIŞTA",r=a?"badge-subtle":n==="TÜKENDİ"?"badge-danger":"badge-success";return`
      <tr>
        <td>
          <span class="admin-badge ${a?"badge-subtle":"badge-warning"}">${a?"GEÇMİŞ ETKİNLİK":"GELECEK ETKİNLİK"}</span>
        </td>
        <td><strong>${f(i.date)}</strong></td>
        <td>
          <div class="admin-row-title">${f(i.venue)}</div>
          <div class="admin-sub-text">${f(i.description||"Concert Event")}</div>
        </td>
        <td>${f(i.city)}, ${f(i.country)}</td>
        <td><span class="admin-badge ${r}">${f(n)}</span></td>
        <td><strong>${s>0?`📷 ${s} Fotoğraf`:"—"}</strong></td>
        <td>
          <span class="admin-badge ${i.visible?"badge-active":"badge-muted"}">${i.visible?"PUBLISHED":"DRAFT"}</span>
        </td>
        <td>
          <div class="admin-action-btns">
            <button class="admin-action-btn btn-edit-event" data-id="${i.id}">Edit</button>
            <button class="admin-action-btn btn-toggle-event" data-id="${i.id}">${i.visible?"Unpublish":"Publish"}</button>
            <button class="admin-action-btn btn-danger btn-delete-event" data-id="${i.id}">Delete</button>
          </div>
        </td>
      </tr>
    `}).join("")}function le(t,e,i="UPCOMING"){const a=!!t,s=new Date().toISOString().split("T")[0];let n=i,r="";if(t)n=t.date<s?"PAST":"UPCOMING",r=t.date;else if(i==="PAST"){const g=new Date;g.setMonth(g.getMonth()-3),r=g.toISOString().split("T")[0]}else{const g=new Date;g.setMonth(g.getMonth()+2),r=g.toISOString().split("T")[0]}const o=document.createElement("div");o.className="admin-modal-backdrop",o.innerHTML=`
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${a?"EDIT TOUR EVENT":i==="PAST"?"YENİ GEÇMİŞ ETKİNLİK EKLE":"YENİ GELECEK ETKİNLİK EKLE"}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="tour-event-form" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
        <div class="admin-modal-body" style="flex: 1; overflow-y: auto;">
          <div class="admin-form-grid">
            <div class="admin-form-group span-2">
              <label class="admin-label">Etkinlik Zaman Türü (Period)*</label>
              <select id="evt-period-category" class="admin-input">
                <option value="UPCOMING" ${n==="UPCOMING"?"selected":""}>GELECEK ETKİNLİK (Upcoming Concert)</option>
                <option value="PAST" ${n==="PAST"?"selected":""}>GEÇMİŞ ETKİNLİK (Past Show Archive)</option>
              </select>
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Etkinlik Tarihi (YYYY-MM-DD)*</label>
              <input type="date" id="evt-date" class="admin-input" value="${r}" required />
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Mekan Adı (Venue)*</label>
              <input type="text" id="evt-venue" class="admin-input" placeholder="Örn: Sick New World Festival / O2 Brixton Academy" value="${t?f(t.venue):""}" required />
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Şehir (City)*</label>
              <input type="text" id="evt-city" class="admin-input" placeholder="Örn: İstanbul / London" value="${t?f(t.city):""}" required />
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Ülke / Eyalet (Country)*</label>
              <input type="text" id="evt-country" class="admin-input" placeholder="Örn: Türkiye / UK" value="${t?f(t.country):""}" required />
            </div>

            <div class="admin-form-group" id="evt-status-group">
              <label class="admin-label">Bilet Durumu (Status)</label>
              <select id="evt-status" class="admin-input">
                <option value="SATIŞTA" ${t&&t.status==="SATIŞTA"?"selected":""}>SATIŞTA (On Sale)</option>
                <option value="TÜKENDİ" ${t&&t.status==="TÜKENDİ"?"selected":""}>TÜKENDİ (Sold Out)</option>
                <option value="CANCELLED" ${t&&t.status==="CANCELLED"?"selected":""}>CANCELLED</option>
              </select>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Yayın Durumu (Publish Status)</label>
              <select id="evt-visible" class="admin-input">
                <option value="true" ${!t||t.visible?"selected":""}>PUBLISHED (Yayında)</option>
                <option value="false" ${t&&!t.visible?"selected":""}>DRAFT (Taslak / Gizli)</option>
              </select>
            </div>

            <div class="admin-form-group span-2" id="evt-ticket-url-group">
              <label class="admin-label">Bilet Alma Bağlantısı (Ticket URL)</label>
              <input type="url" id="evt-ticket-url" class="admin-input" placeholder="https://tickets.example.com/show" value="${t?f(t.ticketUrl||""):""}" />
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Etkinlik Açıklaması / Alt Başlık</label>
              <input type="text" id="evt-desc" class="admin-input" placeholder="Örn: Headline Stage Performance" value="${t?f(t.description||""):""}" />
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Geçmiş Etkinlik Fotoğraf Galerisi (Her satıra 1 resim URL'si ekleyin)</label>
              <textarea id="evt-images-textarea" class="admin-input" rows="3" placeholder="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80">${t&&t.images?t.images.join(`
`):""}</textarea>
            </div>
          </div>
        </div>

        <div class="admin-modal-footer" style="position: sticky; bottom: 0; background: #0e0e11; border-top: 1px solid rgba(255, 255, 255, 0.15); padding: 1.25rem 2rem; display: flex; justify-content: flex-end; gap: 1rem; z-index: 10;">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">İptal</button>
          <button type="submit" class="admin-btn admin-btn-primary" style="background: #d92b2b; color: #ffffff; padding: 0.75rem 1.8rem; font-size: 0.82rem; font-weight: 700;">💾 KAYDET (SAVE EVENT)</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(o);const d=()=>o.remove();o.querySelector(".admin-modal-close").onclick=d,o.querySelector(".admin-modal-cancel").onclick=d;const m=o.querySelector("#evt-period-category"),u=o.querySelector("#evt-status-group"),c=o.querySelector("#evt-ticket-url-group"),l=()=>{const g=m.value==="PAST";u&&(u.style.display=g?"none":"block"),c&&(c.style.display=g?"none":"block")};m.onchange=l,l();const p=o.querySelector("#tour-event-form");p.onsubmit=g=>{g.preventDefault();const b=o.querySelector("#evt-period-category").value;let h=o.querySelector("#evt-date").value;const k=new Date().toISOString().split("T")[0];if(b==="PAST"&&h>=k){const S=new Date;S.setDate(S.getDate()-1),h=S.toISOString().split("T")[0]}else b==="UPCOMING"&&h<k&&(h=k);const I=o.querySelector("#evt-images-textarea").value.split(`
`).map(S=>S.trim()).filter(Boolean),y={date:h,time:"",venue:o.querySelector("#evt-venue").value,city:o.querySelector("#evt-city").value,country:o.querySelector("#evt-country").value,status:b==="PAST"?"TAMAMLANDI":o.querySelector("#evt-status").value,visible:o.querySelector("#evt-visible").value==="true",ticketUrl:b==="PAST"?"":o.querySelector("#evt-ticket-url").value,description:o.querySelector("#evt-desc").value,images:I};a?(ha(t.id,y),L("TOUR EVENT UPDATED",`Updated ${b} event "${y.venue}" (${y.city})`),A("✓ TOUR EVENT SAVED SUCCESSFULLY")):(ba(y),L("TOUR EVENT CREATED",`Created ${b} event "${y.venue}" (${y.city})`),A("✓ TOUR EVENT CREATED SUCCESSFULLY")),d(),nt(e)}}let x="ALL",wt="";function ot(t){const e=C();let i=e.filter(m=>x==="ALBUMS"?m.type==="ALBUM":x==="SINGLES"?m.type==="SINGLE":x==="EPS"?m.type==="EP":x==="DRAFTS"?m.status==="DRAFT":!0);if(wt.trim()){const m=wt.toLowerCase().trim();i=i.filter(u=>u.title.toLowerCase().includes(m)||u.type.toLowerCase().includes(m))}t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/music")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Music & Discography CMS</h1>
            <p class="admin-page-desc">Manage Official Releases, Tracklists, Audio Files & Cover Artworks</p>
          </div>
          <button id="btn-add-release" class="admin-btn admin-btn-primary">+ CREATE RELEASE</button>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="music-search-input" class="admin-input" placeholder="Search release title or type..." value="${f(wt)}" />
          </div>

          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${x==="ALL"?"active":""}" data-filter="ALL">ALL RELEASES (${e.length})</button>
            <button class="admin-filter-btn ${x==="ALBUMS"?"active":""}" data-filter="ALBUMS">ALBUMS</button>
            <button class="admin-filter-btn ${x==="SINGLES"?"active":""}" data-filter="SINGLES">SINGLES</button>
            <button class="admin-filter-btn ${x==="EPS"?"active":""}" data-filter="EPS">EPs</button>
            <button class="admin-filter-btn ${x==="DRAFTS"?"active":""}" data-filter="DRAFTS">DRAFTS</button>
          </div>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>COVER</th>
                <th>RELEASE TITLE</th>
                <th>TYPE</th>
                <th>RELEASE DATE</th>
                <th>TRACKS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              ${Va(i)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,K(t);const a=t.querySelector("#music-search-input");a&&(a.oninput=m=>{wt=m.target.value,ot(t)}),t.querySelectorAll(".admin-filter-btn").forEach(m=>{m.onclick=()=>{x=m.getAttribute("data-filter")||"ALL",ot(t)}});const n=t.querySelector("#btn-add-release");n&&(n.onclick=()=>Pe(null,t)),t.querySelectorAll(".btn-edit-release").forEach(m=>{m.onclick=()=>{const u=m.getAttribute("data-id"),c=C().find(l=>l.id===u);c&&Pe(c,t)}}),t.querySelectorAll(".btn-toggle-release").forEach(m=>{m.onclick=()=>{const u=m.getAttribute("data-id"),c=C().find(l=>l.id===u);if(c){const l=c.status==="PUBLISHED"?"DRAFT":"PUBLISHED";Xe(u,{status:l}),L("RELEASE UPDATED",`Release "${c.title}" status changed to ${l}`),A("✓ RELEASE STATUS UPDATED"),ot(t)}}}),t.querySelectorAll(".btn-delete-release").forEach(m=>{m.onclick=()=>{const u=m.getAttribute("data-id"),c=C().find(l=>l.id===u);c&&Ie(c,"RELEASE",t)}})}function Va(t){return t.length===0?'<tr><td colspan="7" class="admin-empty-cell">No releases found matching filter.</td></tr>':t.map(e=>{const i=(e.tracks||[]).length;return`
      <tr>
        <td>
          <img src="${e.coverUrl}" alt="Cover" class="admin-thumb-img" />
        </td>
        <td>
          <div class="admin-row-title">${f(e.title)} ${e.featured?'<span class="admin-badge badge-warning">FEATURED</span>':""}</div>
          <div class="admin-sub-text">${f(e.artist||"THE SINNERS")}</div>
        </td>
        <td><span class="admin-badge badge-subtle">${e.type}</span></td>
        <td>${f(e.releaseDate||e.year)}</td>
        <td><strong>${i} ${i===1?"Track":"Tracks"}</strong></td>
        <td>
          <span class="admin-badge ${e.status==="PUBLISHED"?"badge-active":"badge-muted"}">${e.status||"PUBLISHED"}</span>
        </td>
        <td>
          <div class="admin-action-btns">
            <button class="admin-action-btn btn-edit-release" data-id="${e.id}">Edit Release & Tracks</button>
            <button class="admin-action-btn btn-toggle-release" data-id="${e.id}">${e.status==="PUBLISHED"?"Unpublish":"Publish"}</button>
            <button class="admin-action-btn btn-danger btn-delete-release" data-id="${e.id}">Delete</button>
          </div>
        </td>
      </tr>
    `}).join("")}function Pe(t,e){const i=!!t;let a=t&&t.tracks?JSON.parse(JSON.stringify(t.tracks)):[{id:"trk_"+Date.now(),title:"Sample Track",duration:"03:30",audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}],s=null;const n=document.createElement("div");n.className="admin-modal-backdrop";const r=()=>{n.innerHTML=`
      <div class="admin-modal admin-modal-wide">
        <div class="admin-modal-header">
          <h2 class="admin-modal-title">${i?"EDIT RELEASE & TRACKLIST":"CREATE NEW RELEASE"}</h2>
          <button type="button" class="admin-modal-close">&times;</button>
        </div>
        <form id="release-form">
          <div class="admin-modal-body admin-grid-layout">
            <!-- LEFT MAIN COL: RELEASE METADATA & TRACKLIST -->
            <div class="admin-modal-main-col">
              <div class="admin-form-grid">
                <div class="admin-form-group span-2">
                  <label class="admin-label">Release Title*</label>
                  <input type="text" id="rel-title" class="admin-input" value="${t?f(t.title):""}" required placeholder="e.g. 9MM HATE" />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Artist Name*</label>
                  <input type="text" id="rel-artist" class="admin-input" value="${t?f(t.artist):"THE SINNERS"}" required />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Release Type*</label>
                  <select id="rel-type" class="admin-input">
                    <option value="ALBUM" ${t&&t.type==="ALBUM"?"selected":""}>ALBUM</option>
                    <option value="SINGLE" ${t&&t.type==="SINGLE"?"selected":""}>SINGLE</option>
                    <option value="EP" ${t&&t.type==="EP"?"selected":""}>EP</option>
                  </select>
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Release Date String*</label>
                  <input type="text" id="rel-date" class="admin-input" value="${t?f(t.releaseDate):"18 OCAK 2026"}" placeholder="e.g. 18 OCAK 2026" required />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Year*</label>
                  <input type="text" id="rel-year" class="admin-input" value="${t?f(t.year):new Date().getFullYear().toString()}" required />
                </div>

                <div class="admin-form-group span-2">
                  <label class="admin-label">Description / Bio Statement</label>
                  <textarea id="rel-desc" class="admin-input" rows="2" placeholder="Brief description of the release...">${t?f(t.description):""}</textarea>
                </div>

                <!-- DIGITAL PLATFORM LINKS (Database Ready) -->
                <div class="admin-form-group">
                  <label class="admin-label">Spotify Link</label>
                  <input type="url" id="rel-spotify" class="admin-input" value="${t?f(t.spotifyUrl||""):""}" placeholder="https://open.spotify.com/..." />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Apple Music Link</label>
                  <input type="url" id="rel-apple" class="admin-input" value="${t?f(t.appleUrl||""):""}" placeholder="https://music.apple.com/..." />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">YouTube Link</label>
                  <input type="url" id="rel-youtube" class="admin-input" value="${t?f(t.youtubeUrl||""):""}" placeholder="https://youtube.com/..." />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Bandcamp / Store Link</label>
                  <input type="url" id="rel-bandcamp" class="admin-input" value="${t?f(t.bandcampUrl||""):""}" placeholder="https://bandcamp.com/..." />
                </div>
              </div>

              <!-- TRACKLIST MANAGER -->
              <div class="admin-tracklist-editor" style="margin-top: 2rem;">
                <div class="admin-section-header-row">
                  <h3>TRACKLIST MANAGER (${a.length} TRACKS)</h3>
                  <button type="button" id="btn-add-track-row" class="admin-btn admin-btn-secondary">+ ADD TRACK</button>
                </div>

                <div class="admin-table-container">
                  <table class="admin-table admin-table-compact">
                    <thead>
                      <tr>
                        <th style="width: 30px;">#</th>
                        <th>TRACK TITLE</th>
                        <th style="width: 80px;">DURATION</th>
                        <th>AUDIO FILE / STREAM URL</th>
                        <th style="width: 110px;">PREVIEW / ACTION</th>
                      </tr>
                    </thead>
                    <tbody id="tracklist-rows-body">
                      ${a.map((E,I)=>`
                        <tr>
                          <td><strong>${I+1}</strong></td>
                          <td>
                            <input type="text" class="admin-input input-track-title" data-idx="${I}" value="${f(E.title)}" placeholder="Track title..." required />
                          </td>
                          <td>
                            <input type="text" class="admin-input input-track-dur" data-idx="${I}" value="${f(E.duration)}" placeholder="03:45" required />
                          </td>
                          <td>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                              <input type="text" class="admin-input input-track-url" data-idx="${I}" value="${f(E.audioUrl)}" placeholder="https://... or upload local MP3" required />
                              <label class="admin-file-upload-btn" style="display: inline-block; font-size: 0.72rem; padding: 2px 6px; cursor: pointer; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 3px; text-align: center;">
                                🎵 Upload MP3 File
                                <input type="file" class="input-track-file hidden" data-idx="${I}" accept="audio/*" />
                              </label>
                            </div>
                          </td>
                          <td>
                            <div style="display: flex; gap: 4px; align-items: center;">
                              <button type="button" class="admin-action-btn btn-test-play-audio" data-idx="${I}" title="Test Play Audio">▶</button>
                              <button type="button" class="admin-action-btn btn-danger btn-remove-track" data-idx="${I}">&times;</button>
                            </div>
                          </td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- RIGHT SIDEBAR COL: ARTWORK & PUBLISHING -->
            <div class="admin-modal-side-col">
              <div class="admin-form-group">
                <label class="admin-label">Cover Artwork URL / Upload*</label>
                <input type="text" id="rel-cover-url" class="admin-input" value="${t?f(t.coverUrl):"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"}" required />
                <label class="admin-btn admin-btn-secondary" style="display: block; width: 100%; margin-top: 6px; text-align: center; cursor: pointer; box-sizing: border-box;">
                  📷 Upload Cover Image File
                  <input type="file" id="rel-cover-file" class="hidden" accept="image/*" />
                </label>
                <div class="admin-img-preview-box" style="margin-top: 0.75rem;">
                  <img id="rel-cover-preview" src="${t?t.coverUrl:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"}" alt="Preview" />
                </div>
              </div>

              <div class="admin-form-group" style="margin-top: 1.5rem;">
                <label class="admin-label">Publication Status</label>
                <select id="rel-status" class="admin-input">
                  <option value="PUBLISHED" ${!t||t.status==="PUBLISHED"?"selected":""}>PUBLISHED (Public)</option>
                  <option value="DRAFT" ${t&&t.status==="DRAFT"?"selected":""}>DRAFT (Hidden)</option>
                </select>
              </div>

              <div class="admin-form-group" style="margin-top: 1rem;">
                <label class="admin-checkbox-label">
                  <input type="checkbox" id="rel-featured" ${t&&t.featured?"checked":""} />
                  <span>Set as Main Featured Release</span>
                </label>
              </div>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
            <button type="submit" class="admin-btn admin-btn-primary">SAVE RELEASE & TRACKS</button>
          </div>
        </form>
      </div>
    `;const d=()=>{s&&(s.pause(),s=null)},m=()=>{d(),n.remove()};n.querySelector(".admin-modal-close").onclick=m,n.querySelector(".admin-modal-cancel").onclick=m;const u=n.querySelector("#rel-cover-url"),c=n.querySelector("#rel-cover-file"),l=n.querySelector("#rel-cover-preview");u&&l&&(u.oninput=E=>{l.src=E.target.value}),c&&u&&l&&(c.onchange=E=>{const I=E.target.files[0];if(I){const y=new FileReader;y.onload=S=>{u.value=S.target.result,l.src=S.target.result},y.readAsDataURL(I)}}),n.querySelectorAll(".input-track-file").forEach(E=>{E.onchange=I=>{const y=parseInt(E.getAttribute("data-idx")),S=I.target.files[0];if(S){const O=n.querySelector(`.input-track-url[data-idx="${y}"]`),M=n.querySelector(`.input-track-dur[data-idx="${y}"]`),Tt=new FileReader;Tt.onload=tt=>{O&&(O.value=tt.target.result),a[y]&&(a[y].audioUrl=tt.target.result);const ae=new Audio(tt.target.result);ae.onloadedmetadata=()=>{const Be=Math.floor(ae.duration/60),Ue=Math.floor(ae.duration%60),xe=`${Be<10?"0":""}${Be}:${Ue<10?"0":""}${Ue}`;M&&(M.value=xe),a[y]&&(a[y].duration=xe)}},Tt.readAsDataURL(S)}}}),n.querySelectorAll(".btn-test-play-audio").forEach(E=>{E.onclick=()=>{const I=parseInt(E.getAttribute("data-idx"));o();const y=a[I];if(!y||!y.audioUrl){A("⚠️ Please enter an Audio Stream URL or upload an MP3 file first!");return}s&&s.src===y.audioUrl&&!s.paused?(s.pause(),E.textContent="▶"):(d(),s=new Audio(y.audioUrl),s.play().then(()=>{E.textContent="⏸"}).catch(S=>{A("⚠️ Unable to play audio stream: "+S.message)}),s.onended=()=>{E.textContent="▶"})}});const b=n.querySelector("#btn-add-track-row");b&&(b.onclick=()=>{o(),a.push({id:"trk_"+Date.now(),title:"New Track",duration:"03:30",audioUrl:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}),r()}),n.querySelectorAll(".btn-remove-track").forEach(E=>{E.onclick=()=>{const I=parseInt(E.getAttribute("data-idx"));o(),a.splice(I,1),r()}});const k=n.querySelector("#release-form");k.onsubmit=E=>{E.preventDefault(),d(),o();const I=n.querySelector("#rel-title").value,y=n.querySelector("#rel-type").value,S=a.map(M=>({...M,releaseTitle:I,type:y})),O={title:I,artist:n.querySelector("#rel-artist").value,type:y,releaseDate:n.querySelector("#rel-date").value,year:n.querySelector("#rel-year").value,description:n.querySelector("#rel-desc").value,spotifyUrl:n.querySelector("#rel-spotify").value,appleUrl:n.querySelector("#rel-apple").value,youtubeUrl:n.querySelector("#rel-youtube").value,bandcampUrl:n.querySelector("#rel-bandcamp").value,coverUrl:n.querySelector("#rel-cover-url").value,status:n.querySelector("#rel-status").value,featured:n.querySelector("#rel-featured").checked,tracks:S};i?(Xe(t.id,O),L("RELEASE UPDATED",`Updated release "${O.title}" (${O.type})`),A("✓ RELEASE & TRACKLIST SAVED SUCCESSFULLY")):(Ea(O),L("RELEASE CREATED",`Created release "${O.title}" (${O.type})`),A("✓ NEW RELEASE CREATED SUCCESSFULLY")),m(),ot(e)}},o=()=>{const d=n.querySelectorAll(".input-track-title"),m=n.querySelectorAll(".input-track-dur"),u=n.querySelectorAll(".input-track-url");d.forEach((c,l)=>{a[l]&&(a[l].title=c.value,a[l].duration=m[l]?m[l].value:"03:30",a[l].audioUrl=u[l]?u[l].value:"")})};document.body.appendChild(n),r()}let z="ALL",Nt="";function rt(t){const e=U();let i=e.filter(u=>z==="PUBLISHED"?u.status!=="DRAFT":z==="DRAFT"?u.status==="DRAFT":z==="FEATURED"?u.featured:!0);if(Nt.trim()){const u=Nt.toLowerCase().trim();i=i.filter(c=>c.title&&c.title.toLowerCase().includes(u)||c.category&&c.category.toLowerCase().includes(u))}t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/updates")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">UPD//T3 Transmissions CMS</h1>
            <p class="admin-page-desc">Create, Edit, Preview and Publish Digital Journal Records & Essays</p>
          </div>
          <button id="btn-add-journal" class="admin-btn admin-btn-primary">+ CREATE TRANSMISSION</button>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="update-search-input" class="admin-input" placeholder="Search transmission title or category..." value="${f(Nt)}" />
          </div>

          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${z==="ALL"?"active":""}" data-filter="ALL">ALL (${e.length})</button>
            <button class="admin-filter-btn ${z==="PUBLISHED"?"active":""}" data-filter="PUBLISHED">PUBLISHED</button>
            <button class="admin-filter-btn ${z==="DRAFT"?"active":""}" data-filter="DRAFT">DRAFTS</button>
            <button class="admin-filter-btn ${z==="FEATURED"?"active":""}" data-filter="FEATURED">FEATURED</button>
          </div>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>TRANSMISSION TITLE</th>
                <th>CATEGORY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              ${Ya(i)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,K(t);const a=t.querySelector("#update-search-input");a&&(a.oninput=u=>{Nt=u.target.value,rt(t)}),t.querySelectorAll(".admin-filter-btn").forEach(u=>{u.onclick=()=>{z=u.getAttribute("data-filter")||"ALL",rt(t)}});const n=t.querySelector("#btn-add-journal");n&&(n.onclick=()=>He(null,t)),t.querySelectorAll(".btn-edit-journal").forEach(u=>{u.onclick=()=>{const c=u.getAttribute("data-id"),l=U().find(p=>p.id===c);l&&He(l,t)}}),t.querySelectorAll(".btn-preview-journal").forEach(u=>{u.onclick=()=>{const c=u.getAttribute("data-id"),l=U().find(p=>p.id===c);l&&oa(l)}}),t.querySelectorAll(".btn-toggle-journal").forEach(u=>{u.onclick=()=>{const c=u.getAttribute("data-id"),l=U().find(p=>p.id===c);if(l){const p=l.status==="PUBLISHED"?"DRAFT":"PUBLISHED";aa(c,{status:p}),L("TRANSMISSION UPDATED",`Transmission "${l.title}" status changed to ${p}`),A("✓ TRANSMISSION STATUS UPDATED"),rt(t)}}}),t.querySelectorAll(".btn-delete-journal").forEach(u=>{u.onclick=()=>{const c=u.getAttribute("data-id"),l=U().find(p=>p.id===c);l&&Ie(l,"TRANSMISSION",t)}})}function Ya(t){return t.length===0?'<tr><td colspan="5" class="admin-empty-cell">No transmission records found matching filter.</td></tr>':t.map(e=>`
      <tr>
        <td><strong>${f(e.date)}</strong></td>
        <td>
          <div class="admin-row-title">${f(e.title)} ${e.featured?'<span class="admin-badge badge-warning">FEATURED</span>':""}</div>
          <div class="admin-sub-text">${f(e.meta||"Journal Transmission")}</div>
        </td>
        <td><span class="admin-badge badge-subtle">${f(e.category||"JOURNAL")}</span></td>
        <td><span class="admin-badge ${e.status==="DRAFT"?"badge-muted":"badge-active"}">${e.status||"PUBLISHED"}</span></td>
        <td>
          <div class="admin-action-btns">
            <button class="admin-action-btn btn-edit-journal" data-id="${e.id}">Edit</button>
            <button class="admin-action-btn btn-preview-journal" data-id="${e.id}">Preview</button>
            <button class="admin-action-btn btn-toggle-journal" data-id="${e.id}">${e.status==="DRAFT"?"Publish":"Unpublish"}</button>
            <button class="admin-action-btn btn-danger btn-delete-journal" data-id="${e.id}">Delete</button>
          </div>
        </td>
      </tr>
    `).join("")}function He(t,e){const i=!!t,a=document.createElement("div");a.className="admin-modal-backdrop",a.innerHTML=`
    <div class="admin-modal admin-modal-wide">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${i?"EDIT TRANSMISSION":"CREATE TRANSMISSION"}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="journal-entry-form">
        <div class="admin-modal-body admin-grid-layout">
          <div class="admin-modal-main-col">
            <div class="admin-form-grid">
              <div class="admin-form-group span-2">
                <label class="admin-label">Transmission Title*</label>
                <input type="text" id="j-title" class="admin-input" value="${t?f(t.title):""}" required placeholder="e.g. THE ANALOG RESONANCE OF 9MM HATE" />
              </div>
              <div class="admin-form-group">
                <label class="admin-label">Date String*</label>
                <input type="text" id="j-date" class="admin-input" value="${t?f(t.date):"12 AUG 2026"}" required placeholder="e.g. 12 AUG 2026" />
              </div>
              <div class="admin-form-group">
                <label class="admin-label">Category Tag*</label>
                <input type="text" id="j-category" class="admin-input" value="${t?f(t.category||"ESSAY // DISCOGRAPHY"):"ESSAY // DISCOGRAPHY"}" required />
              </div>
              <div class="admin-form-group span-2">
                <label class="admin-label">Location / Studio Meta Header</label>
                <input type="text" id="j-meta" class="admin-input" value="${t?f(t.meta||""):""}" placeholder="e.g. LONDON // ANALOG SESSION 04" />
              </div>
              <div class="admin-form-group span-2">
                <label class="admin-label">Full Editorial Content (Use double linebreaks for paragraphs)*</label>
                <textarea id="j-body" class="admin-input" rows="8" required placeholder="Write transmission essay or studio diary entry...">${t?f(t.body):""}</textarea>
              </div>
            </div>
          </div>

          <div class="admin-modal-side-col">
            <div class="admin-form-group">
              <label class="admin-label">Hero / Cover Image URL*</label>
              <input type="url" id="j-image" class="admin-input" value="${t?f(t.image||""):"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"}" required />
              <div class="admin-img-preview-box" style="margin-top: 0.75rem;">
                <img id="j-image-preview" src="${t?t.image:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"}" alt="Preview" />
              </div>
            </div>

            <div class="admin-form-group" style="margin-top: 1.5rem;">
              <label class="admin-label">Publication Status</label>
              <select id="j-status" class="admin-input">
                <option value="PUBLISHED" ${!t||t.status==="PUBLISHED"?"selected":""}>PUBLISHED</option>
                <option value="DRAFT" ${t&&t.status==="DRAFT"?"selected":""}>DRAFT (Hidden)</option>
              </select>
            </div>

            <div class="admin-form-group" style="margin-top: 1rem;">
              <label class="admin-checkbox-label">
                <input type="checkbox" id="j-featured" ${t&&t.featured?"checked":""} />
                <span>Featured Transmission</span>
              </label>
            </div>

            <div style="margin-top: 2rem;">
              <button type="button" id="btn-preview-modal-trigger" class="admin-btn admin-btn-secondary" style="width: 100%;">LIVE PUBLIC PREVIEW</button>
            </div>
          </div>
        </div>

        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE TRANSMISSION</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(a);const s=()=>a.remove();a.querySelector(".admin-modal-close").onclick=s,a.querySelector(".admin-modal-cancel").onclick=s;const n=a.querySelector("#j-image"),r=a.querySelector("#j-image-preview");n&&r&&(n.oninput=m=>r.src=m.target.value);const o=a.querySelector("#btn-preview-modal-trigger");o&&(o.onclick=()=>{const m={title:a.querySelector("#j-title").value,date:a.querySelector("#j-date").value,category:a.querySelector("#j-category").value,meta:a.querySelector("#j-meta").value,body:a.querySelector("#j-body").value,image:a.querySelector("#j-image").value};oa(m)});const d=a.querySelector("#journal-entry-form");d.onsubmit=m=>{m.preventDefault();const u={title:a.querySelector("#j-title").value,date:a.querySelector("#j-date").value,category:a.querySelector("#j-category").value,meta:a.querySelector("#j-meta").value,body:a.querySelector("#j-body").value,image:a.querySelector("#j-image").value,status:a.querySelector("#j-status").value,featured:a.querySelector("#j-featured").checked};i?(aa(t.id,u),L("TRANSMISSION UPDATED",`Updated transmission "${u.title}"`),A("✓ TRANSMISSION SAVED SUCCESSFULLY")):(La(u),L("TRANSMISSION CREATED",`Created transmission "${u.title}"`),A("✓ TRANSMISSION CREATED SUCCESSFULLY")),s(),rt(e)}}function oa(t){const e=document.createElement("div");e.className="admin-modal-backdrop";const i=(t.body||"").split(`

`).map(s=>`<p>${f(s)}</p>`).join("");e.innerHTML=`
    <div class="admin-modal admin-modal-wide admin-preview-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">LIVE PUBLIC PREVIEW — /news</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body" style="background: #f5f3ee; color: #111113; padding: 2.5rem;">
        <div class="transmission-magazine-spread" style="margin: 0;">
          <div class="spread-left-col">
            <div class="spread-meta-header">
              <span class="spread-cat">${f(t.category||"TRANSMISSION")}</span>
              <span class="spread-date">${f(t.date)}</span>
            </div>
            <h2 class="spread-title">${f(t.title)}</h2>
            ${t.meta?`<div class="spread-meta-location">${f(t.meta)}</div>`:""}
            
            <div class="spread-body-text">
              ${i}
            </div>
          </div>

          <div class="spread-right-col">
            <div class="spread-artwork-box">
              <img src="${f(t.image)}" alt="${f(t.title)}" class="spread-artwork-img" />
            </div>
          </div>
        </div>
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="admin-btn admin-btn-secondary admin-modal-close-btn">CLOSE PREVIEW</button>
      </div>
    </div>
  `,document.body.appendChild(e);const a=()=>e.remove();e.querySelector(".admin-modal-close").onclick=a,e.querySelector(".admin-modal-close-btn").onclick=a}let Rt="";function Xt(t){const e=St();let i=e;if(Rt.trim()){const o=Rt.toLowerCase().trim();i=e.filter(d=>d.name.toLowerCase().includes(o)||d.url.toLowerCase().includes(o))}t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/media")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Media Library</h1>
            <p class="admin-page-desc">Centralized Image Assets Store for Tour, Music and Transmissions</p>
          </div>
          <button id="btn-add-media" class="admin-btn admin-btn-primary">+ UPLOAD ASSET</button>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="media-search-input" class="admin-input" placeholder="Search asset name or URL..." value="${f(Rt)}" />
          </div>
        </div>

        <div class="admin-media-grid">
          ${i.length>0?i.map(o=>`
            <div class="admin-media-card">
              <div class="media-thumb-box">
                <img src="${f(o.url)}" alt="${f(o.name)}" class="media-thumb-img" />
              </div>
              <div class="media-card-info">
                <div class="media-name" title="${f(o.name)}">${f(o.name)}</div>
                <div class="media-meta">${o.size} • ${o.dimensions}</div>
                <div class="media-card-actions">
                  <button type="button" class="admin-action-btn btn-copy-url" data-url="${f(o.url)}">Copy URL</button>
                  <button type="button" class="admin-action-btn btn-danger btn-delete-media" data-id="${o.id}">Delete</button>
                </div>
              </div>
            </div>
          `).join(""):'<div class="admin-empty-state">No media assets found.</div>'}
        </div>
      </main>
    </div>
  `,K(t);const a=t.querySelector("#media-search-input");a&&(a.oninput=o=>{Rt=o.target.value,Xt(t)});const s=t.querySelector("#btn-add-media");s&&(s.onclick=()=>ja(t)),t.querySelectorAll(".btn-copy-url").forEach(o=>{o.onclick=()=>{const d=o.getAttribute("data-url");navigator.clipboard.writeText(d).then(()=>{o.textContent="Copied!",setTimeout(()=>o.textContent="Copy URL",2e3)})}}),t.querySelectorAll(".btn-delete-media").forEach(o=>{o.onclick=()=>{const d=o.getAttribute("data-id"),m=St().find(u=>u.id===d);m&&Wa(m,t)}})}function ja(t){const e=document.createElement("div");e.className="admin-modal-backdrop",e.innerHTML=`
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">UPLOAD MEDIA ASSET</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="media-upload-form">
        <div class="admin-modal-body">
          <div class="admin-form-group">
            <label class="admin-label">Asset Title / Name*</label>
            <input type="text" id="med-name" class="admin-input" placeholder="e.g. Concert Stage Photo" required />
          </div>
          <div class="admin-form-group" style="margin-top: 1rem;">
            <label class="admin-label">Image URL*</label>
            <input type="url" id="med-url" class="admin-input" placeholder="https://..." required />
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE ASSET</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(e);const i=()=>e.remove();e.querySelector(".admin-modal-close").onclick=i,e.querySelector(".admin-modal-cancel").onclick=i;const a=e.querySelector("#media-upload-form");a.onsubmit=s=>{s.preventDefault();const n=e.querySelector("#med-name").value,r=e.querySelector("#med-url").value;Ca({name:n,url:r}),L("MEDIA UPLOADED",`Uploaded media asset "${n}"`),A("✓ MEDIA ASSET UPLOADED SUCCESSFULLY"),i(),Xt(t)}}function Wa(t,e){const i=Ba(t.url),a=document.createElement("div");a.className="admin-modal-backdrop";const s=i.length>0?`
    <div class="admin-warning-box">
      <strong>⚠️ WARNING: THIS ASSET IS CURRENTLY REFERENCED BY:</strong>
      <ul>
        ${i.map(r=>`<li>${f(r)}</li>`).join("")}
      </ul>
    </div>
  `:"";a.innerHTML=`
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">DELETE MEDIA ASSET</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body">
        <p>Are you sure you want to permanently delete asset <strong>"${f(t.name)}"</strong>?</p>
        ${s}
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
        <button type="button" id="btn-confirm-delete-media" class="admin-btn admin-btn-danger">DELETE ASSET</button>
      </div>
    </div>
  `,document.body.appendChild(a);const n=()=>a.remove();a.querySelector(".admin-modal-close").onclick=n,a.querySelector(".admin-modal-cancel").onclick=n,a.querySelector("#btn-confirm-delete-media").onclick=()=>{Ua(t.id),L("MEDIA DELETED",`Deleted media asset "${t.name}"`),A("✓ MEDIA ASSET DELETED","danger"),n(),Xt(e)}}function Ja(t){const e=xa();t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/settings")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">CMS System Settings</h1>
            <p class="admin-page-desc">Global Site Configurations & Default Settings</p>
          </div>
        </div>

        <form id="cms-settings-form" style="max-width: 650px;">
          <div class="admin-form-group">
            <label class="admin-label">Official Site Title</label>
            <input type="text" id="set-title" class="admin-input" value="${f(e.siteTitle)}" required />
          </div>

          <div class="admin-form-group" style="margin-top: 1.25rem;">
            <label class="admin-label">Artist / Band Name</label>
            <input type="text" id="set-artist" class="admin-input" value="${f(e.artistName)}" required />
          </div>

          <div class="admin-form-group" style="margin-top: 1.25rem;">
            <label class="admin-label">Contact / Booking Email</label>
            <input type="email" id="set-email" class="admin-input" value="${f(e.contactEmail)}" required />
          </div>

          <div class="admin-form-group" style="margin-top: 1.5rem;">
            <label class="admin-checkbox-label">
              <input type="checkbox" id="set-maintenance" ${e.maintenanceMode?"checked":""} />
              <span>Enable Maintenance Mode (System Notice)</span>
            </label>
          </div>

          <div style="margin-top: 2rem;">
            <button type="submit" class="admin-btn admin-btn-primary">SAVE SYSTEM SETTINGS</button>
            <span id="settings-saved-msg" class="admin-success-msg"></span>
          </div>
        </form>
      </main>
    </div>
  `,K(t);const i=t.querySelector("#cms-settings-form"),a=t.querySelector("#settings-saved-msg");i&&(i.onsubmit=s=>{s.preventDefault();const n={siteTitle:t.querySelector("#set-title").value,artistName:t.querySelector("#set-artist").value,contactEmail:t.querySelector("#set-email").value,maintenanceMode:t.querySelector("#set-maintenance").checked};qa(n),L("SETTINGS UPDATED","CMS System settings updated"),A("✓ SYSTEM SETTINGS SAVED SUCCESSFULLY"),a&&(a.textContent="Settings saved successfully!",setTimeout(()=>a.textContent="",3e3))})}function Yt(t){const e=X();t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/about")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">About / WHØ CMS</h1>
            <p class="admin-page-desc">Manage Cinematic Slideshow Images & Editorial Bio Paragraphs</p>
          </div>
          <button id="btn-add-slide" class="admin-btn admin-btn-primary">+ ADD SLIDE IMAGE</button>
        </div>

        <div class="admin-content-section">
          <h2 class="admin-section-subtitle">CINEMATIC HERO SLIDESHOW (${e.slides.length} SLIDES)</h2>
          <div class="admin-table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>PREVIEW</th>
                  <th>CAPTION</th>
                  <th>SLIDE ID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                ${Za(e.slides)}
              </tbody>
            </table>
          </div>
        </div>

        <div class="admin-content-section" style="margin-top: 3rem;">
          <h2 class="admin-section-subtitle">EDITORIAL BIOGRAPHY PARAGRAPHS</h2>
          <form id="about-bio-form">
            <div class="admin-form-group">
              <textarea id="about-bio-textarea" class="admin-input" rows="10" required>${f(e.bioParagraphs.join(`

`))}</textarea>
            </div>
            <div style="margin-top: 1rem;">
              <button type="submit" class="admin-btn admin-btn-primary">SAVE BIOGRAPHY</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `,K(t);const i=t.querySelector("#btn-add-slide");i&&(i.onclick=()=>Ke(null,t)),t.querySelectorAll(".btn-edit-slide").forEach(r=>{r.onclick=()=>{const o=r.getAttribute("data-id"),d=e.slides.find(m=>m.id===o);d&&Ke(d,t)}}),t.querySelectorAll(".btn-delete-slide").forEach(r=>{r.onclick=()=>{const o=r.getAttribute("data-id");wa(o),L("ABOUT SLIDE DELETED",`Deleted about slide ${o}`),A("✓ SLIDE DELETED","danger"),Yt(t)}});const n=t.querySelector("#about-bio-form");n&&(n.onsubmit=r=>{r.preventDefault();const d=t.querySelector("#about-bio-textarea").value.split(`

`).map(m=>m.trim()).filter(Boolean);Na(d),L("ABOUT BIO UPDATED","Updated editorial biography text"),A("✓ EDITORIAL BIOGRAPHY SAVED"),Yt(t)})}function Za(t){return t.length===0?'<tr><td colspan="4" class="admin-empty-cell">No slides in slideshow.</td></tr>':t.map(e=>`
    <tr>
      <td><img src="${e.url}" class="admin-thumb-img" alt="Slide" /></td>
      <td><strong>${f(e.caption)}</strong></td>
      <td><code>${e.id}</code></td>
      <td>
        <div class="admin-action-btns">
          <button class="admin-action-btn btn-edit-slide" data-id="${e.id}">Edit</button>
          <button class="admin-action-btn btn-danger btn-delete-slide" data-id="${e.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("")}function Ke(t,e){const i=!!t,a=document.createElement("div");a.className="admin-modal-backdrop",a.innerHTML=`
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${i?"EDIT SLIDE IMAGE":"ADD SLIDE IMAGE"}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="slide-form">
        <div class="admin-modal-body">
          <div class="admin-form-group">
            <label class="admin-label">Image URL*</label>
            <input type="url" id="slide-url" class="admin-input" value="${t?f(t.url):""}" required />
          </div>
          <div class="admin-form-group" style="margin-top: 1rem;">
            <label class="admin-label">Caption / Tagline*</label>
            <input type="text" id="slide-caption" class="admin-input" value="${t?f(t.caption):""}" required />
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE SLIDE</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(a);const s=()=>a.remove();a.querySelector(".admin-modal-close").onclick=s,a.querySelector(".admin-modal-cancel").onclick=s;const n=a.querySelector("#slide-form");n.onsubmit=r=>{r.preventDefault();const o=a.querySelector("#slide-url").value,d=a.querySelector("#slide-caption").value;i?(ka(t.id,{url:o,caption:d}),L("ABOUT SLIDE UPDATED",`Updated slide ${t.id}`),A("✓ SLIDE IMAGE SAVED")):(Ta({url:o,caption:d}),L("ABOUT SLIDE CREATED",`Added new slide "${d}"`),A("✓ NEW SLIDE CREATED")),s(),Yt(e)}}function Le(t){const e=It();t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/socials")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Social Links Management</h1>
            <p class="admin-page-desc">Manage Header & Footer Social Icons, Labels and External URLs</p>
          </div>
          <button id="btn-add-social" class="admin-btn admin-btn-primary">+ ADD SOCIAL LINK</button>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>PLATFORM</th>
                <th>URL</th>
                <th>VISIBILITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              ${Qa(e)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,K(t);const i=t.querySelector("#btn-add-social");i&&(i.onclick=()=>ze(null,t)),t.querySelectorAll(".btn-edit-social").forEach(n=>{n.onclick=()=>{const r=n.getAttribute("data-id"),o=e.find(d=>d.id===r);o&&ze(o,t)}}),t.querySelectorAll(".btn-delete-social").forEach(n=>{n.onclick=()=>{const r=n.getAttribute("data-id");Da(r),L("SOCIAL LINK DELETED",`Deleted social link ${r}`),A("✓ SOCIAL LINK DELETED","danger"),Le(t)}})}function Qa(t){return t.length===0?'<tr><td colspan="4" class="admin-empty-cell">No social links configured.</td></tr>':t.map(e=>`
    <tr>
      <td><strong>${f(e.platform)}</strong></td>
      <td><a href="${f(e.url)}" target="_blank" class="admin-table-link">${f(e.url)}</a></td>
      <td><span class="admin-badge ${e.visible!==!1?"badge-active":"badge-muted"}">${e.visible!==!1?"ACTIVE":"HIDDEN"}</span></td>
      <td>
        <div class="admin-action-btns">
          <button class="admin-action-btn btn-edit-social" data-id="${e.id}">Edit</button>
          <button class="admin-action-btn btn-danger btn-delete-social" data-id="${e.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("")}function ze(t,e){const i=!!t,a=document.createElement("div");a.className="admin-modal-backdrop",a.innerHTML=`
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${i?"EDIT SOCIAL LINK":"ADD SOCIAL LINK"}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="social-form">
        <div class="admin-modal-body">
          <div class="admin-form-group">
            <label class="admin-label">Platform Name*</label>
            <input type="text" id="soc-platform" class="admin-input" value="${t?f(t.platform):""}" placeholder="e.g. Instagram" required />
          </div>
          <div class="admin-form-group" style="margin-top: 1rem;">
            <label class="admin-label">Full Profile URL*</label>
            <input type="url" id="soc-url" class="admin-input" value="${t?f(t.url):""}" placeholder="https://..." required />
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE SOCIAL LINK</button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(a);const s=()=>a.remove();a.querySelector(".admin-modal-close").onclick=s,a.querySelector(".admin-modal-cancel").onclick=s;const n=a.querySelector("#social-form");n.onsubmit=r=>{r.preventDefault();const o=a.querySelector("#soc-platform").value,d=a.querySelector("#soc-url").value;i?($a(t.id,{url:d}),L("SOCIAL LINK UPDATED",`Updated social link ${o}`),A("✓ SOCIAL LINK SAVED")):(Oa({url:d}),L("SOCIAL LINK CREATED",`Added social link ${o}`),A("✓ NEW SOCIAL LINK CREATED")),s(),Le(e)}}function Ie(t,e,i){const a=document.createElement("div");a.className="admin-modal-backdrop";const s=t.title||t.venue||t.name||"Item";a.innerHTML=`
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">DELETE CONFIRMATION</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body">
        <p>Are you sure you want to permanently delete ${e.toLowerCase()} <strong>"${f(s)}"</strong>?</p>
        <p class="admin-sub-text" style="margin-top: 0.5rem;">This action will immediately update the public website.</p>
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
        <button type="button" id="btn-confirm-delete" class="admin-btn admin-btn-danger">PERMANENTLY DELETE</button>
      </div>
    </div>
  `,document.body.appendChild(a);const n=()=>a.remove();a.querySelector(".admin-modal-close").onclick=n,a.querySelector(".admin-modal-cancel").onclick=n,a.querySelector("#btn-confirm-delete").onclick=()=>{e==="TOUR"?(ya(t.id),L("TOUR EVENT DELETED",`Deleted tour event ${t.id}`),A("✓ TOUR EVENT DELETED","danger"),nt(i)):e==="RELEASE"?(Aa(t.id),L("RELEASE DELETED",`Deleted release "${s}"`),A("✓ RELEASE DELETED","danger"),ot(i)):e==="TRANSMISSION"&&(Ia(t.id),L("TRANSMISSION DELETED",`Deleted transmission "${s}"`),A("✓ TRANSMISSION DELETED","danger"),rt(i)),n()}}function f(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Xa(t){const e=Ae();t.innerHTML=`
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${H("/admin/footer")}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Footer Management</h1>
            <p class="admin-page-desc">Global Footer Record Label, Tagline, and Legal Copyright Text</p>
          </div>
        </div>

        <div class="admin-form-container">
          <form id="admin-footer-form" class="admin-form">
            <div class="admin-form-group">
              <label class="admin-label">RECORD LABEL LINE (LINE 1)</label>
              <input type="text" id="footer-line1-input" class="admin-input" value="${f(e.line1)}" required placeholder="e.g. © DEVIL'S GRIN RECORDS 2026" />
              <p class="admin-input-help">Primary record label header line shown at the top of all footers.</p>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">TAGLINE / QUOTE (LINE 2)</label>
              <textarea id="footer-line2-input" class="admin-textarea" rows="2" required placeholder="e.g. MADE OF SIN">${f(e.line2)}</textarea>
              <p class="admin-input-help">Sub-header quote tagline shown directly under the record label line.</p>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">COPYRIGHT HOLDER LINE (LINE 4)</label>
              <input type="text" id="footer-line4-input" class="admin-input" value="${f(e.line4)}" required placeholder="e.g. © 2026 The Sinners" />
              <p class="admin-input-help">Legal copyright notice line shown above the Privacy & Terms links.</p>
            </div>

            <div class="admin-form-actions">
              <button type="submit" class="admin-btn admin-btn-primary">SAVE FOOTER SETTINGS</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `,K(t);const i=t.querySelector("#admin-footer-form");i&&i.addEventListener("submit",a=>{a.preventDefault();const s=t.querySelector("#footer-line1-input").value.trim(),n=t.querySelector("#footer-line2-input").value.trim(),r=t.querySelector("#footer-line4-input").value.trim();Pa({line1:s,line2:n,line4:r}),L("FOOTER UPDATED",`Updated record label "${s}" & tagline`),A("✓ FOOTER SETTINGS SAVED","success")})}const ti=[{id:"ALL",label:"TÜMÜ"},{id:"T-SHIRTS",label:"TİŞÖRT"},{id:"HOODIES",label:"KAPÜŞONLU"},{id:"VINYL",label:"PLAK"},{id:"CASSETTES",label:"KASET"},{id:"ACCESSORIES",label:"AKSESUAR"}],ft=[{id:"prod_tee_logo",name:"THE SINNERS LOGO TİŞÖRT",category:"T-SHIRTS",price:45,currency:"€",stockStatus:"IN_STOCK",stockLabel:"STOKTA VAR",sizes:[{size:"S",available:!0,status:"AVAILABLE"},{size:"M",available:!0,status:"AVAILABLE"},{size:"L",available:!0,status:"AVAILABLE"},{size:"XL",available:!0,status:"AVAILABLE"}],defaultSize:"M",primaryImage:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80"],season:"SONBAHAR/KIŞ 2026",tagline:"İmza Ağır Gramaj Tipografik Grup Tişörtü",description:"240 GSM ağır organik pamuktan üretilmiş, yüksek kontrastlı The Sinners arşiv tipografisine ve eskitme dokuya sahip tişört. Rahat ve şık kutu kesim (boxy fit) kalıp.",material:"%100 Taranmış Organik Pamuk, 240 GSM, Önceden yıkanmış vintage yıkama doku.",sizeGuide:"Sokak modasına uygun kutu kalıp (boxy fit). Günlük rahat duruş için kendi bedeninizi, daha salaş (oversized) bir görünüm için bir beden büyüğünü tercih edin.",shippingInfo:"2-4 iş günü içerisinde takip kodlu kargo ile gönderim. 120€ üzeri siparişlerde kargo ücretsizdir.",returnsInfo:"Teslimat tarihinden itibaren 14 gün içinde koşulsuz iade ve değişim garantisi. Ürünler giyilmemiş ve etiketleri sökülmemiş olmalıdır."},{id:"prod_tee_maybe_sin",name:"MADE OF SIN TİŞÖRT",category:"T-SHIRTS",price:50,currency:"€",stockStatus:"LOW_STOCK",stockLabel:"SON ADETLER",sizes:[{size:"S",available:!0,status:"AVAILABLE"},{size:"M",available:!0,status:"AVAILABLE"},{size:"L",available:!0,status:"LOW STOCK"},{size:"XL",available:!1,status:"SOLD OUT"}],defaultSize:"M",primaryImage:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80"],season:"SINIRLI ÖZEL SERİ",tagline:"Ön ve Arka Yüksek Çözünürlüklü İpek Baskı",description:"Made of Sin albüm dönemine özel limitli seri tişört. Arkada yüksek yoğunluklu parlak ipek baskı ve eskitme vintage yaka detayı.",material:"%100 Premium Ağır Pamuk, 260 GSM.",sizeGuide:"Düşük omuzlu salaş (oversized) kesim. Standart kalıp tercih ediyorsanız bir beden küçük seçebilirsiniz.",shippingInfo:"Özel mat siyah biyolojik olarak parçalanabilir ambalajda, resmi koleksiyoncu kartpostalıyla birlikte gönderilir.",returnsInfo:"Sınırlı sayıda üretilen ürün. Stok durumuna bağlı olarak 14 gün içinde iade ve değişim yapılabilir."},{id:"prod_tee_blackout",name:"BLACKOUT GRAFİK TİŞÖRT",category:"T-SHIRTS",price:48,currency:"€",stockStatus:"IN_STOCK",stockLabel:"STOKTA VAR",sizes:[{size:"S",available:!0,status:"AVAILABLE"},{size:"M",available:!0,status:"AVAILABLE"},{size:"L",available:!0,status:"AVAILABLE"},{size:"XL",available:!0,status:"AVAILABLE"}],defaultSize:"L",primaryImage:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80"],season:"TEMEL KOLEKSİYON",tagline:"Monokrom Endüstriyel Ton Sür Ton Baskı",description:"Stüdyo makaraları ve underground beton estetiğinden ilham alan mat siyah üzerine koyu gri ton sür ton grafik baskı. Günlük kullanım için tasarlandı.",material:"%100 Organik Ring İplik Pamuk, 220 GSM.",sizeGuide:"Standart sokak modası rahat kesim.",shippingInfo:"Dünya geneline standart ve hızlı kargo seçenekleri mevcuttur.",returnsInfo:"14 gün içinde standart iade ve değişim hakkı."},{id:"prod_hoodie_heavy",name:"THE SINNERS AĞIR HOODIE",category:"HOODIES",price:90,currency:"€",stockStatus:"IN_STOCK",stockLabel:"STOKTA VAR",sizes:[{size:"S",available:!0,status:"AVAILABLE"},{size:"M",available:!0,status:"AVAILABLE"},{size:"L",available:!0,status:"AVAILABLE"},{size:"XL",available:!0,status:"AVAILABLE"}],defaultSize:"L",primaryImage:"https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80"],season:"FW26 KOLEKSİYONU",tagline:"Ultra Ağır Gramaj 480 GSM Fransız Havlu Kumaş (French Terry)",description:"Orijinal The Sinners sanat çalışmalarını içeren ağır gramajlı kapüşonlu sweatshirt. Çift katmanlı kapüşon ve nervürlü yan panellerle üretilmiştir.",material:"%100 Fransız Havlu Pamuk (French Terry), 480 GSM. Özel ağır metal kordon uçları.",sizeGuide:"Hafif dökümlü düşük omuz kalıp. Üzerinize tam oturması için bir beden küçük tercih edebilirsiniz.",shippingInfo:"Özel korumalı kargo paketi. 120€ üzeri siparişlerde takip numaralı ücretsiz kargo.",returnsInfo:"Orijinal ambalajında 14 gün içerisinde iade imkanı."},{id:"prod_hoodie_maybe_sin",name:"MADE OF SIN HOODIE",category:"HOODIES",price:95,currency:"€",stockStatus:"LOW_STOCK",stockLabel:"SON ADETLER",sizes:[{size:"S",available:!1,status:"SOLD OUT"},{size:"M",available:!0,status:"LOW STOCK"},{size:"L",available:!0,status:"AVAILABLE"},{size:"XL",available:!1,status:"SOLD OUT"}],defaultSize:"M",primaryImage:"https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80"],season:"SINIRLI ALBÜM KOLEKSİYONU",tagline:"Göğüs Nakışı ve Büyük Boy Sırt Baskısı",description:"Şardonlu yumuşak iç astar, derin kanguru cep ve mat siyah yüksek çözünürlüklü baskılarla hazırlanan özel koleksiyon hoodie.",material:"%80 Ağır Pamuk, %20 Polar Polar Kumaş, 460 GSM.",sizeGuide:"Geniş kollu ve kutu kesimli oversized silüet.",shippingInfo:"Sınırlı üretim. 48 saat içerisinde kargoya teslim edilir.",returnsInfo:"14 gün koşulsuz iade hakkı."},{id:"prod_vinyl_maybe_sin",name:"THE SINNERS — MADE OF SIN (PLAK)",category:"VINYL",price:35,currency:"€",stockStatus:"IN_STOCK",stockLabel:"STOKTA VAR",sizes:[{size:'12" PLAK',available:!0,status:"AVAILABLE"}],defaultSize:'12" PLAK',primaryImage:"https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80"],season:'FİZİKSEL BASKI // 12" LP PLAK',tagline:"180g Ağır Gramaj Odyofil Siyah Plak Baskısı",description:"Çıkış albümünün ilk resmi plak baskısı. 45 RPM hızında iki adet 180g ağır diske özel analog mastering ile basılmıştır. 16 sayfalık büyük boy editoryal sanat kitapçığı içerir.",material:"180g Ağır Vinil, Çift Açılır (Gatefold) 350gsm Çizilmez Mat Kapak.",sizeGuide:'Standart 12" LP Formatı (33 1/3 & 45 RPM). Çift açılır kapak seti.',shippingInfo:"Köşe korumalı özel sert karton plak kolisinde güvenli kargolanır.",returnsInfo:"Ambalajı ve jelatini açılmamış ürünler 14 gün içinde iade edilebilir."},{id:"prod_cassette_maybe_sin",name:"THE SINNERS — MADE OF SIN (KASET)",category:"CASSETTES",price:18,currency:"€",stockStatus:"LOW_STOCK",stockLabel:"SON 12 ADET",sizes:[{size:"KASET",available:!0,status:"AVAILABLE"}],defaultSize:"KASET",primaryImage:"https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80"],season:"FİZİKSEL BASKI // SINIRLI KASET",tagline:"Dumanlı Yarı Şeffaf Gövde ve Gümüş Gövde Baskısı",description:"Elle numaralandırılmış 200 adet sınırlı kaset baskısı. Maksimum bas derinliği ve dinamik ses için yüksek kaliteli Type II Krom manyetik bant ile kaydedilmiştir.",material:"Type II Yüksek Kalite Ses Kaseti, Şeffaf Norelco Kutu ve 5 Panelli J-Card Kuşe Kapak.",sizeGuide:"Standart Ses Kaseti Formatı (C-48).",shippingInfo:"Özel balonlu koruma zarfında jelatinli sıfır ambalajında gönderilir.",returnsInfo:"Jelatini açılmamış kasetler 14 gün içinde iade edilebilir."},{id:"prod_acc_keychain",name:"THE SINNERS METAL ANAHTARLIK",category:"ACCESSORIES",price:15,currency:"€",stockStatus:"IN_STOCK",stockLabel:"STOKTA VAR",sizes:[{size:"STANDART",available:!0,status:"AVAILABLE"}],defaultSize:"STANDART",primaryImage:"https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1200&q=80"],season:"OBJELER VE AKSESUARLAR",tagline:"Antik Füme Kaplama Döküm Çinko Alaşım",description:"Resmi The Sinners kabartmalı amblemine sahip masif ağır döküm çinko anahtarlık. Lazer işlemeli orijinallik halkası.",material:"%100 Masif Çinko Alaşım, Mat Füme PVD Kaplama. Ağırlık: 85g.",sizeGuide:"Boyutlar: 65mm x 25mm x 4mm.",shippingInfo:"Özel siyah kadife kese ve mat hediye kutusunda kargolanır.",returnsInfo:"14 gün içinde iade edilebilir."},{id:"prod_acc_patches",name:"THE SINNERS ARMA SETİ",category:"ACCESSORIES",price:12,currency:"€",stockStatus:"IN_STOCK",stockLabel:"STOKTA VAR",sizes:[{size:"3'LÜ SET",available:!0,status:"AVAILABLE"}],defaultSize:"3'LÜ SET",primaryImage:"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"],season:"OBJELER VE AKSESUARLAR",tagline:"Overlok Kenarlı Yüksek Yoğunluklu Dokuma Armalar",description:"Ütüyle yapışabilen termal arka yüzeye ve overloklu kenarlara sahip üçlü dokuma arma seti. Kot ceketler, kapüşonlular ve çantalar için idealdir.",material:"%100 Dokuma Polyester İplik, Isıyla yapışan yapışkan taban.",sizeGuide:"İçerik: 1x Büyük Sırt Arması (12cm), 2x Kol Arması (6cm).",shippingInfo:"Korumalı zarf içinde gönderilir.",returnsInfo:"Açılmamış paketler 14 gün içinde iade edilebilir."},{id:"prod_acc_cap",name:"THE SINNERS ŞAPKA",category:"ACCESSORIES",price:30,currency:"€",stockStatus:"SOLD_OUT",stockLabel:"TÜKENDİ",sizes:[{size:"STANDART",available:!1,status:"SOLD OUT"}],defaultSize:"STANDART",primaryImage:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80",secondaryImage:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",gallery:["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80"],season:"TEMEL KOLEKSİYON",tagline:"Düşük Profilli 6 Panelli Yıkanmış Gabardin Şapka",description:"Yıkanmış ağır pamuklu gabardinden üretilmiş, ton sür ton 3D nakışlı ve antik pirinç tokalı ayarlanabilir şapka.",material:"%100 Yıkanmış Pamuk Gabardin, Antik Pirinç Metal Toka.",sizeGuide:"Ayarlanabilir kayış (54cm - 62cm baş çevresi).",shippingInfo:"Stok yenileme bildirimleri aktif. Yeni parti geldiğinde kargolanır.",returnsInfo:"Teslimattan sonra 14 gün iade süresi."}],ra="thesinners_store_cart_v4",de="thesinners_store_products_v4";function Te(){try{const t=localStorage.getItem(de);if(!t)return localStorage.setItem(de,JSON.stringify(ft)),ft;const e=JSON.parse(t);return!Array.isArray(e)||e.length===0?(localStorage.setItem(de,JSON.stringify(ft)),ft):e}catch(t){return console.error("Error reading store products:",t),ft}}function ke(t){return Te().find(i=>i.id===t)||null}function te(){try{const t=localStorage.getItem(ra);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch(t){return console.error("Error reading cart:",t),[]}}function we(t){try{localStorage.setItem(ra,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("store-cart-updated",{detail:{cart:t}}))}catch(e){console.error("Error saving cart:",e)}}function la(t,e=null,i=1){const a=ke(t);if(!a||a.stockStatus==="SOLD_OUT")return!1;const s=e||a.defaultSize||(a.sizes[0]?a.sizes[0].size:"ONE SIZE"),n=te(),r=n.findIndex(o=>o.productId===t&&o.size===s);return r!==-1?n[r].quantity+=i:n.unshift({id:"cart_"+Date.now()+"_"+Math.random().toString(36).substr(2,4),productId:a.id,name:a.name,category:a.category,price:a.price,currency:a.currency,image:a.primaryImage,size:s,quantity:i,addedAt:new Date().toISOString()}),we(n),!0}function Ge(t,e){const i=te(),a=i.findIndex(s=>s.id===t);a!==-1&&(i[a].quantity+=e,i[a].quantity<=0&&i.splice(a,1),we(i))}function ei(t){let e=te();e=e.filter(i=>i.id!==t),we(e)}function da(){const t=te(),e=t.reduce((n,r)=>n+(r.quantity||1),0),i=t.reduce((n,r)=>n+r.price*(r.quantity||1),0),a=i>120||i===0?0:8,s=i+a;return{items:t,count:e,subtotal:i,shipping:a,total:s,currency:"€"}}let D="ALL",Y="",Et={},G=null,_=1,Ne=!1,Re=!1;function ai(t){t&&(ii(t),li(t),Me(),lt(),ri())}function ii(t){t.innerHTML=`
    <!-- Controlled Analog Scanline Overlay -->
    <div class="store-scanlines-overlay" aria-hidden="true"></div>

    <!-- 1. STORE HEADER & NAVIGATION -->
    <header id="store-header" class="store-header">
      <div class="store-header-inner">
        <!-- Brand Group -->
        <div class="store-brand-group">
          <a href="/merch" class="store-brand-logo" data-store-route="/merch">
            THE SINNERS
            <span class="store-brand-badge">MAĞAZA</span>
          </a>
          <a href="/" class="store-back-to-band" data-route="/">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            GRUP SİTESİ
          </a>
        </div>

        <!-- Center Category Nav Links (Desktop) -->
        <ul class="store-nav-menu">
          <li><a class="store-nav-link ${D==="ALL"?"active":""}" data-cat="ALL">TÜMÜ</a></li>
          <li><a class="store-nav-link ${D==="T-SHIRTS"?"active":""}" data-cat="T-SHIRTS">TİŞÖRT</a></li>
          <li><a class="store-nav-link ${D==="HOODIES"?"active":""}" data-cat="HOODIES">KAPÜŞONLU</a></li>
          <li><a class="store-nav-link ${D==="VINYL"?"active":""}" data-cat="VINYL">PLAK</a></li>
          <li><a class="store-nav-link ${D==="CASSETTES"?"active":""}" data-cat="CASSETTES">KASET</a></li>
          <li><a class="store-nav-link ${D==="ACCESSORIES"?"active":""}" data-cat="ACCESSORIES">AKSESUAR</a></li>
        </ul>

        <!-- Right Utilities Group -->
        <div class="store-actions-group">
          <button id="store-search-trigger" class="store-action-btn" title="Ürün Ara">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>ARA</span>
          </button>
          <button id="store-cart-trigger" class="store-action-btn" title="Sepeti Görüntüle">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>SEPET</span>
            <span id="store-cart-count-badge" class="store-cart-badge">0</span>
          </button>
          <button id="store-mobile-menu-btn" class="store-mobile-toggle" aria-label="Menüyü Aç/Kapat">☰</button>
        </div>
      </div>
    </header>

    <!-- 2. EDITORIAL HERO CAMPAIGN BANNER -->
    <section class="store-hero">
      <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80" alt="The Sinners Koleksiyon" class="store-hero-bg" />
      <div class="store-hero-overlay"></div>
      <div class="store-hero-content">
        <span class="store-hero-eyebrow">// RESMİ KOLEKSİYON VE ÜRÜNLER</span>
        <h1 class="store-hero-title">THE SINNERS / MERCH</h1>
        <p class="store-hero-desc">GİYİM / PLAKLAR / KASETLER / ÖZEL KOLEKSİYON PARÇALARI. YÜKSEK KALİTE EDİTORYAL TASARIMLAR VE SINIRLI FİZİKSEL BASKILAR.</p>
        <a href="#store-vitrine" id="store-hero-shop-btn" class="store-hero-cta">KOLEKSİYONU İNCELE &rarr;</a>
      </div>
    </section>

    <!-- 3. CATEGORY FILTER BAR -->
    <nav class="store-filter-bar" id="store-vitrine">
      <div class="store-filter-inner">
        <div class="store-categories-list">
          ${ti.map(e=>`
            <button class="store-cat-pill ${D===e.id?"active":""}" data-cat="${e.id}">
              ${e.label}
            </button>
          `).join("")}
        </div>
        <div id="store-results-counter" class="store-results-count">8 ÜRÜN GÖSTERİLİYOR</div>
      </div>
    </nav>

    <!-- 4. PRODUCT VITRINE GRID -->
    <main class="store-main-layout">
      <div id="store-products-feed" class="store-product-grid">
        <!-- Dynamically rendered product cards -->
      </div>
    </main>

    <!-- 5. LIMITED DROP EDITORIAL CAMPAIGN BANNER -->
    <section class="store-drop-banner">
      <div class="store-drop-card">
        <div class="store-drop-content">
          <span class="store-drop-tag">// SINIRLI ÖZEL SERİ</span>
          <h2 class="store-drop-title">MADE OF SIN</h2>
          <p class="store-drop-desc">Kayıt dönemine özel ağır gramajlı giysiler ve analog kasetler. Özel antika detaylarla sınırlı sayıda üretim.</p>
          <button class="store-hero-cta btn-drop-filter" data-cat="HOODIES">SERİYİ KEŞFET &rarr;</button>
        </div>
        <div class="store-drop-media">
          <img src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80" alt="Made of Sin Koleksiyonu" class="store-drop-img" />
        </div>
      </div>
    </section>

    <!-- 6. PHYSICAL MEDIA COLLECTOR'S SECTION -->
    <section class="store-media-section">
      <div class="store-media-header">
        <div>
          <h2 class="store-media-title">FİZİKSEL ALBÜMLER</h2>
          <span class="store-media-sub">PLAKLAR / KASETLER / ÖZEL BASKILAR</span>
        </div>
      </div>
      <div class="store-media-grid">
        <!-- Vinyl Spotlight -->
        <div class="store-media-card">
          <img src="https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" alt="Plak" class="store-media-thumb" />
          <div class="store-media-details">
            <span class="store-card-category">12" LP PLAK // 180G</span>
            <h3 class="store-card-title">THE SINNERS — MADE OF SIN</h3>
            <div class="store-card-price" style="margin-bottom: 0.75rem;">€35</div>
            <p style="font-size: 0.8rem; color: #8A8A8E; line-height: 1.6; margin-bottom: 1.5rem;">16 sayfalık büyük boy editoryal sanat kitapçığı içeren, çift açılır kapaklı 180g ağır plak baskısı.</p>
            <button class="store-quick-add-btn btn-view-product" data-product-id="prod_vinyl_maybe_sin" style="margin-top: auto;">DETAYLARI GÖR &rarr;</button>
          </div>
        </div>
        <!-- Cassette Spotlight -->
        <div class="store-media-card">
          <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80" alt="Kaset" class="store-media-thumb" />
          <div class="store-media-details">
            <span class="store-card-category">SINIRLI BASKI KASET</span>
            <h3 class="store-card-title">THE SINNERS — MADE OF SIN</h3>
            <div class="store-card-price" style="margin-bottom: 0.75rem;">€18</div>
            <p style="font-size: 0.8rem; color: #8A8A8E; line-height: 1.6; margin-bottom: 1.5rem;">Dumanlı yarı şeffaf kaset gövdesi, Type II Krom bant, elle numaralandırılmış 200 adet sınırlı baskı.</p>
            <button class="store-quick-add-btn btn-view-product" data-product-id="prod_cassette_maybe_sin" style="margin-top: auto;">DETAYLARI GÖR &rarr;</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. STORE FOOTER -->
    <footer class="store-footer">
      <div class="store-footer-inner">
        <div>
          <div class="store-footer-brand-title">THE SINNERS</div>
          <div class="store-footer-brand-sub">RESMİ ÜRÜN VE KOLEKSİYON MAĞAZASI</div>
          <p style="font-size: 0.78rem; color: #666; max-width: 320px; line-height: 1.6;">
            Doğrudan müzik grubundan sokak giyimi, plaklar, kasetler ve resmi koleksiyon ürünleri.
          </p>
        </div>

        <div>
          <div class="store-footer-heading">MENÜ</div>
          <ul class="store-footer-links">
            <li><a class="store-footer-link" data-cat="ALL">TÜM ÜRÜNLER</a></li>
            <li><a class="store-footer-link" data-cat="T-SHIRTS">TİŞÖRT</a></li>
            <li><a class="store-footer-link" data-cat="HOODIES">KAPÜŞONLU</a></li>
            <li><a class="store-footer-link" data-cat="VINYL">FİZİKSEL ALBÜMLER</a></li>
          </ul>
        </div>

        <div>
          <div class="store-footer-heading">MÜŞTERİ HİZMETLERİ</div>
          <ul class="store-footer-links">
            <li><a href="#" class="store-footer-link btn-open-care-modal" data-type="shipping">KARGO VE TESLİMAT</a></li>
            <li><a href="#" class="store-footer-link btn-open-care-modal" data-type="returns">İADE VE DEĞİŞİM</a></li>
            <li><a href="#" class="store-footer-link btn-open-care-modal" data-type="sizeguide">BEDEN REHBERİ</a></li>
            <li><a href="mailto:orders@thesinners.com" class="store-footer-link">DESTEK VE İLETİŞİM</a></li>
          </ul>
        </div>

        <div>
          <div class="store-footer-heading">SOSYAL MEDYA</div>
          <ul class="store-footer-links">
            <li><a href="https://instagram.com" target="_blank" rel="noopener" class="store-footer-link">INSTAGRAM</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener" class="store-footer-link">YOUTUBE</a></li>
            <li><a href="https://soundloop.app" target="_blank" rel="noopener" class="store-footer-link">SOUNDLOOP</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noopener" class="store-footer-link">TIKTOK</a></li>
          </ul>
        </div>
      </div>

      <div class="store-footer-bottom">
        <div>© 2026 THE SINNERS. TÜM HAKLARI SAKLIDIR.</div>
        <div>UNDERGROUND İÇİN TASARLANDI VE ÜRETİLDİ</div>
      </div>
    </footer>

    <!-- 8. SLIDE-OVER CART DRAWER -->
    <div id="store-cart-drawer-backdrop" class="store-cart-drawer-backdrop" aria-hidden="true">
      <aside class="store-cart-drawer">
        <div class="store-cart-header">
          <h2 class="store-cart-title">SEPETİNİZ</h2>
          <button id="store-cart-close-btn" class="store-cart-close" aria-label="Sepeti Kapat">&times;</button>
        </div>

        <div id="store-cart-items-feed" class="store-cart-items-list">
          <!-- Cart items rendered here -->
        </div>

        <div id="store-cart-footer-area" class="store-cart-footer">
          <!-- Cart totals and Checkout button -->
        </div>
      </aside>
    </div>

    <!-- 9. FULLSCREEN SEARCH OVERLAY -->
    <div id="store-search-overlay" class="store-search-overlay" aria-hidden="true">
      <div class="store-search-header">
        <h2 class="store-search-heading">MAĞAZADA ARAYIN</h2>
        <button id="store-search-close-btn" class="store-search-close" aria-label="Aramayı Kapat">&times;</button>
      </div>
      <div class="store-search-input-wrapper">
        <input 
          type="text" 
          id="store-search-input-field" 
          class="store-search-input" 
          placeholder="ÜRÜN, KATEGORİ VEYA KOLEKSİYON ARAYIN..." 
          autocomplete="off" 
          autofocus 
        />
      </div>
      <div id="store-search-results-feed" class="store-search-results-area">
        <!-- Live search results -->
      </div>
    </div>

    <!-- 10. PRODUCT DETAIL MODAL / VIEW -->
    <div id="store-detail-modal-backdrop" class="store-modal-backdrop" aria-hidden="true">
      <div id="store-detail-modal-content" class="store-detail-modal">
        <!-- Rendered detail view -->
      </div>
    </div>

    <!-- 11. CHECKOUT PROTOTYPE CONFIRMATION MODAL -->
    <div id="store-checkout-modal-backdrop" class="store-checkout-modal-backdrop" aria-hidden="true">
      <div class="store-checkout-modal">
        <div class="store-checkout-icon">✓</div>
        <h2 class="store-checkout-title">SİPARİŞ ÖNİZLEMESİ HAZIR</h2>
        <p class="store-checkout-text">
          The Sinners Mağazasını ziyaret ettiğiniz için teşekkürler! Sepetinizdeki ürünler başarıyla doğrulandı, vergi ve teslimat detayları hesaplandı.
        </p>
        <div id="store-checkout-summary-box" style="background:#050505; border:1px solid rgba(255,255,255,0.1); padding:1.25rem; margin-bottom:1.5rem; text-align:left; font-size:0.8rem;"></div>
        <button id="store-checkout-modal-close" class="store-hero-cta" style="width:100%;">ALIŞVERİŞE DEVAM ET</button>
      </div>
    </div>

    <!-- TOAST CONTAINER -->
    <div id="store-toast-container" class="store-toast-container"></div>
  `}function Me(){const t=document.getElementById("store-products-feed"),e=document.getElementById("store-results-counter");if(!t)return;const a=Te().filter(s=>{const n=D==="ALL"||s.category===D,r=!Y||s.name.toLowerCase().includes(Y.toLowerCase())||s.category.toLowerCase().includes(Y.toLowerCase())||s.tagline&&s.tagline.toLowerCase().includes(Y.toLowerCase());return n&&r});if(e&&(e.textContent=`${a.length} ÜRÜN GÖSTERİLİYOR`),a.length===0){t.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 2rem; color: #8A8A8E;">
        <p style="font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem;">ARAMANIZLA EŞLEŞEN ÜRÜN BULUNAMADI</p>
        <button class="store-cat-pill active" id="btn-reset-filters">TÜM ÜRÜNLERİ GÖSTER</button>
      </div>
    `;const s=document.getElementById("btn-reset-filters");s&&(s.onclick=()=>{D="ALL",Y="",ma(),Me()});return}t.innerHTML=a.map(s=>{const n=Et[s.id]||s.defaultSize||(s.sizes[0]?s.sizes[0].size:"STANDART"),r=s.stockStatus==="SOLD_OUT",o=s.stockStatus==="LOW_STOCK";let d="";r?d='<span class="store-card-badge badge-sold">TÜKENDİ</span>':o?d=`<span class="store-card-badge badge-low">${s.stockLabel||"SON ADETLER"}</span>`:d='<span class="store-card-badge">STOKTA VAR</span>';const m=(s.sizes||[]).map(u=>{const c=n===u.size,l=!u.available;return`
        <button 
          type="button" 
          class="store-size-btn ${c?"selected":""}" 
          data-product-id="${s.id}" 
          data-size="${u.size}" 
          ${l?'disabled title="Tükendi"':""}
        >
          ${u.size}
        </button>
      `}).join("");return`
      <article class="store-card" data-product-id="${s.id}">
        <!-- Media / Images -->
        <div class="store-card-media btn-open-detail" data-product-id="${s.id}">
          ${d}
          <img src="${s.primaryImage}" alt="${R(s.name)}" class="store-card-img" loading="lazy" />
          ${s.secondaryImage?`<img src="${s.secondaryImage}" alt="${R(s.name)}" class="store-card-img store-card-img-secondary" loading="lazy" />`:""}
        </div>

        <!-- Info Area -->
        <div class="store-card-info">
          <span class="store-card-category">${s.category}</span>
          <h3 class="store-card-title btn-open-detail" data-product-id="${s.id}">${R(s.name)}</h3>
          
          <div class="store-card-price-row">
            <span class="store-card-price">${s.currency}${s.price}</span>
            <span style="font-size: 0.68rem; color: #888; letter-spacing: 0.08em;">${s.stockLabel}</span>
          </div>

          <!-- Size Selector -->
          ${s.sizes&&s.sizes.length>1?`
            <div class="store-card-sizes">
              ${m}
            </div>
          `:'<div style="margin-bottom: 0.5rem;"></div>'}

          <!-- Quick Add Button -->
          <div class="store-card-actions">
            <button 
              type="button" 
              class="store-quick-add-btn btn-quick-add" 
              data-product-id="${s.id}" 
              ${r?"disabled":""}
            >
              ${r?"TÜKENDİ":"+ SEPETE EKLE"}
            </button>
          </div>
        </div>
      </article>
    `}).join("")}function ca(t){const e=ke(t);if(!e)return;G=Et[t]||e.defaultSize||(e.sizes[0]?e.sizes[0].size:"STANDART"),_=1;const i=document.getElementById("store-detail-modal-content"),a=document.getElementById("store-detail-modal-backdrop");if(!i||!a)return;const s=e.gallery&&e.gallery.length>0?e.gallery:[e.primaryImage,e.secondaryImage].filter(Boolean);i.innerHTML=`
    <button id="store-detail-close-btn" class="store-modal-close-btn" aria-label="Ürün Detayını Kapat">&times;</button>
    
    <!-- LEFT: GALLERY -->
    <div class="store-detail-gallery">
      <img id="detail-active-img" src="${s[0]}" alt="${R(e.name)}" class="store-detail-main-img" />
      
      ${s.length>1?`
        <div class="store-detail-thumbnails">
          ${s.map((u,c)=>`
            <button type="button" class="store-thumb-btn ${c===0?"active":""}" data-index="${c}" data-img="${u}">
              <img src="${u}" alt="Görsel ${c+1}" />
            </button>
          `).join("")}
        </div>
      `:""}
    </div>

    <!-- RIGHT: INFORMATION & PURCHASING -->
    <div class="store-detail-info">
      <span class="store-detail-season">${e.season||"SONBAHAR/KIŞ 2026"}</span>
      <h1 class="store-detail-title">${R(e.name)}</h1>
      <div class="store-detail-price">${e.currency}${e.price} <span style="font-size:0.75rem; color:#888; font-weight:normal; letter-spacing:0.1em; margin-left:0.5rem;">KDV DAHİLDİR</span></div>
      
      <p class="store-detail-short-desc">${R(e.description)}</p>

      <!-- SIZES -->
      <div class="store-detail-size-section">
        <div class="store-section-label">
          <span>BEDEN SEÇİN</span>
          <span style="color:#fff; font-weight:bold;">${G}</span>
        </div>
        <div class="store-detail-size-grid">
          ${(e.sizes||[]).map(u=>`
            <button 
              type="button" 
              class="store-detail-size-pill ${G===u.size?"selected":""}" 
              data-size="${u.size}" 
              ${u.available?"":"disabled"}
            >
              ${u.size}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- QUANTITY & ADD TO CART -->
      <div class="store-detail-purchase-row">
        <div class="store-qty-stepper">
          <button type="button" id="detail-qty-minus" class="store-qty-btn">−</button>
          <span id="detail-qty-display" class="store-qty-val">1</span>
          <button type="button" id="detail-qty-plus" class="store-qty-btn">+</button>
        </div>

        <button 
          type="button" 
          id="detail-add-cart-btn" 
          class="store-detail-add-btn" 
          ${e.stockStatus==="SOLD_OUT"?"disabled":""}
        >
          ${e.stockStatus==="SOLD_OUT"?"TÜKENDİ":"SEPETE EKLE"}
        </button>
      </div>

      <!-- ACCORDION INFORMATION -->
      <div class="store-accordions">
        <div class="store-accordion-item is-open">
          <button type="button" class="store-accordion-header">
            <span>ÜRÜN ÖZELLİKLERİ VE MATERYAL</span>
            <span>+</span>
          </button>
          <div class="store-accordion-content" style="display:block;">
            <p>${R(e.material)}</p>
            <p style="margin-top:0.5rem; color:#aaa;">${R(e.tagline||"")}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>BEDEN VE KALIP REHBERİ</span>
            <span>+</span>
          </button>
          <div class="store-accordion-content">
            <p>${R(e.sizeGuide)}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>KARGO VE TESLİMAT BİLGİSİ</span>
            <span>+</span>
          </button>
          <div class="store-accordion-content">
            <p>${R(e.shippingInfo)}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>İADE VE DEĞİŞİM KOŞULLARI</span>
            <span>+</span>
          </button>
          <div class="store-accordion-content">
            <p>${R(e.returnsInfo)}</p>
          </div>
        </div>
      </div>
    </div>
  `;const n=i.querySelector("#store-detail-close-btn");n&&(n.onclick=jt),i.querySelectorAll(".store-thumb-btn").forEach(u=>{u.onclick=()=>{const c=u.getAttribute("data-img"),l=i.querySelector("#detail-active-img");l&&c&&(l.src=c,i.querySelectorAll(".store-thumb-btn").forEach(p=>p.classList.remove("active")),u.classList.add("active"))}}),i.querySelectorAll(".store-detail-size-pill").forEach(u=>{u.onclick=()=>{G=u.getAttribute("data-size"),Et[t]=G,i.querySelectorAll(".store-detail-size-pill").forEach(l=>l.classList.remove("selected")),u.classList.add("selected");const c=i.querySelector(".store-section-label span:last-child");c&&(c.textContent=G)}});const r=i.querySelector("#detail-qty-minus"),o=i.querySelector("#detail-qty-plus"),d=i.querySelector("#detail-qty-display");r&&o&&d&&(r.onclick=()=>{_>1&&(_--,d.textContent=_)},o.onclick=()=>{_<10&&(_++,d.textContent=_)});const m=i.querySelector("#detail-add-cart-btn");m&&(m.onclick=()=>{la(e.id,G,_),Oe(`"${e.name}" (${G}) sepete eklendi.`),jt(),fe()}),i.querySelectorAll(".store-accordion-header").forEach(u=>{u.onclick=()=>{const c=u.closest(".store-accordion-item");if(c){const l=c.classList.contains("is-open"),p=c.querySelector(".store-accordion-content");l?(c.classList.remove("is-open"),p&&(p.style.display="none")):(c.classList.add("is-open"),p&&(p.style.display="block"))}}}),a.classList.add("is-open"),a.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function jt(){const t=document.getElementById("store-detail-modal-backdrop");t&&(t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),document.body.style.overflow="")}function fe(){Ct();const t=document.getElementById("store-cart-drawer-backdrop");t&&(t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),Ne=!0,document.body.style.overflow="hidden")}function vt(){const t=document.getElementById("store-cart-drawer-backdrop");t&&(t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),Ne=!1,document.body.style.overflow="")}function Ct(){const t=document.getElementById("store-cart-items-feed"),e=document.getElementById("store-cart-footer-area");if(!t||!e)return;const i=da();if(i.items.length===0){t.innerHTML=`
      <div class="store-cart-empty">
        <div style="font-size:2.5rem; margin-bottom:1rem; opacity:0.3;">∅</div>
        <div class="store-cart-empty-text">SEPETİNİZDE HENÜZ ÜRÜN BULUNMUYOR.</div>
        <button type="button" class="store-cart-continue-btn" id="btn-cart-continue">
          ALIŞVERİŞE DEVAM ET &rarr;
        </button>
      </div>
    `,e.innerHTML="";const s=document.getElementById("btn-cart-continue");s&&(s.onclick=vt);return}t.innerHTML=i.items.map(s=>`
    <div class="store-cart-item" data-cart-id="${s.id}">
      <img src="${s.image}" alt="${R(s.name)}" class="store-cart-item-img" />
      <div class="store-cart-item-details">
        <span class="store-cart-item-name">${R(s.name)}</span>
        <span class="store-cart-item-meta">BEDEN: ${s.size}</span>
        <span class="store-cart-item-price">${s.currency}${s.price}</span>
        <div class="store-cart-qty-ctrl">
          <button type="button" class="store-cart-qty-btn btn-cart-minus" data-id="${s.id}">−</button>
          <span class="store-cart-qty-count">${s.quantity}</span>
          <button type="button" class="store-cart-qty-btn btn-cart-plus" data-id="${s.id}">+</button>
        </div>
      </div>
      <button type="button" class="store-cart-remove-btn btn-cart-remove" data-id="${s.id}" title="Ürünü Kaldır">&times;</button>
    </div>
  `).join(""),e.innerHTML=`
    <div class="store-cart-summary-row">
      <span>ARA TOPLAM</span>
      <span>${i.currency}${i.subtotal.toFixed(2)}</span>
    </div>
    <div class="store-cart-summary-row">
      <span>TAHMİNİ KARGO</span>
      <span>${i.shipping===0?"ÜCRETSİZ":i.currency+i.shipping.toFixed(2)}</span>
    </div>
    <div class="store-cart-total-row">
      <span>TOPLAM</span>
      <span>${i.currency}${i.total.toFixed(2)}</span>
    </div>
    <button type="button" id="store-btn-checkout" class="store-checkout-btn">
      SİPARİŞİ TAMAMLA &rarr;
    </button>
  `,t.querySelectorAll(".btn-cart-minus").forEach(s=>{s.onclick=()=>{const n=s.getAttribute("data-id");Ge(n,-1),Ct(),lt()}}),t.querySelectorAll(".btn-cart-plus").forEach(s=>{s.onclick=()=>{const n=s.getAttribute("data-id");Ge(n,1),Ct(),lt()}}),t.querySelectorAll(".btn-cart-remove").forEach(s=>{s.onclick=()=>{const n=s.getAttribute("data-id");ei(n),Ct(),lt(),Oe("Ürün sepetten kaldırıldı.")}});const a=e.querySelector("#store-btn-checkout");a&&(a.onclick=()=>{ni(i)})}function lt(){const t=document.getElementById("store-cart-count-badge");if(t){const e=da();t.textContent=e.count,t.style.display=e.count>0?"inline-block":"none"}}function si(){const t=document.getElementById("store-search-overlay"),e=document.getElementById("store-search-input-field");t&&(t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),Re=!0,document.body.style.overflow="hidden",e&&(e.value=Y,setTimeout(()=>e.focus(),100),ua(Y)))}function Bt(){const t=document.getElementById("store-search-overlay");t&&(t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),Re=!1,document.body.style.overflow="")}function ua(t){const e=document.getElementById("store-search-results-feed");if(!e)return;if(!t||t.trim()===""){e.innerHTML=`
      <div style="text-align: center; padding: 3rem; color: #666;">
        <p style="font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;">ARAMAK İSTEDİĞİNİZ TİŞÖRT, HOODIE, PLAK VEYA KASET ADINI YAZIN...</p>
      </div>
    `;return}const i=Te(),a=t.toLowerCase().trim(),s=i.filter(n=>n.name.toLowerCase().includes(a)||n.category.toLowerCase().includes(a)||n.tagline&&n.tagline.toLowerCase().includes(a));if(s.length===0){e.innerHTML=`
      <div style="text-align: center; padding: 4rem; color: #8A8A8E;">
        <p style="font-size: 0.85rem; letter-spacing: 0.18em; text-transform: uppercase;">"${R(t)}" İLE EŞLEŞEN ÜRÜN BULUNAMADI</p>
      </div>
    `;return}e.innerHTML=`
    <div class="store-search-grid">
      ${s.map(n=>`
        <div class="store-card" style="background:#0a0a0a;">
          <div class="store-card-media btn-search-item" data-product-id="${n.id}" style="aspect-ratio: 4/5;">
            <img src="${n.primaryImage}" alt="${R(n.name)}" class="store-card-img" />
          </div>
          <div class="store-card-info">
            <span class="store-card-category">${n.category}</span>
            <h4 class="store-card-title btn-search-item" data-product-id="${n.id}">${R(n.name)}</h4>
            <div class="store-card-price">${n.currency}${n.price}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `,e.querySelectorAll(".btn-search-item").forEach(n=>{n.onclick=()=>{const r=n.getAttribute("data-product-id");Bt(),ca(r)}})}function ni(t){const e=document.getElementById("store-checkout-modal-backdrop"),i=document.getElementById("store-checkout-summary-box");e&&(i&&(i.innerHTML=`
      <div style="font-weight:700; color:#fff; margin-bottom:0.5rem; letter-spacing:0.1em;">SİPARİŞ ÖZETİ (${t.count} ÜRÜN)</div>
      ${t.items.map(a=>`
        <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem; color:#aaa;">
          <span>${R(a.name)} (${a.size}) × ${a.quantity}</span>
          <span>${a.currency}${(a.price*a.quantity).toFixed(2)}</span>
        </div>
      `).join("")}
      <div style="border-top:1px solid #333; margin-top:0.75rem; padding-top:0.75rem; display:flex; justify-content:space-between; color:#fff; font-weight:700;">
        <span>GENEL TOPLAM:</span>
        <span>${t.currency}${t.total.toFixed(2)}</span>
      </div>
    `),e.classList.add("is-open"),e.setAttribute("aria-hidden","false"),vt())}function Ut(){const t=document.getElementById("store-checkout-modal-backdrop");t&&(t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"))}function oi(t){let e="MÜŞTERİ BİLGİLENDİRME",i="";t==="shipping"?(e="KARGO VE TESLİMAT POLİTİKASI",i=`
      <p style="margin-bottom: 1rem;"><strong>Teslimat Süresi:</strong> Siparişleriniz 2-4 iş günü içerisinde hazırlanıp takip numaralı kargo ile tarafınıza ulaştırılır.</p>
      <p style="margin-bottom: 1rem;"><strong>Ücretsiz Kargo:</strong> 120€ ve üzeri tüm siparişlerde kargo ücretsizdir.</p>
      <p><strong>Paketleme:</strong> Plaklar özel darbe emici sert karton ambalajlarda, giysiler ise su geçirmez mat koruma kılıflarında özenle paketlenir.</p>
    `):t==="returns"?(e="İADE VE DEĞİŞİM KOŞULLARI",i=`
      <p style="margin-bottom: 1rem;"><strong>14 Gün İade Hakkı:</strong> Ürünü teslim aldığınız tarihten itibaren 14 gün içinde koşulsuz iade veya değişim talep edebilirsiniz.</p>
      <p style="margin-bottom: 1rem;"><strong>Koşullar:</strong> Giysi ürünlerinin kullanılmamış, yıkanmamış ve etiketlerinin sökülmemiş olması gerekmektedir.</p>
      <p><strong>Fiziksel Medya:</strong> Plak ve kasetlerin orijinal jelatin ambalajının açılmamış olması zorunludur.</p>
    `):t==="sizeguide"&&(e="BEDEN VE KALIP REHBERİ",i=`
      <p style="margin-bottom: 1rem;"><strong>Tişörtler (Boxy Fit):</strong> Sokak modasına uygun rahat ve dökümlü kutu kesimdir. Standart rahatlık için kendi bedeninizi, ekstra oversized görünüm için 1 beden büyük seçebilirsiniz.</p>
      <p style="margin-bottom: 1rem;"><strong>Hoodieler (Oversized):</strong> 480 GSM ağır gramaj kumaş ile geniş göğüs ve düşük omuz kalıbına sahiptir.</p>
      <p><strong>Beden Tablosu:</strong> S (Genişlik: 54cm, Boy: 70cm) | M (Genişlik: 57cm, Boy: 72cm) | L (Genişlik: 60cm, Boy: 75cm) | XL (Genişlik: 63cm, Boy: 78cm)</p>
    `);const a=document.getElementById("store-checkout-modal-backdrop"),s=a?a.querySelector(".store-checkout-modal"):null;if(!a||!s)return;s.innerHTML=`
    <button id="btn-close-care" class="store-modal-close-btn" style="top:1rem; right:1rem;">&times;</button>
    <div style="font-size: 1.5rem; margin-bottom: 0.75rem; color: #fff;">ℹ</div>
    <h2 class="store-checkout-title" style="font-size:1.15rem; margin-bottom:1rem;">${e}</h2>
    <div style="text-align:left; font-size:0.85rem; color:#ccc; line-height:1.6; margin-bottom:1.5rem;">
      ${i}
    </div>
    <button id="btn-close-care-cta" class="store-hero-cta" style="width:100%;">ANLADIM & KAPAT</button>
  `;const n=()=>{a.classList.remove("is-open"),a.setAttribute("aria-hidden","true"),s.innerHTML=`
      <div class="store-checkout-icon">✓</div>
      <h2 class="store-checkout-title">SİPARİŞ ÖNİZLEMESİ HAZIR</h2>
      <p class="store-checkout-text">
        The Sinners Mağazasını ziyaret ettiğiniz için teşekkürler! Sepetinizdeki ürünler başarıyla doğrulandı, vergi ve teslimat detayları hesaplandı.
      </p>
      <div id="store-checkout-summary-box" style="background:#050505; border:1px solid rgba(255,255,255,0.1); padding:1.25rem; margin-bottom:1.5rem; text-align:left; font-size:0.8rem;"></div>
      <button id="store-checkout-modal-close" class="store-hero-cta" style="width:100%;">ALIŞVERİŞE DEVAM ET</button>
    `;const d=s.querySelector("#store-checkout-modal-close");d&&(d.onclick=Ut)},r=s.querySelector("#btn-close-care"),o=s.querySelector("#btn-close-care-cta");r&&(r.onclick=n),o&&(o.onclick=n),a.classList.add("is-open"),a.setAttribute("aria-hidden","false")}function Oe(t){const e=document.getElementById("store-toast-container");if(!e)return;const i=document.createElement("div");i.className="store-toast",i.innerHTML=`<span>✓</span> <span>${R(t)}</span>`,e.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(10px)",i.style.transition="all 0.3s ease",setTimeout(()=>i.remove(),300)},2800)}function ri(){window.addEventListener("scroll",()=>{const t=document.getElementById("store-header");t&&(window.scrollY>40?t.classList.add("is-scrolled"):t.classList.remove("is-scrolled"))},{passive:!0})}function ma(){document.querySelectorAll(".store-cat-pill, .store-nav-link").forEach(t=>{t.getAttribute("data-cat")===D?t.classList.add("active"):t.classList.remove("active")})}function li(t){t.addEventListener("click",c=>{const l=c.target.closest("[data-cat]");if(l){D=l.getAttribute("data-cat")||"ALL",Y="",ma(),Me();const p=document.getElementById("store-vitrine");p&&window.scrollY>400&&p.scrollIntoView({behavior:"smooth"})}}),t.addEventListener("click",c=>{const l=c.target.closest(".store-size-btn");if(l&&!l.disabled){const p=l.getAttribute("data-product-id"),g=l.getAttribute("data-size");Et[p]=g;const b=l.closest(".store-card-sizes");b&&(b.querySelectorAll(".store-size-btn").forEach(h=>h.classList.remove("selected")),l.classList.add("selected"))}}),t.addEventListener("click",c=>{const l=c.target.closest(".btn-quick-add");if(l&&!l.disabled){const p=l.getAttribute("data-product-id"),g=ke(p);if(g){const b=Et[p]||g.defaultSize||"M";la(p,b,1),lt(),Oe(`"${g.name}" (${b}) sepete eklendi.`),fe()}}}),t.addEventListener("click",c=>{const l=c.target.closest(".btn-open-detail, .btn-view-product");if(l){const p=l.getAttribute("data-product-id");p&&ca(p)}}),t.addEventListener("click",c=>{const l=c.target.closest(".btn-open-care-modal");if(l){c.preventDefault();const p=l.getAttribute("data-type");oi(p)}});const e=t.querySelector("#store-cart-trigger");e&&(e.onclick=fe);const i=t.querySelector("#store-cart-close-btn");i&&(i.onclick=vt);const a=t.querySelector("#store-cart-drawer-backdrop");a&&(a.onclick=c=>{c.target===a&&vt()});const s=t.querySelector("#store-search-trigger");s&&(s.onclick=si);const n=t.querySelector("#store-search-close-btn");n&&(n.onclick=Bt);const r=t.querySelector("#store-search-overlay");r&&(r.onclick=c=>{c.target===r&&Bt()});const o=t.querySelector("#store-search-input-field");o&&o.addEventListener("input",c=>{ua(c.target.value)});const d=t.querySelector("#store-detail-modal-backdrop");d&&(d.onclick=c=>{c.target===d&&jt()});const m=t.querySelector("#store-checkout-modal-close");m&&(m.onclick=Ut);const u=t.querySelector("#store-checkout-modal-backdrop");u&&(u.onclick=c=>{c.target===u&&Ut()}),window.addEventListener("keydown",c=>{c.key==="Escape"&&(Ne&&vt(),Re&&Bt(),jt(),Ut())}),window.addEventListener("store-cart-updated",()=>{lt()})}function R(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let B=null,_e=!1;function di(){B&&B.disconnect(),B=new IntersectionObserver(t=>{t.forEach(e=>{if(e.isIntersecting){const i=e.target;if(i.classList.add("is-visible"),i.hasAttribute("data-motion")&&i.getAttribute("data-motion")==="stagger"){const a=i.children,n=window.innerWidth<=768?25:35;Array.from(a).forEach((r,o)=>{const d=Math.min(o*n,210);r.style.transitionDelay=`${d}ms`})}B.unobserve(i)}})},{root:null,rootMargin:"0px 0px 60px 0px",threshold:.02}),ci(),ui(),requestAnimationFrame(()=>{document.documentElement.classList.remove("motion-pending"),document.documentElement.classList.add("motion-ready")})}function ci(t=document){if(!B)return;t.querySelectorAll("[data-motion], .motion-reveal, .motion-image").forEach(a=>{a.dataset.motionObserved!=="true"&&!a.classList.contains("is-visible")&&(a.dataset.motionObserved="true",B.observe(a))})}function ee(t){t&&xt(t)}function ui(){if(_e||window.matchMedia("(prefers-reduced-motion: reduce)").matches||window.innerWidth<=768)return;_e=!0;let t=!1;function e(){const i=document.querySelectorAll('.parallax-artwork, [data-parallax="artwork"]'),a=window.innerHeight;i.forEach(s=>{if(s.closest("#home-music")||s.classList.contains("album-artwork-box"))return;const n=s.getBoundingClientRect();if(n.top<a&&n.bottom>0){const r=(n.top+n.height/2-a/2)/(a/2),o=Math.max(-5,Math.min(5,r*3));s.style.transform=`translate3d(0, ${o.toFixed(1)}px, 0)`}}),t=!1}window.addEventListener("scroll",()=>{t||(window.requestAnimationFrame(e),t=!0)},{passive:!0})}let gt=null,bt=null;function Fe(t){if(!t)return;t.querySelectorAll("[data-motion], .motion-reveal, .motion-image").forEach(a=>{a.classList.remove("is-visible"),a.style.transitionDelay="",delete a.dataset.motionObserved,B&&B.unobserve(a)})}function mi(t,e,i){if(gt&&(clearTimeout(gt),gt=null),bt&&(cancelAnimationFrame(bt),bt=null),t===e){i&&i(),e&&xt(e),window.scrollTo({top:0,behavior:"instant"});return}const a=document.getElementById("cinematic-intro-overlay");if(a&&!a.classList.contains("intro-finished")&&a.style.display!=="none"||window.matchMedia("(prefers-reduced-motion: reduce)").matches){t&&(t.classList.add("hidden"),Fe(t)),i&&i(),e&&(e.classList.remove("hidden"),xt(e)),window.scrollTo({top:0,behavior:"instant"});return}t&&(t.classList.remove("page-transition-exiting","page-transition-entering"),t.classList.add("hidden"),Fe(t)),i&&i(),window.scrollTo({top:0,behavior:"instant"}),e&&(e.classList.remove("hidden","page-transition-exiting"),e.classList.add("page-transition-entering"),xt(e),gt=setTimeout(()=>{e.classList.remove("page-transition-entering"),gt=null},240))}function xt(t){if(!t)return;const i=t.querySelectorAll("[data-motion], .motion-reveal, .motion-image");if(i.length===0)return;const a=window.innerHeight;i.forEach(s=>{s.classList.remove("is-visible"),s.style.transitionDelay="",delete s.dataset.motionObserved,B&&B.unobserve(s)}),bt=requestAnimationFrame(()=>{const n=window.innerWidth<=768?20:30;i.forEach((r,o)=>{const d=r.getBoundingClientRect();if(t.id==="hero"||r.closest("#hero")||d.top<a+120){const u=Math.min(o*n,180);r.style.transitionDelay=`${u}ms`,r.classList.add("is-visible")}else B&&(r.dataset.motionObserved="true",B.observe(r))}),bt=null})}document.addEventListener("DOMContentLoaded",()=>{pi(),fi(),gi(),vi(),ki(),bi(),hi(),Ha(),di(),yi(),Ye(),Wt(),ge(),At(),he(),Ri(),ga(),va(),Ii(),Ti(),$i(),Di(),window.addEventListener("tour-data-updated",ge),window.addEventListener("updates-data-updated",At),window.addEventListener("about-data-updated",pa),window.addEventListener("socials-data-updated",Ye),window.addEventListener("music-data-updated",he),window.addEventListener("footer-data-updated",Wt)});function pi(){const t=document.getElementById("cinematic-intro-overlay");if(!t)return;const e=window.location.pathname,i=e==="/"||e==="/index.html";let a=!1;try{a=sessionStorage.getItem("parrhesia_intro_seen")==="true"}catch{}if(a||!i||document.documentElement.classList.contains("skip-intro")){t.classList.add("intro-finished"),t.style.display="none";return}let s=!1;function n(){if(!s){s=!0;try{sessionStorage.setItem("parrhesia_intro_seen","true")}catch{}t.classList.add("dissolving"),setTimeout(()=>{t.classList.add("intro-finished"),t.style.display="none"},900)}}t.addEventListener("click",n)}function Wt(){const t=Ae();document.querySelectorAll(".site-global-footer").forEach(i=>{const a=i.querySelector(".footer-replica-line1"),s=i.querySelector(".footer-replica-line2"),n=i.querySelector(".footer-replica-line4");a&&(a.textContent=t.line1),s&&(s.textContent=t.line2),n&&(n.textContent=t.line4)})}function fi(){const t=document.getElementById("logo-target");t&&(t.innerHTML=`<img src="${_t.logo.imageUrl}" alt="${_t.logo.altText}" class="band-logo-img" />`)}function gi(){document.getElementById("hero-bg-target");const t=document.getElementById("album-subtitle-target"),e=document.getElementById("album-title-target");t&&(t.textContent=_t.hero.albumSubtitle),e&&(e.textContent=_t.hero.albumTitle)}function vi(){const t=document.getElementById("mobile-menu-toggle"),e=document.getElementById("sidebar-close-btn"),i=a=>document.getElementById("sidebar-navigation");t&&t.addEventListener("click",()=>{i().classList.toggle("is-open")}),e&&e.addEventListener("click",()=>{i().classList.remove("is-open")}),document.addEventListener("click",a=>{const s=i();window.innerWidth<=850&&s.classList.contains("is-open")&&!s.contains(a.target)&&!t.contains(a.target)&&s.classList.remove("is-open")})}function bi(){const t=1.7777777777777777;function e(a,s){if(!a||!s)return;const n=Math.max(window.innerWidth,s.clientWidth||0),r=Math.max(window.innerHeight,s.clientHeight||0),o=n/r;let d,m;o>t?(d=n,m=n/t):(m=r,d=r*t),d<n&&(d=n,m=n/t),m<r&&(m=r,d=r*t);const u=Math.ceil(d*1.02),c=Math.ceil(m*1.02);a.style.width=`${u}px`,a.style.height=`${c}px`,a.style.minWidth=`${u}px`,a.style.minHeight=`${c}px`,a.style.maxWidth="none",a.style.maxHeight="none",a.style.position="absolute",a.style.top="50%",a.style.left="50%",a.style.transform="translate(-50%, -50%)"}function i(){const a=document.querySelector(".vimeo-bg-iframe"),s=document.querySelector(".hero-section")||document.body;e(a,s);const n=document.querySelector(".home-vimeo-smoke-iframe"),r=document.getElementById("home-scroll-sections")||document.body;e(n,r)}window.addEventListener("resize",i,{passive:!0}),i()}function hi(){const t=document.querySelector(".home-vimeo-smoke-iframe");if(!t)return;let e=!1;function i(){e||(e=!0,t.classList.add("is-playing"))}if(window.Vimeo&&window.Vimeo.Player)try{const a=new window.Vimeo.Player(t);a.on("playing",i),a.on("play",i),a.on("timeupdate",i)}catch{i()}window.addEventListener("message",a=>{if(a.origin&&a.origin.includes("vimeo"))try{const s=typeof a.data=="string"?JSON.parse(a.data):a.data;s&&(s.event==="playing"||s.event==="play"||s.event==="timeupdate"||s.event==="ready")&&i()}catch{}}),requestAnimationFrame(i),setTimeout(i,300)}function yi(){const t={"/":"hero","/tour":"tour","/live":"tour","/videos":"updates","/music":"music","/news":"updates","/updates":"updates","/about":"about","/merch":"updates"};let e=!0;function i(n){document.querySelectorAll(".brutalist-nav .nav-link").forEach(o=>{const d=o.getAttribute("data-route")||o.getAttribute("href");d===n||n==="/"&&d==="/"||(n==="/news"||n==="/updates")&&(d==="/news"||d==="/updates")?o.classList.add("active"):o.classList.remove("active")})}function a(n){if(n==="/admin"||n.startsWith("/admin/")){document.documentElement.classList.add("route-admin"),document.documentElement.classList.remove("route-tour","route-updates","route-about","route-music","route-privacy","route-terms"),dt();return}document.documentElement.classList.remove("route-admin");const r=n.endsWith("/")&&n.length>1?n.slice(0,-1):n;i(r);const o=document.getElementById("hero"),d=document.getElementById("merch"),m=document.getElementById("video"),u=document.getElementById("tour"),c=document.getElementById("updates"),l=document.getElementById("about"),p=document.getElementById("music"),g=document.getElementById("privacy"),b=document.getElementById("terms"),h=document.getElementById("home-scroll-sections"),k=document.getElementById("sidebar-navigation"),E=document.getElementById("about-menu-toggle");k&&k.classList.remove("is-forced-open"),E&&E.classList.remove("is-active");const y=[o,u,c,l,p,g,b].find(M=>M&&!M.classList.contains("hidden"));let S=o;r==="/merch"||r.startsWith("/merch/")?S=null:r==="/tour"?S=u:r==="/news"||r==="/updates"?S=c:r==="/about"?S=l:r==="/music"?S=p:r==="/privacy"?S=g:r==="/terms"&&(S=b);const O=()=>{document.documentElement.classList.remove("route-home","route-tour","route-updates","route-about","route-music","route-privacy","route-terms","route-merch");const M=document.getElementById("merch-store-root");if(M&&r!=="/merch"&&!r.startsWith("/merch/")&&M.classList.add("hidden"),r==="/merch"||r.startsWith("/merch/"))document.documentElement.classList.add("route-merch"),F(),V(),J(),o&&o.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),b&&b.classList.add("hidden"),M&&(M.classList.remove("hidden"),ai(M)),window.scrollTo({top:0,behavior:"instant"});else if(r==="/tour")document.documentElement.classList.add("route-tour"),F(),V(),J(),o&&o.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),b&&b.classList.add("hidden"),u&&u.classList.remove("hidden"),window.scrollTo({top:0,behavior:"instant"}),ge();else if(r==="/news"||r==="/updates")document.documentElement.classList.add("route-updates"),F(),V(),J(),o&&o.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),l&&l.classList.add("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),b&&b.classList.add("hidden"),c&&c.classList.remove("hidden"),window.scrollTo({top:0,behavior:"instant"}),At();else if(r==="/about")document.documentElement.classList.add("route-about"),o&&o.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),c&&c.classList.add("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),b&&b.classList.add("hidden"),l&&l.classList.remove("hidden"),window.scrollTo({top:0,behavior:"instant"}),pa();else if(r==="/music")document.documentElement.classList.add("route-music"),F(),V(),J(),o&&o.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),g&&g.classList.add("hidden"),b&&b.classList.add("hidden"),p&&p.classList.remove("hidden"),window.scrollTo({top:0,behavior:"instant"}),he();else if(r==="/privacy")document.documentElement.classList.add("route-privacy"),F(),V(),J(),o&&o.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),p&&p.classList.add("hidden"),b&&b.classList.add("hidden"),g&&g.classList.remove("hidden"),window.scrollTo({top:0,behavior:"instant"}),Wt();else if(r==="/terms")document.documentElement.classList.add("route-terms"),F(),V(),J(),o&&o.classList.add("hidden"),h&&h.classList.add("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),b&&b.classList.remove("hidden"),window.scrollTo({top:0,behavior:"instant"}),Wt();else{document.documentElement.classList.add("route-home"),F(),ga(),o&&o.classList.remove("hidden"),h&&h.classList.remove("hidden"),d&&d.classList.remove("hidden"),m&&m.classList.remove("hidden"),u&&u.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),b&&b.classList.add("hidden"),va(),o&&revealSectionContent(o);const Tt=t[r]||"hero",tt=document.getElementById(Tt);tt&&r!=="/"&&tt.scrollIntoView({behavior:"smooth"})}};if(i(r),e){e=!1,O(),S&&revealSectionContent(S),window.scrollTo({top:0,behavior:"instant"}),requestAnimationFrame(()=>{document.documentElement.classList.remove("motion-pending","is-app-initializing"),document.documentElement.classList.add("motion-ready")});return}mi(y,S,O)}function s(n){window.location.pathname!==n&&window.history.pushState(null,"",n),a(n)}document.addEventListener("click",n=>{const r=n.target.closest('a[data-route], a[href^="/"]');if(r){const o=r.getAttribute("data-route")||r.getAttribute("href");o&&o.startsWith("/")&&!o.startsWith("//")&&(n.preventDefault(),s(o))}}),window.addEventListener("popstate",()=>{a(window.location.pathname)}),a(window.location.pathname)}let P=[],Z=0;function ge(){const t=document.getElementById("public-upcoming-events"),e=document.getElementById("public-past-events");if(!t||!e)return;const{upcoming:i,past:a}=Qe(),s=i.filter(r=>r.visible!==!1),n=a.filter(r=>r.visible!==!1);Ve(t,s,"// ŞU ANDA DUYURULAN GELECEK ETKİNLİK BULUNMAMAKTADIR.",!1),Ve(e,n,"// ARŞİVLENMİŞ GEÇMİŞ ETKİNLİK BULUNMAMAKTADIR.",!0),Ai(),ee(document.getElementById("tour"))}function Si(t){if(!t)return"August 14, 2026";try{const e=new Date(t+"T00:00:00"),a=["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()]||"August",s=e.getDate(),n=e.getFullYear();return`${a} ${s}, ${n}`}catch{return t}}function Ve(t,e,i,a=!1){if(!e||e.length===0){t.innerHTML=`<div class="empty-tour-msg">${i}</div>`;return}t.innerHTML=e.map((s,n)=>{const r=Si(s.date),o=Array.isArray(s.images)&&s.images.length>0,d=n===0&&!a;if(a){const p=o?`<button type="button" class="tour-ticket-btn tour-btn-view" data-event-id="${s.id}">VIEW GALLERY</button>`:'<span class="tour-ticket-btn disabled">COMPLETED</span>';return`
        <div class="tour-exact-row">
          <div class="tour-row-info">
            <div class="tour-row-date">${v(r)}</div>
            <h3 class="tour-row-venue">${v(s.venue)}</h3>
            <div class="tour-row-location">${v(s.city)}${s.country?`, ${v(s.country)}`:""}</div>
          </div>
          <div class="tour-row-action">
            ${p}
          </div>
        </div>
        <div class="tour-row-divider"></div>
      `}const m=(s.status||"").toUpperCase()==="SOLD OUT"||(s.status||"").toUpperCase()==="TÜKENDİ",u=m?"tour-ticket-btn disabled":d?"tour-ticket-btn solid":"tour-ticket-btn outline",c=m?"SOLD OUT":"GET TICKETS",l=s.ticketUrl&&!m?`<a href="${v(s.ticketUrl)}" target="_blank" rel="noopener" class="${u}">${c}</a>`:`<span class="${u}">${c}</span>`;return`
      <div class="tour-exact-row">
        <div class="tour-row-info">
          <div class="tour-row-date">${v(r)}</div>
          <h3 class="tour-row-venue">${v(s.venue)}</h3>
          <div class="tour-row-location">${v(s.city)}${s.country?`, ${v(s.country)}`:""}</div>
        </div>
        <div class="tour-row-action">
          ${l}
        </div>
      </div>
      <div class="tour-row-divider"></div>
    `}).join("")}function Ei(t){if(!t)return"";try{const e=new Date(t+"T00:00:00"),i=e.getDate(),a=e.toLocaleDateString("tr-TR",{month:"long"}).toUpperCase(),s=e.getFullYear();return`${i} ${a} ${s}`}catch{return t}}function Ai(){document.querySelectorAll(".tour-btn-view").forEach(e=>{e.onclick=()=>{const i=e.getAttribute("data-event-id"),{past:a,upcoming:s}=Qe(),r=[...a,...s].find(o=>o.id===i);r&&Li(r)}})}function Li(t){const e=document.getElementById("tour-gallery-modal");if(!e)return;const i=document.getElementById("gallery-event-title"),a=document.getElementById("gallery-event-date"),s=Ei(t.date);i&&(i.textContent=(t.venue||"").toUpperCase()),a&&(a.textContent=`${(t.city||"").toUpperCase()}${t.country?` — ${t.country.toUpperCase()}`:""} // ${s}`);const n=["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80"];P=t.images&&t.images.length>0?t.images:n,Z=0,ve(),e.classList.remove("hidden"),e.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function ve(){const t=document.getElementById("gallery-active-img"),e=document.getElementById("gallery-counter");if(t&&P.length>0&&(t.style.opacity="0",t.style.transform="scale(0.97)",setTimeout(()=>{t.src=P[Z],t.onload=()=>{t.style.opacity="1",t.style.transform="scale(1)"},t.style.opacity="1",t.style.transform="scale(1)"},120)),e){const i=String(Z+1).padStart(2,"0"),a=String(P.length).padStart(2,"0");e.textContent=`${i} / ${a}`}}function Ii(){const t=document.getElementById("tour-gallery-modal"),e=document.getElementById("gallery-close-btn"),i=document.getElementById("gallery-prev-btn"),a=document.getElementById("gallery-next-btn"),s=()=>{t&&(t.classList.add("hidden"),t.setAttribute("aria-hidden","true"),document.body.style.overflow="")};e&&(e.onclick=s),t&&(t.onclick=n=>{n.target.classList.contains("gallery-modal-backdrop")&&s()}),i&&(i.onclick=()=>{P.length!==0&&(Z=(Z-1+P.length)%P.length,ve())}),a&&(a.onclick=()=>{P.length!==0&&(Z=(Z+1)%P.length,ve())}),window.addEventListener("keydown",n=>{t&&!t.classList.contains("hidden")&&(n.key==="Escape"&&s(),n.key==="ArrowLeft"&&i&&i.click(),n.key==="ArrowRight"&&a&&a.click())})}function Ti(){window.addEventListener("scroll",()=>{const t=document.querySelector(".desktop-top-bar");if(!t)return;const e=document.documentElement.classList.contains("route-tour"),i=document.documentElement.classList.contains("route-music"),a=document.documentElement.classList.contains("route-updates");(e||i||a)&&window.scrollY>20?t.classList.add("top-bar-hidden"):t.classList.remove("top-bar-hidden")},{passive:!0})}function v(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let W=null;function At(){const t=document.getElementById("journal-entries-feed");if(!t)return;const e=U();if(!e||e.length===0){t.innerHTML='<div class="empty-archive-msg">HENÜZ GÜNCELLEME YOK</div>';return}let i="";e.forEach(n=>{const r=W===n.id,o=n.category||"TRANSMISSION // JOURNAL",d=n.image||"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80";if(i+=`
      <div class="transmission-card ${r?"is-active":""}" data-id="${n.id}">
        <div class="transmission-img-wrapper">
          <img src="${v(d)}" alt="${v(n.title)}" class="transmission-cover-img" />
          <div class="transmission-overlay">
            <div class="transmission-overlay-top">
              <span class="transmission-cat-tag">${v(o)}</span>
              <span class="transmission-date-tag">${v(n.date)}</span>
            </div>
            <div class="transmission-overlay-center">
              <h3 class="transmission-overlay-title">${v(n.title)}</h3>
            </div>
            <div class="transmission-overlay-bottom">
              <span class="transmission-read-btn">DAHA FAZLASI İÇİN TIKLA &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    `,r){const m=n.tracklist&&n.tracklist.length>0?`
        <div class="spread-section-block">
          <span class="spread-section-label">// ÇALINAN / KAYDEDİLEN PARÇALAR</span>
          <div class="spread-track-chips">
            ${n.tracklist.map(l=>`<span class="spread-track-chip">${v(l)}</span>`).join("")}
          </div>
        </div>
      `:"",u=n.links&&n.links.length>0?`
        <div class="spread-section-block">
          <span class="spread-section-label">// İLGİLİ BAĞLANTILAR</span>
          <div class="spread-links-row">
            ${n.links.map(l=>`<a href="${v(l.url)}" target="_blank" rel="noopener" class="spread-ext-link">${v(l.name)} &rarr;</a>`).join("")}
          </div>
        </div>
      `:"",c=(n.body||"").split(`

`).map(l=>`<p>${v(l)}</p>`).join("");i+=`
        <div class="transmission-magazine-spread" id="spread-${n.id}">
          <div class="spread-left-col">
            <div class="spread-meta-header">
              <span class="spread-cat">${v(o)}</span>
              <span class="spread-date">${v(n.date)}</span>
            </div>
            <h2 class="spread-title">${v(n.title)}</h2>
            ${n.meta?`<div class="spread-meta-location">${v(n.meta)}</div>`:""}
            
            <div class="spread-body-text">
              ${c}
            </div>

            ${m}
            ${u}

            <button type="button" class="spread-close-btn" data-close-id="${n.id}">
              <span>[ KÜÇÜLT ]</span>
            </button>
          </div>

          <div class="spread-right-col">
            <div class="spread-artwork-box">
              <img src="${v(d)}" alt="${v(n.title)}" class="spread-artwork-img" />
            </div>
          </div>
        </div>
      `}}),t.innerHTML=i,t.querySelectorAll(".transmission-card").forEach(n=>{n.onclick=()=>{const r=n.getAttribute("data-id");if(W===r?W=null:W=r,At(),W){const o=document.getElementById(`spread-${W}`);o&&o.scrollIntoView({behavior:"smooth",block:"nearest"})}}}),t.querySelectorAll(".spread-close-btn").forEach(n=>{n.onclick=r=>{r.stopPropagation(),W=null,At()}}),ee(t)}function ki(){const t=document.getElementById("about-menu-toggle"),e=document.getElementById("sidebar-navigation");t&&e&&(t.addEventListener("click",i=>{i.stopPropagation(),e.classList.toggle("is-forced-open")?t.classList.add("is-active"):t.classList.remove("is-active")}),e.addEventListener("click",i=>{i.target.closest("a")&&(e.classList.remove("is-forced-open"),t.classList.remove("is-active"))}),document.addEventListener("click",i=>{document.documentElement.classList.contains("route-about")&&e.classList.contains("is-forced-open")&&!e.contains(i.target)&&!t.contains(i.target)&&(e.classList.remove("is-forced-open"),t.classList.remove("is-active"))}))}let qt=null,ct=0;function pa(){const t=document.getElementById("about-slides-container"),e=document.getElementById("about-slide-indicators");document.getElementById("about-slide-caption");const i=document.getElementById("about-bio-text");if(!t||!i)return;const a=X();a.slides&&a.slides.length>0&&(t.innerHTML=a.slides.map(s=>`
      <div class="about-slide-item">
        <img src="${v(s.url)}" alt="${v(s.caption||"The Sinners Visual")}" class="about-slide-img" />
      </div>
    `).join(""),e&&(e.innerHTML=a.slides.map((s,n)=>`
        <button class="about-indicator-dot ${n===0?"active":""}" data-index="${n}" aria-label="Slide ${n+1}"></button>
      `).join(""),e.querySelectorAll(".about-indicator-dot").forEach(s=>{s.addEventListener("click",()=>{const n=parseInt(s.getAttribute("data-index"),10);wi(n)})})),ct=0,$e(),fa()),a.bioParagraphs&&a.bioParagraphs.length>0&&(i.innerHTML=a.bioParagraphs.map(s=>`
      <p class="about-bio-paragraph" data-motion="text-reveal">${v(s)}</p>
    `).join("")),ee(document.getElementById("about"))}function fa(){F();const t=X();!t.slides||t.slides.length<=1||(qt=setInterval(()=>{ct=(ct+1)%t.slides.length,$e()},4500))}function F(){qt&&(clearInterval(qt),qt=null)}function wi(t){ct=t,$e(),fa()}function $e(){const t=document.getElementById("about-slides-container"),e=document.getElementById("about-slide-indicators");t&&(t.style.transform=`translateX(-${ct*100}%)`),e&&e.querySelectorAll(".about-indicator-dot").forEach((a,s)=>{s===ct?a.classList.add("active"):a.classList.remove("active")})}function Ye(){const t=document.getElementById("desktop-social-links"),e=document.getElementById("mobile-social-links"),i=document.querySelectorAll(".footer-social-target"),a=It(),s=a&&a.length>0?a.map(r=>{const o=Ma(r),d=v(r.name||"Social Link");return`
      <a href="${v(r.url)}" target="_blank" rel="noopener noreferrer" class="header-social-icon-link" title="${d}" aria-label="${d}">
        ${o}
      </a>
    `}).join(""):"";t&&(t.innerHTML=s),e&&(e.innerHTML=s);const n=a&&a.length>0?a.map(r=>{const o=v(r.name||"Social Link").toUpperCase();return`
      <a href="${v(r.url)}" target="_blank" rel="noopener noreferrer" class="footer-link" title="${o}">
        ${o} ↗
      </a>
    `}).join(""):"";i.forEach(r=>{r.innerHTML=n})}let Pt=null,it=[];const je=["9mm Hate","For the Night","Way to Heaven","Betrayal","Parrhesia","I am Not Okay","Silence"],Ni=[{topMin:6,topMax:22,leftMin:5,leftMax:35},{topMin:6,topMax:22,leftMin:55,leftMax:82},{topMin:36,topMax:52,leftMin:4,leftMax:32},{topMin:36,topMax:52,leftMin:58,leftMax:84},{topMin:68,topMax:85,leftMin:6,leftMax:38},{topMin:68,topMax:85,leftMin:52,leftMax:80}];let Ht=new Set;function ga(){V();const t=document.getElementById("hero-ghost-layer");if(!t)return;function e(){if(!(!document.documentElement.classList.contains("route-tour")&&!document.documentElement.classList.contains("route-updates")&&!document.documentElement.classList.contains("route-about")&&!document.documentElement.classList.contains("route-admin"))){V();return}const s=Math.random();let n=2;s<.25?n=1:s<.75?n=2:n=3,Ni.map((m,u)=>({quad:m,idx:u})).filter(m=>!Ht.has(m.idx)).sort(()=>Math.random()-.5).slice(0,n).forEach(({quad:m,idx:u})=>{Ht.add(u);const c=je[Math.floor(Math.random()*je.length)],l=(.05+Math.random()*.04).toFixed(3),p=(-3+Math.random()*6).toFixed(1),g=(3+Math.random()*3.5)*1e3,b=(m.topMin+Math.random()*(m.topMax-m.topMin)).toFixed(1)+"%",h=(m.leftMin+Math.random()*(m.leftMax-m.leftMin)).toFixed(1)+"%",k=document.createElement("div");k.className="ghost-text-item",k.textContent=c,k.style.top=b,k.style.left=h,k.style.transform=`rotate(${p}deg)`,k.style.setProperty("--max-opacity",l),t.appendChild(k);const E=setTimeout(()=>{k.classList.add("is-visible")},100+Math.random()*200);it.push(E);const I=1800+g,y=setTimeout(()=>{k.classList.remove("is-visible"),k.classList.add("is-fading-out");const S=setTimeout(()=>{k.parentNode&&k.parentNode.removeChild(k),Ht.delete(u)},1600);it.push(S)},I);it.push(y)});const d=2200+Math.random()*2500;Pt=setTimeout(e,d)}const i=setTimeout(e,300);it.push(i)}function V(){Pt&&(clearTimeout(Pt),Pt=null),it.forEach(e=>clearTimeout(e)),it=[],Ht.clear();const t=document.getElementById("hero-ghost-layer");t&&(t.innerHTML="")}let ht=null,yt=null,Kt=!1;function va(){J();const t=document.querySelectorAll(".reveal-on-scroll, .music-stagger-section");if(!t||t.length===0)return;const e={root:null,rootMargin:"0px 0px -8% 0px",threshold:.12};ht=new IntersectionObserver((n,r)=>{n.forEach(o=>{o.isIntersecting&&(o.target.classList.contains("music-stagger-section")?o.target.classList.add("is-stagger-active"):o.target.classList.add("is-revealed"),r.unobserve(o.target))})},e),t.forEach(n=>ht.observe(n));const i=document.querySelector(".parallax-visual"),a=document.querySelectorAll(".parallax-item");function s(){if(Kt=!1,window.innerWidth<=768)return;if(!document.documentElement.classList.contains("route-about")&&!document.documentElement.classList.contains("route-tour")&&!document.documentElement.classList.contains("route-updates")&&!document.documentElement.classList.contains("route-music")&&!document.documentElement.classList.contains("route-admin")){const r=window.innerHeight;if(i){const o=i.getBoundingClientRect();if(o.top<r&&o.bottom>0){const m=(o.top-r/2)*.07;i.style.transform=`translate3d(0, ${m.toFixed(1)}px, 0) scale(1.04)`}}a.forEach(o=>{const d=o.getBoundingClientRect();if(d.top<r&&d.bottom>0){const m=parseFloat(o.getAttribute("data-speed")||"0.04"),u=(d.top-r/2)*m;o.style.transform=`translate3d(0, ${u.toFixed(1)}px, 0)`}})}}yt=()=>{Kt||(Kt=!0,requestAnimationFrame(s))},window.addEventListener("scroll",yt,{passive:!0}),requestAnimationFrame(s)}function J(){ht&&(ht.disconnect(),ht=null),yt&&(window.removeEventListener("scroll",yt),yt=null),Kt=!1}let N=new Audio,T=[],w=-1,Lt=!1,zt="ALL",Gt="";function Ri(){const t=document.getElementById("player-play-btn"),e=document.getElementById("player-prev-btn"),i=document.getElementById("player-next-btn"),a=document.getElementById("player-fav-btn"),s=document.getElementById("player-volume-slider"),n=document.getElementById("player-progress-bar-container");t&&t.addEventListener("click",De),e&&e.addEventListener("click",Mi),i&&i.addEventListener("click",We),a&&a.addEventListener("click",()=>{if(w>=0&&T[w]){const r=T[w],o=ea(r.id);Ce(o),ut()}}),s&&s.addEventListener("input",r=>{N.volume=parseFloat(r.target.value)}),n&&n.addEventListener("click",r=>{if(!N.duration)return;const o=n.getBoundingClientRect(),d=r.clientX-o.left,m=Math.max(0,Math.min(1,d/o.width));N.currentTime=m*N.duration}),N.addEventListener("timeupdate",()=>{if(!N.duration)return;const r=document.getElementById("player-time-current"),o=document.getElementById("player-time-duration"),d=document.getElementById("player-progress-fill");if(r&&(r.textContent=Ze(N.currentTime)),o&&!isNaN(N.duration)&&(o.textContent=Ze(N.duration)),d){const m=N.currentTime/N.duration*100;d.style.width=`${m}%`}}),N.addEventListener("ended",()=>{We()}),N.addEventListener("play",()=>{Lt=!0,Je(!0),be()}),N.addEventListener("pause",()=>{Lt=!1,Je(!1),be()})}function Q(t,e=[]){e.length>0?(T=e,w=T.findIndex(o=>o.id===t.id)):T.length===0&&(T=Zt(),w=T.findIndex(o=>o.id===t.id)),w===-1&&(T=[t],w=0);const i=document.getElementById("global-music-player");i&&i.classList.remove("hidden");const a=document.getElementById("player-title"),s=document.getElementById("player-artist"),n=document.getElementById("player-img");a&&(a.textContent=t.title),s&&(s.textContent=`${t.artist||"THE SINNERS"} — ${t.releaseTitle||"SINGLE"}`),n&&t.coverUrl&&(n.src=t.coverUrl);const r=Ft();Ce(r.includes(t.id)),N.src=t.audioUrl,N.play().catch(o=>{console.log("Audio playback initialized:",o)}),be()}function De(){if(!N.src){const t=Zt();t.length>0&&Q(t[0],t);return}N.paused?N.play():N.pause()}function We(){T.length!==0&&(w=(w+1)%T.length,Q(T[w]))}function Mi(){T.length!==0&&(w=(w-1+T.length)%T.length,Q(T[w]))}function Je(t){const e=document.getElementById("player-play-icon"),i=document.getElementById("player-pause-icon");t?(e&&e.classList.add("hidden"),i&&i.classList.remove("hidden")):(e&&e.classList.remove("hidden"),i&&i.classList.add("hidden"))}function Ce(t){const e=document.getElementById("player-fav-btn");e&&(t?(e.classList.add("active"),e.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="#d92b2b" stroke="#d92b2b" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'):(e.classList.remove("active"),e.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'))}function Ze(t){if(isNaN(t)||t<0)return"00:00";const e=Math.floor(t/60),i=Math.floor(t%60);return`${e<10?"0":""}${e}:${i<10?"0":""}${i}`}function be(){const t=T[w];document.querySelectorAll(".music-track-row, .music-archive-row").forEach(i=>{const a=i.getAttribute("data-track-id");t&&a===t.id?(i.classList.add("is-playing"),Lt?i.classList.add("is-active-playing"):i.classList.remove("is-active-playing")):(i.classList.remove("is-playing"),i.classList.remove("is-active-playing"))})}function he(){const t=document.getElementById("current-release-tracklist"),e=document.getElementById("discography-grid"),a=C().filter(r=>r.status==="PUBLISHED"),s=a.find(r=>r.featured)||a[0];if(s){const r=document.querySelector("#music .music-hero-title, #music .featured-album-title"),o=document.querySelector("#music .music-hero-cover, #music .featured-album-cover"),d=document.querySelector("#music .music-hero-meta, #music .featured-album-meta");r&&(r.textContent=s.title),o&&(o.src=s.coverUrl),d&&(d.textContent=`${s.year} // ${s.type} // ${s.releaseDate}`)}t&&s&&(t.innerHTML=(s.tracks||[]).map((o,d)=>{const m=T[w]&&T[w].id===o.id;return`
        <div class="music-track-row ${m?"is-playing":""} ${m&&Lt?"is-active-playing":""}" data-track-id="${o.id}">
          <div class="track-row-left">
            <span class="track-num">${d+1<10?"0"+(d+1):d+1}</span>
            <button type="button" class="track-play-inline-btn" aria-label="Play ${v(o.title)}">
              <svg class="play-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <svg class="pause-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            </button>
            <span class="track-title-text">${v(o.title)}</span>
          </div>
          <span class="track-duration-text">${o.duration}</span>
        </div>
      `}).join(""),t.querySelectorAll(".music-track-row").forEach(o=>{o.onclick=()=>{const d=o.getAttribute("data-track-id"),m=(s.tracks||[]).find(u=>u.id===d);if(m){const u=T[w];if(u&&u.id===m.id)De();else{const c=(s.tracks||[]).map(l=>({...l,coverUrl:s.coverUrl,artist:s.artist}));Q(m,c)}}}}));const n=document.getElementById("btn-play-current-release");n&&s&&(n.onclick=()=>{const r=(s.tracks||[]).map(o=>({...o,coverUrl:s.coverUrl,artist:s.artist}));r.length>0&&Q(r[0],r)}),ut(),Oi(),e&&(e.innerHTML=a.map(o=>{const d=(o.tracks||[]).length;return`
        <div class="discography-card" data-release-id="${o.id}">
          <div class="disco-cover-wrapper">
            <img src="${o.coverUrl}" alt="${v(o.title)} Cover" class="disco-cover-img" />
            <div class="disco-overlay-btn">
              <span>LISTEN NOW</span>
            </div>
          </div>
          <div class="disco-card-info">
            <div class="disco-card-meta">
              <span class="disco-year">${o.year}</span>
              <span class="disco-type">${o.type}</span>
            </div>
            <h3 class="disco-card-title">${v(o.title)}</h3>
            <span class="disco-track-count">${d} ${d===1?"TRACK":"TRACKS"}</span>
          </div>
        </div>
      `}).join(""),e.querySelectorAll(".discography-card").forEach(o=>{o.onclick=()=>{const d=o.getAttribute("data-release-id"),m=a.find(u=>u.id===d);if(m&&(m.tracks||[]).length>0){const u=m.tracks.map(c=>({...c,coverUrl:m.coverUrl,artist:m.artist}));Q(u[0],u)}}})),ee(document.getElementById("music"))}let st=!1;function ut(){const t=document.getElementById("music-archive-list");if(!t)return;const e=Zt(),i=Ft();let a=e.filter(l=>zt==="SINGLES"?l.type==="SINGLE":zt==="ALBUMS"?l.type==="ALBUM":zt==="EPS"?l.type==="EP":!0);if(Gt.trim()){const l=Gt.toLowerCase().trim();a=a.filter(p=>p.title.toLowerCase().includes(l)||p.releaseTitle.toLowerCase().includes(l))}if(a.length===0){t.innerHTML=`<div class="empty-archive-msg">NO TRACKS FOUND MATCHING "${v(Gt)}"</div>`;const l=document.getElementById("archive-expand-row");l&&l.classList.add("hidden");return}const s=5,n=st?a:a.slice(0,s),r=document.getElementById("archive-expand-row"),o=document.getElementById("btn-toggle-show-all-tracks"),d=document.getElementById("btn-show-all-label"),m=document.getElementById("btn-show-all-icon");r&&o&&(a.length>s?(r.classList.remove("hidden"),st?(d&&(d.textContent="DAHA AZ GÖSTER"),m&&(m.innerHTML='<polyline points="18 15 12 9 6 15"></polyline>')):(d&&(d.textContent=`HEPSİNİ GÖSTER (${a.length} ŞARKI)`),m&&(m.innerHTML='<polyline points="6 9 12 15 18 9"></polyline>')),o.onclick=()=>{st=!st,ut()}):r.classList.add("hidden")),t.innerHTML=n.map((l,p)=>{const g=T[w]&&T[w].id===l.id,b=g&&Lt,h=i.includes(l.id);return`
      <div class="music-archive-row ${g?"is-playing":""} ${b?"is-active-playing":""}" data-track-id="${l.id}">
        <div class="archive-row-left">
          <span class="archive-num">${p+1<10?"0"+(p+1):p+1}</span>
          <img src="${l.coverUrl}" alt="Cover" class="archive-thumb-img" />
          <button type="button" class="archive-play-btn" aria-label="Play ${v(l.title)}">
            <svg class="play-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg class="pause-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          <div class="archive-title-meta-col">
            <span class="archive-track-title">${v(l.title)}</span>
            <span class="archive-release-sub">${v(l.artist)} — ${v(l.releaseTitle)}</span>
          </div>
        </div>

        <div class="archive-row-right">
          <span class="archive-type-tag">${l.type}</span>
          <span class="archive-duration">${l.duration}</span>
          <button type="button" class="archive-fav-btn ${h?"active":""}" data-fav-id="${l.id}" aria-label="Favorite">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="${h?"#d92b2b":"none"}" stroke="${h?"#d92b2b":"currentColor"}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    `}).join(""),t.querySelectorAll(".music-archive-row").forEach(l=>{l.onclick=p=>{if(p.target.closest(".archive-fav-btn"))return;const g=l.getAttribute("data-track-id"),b=a.find(h=>h.id===g);if(b){const h=T[w];h&&h.id===b.id?De():Q(b,a)}}}),t.querySelectorAll(".archive-fav-btn").forEach(l=>{l.onclick=p=>{p.stopPropagation();const g=l.getAttribute("data-fav-id");ea(g),ut();const b=T[w];if(b&&b.id===g){const h=Ft().includes(g);Ce(h)}}})}function Oi(){const t=document.querySelectorAll(".music-tab-btn");t.forEach(i=>{i.onclick=()=>{t.forEach(a=>a.classList.remove("active")),i.classList.add("active"),zt=i.getAttribute("data-filter")||"ALL",st=!1,ut()}});const e=document.getElementById("music-search-input");e&&(e.oninput=i=>{Gt=i.target.value,st=!1,ut()})}function $i(){const t=document.querySelectorAll(".zine-item");if(t.length===0)return;let e=document.getElementById("darkroom-lightbox-backdrop");e||(e=document.createElement("div"),e.id="darkroom-lightbox-backdrop",e.className="darkroom-modal-backdrop",e.setAttribute("aria-hidden","true"),document.body.appendChild(e));const i=a=>{const s=a.getAttribute("data-title")||"",n=a.getAttribute("data-film")||"",r=a.getAttribute("data-loc")||"",o=a.getAttribute("data-date")||"",d=a.getAttribute("data-desc")||"",m=a.getAttribute("data-img")||"";e.innerHTML=`
      <div class="darkroom-modal-card">
        <button type="button" class="darkroom-modal-close" id="darkroom-close-btn" aria-label="Kapat">&times;</button>
        
        <div class="darkroom-modal-img-col">
          <img src="${v(m)}" alt="${v(s)}" class="darkroom-modal-img" />
        </div>

        <div class="darkroom-modal-info-col">
          <div>
            <div style="font-family: monospace; font-size: 0.7rem; color: #d92b2b; letter-spacing: 0.2em; margin-bottom: 0.75rem; text-transform: uppercase;">
              // THE SINNERS • GÖRSEL ARŞİV
            </div>
            <h2 style="font-family: 'Bodoni Moda', 'Playfair Display', serif; font-size: 1.5rem; color: #fff; margin: 0 0 1rem 0; line-height: 1.2;">
              ${v(s)}
            </h2>
            <p style="font-size: 0.85rem; color: #aaa; line-height: 1.7; margin-bottom: 1.5rem;">
              ${v(d)}
            </p>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.78rem; font-family: monospace;">
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>FİLM NEGATİFİ:</span>
                <span style="color: #fff;">${v(n)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>KONUM & MEKAN:</span>
                <span style="color: #fff;">${v(r)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>ZAMAN DAMGASI:</span>
                <span style="color: #fff;">${v(o)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>BASKI TÜRÜ:</span>
                <span style="color: #d92b2b;">GÜMÜŞ JELATİN / ANALOG</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 2rem;">
            <button type="button" class="admin-btn admin-btn-secondary" id="btn-close-darkroom-action" style="width: 100%; border-color: rgba(255,255,255,0.2); text-align: center;">
              KAPAT & ARŞİVE DÖN
            </button>
          </div>
        </div>
      </div>
    `,e.classList.add("is-open"),e.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden";const u=e.querySelector("#darkroom-close-btn"),c=e.querySelector("#btn-close-darkroom-action"),l=()=>{e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.style.overflow=""};u&&(u.onclick=l),c&&(c.onclick=l)};t.forEach(a=>{a.onclick=()=>i(a)}),e.onclick=a=>{a.target===e&&(e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.style.overflow="")},window.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("is-open")&&(e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.style.overflow="")})}function Di(){const t=document.getElementById("scroll-to-top-btn");if(!t)return;const e=()=>{const i=window.pageYOffset||document.documentElement.scrollTop||window.scrollY||document.body.scrollTop||0,a=window.location.pathname.startsWith("/admin")||window.location.pathname.startsWith("/merch");i>100&&!a?t.classList.add("is-visible"):t.classList.remove("is-visible")};window.addEventListener("scroll",e,{passive:!0,capture:!0}),document.addEventListener("scroll",e,{passive:!0,capture:!0}),document.body.addEventListener("scroll",e,{passive:!0,capture:!0}),window.addEventListener("popstate",e),window.addEventListener("resize",e),t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),window.scrollTo({top:0,behavior:"smooth"}),document.documentElement.scrollTo({top:0,behavior:"smooth"}),document.body.scrollTo({top:0,behavior:"smooth"})}),e()}
