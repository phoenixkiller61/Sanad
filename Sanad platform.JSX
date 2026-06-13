import { useState } from "react";
import {
  Users, UserPlus, LogOut, Eye, EyeOff, ShieldCheck,
  Search, BookOpen, Camera, X, Edit2, Trash2,
  LayoutGrid, List, Plus, FileDown, AlertTriangle,
  TrendingUp, Heart, CheckCircle
} from "lucide-react";

// ══════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════
const ADMIN = { email:"admin@gmail.com", password:"0000" };

const ALL_CATEGORIES = [
  { id:"married",   label:"متزوج / متزوجة",           color:"#2558a0", bg:"#ddeeff", border:"#a8c8ee" },
  { id:"unmarried", label:"غير متزوج / غير متزوجة",   color:"#5a6a20", bg:"#eef4cc", border:"#ccd888" },
  { id:"chronic",   label:"أمراض مزمنة",               color:"#8a3010", bg:"#ffe8dd", border:"#f0b899" },
  { id:"surgical",  label:"أمراض طارئة وجراحية",       color:"#7a1a40", bg:"#fce4ef", border:"#e8a0c0" },
  { id:"poor",      label:"فقراء ومساكين",              color:"#4a5030", bg:"#eef0e0", border:"#c8cc99" },
  { id:"widow",     label:"أرامل",                      color:"#304060", bg:"#dde8f8", border:"#99b8e8" },
  { id:"orphan",    label:"أيتام",                      color:"#1a5a50", bg:"#d8f0ec", border:"#88cccc" },
  { id:"divorced",  label:"مطلقات",                     color:"#5a3080", bg:"#ede0f8", border:"#c0a0e0" },
  { id:"noincome",  label:"عديمو الدخل",                color:"#604020", bg:"#f4e8d8", border:"#d4aa80" },
];

const EMPTY_PERSON = { firstName:"", lastName:"", ccp:"", married:true, children:0, categories:[], photo:null };

const INIT_NEEDY = [
  { id:1, firstName:"أحمد",  lastName:"بن عمر",  ccp:"0021234500", married:true,  children:3, categories:["married","poor"],          photo:null },
  { id:2, firstName:"فاطمة", lastName:"الزهراء", ccp:"0039876500", married:false, children:0, categories:["widow","noincome"],         photo:null },
  { id:3, firstName:"يوسف",  lastName:"قاسمي",   ccp:"0058765400", married:true,  children:5, categories:["chronic","poor","married"], photo:null },
  { id:4, firstName:"زينب",  lastName:"مرابط",   ccp:"0072345600", married:false, children:2, categories:["divorced","noincome"],      photo:null },
];

// ══════════════════════════════════════════════════════
// THEME
// ══════════════════════════════════════════════════════
const c = {
  bg:"#f0f5f2", card:"#ffffff", cardSoft:"#e8f2ec", border:"#c8ddd0",
  green:"#2e7d50", greenHov:"#236640", greenPale:"#e2f0e8",
  teal:"#1a6b5a", gold:"#9a7220", goldLight:"#c49428",
  text:"#1c2e22", textSub:"#4a6855", textMuted:"#7a9e85",
  shadow:"rgba(30,90,55,.10)", shadowSm:"rgba(30,90,55,.06)",
  red:"#c0392b", redBg:"#fff4f4", redBorder:"#f0b8b8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{direction:rtl;font-family:'Cairo',sans-serif;background:${c.bg};color:${c.text};min-height:100vh}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:${c.bg}}
  ::-webkit-scrollbar-thumb{background:${c.green};border-radius:4px}

  .card{background:#fff;border:1.5px solid ${c.border};border-radius:18px;box-shadow:0 2px 14px ${c.shadowSm}}
  .input{width:100%;background:${c.cardSoft};border:1.5px solid ${c.border};border-radius:10px;padding:10px 13px;color:${c.text};font-family:'Cairo',sans-serif;font-size:.93rem;outline:none;transition:all .18s;direction:rtl}
  .input:focus{border-color:${c.green};box-shadow:0 0 0 3px rgba(46,125,80,.10);background:#fff}
  .input::placeholder{color:${c.textMuted}}
  .select{width:100%;background:${c.cardSoft};border:1.5px solid ${c.border};border-radius:10px;padding:10px 13px;color:${c.text};font-family:'Cairo',sans-serif;font-size:.93rem;outline:none;cursor:pointer;direction:rtl}

  .btn-primary{background:${c.green};color:#fff;font-weight:700;font-size:.93rem;padding:10px 22px;border-radius:10px;border:none;cursor:pointer;transition:all .18s;font-family:'Cairo',sans-serif;display:inline-flex;align-items:center;gap:6px}
  .btn-primary:hover{background:${c.greenHov};transform:translateY(-1px);box-shadow:0 6px 18px rgba(46,125,80,.30)}
  .btn-ghost{background:#fff;border:1.5px solid ${c.border};color:${c.textSub};padding:8px 16px;border-radius:9px;cursor:pointer;font-family:'Cairo',sans-serif;transition:all .18s;font-size:.88rem;display:inline-flex;align-items:center;gap:6px}
  .btn-ghost:hover{border-color:${c.green};color:${c.green};background:${c.greenPale}}
  .btn-danger{background:${c.redBg};border:1px solid ${c.redBorder};color:${c.red};padding:7px 14px;border-radius:8px;cursor:pointer;font-family:'Cairo',sans-serif;font-size:.85rem;display:inline-flex;align-items:center;gap:5px;transition:all .18s;font-weight:600}
  .btn-danger:hover{background:#ffe0e0}
  .btn-icon{background:#fff;border:1.5px solid ${c.border};color:${c.textMuted};width:34px;height:34px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .18s;flex-shrink:0}
  .btn-icon:hover{border-color:${c.green};color:${c.green};background:${c.greenPale}}
  .btn-icon.red:hover{border-color:${c.redBorder};color:${c.red};background:${c.redBg}}

  .tab{padding:9px 17px;border-radius:9px;cursor:pointer;font-family:'Cairo',sans-serif;font-weight:600;transition:all .18s;border:1.5px solid transparent;font-size:.88rem;display:inline-flex;align-items:center;gap:6px}
  .tab-active{background:${c.green};color:#fff;border-color:${c.green};box-shadow:0 4px 12px rgba(46,125,80,.25)}
  .tab-inactive{background:#fff;color:${c.textSub};border-color:${c.border}}
  .tab-inactive:hover{border-color:${c.green};color:${c.green};background:${c.greenPale}}

  table{width:100%;border-collapse:collapse;font-size:.88rem}
  th{background:${c.cardSoft};color:${c.teal};padding:11px 13px;text-align:right;font-weight:700;font-size:.79rem;border-bottom:2px solid ${c.border};white-space:nowrap}
  td{padding:10px 13px;border-bottom:1px solid #eaf2ee;color:${c.text};vertical-align:middle}
  tr:last-child td{border-bottom:none}
  tr:hover td{background:#f5fbf7}

  .badge-green{background:#d6f0df;color:#1a6b3a;border:1px solid #a8d8bb;display:inline-block;padding:3px 10px;border-radius:20px;font-size:.75rem;font-weight:700}
  .badge-blue{background:#ddeeff;color:#2558a0;border:1px solid #a8c8ee;display:inline-block;padding:3px 10px;border-radius:20px;font-size:.75rem;font-weight:700}

  .alert-e{background:${c.redBg};border:1.5px solid ${c.redBorder};color:${c.red};border-radius:10px;padding:10px 14px;font-size:.88rem;margin-bottom:14px}
  .alert-s{background:#edfaf2;border:1.5px solid #9adbb5;color:#1a6b3a;border-radius:10px;padding:10px 14px;font-size:.88rem;margin-bottom:14px}

  @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeIn .28s ease both}
  @keyframes modalIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
  .modal-in{animation:modalIn .2s ease both}
  @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .slide-up{animation:slideUp .22s ease both}

  .row-link{cursor:pointer;color:${c.green};font-weight:700}
  .row-link:hover{color:${c.teal};text-decoration:underline}

  .pcard{background:#fff;border:1.5px solid ${c.border};border-radius:14px;padding:16px;transition:all .18s;position:relative;display:flex;flex-direction:column;gap:10px}
  .pcard:hover{border-color:${c.green};box-shadow:0 6px 22px ${c.shadow};transform:translateY(-2px)}

  .fab{position:fixed;bottom:26px;left:26px;width:56px;height:56px;border-radius:50%;background:${c.green};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(46,125,80,.45);transition:all .2s;z-index:300}
  .fab:hover{background:${c.greenHov};transform:scale(1.1);box-shadow:0 10px 30px rgba(46,125,80,.5)}
  .fab-tooltip{position:absolute;left:66px;background:${c.text};color:#fff;padding:5px 12px;border-radius:8px;font-size:.8rem;white-space:nowrap;font-family:'Cairo',sans-serif;pointer-events:none;opacity:0;transition:opacity .15s}
  .fab:hover .fab-tooltip{opacity:1}

  .qs-overlay{position:fixed;inset:0;background:rgba(10,30,15,.5);backdrop-filter:blur(7px);z-index:600;display:flex;align-items:flex-start;justify-content:center;padding-top:70px;padding-right:16px;padding-left:16px}

  /* ── MOBILE ── */
  @media(max-width:640px){
    th,td{padding:6px 6px;font-size:.72rem}
    .hide-mobile{display:none!important}
    .btn-primary{font-size:.83rem;padding:9px 12px;gap:4px}
    .btn-ghost{font-size:.81rem;padding:7px 10px;gap:4px}
    .btn-danger{font-size:.79rem;padding:6px 9px}
    .tabs-row{overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;flex-wrap:nowrap!important}
    .tab{padding:7px 12px;font-size:.79rem;white-space:nowrap}
    .pcard{padding:11px;gap:8px}
    .stats-grid{grid-template-columns:repeat(2,1fr)!important}
    .cat-grid{grid-template-columns:repeat(3,1fr)!important;gap:7px!important}
    .form-grid{grid-template-columns:1fr!important}
    .persons-grid{grid-template-columns:1fr!important}
    .fab{bottom:18px;left:18px;width:50px;height:50px}
    .qs-overlay{padding-top:14px!important;align-items:flex-start}
    .topbar-session{display:none!important}
    .topbar-search-txt{display:none!important}
    .modal-box{padding:18px!important;border-radius:14px!important}
    .photo-field-wrap{flex-direction:column!important;align-items:center!important}
    .photo-portrait{width:100px!important;height:125px!important}
    .lb-caption{font-size:1.05rem!important}
  }
  @media(max-width:380px){
    .cat-grid{grid-template-columns:repeat(2,1fr)!important}
    .stats-grid{grid-template-columns:1fr!important}
  }
`;

// ══════════════════════════════════════════════════════
// MICRO COMPONENTS
// ══════════════════════════════════════════════════════
const Lbl = ({ t }) => (
  <label style={{ display:"block", marginBottom:6, fontSize:".85rem", color:c.textSub, fontWeight:600 }}>{t}</label>
);
const Fld = ({ label, children, mb=14 }) => (
  <div style={{ marginBottom:mb }}><Lbl t={label}/>{children}</div>
);

const CatBadge = ({ catId, small }) => {
  const cat = ALL_CATEGORIES.find(x=>x.id===catId);
  if (!cat) return null;
  return (
    <span style={{ background:cat.bg, color:cat.color, border:`1px solid ${cat.border}`,
      borderRadius:20, padding:small?"2px 8px":"4px 11px",
      fontSize:small?".69rem":".75rem", fontWeight:700, whiteSpace:"nowrap", display:"inline-block" }}>
      {cat.label}
    </span>
  );
};

const TableAvatar = ({ photo }) => photo
  ? <img src={photo} style={{ width:34,height:34,borderRadius:"50%",objectFit:"cover",border:`2px solid ${c.border}` }}/>
  : <div style={{ width:34,height:34,borderRadius:"50%",background:c.cardSoft,border:`2px dashed ${c.border}`,
      display:"flex",alignItems:"center",justifyContent:"center" }}>
      <Camera size={13} color={c.textMuted}/>
    </div>;

const CrescentIcon = ({ size=22, color=c.green, flip=false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    style={{ transform:flip?"scaleX(-1)":"none", display:"inline-block", flexShrink:0 }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill={color}/>
  </svg>
);
const StarIcon = ({ size=14, color=c.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const IslamicPattern = () => (
  <svg width="100%" height="100%" style={{ position:"absolute",inset:0,opacity:.055,pointerEvents:"none" }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ip" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <polygon points="30,2 58,17 58,43 30,58 2,43 2,17" fill="none" stroke={c.green} strokeWidth="1"/>
        <polygon points="30,12 48,22 48,38 30,48 12,38 12,22" fill="none" stroke={c.green} strokeWidth=".5"/>
        <line x1="30" y1="2" x2="30" y2="12" stroke={c.green} strokeWidth=".5"/>
        <line x1="58" y1="17" x2="48" y2="22" stroke={c.green} strokeWidth=".5"/>
        <line x1="58" y1="43" x2="48" y2="38" stroke={c.green} strokeWidth=".5"/>
        <line x1="30" y1="58" x2="30" y2="48" stroke={c.green} strokeWidth=".5"/>
        <line x1="2"  y1="43" x2="12" y2="38" stroke={c.green} strokeWidth=".5"/>
        <line x1="2"  y1="17" x2="12" y2="22" stroke={c.green} strokeWidth=".5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ip)"/>
  </svg>
);

// ══════════════════════════════════════════════════════
// PHOTO UPLOAD (label-based — works on mobile & PC)
// ══════════════════════════════════════════════════════
const PhotoField = ({ value, onChange, uid="pf" }) => {
  const [drag, setDrag] = useState(false);
  const inputId = `photo-upload-${uid}`;
  const readFile = f => {
    if (!f || !f.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => onChange(e.target.result);
    r.readAsDataURL(f);
  };
  return (
    <div style={{ marginBottom:20 }}>
      <Lbl t={<>الصورة الشخصية <span style={{ fontWeight:400, fontSize:".78rem", color:c.textMuted }}>(اختياري)</span></>}/>
      <input id={inputId} type="file" accept="image/*"
        style={{ position:"absolute", width:1, height:1, opacity:0, overflow:"hidden", zIndex:-1 }}
        onChange={e=>{ const f=e.target.files&&e.target.files[0]; if(f) readFile(f); e.target.value=""; }}/>
      <div style={{ display:"flex", gap:18, alignItems:"flex-start", flexWrap:"wrap" }}>
        <label htmlFor={inputId}
          onDragOver={e=>{e.preventDefault();setDrag(true);}}
          onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);readFile(e.dataTransfer.files[0]);}}
          className="photo-portrait" style={{ width:112,height:140,borderRadius:10,flexShrink:0,overflow:"hidden",
            border:`2px dashed ${drag||value?c.green:c.border}`,
            background:drag?c.greenPale:c.cardSoft, cursor:"pointer",
            position:"relative",transition:"all .2s",display:"block",
            boxShadow:value?`0 0 0 3px ${c.greenPale}`:"0 0 0 0 transparent" }}>
          {value ? (
            <>
              <img src={value} alt="preview" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }}/>
              <div style={{ position:"absolute",inset:0,background:"rgba(10,40,20,.42)",
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                opacity:0,transition:"opacity .2s" }}
                onMouseEnter={e=>e.currentTarget.style.opacity=1}
                onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                <Camera size={20} color="#fff"/>
                <span style={{ color:"#fff",fontSize:".72rem",marginTop:4,fontWeight:600 }}>تغيير</span>
              </div>
            </>
          ) : (
            <div style={{ height:"100%",display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",gap:7,padding:10 }}>
              <svg width="50" height="54" viewBox="0 0 52 56" fill="none">
                <circle cx="26" cy="18" r="12" fill={c.border}/>
                <path d="M2 52c0-13.25 10.75-24 24-24s24 10.75 24 24" fill={c.border}/>
              </svg>
              <Camera size={14} color={c.textMuted}/>
              <span style={{ color:c.textMuted,fontSize:".7rem",textAlign:"center",lineHeight:1.5 }}>اضغط أو<br/>اسحب صورة</span>
            </div>
          )}
        </label>
        <div style={{ flex:1,minWidth:150 }}>
          <div style={{ background:c.greenPale,border:`1px solid ${c.border}`,borderRadius:10,
            padding:"11px 13px",marginBottom:10 }}>
            <p style={{ color:c.teal,fontSize:".8rem",fontWeight:700,marginBottom:6 }}>متطلبات الصورة:</p>
            {["خلفية بيضاء أو فاتحة","وجه واضح بالكامل","حجم أقل من 5 ميغابايت","JPG أو PNG"].map(r=>(
              <div key={r} style={{ display:"flex",alignItems:"center",gap:6,marginBottom:3 }}>
                <div style={{ width:4,height:4,borderRadius:"50%",background:c.green,flexShrink:0 }}/>
                <span style={{ color:c.textSub,fontSize:".77rem" }}>{r}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
            <label htmlFor={inputId} className="btn-primary"
              style={{ justifyContent:"center",cursor:"pointer",userSelect:"none" }}>
              <Camera size={14}/> {value?"تغيير الصورة":"رفع صورة"}
            </label>
            {value && (
              <button type="button" className="btn-danger" onClick={()=>onChange(null)}>
                <X size={13}/> حذف الصورة
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// CATEGORIES PICKER (multi-select chips)
// ══════════════════════════════════════════════════════
const CatPicker = ({ value, onChange }) => (
  <div style={{ marginBottom:16 }}>
    <Lbl t={<>الفئات <span style={{ fontWeight:400,fontSize:".78rem",color:c.textMuted }}>(يمكن اختيار أكثر من فئة)</span></>}/>
    <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>
      {ALL_CATEGORIES.map(cat=>{
        const on = value.includes(cat.id);
        return (
          <button key={cat.id} type="button"
            onClick={()=>onChange(on?value.filter(x=>x!==cat.id):[...value,cat.id])}
            style={{ padding:"6px 14px",borderRadius:20,fontSize:".81rem",fontWeight:700,
              cursor:"pointer",transition:"all .15s",border:"1.5px solid",
              background:on?cat.bg:"#fff", color:on?cat.color:c.textMuted,
              borderColor:on?cat.border:c.border,
              boxShadow:on?`0 2px 8px ${cat.border}88`:"none",
              transform:on?"scale(1.03)":"scale(1)" }}>
            {on?"✓ ":""}{cat.label}
          </button>
        );
      })}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════
// CONFIRM DELETE MODAL
// ══════════════════════════════════════════════════════
const ConfirmModal = ({ msg, onConfirm, onCancel }) => (
  <div style={{ position:"fixed",inset:0,zIndex:2000,background:"rgba(10,30,15,.5)",
    backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
    <div className="card modal-in" style={{ width:"100%",maxWidth:380,padding:28,textAlign:"center" }}>
      <div style={{ width:52,height:52,borderRadius:"50%",background:"#fff5f5",
        border:`2px solid ${c.redBorder}`,display:"flex",alignItems:"center",
        justifyContent:"center",margin:"0 auto 16px" }}>
        <AlertTriangle size={24} color={c.red}/>
      </div>
      <h3 style={{ color:c.text,fontSize:"1.05rem",fontWeight:700,marginBottom:8 }}>تأكيد الحذف</h3>
      <p style={{ color:c.textMuted,fontSize:".88rem",marginBottom:22 }}>{msg}</p>
      <div style={{ display:"flex",gap:10,justifyContent:"center" }}>
        <button className="btn-danger" style={{ flex:1,justifyContent:"center" }} onClick={onConfirm}>
          <Trash2 size={14}/> نعم، احذف
        </button>
        <button className="btn-ghost" style={{ flex:1,justifyContent:"center" }} onClick={onCancel}>
          إلغاء
        </button>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════
// PHOTO LIGHTBOX
// ══════════════════════════════════════════════════════
const Lightbox = ({ src, name, onClose }) => (
  <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:4000,
    background:"rgba(0,0,0,.92)",
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    padding:16,backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",
    animation:"fadeIn .18s ease both" }}>
    {/* X close */}
    <button onClick={onClose} style={{ position:"absolute",top:16,right:16,
      background:"rgba(255,255,255,.16)",border:"none",borderRadius:"50%",
      width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",
      cursor:"pointer",color:"#fff",zIndex:1 }}><X size={22}/></button>

    {/* Photo — Instagram style: circular with glow */}
    <div onClick={e=>e.stopPropagation()} style={{ animation:"modalIn .25s ease both" }}>
      <img src={src} alt={name} style={{
        width:"min(320px,80vw)", height:"min(320px,80vw)",
        borderRadius:"50%",
        objectFit:"cover",
        border:"4px solid #fff",
        boxShadow:`0 0 0 3px ${c.goldLight}, 0 0 60px rgba(196,148,40,.45), 0 20px 60px rgba(0,0,0,.7)`,
        display:"block",
      }}/>
    </div>

    {/* Name */}
    <div className="lb-caption" style={{ marginTop:22,fontFamily:"'Amiri',serif",fontSize:"1.4rem",
      color:"#fff",textShadow:"0 2px 12px rgba(0,0,0,.8)",letterSpacing:".02em" }}>{name}</div>
    <p style={{ color:"rgba(255,255,255,.38)",fontSize:".76rem",marginTop:6 }}>
      اضغط في أي مكان للإغلاق
    </p>
  </div>
);

// ══════════════════════════════════════════════════════
// NEEDY DETAIL MODAL
// ══════════════════════════════════════════════════════
const NeedyModal = ({ person, onClose, revealedSecs, onReveal, onHide }) => {
  const [lb, setLb] = useState(false);
  return (
    <>
      {lb && person.photo && <Lightbox src={person.photo} name={`${person.firstName} ${person.lastName}`} onClose={()=>setLb(false)}/>}
      <div style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(10,30,15,.5)",
        backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}
        onClick={onClose}>
        <div className="card modal-in modal-box" style={{ width:"100%",maxWidth:440,padding:28,position:"relative",
          maxHeight:"92vh",overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
          <button onClick={onClose} style={{ position:"absolute",top:14,left:14,background:"none",
            border:"none",cursor:"pointer",color:c.textMuted,display:"flex" }}><X size={20}/></button>

          {/* Photo — Instagram tap-to-expand */}
          <div style={{ textAlign:"center",marginBottom:20 }}>
            {person.photo ? (
              <div style={{ position:"relative",display:"inline-block" }}
                onClick={()=>setLb(true)}>
                {/* Outer glow ring — like Instagram story */}
                <div style={{
                  width:116, height:116, borderRadius:"50%",
                  background:`linear-gradient(135deg, ${c.goldLight}, ${c.green}, ${c.teal})`,
                  padding:3, cursor:"pointer",
                  boxShadow:`0 0 0 2px #fff, 0 6px 24px ${c.shadow}`,
                  transition:"transform .2s, box-shadow .2s",
                  display:"inline-block",
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.06)"; e.currentTarget.style.boxShadow=`0 0 0 2px #fff, 0 10px 32px ${c.shadow}`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow=`0 0 0 2px #fff, 0 6px 24px ${c.shadow}`; }}>
                  <img src={person.photo} alt="صورة" style={{
                    width:"100%", height:"100%", borderRadius:"50%",
                    objectFit:"cover", display:"block",
                    border:"3px solid #fff",
                  }}/>
                </div>
                {/* Tap hint badge */}
                <div style={{ position:"absolute",bottom:4,right:4,
                  background:c.gold,borderRadius:"50%",width:26,height:26,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  border:"2px solid #fff",pointerEvents:"none",
                  boxShadow:"0 2px 8px rgba(0,0,0,.3)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>
            ) : (
              <div style={{ display:"inline-flex",width:110,height:110,borderRadius:"50%",
                background:c.cardSoft,border:`3px solid ${c.border}`,
                alignItems:"center",justifyContent:"center" }}>
                <Camera size={36} color={c.textMuted}/>
              </div>
            )}
            <h2 style={{ marginTop:14,fontFamily:"'Amiri',serif",fontSize:"1.5rem",color:c.teal }}>
              {person.firstName} {person.lastName}
            </h2>
            {person.photo && (
              <p style={{ color:c.textMuted,fontSize:".72rem",marginTop:3,
                display:"flex",alignItems:"center",justifyContent:"center",gap:4 }}>
                <span>👆</span> اضغط على الصورة لعرضها
              </p>
            )}
          </div>

          {/* Info rows */}
          {/* — Marital status & children — */}
          {[
            ["الحالة الزوجية", person.married?"متزوج / متزوجة":"غير متزوج / غير متزوجة", false],
            ["عدد الأولاد", person.children, false],
          ].map(([label,val,ltr])=>(
            <div key={label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"10px 2px",borderBottom:`1px solid ${c.border}` }}>
              <span style={{ color:c.textMuted,fontSize:".86rem" }}>{label}</span>
              <span style={{ fontWeight:700,direction:ltr?"ltr":"rtl",fontFamily:ltr?"monospace":"inherit",
                color:ltr?c.gold:c.text }}>{val}</span>
            </div>
          ))}

          {/* — CCP row — revealed only after timer — */}
          <div style={{ padding:"12px 2px",borderBottom:`1px solid ${c.border}` }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",gap:10 }}>
              <span style={{ color:c.textMuted,fontSize:".86rem" }}>رقم حساب CCP</span>
              {revealedSecs > 0 ? (
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  {/* CCP number */}
                  <span style={{ fontWeight:700,fontFamily:"monospace",color:c.gold,
                    fontSize:"1rem",letterSpacing:".04em",direction:"ltr" }}>
                    {person.ccp}
                  </span>
                  {/* Countdown pill */}
                  <span style={{ background:"#fff3d8",border:"1px solid #e8c868",
                    color:"#9a6010",borderRadius:20,padding:"2px 10px",
                    fontSize:".76rem",fontWeight:700,whiteSpace:"nowrap",minWidth:52,textAlign:"center" }}>
                    {Math.floor(revealedSecs/60)}:{String(revealedSecs%60).padStart(2,"0")}
                  </span>
                  {/* Hide manually */}
                  <button type="button" title="إخفاء"
                    style={{ background:"none",border:"none",cursor:"pointer",
                      color:c.textMuted,display:"flex",padding:2 }}
                    onClick={onHide}>
                    <EyeOff size={15}/>
                  </button>
                </div>
              ) : (
                <button type="button"
                  onClick={onReveal}
                  style={{ background:c.greenPale,border:`1.5px solid ${c.green}`,
                    color:c.green,borderRadius:8,padding:"5px 14px",cursor:"pointer",
                    fontFamily:"'Cairo',sans-serif",fontSize:".83rem",fontWeight:700,
                    display:"flex",alignItems:"center",gap:5,transition:"all .18s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=c.green;e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor=c.green;}}
                  onMouseLeave={e=>{e.currentTarget.style.background=c.greenPale;e.currentTarget.style.color=c.green;}}
                  >
                  <Eye size={14}/> عرض الرقم
                </button>
              )}
            </div>
            {revealedSecs > 0 && (
              <div style={{ marginTop:7,fontSize:".75rem",color:c.textMuted,
                display:"flex",alignItems:"center",gap:5 }}>
                <span>⏱</span>
                سيُخفى الرقم تلقائياً وتُنزَّل صورة الإيصال عند انتهاء الوقت
              </div>
            )}
          </div>

          {/* Categories */}
          {(person.categories||[]).length>0 && (
            <div style={{ padding:"12px 2px" }}>
              <div style={{ color:c.textMuted,fontSize:".84rem",marginBottom:8,fontWeight:600 }}>الفئات</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                {person.categories.map(id=><CatBadge key={id} catId={id}/>)}
              </div>
            </div>
          )}

          <button className="btn-ghost" style={{ width:"100%",justifyContent:"center",marginTop:16 }} onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </>
  );
};

// ══════════════════════════════════════════════════════
// PERSON FORM (add / edit — shared)
// ══════════════════════════════════════════════════════
const PersonForm = ({ initial, onSave, onCancel, title }) => {
  const [form, setForm] = useState(initial || EMPTY_PERSON);
  const [msg, setMsg] = useState({ t:"", type:"" });

  const save = () => {
    if (!form.firstName||!form.lastName||!form.ccp) {
      setMsg({ t:"يرجى تعبئة الحقول الإلزامية (الاسم، اللقب، CCP)", type:"e" }); return;
    }
    onSave({ ...form, children:Number(form.children)||0 });
  };

  return (
    <div className="slide-up">
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18 }}>
        <h3 style={{ color:c.teal,fontFamily:"'Amiri',serif",fontSize:"1.15rem",display:"flex",alignItems:"center",gap:8 }}>
          <UserPlus size={18} color={c.green}/> {title}
        </h3>
        {onCancel && (
          <button className="btn-icon" onClick={onCancel}><X size={16}/></button>
        )}
      </div>

      <PhotoField value={form.photo} onChange={v=>setForm({...form,photo:v})} uid={form.id||"new"}/>

      <div className="form-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12 }}>
        <Fld label="الاسم *">
          <input className="input" placeholder="الاسم الأول" value={form.firstName}
            onChange={e=>setForm({...form,firstName:e.target.value})}/>
        </Fld>
        <Fld label="اللقب *">
          <input className="input" placeholder="اللقب العائلي" value={form.lastName}
            onChange={e=>setForm({...form,lastName:e.target.value})}/>
        </Fld>
        <Fld label="رقم CCP *">
          <input className="input" placeholder="XXXXXXXXXX" value={form.ccp}
            onChange={e=>setForm({...form,ccp:e.target.value})}/>
        </Fld>
        <Fld label="الحالة الزوجية">
          <select className="select" value={form.married?"y":"n"}
            onChange={e=>setForm({...form,married:e.target.value==="y"})}>
            <option value="y">متزوج / متزوجة</option>
            <option value="n">غير متزوج / غير متزوجة</option>
          </select>
        </Fld>
        <Fld label="عدد الأولاد">
          <input className="input" type="number" min="0" placeholder="0" value={form.children}
            onChange={e=>setForm({...form,children:e.target.value})}/>
        </Fld>
      </div>

      <CatPicker value={form.categories} onChange={cats=>setForm({...form,categories:cats})}/>

      {msg.t && <div className={`alert-${msg.type}`}>{msg.t}</div>}

      <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
        <button className="btn-primary" onClick={save}>
          <CheckCircle size={15}/> {initial?.id?"حفظ التعديلات":"تسجيل الحالة"}
        </button>
        {onCancel && (
          <button className="btn-ghost" onClick={onCancel}>إلغاء</button>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// QUICK SEARCH OVERLAY
// ══════════════════════════════════════════════════════
const QuickSearch = ({ needy, onSelect, onClose }) => {
  const [q, setQ] = useState("");
  const results = q.trim().length < 1 ? [] :
    needy.filter(n=>`${n.firstName} ${n.lastName} ${n.ccp}`.includes(q.trim())).slice(0,6);

  return (
    <div className="qs-overlay" onClick={onClose}>
      <div style={{ width:"100%",maxWidth:520 }} onClick={e=>e.stopPropagation()}>
        <div className="card" style={{ padding:0,overflow:"hidden" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 18px",
            borderBottom:`1px solid ${c.border}` }}>
            <Search size={18} color={c.green}/>
            <input autoFocus className="input"
              style={{ border:"none",background:"transparent",fontSize:"1rem",padding:"0",boxShadow:"none",flex:1 }}
              placeholder="ابحث بالاسم أو رقم CCP..."
              value={q} onChange={e=>setQ(e.target.value)}/>
            <button className="btn-icon" onClick={onClose}><X size={16}/></button>
          </div>
          {results.length===0 && q.trim().length>0 && (
            <div style={{ padding:"28px",textAlign:"center",color:c.textMuted,fontSize:".9rem" }}>
              لا توجد نتائج لـ "{q}"
            </div>
          )}
          {results.length===0 && q.trim().length===0 && (
            <div style={{ padding:"22px",textAlign:"center",color:c.textMuted,fontSize:".85rem" }}>
              ابدأ الكتابة للبحث في قائمة المحتاجين...
            </div>
          )}
          {results.map(n=>(
            <div key={n.id} onClick={()=>{ onSelect(n); onClose(); }}
              style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 18px",
                cursor:"pointer",borderBottom:`1px solid ${c.border}`,transition:"background .15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=c.greenPale}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <TableAvatar photo={n.photo}/>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700,color:c.text }}>{n.firstName} {n.lastName}</div>
                <div style={{ fontSize:".78rem",color:c.textMuted,fontFamily:"monospace" }}>{n.ccp}</div>
              </div>
              <div style={{ display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end",maxWidth:160 }}>
                {(n.categories||[]).slice(0,2).map(id=><CatBadge key={id} catId={id} small/>)}
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center",marginTop:10,color:"rgba(255,255,255,.5)",fontSize:".75rem" }}>
          ESC أو اضغط خارج النافذة للإغلاق
        </p>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// TOP BAR
// ══════════════════════════════════════════════════════
const TopBar = ({ subtitle, userName, role, onLogout, onSearch }) => (
  <div style={{ background:"#fff",borderBottom:`1.5px solid ${c.border}`,
    padding:"11px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",
    position:"sticky",top:0,zIndex:100,boxShadow:`0 2px 12px ${c.shadowSm}`,gap:8 }}>
    {/* Brand */}
    <div style={{ display:"flex",alignItems:"center",gap:9,minWidth:0 }}>
      <CrescentIcon size={20}/>
      <div style={{ minWidth:0 }}>
        <div style={{ fontFamily:"'Amiri',serif",color:c.teal,fontSize:"1.1rem",lineHeight:1,fontWeight:700,whiteSpace:"nowrap" }}>
          منصة سند الرقمية
        </div>
        {subtitle && <div style={{ color:c.textMuted,fontSize:".68rem",marginTop:1,whiteSpace:"nowrap" }}>{subtitle}</div>}
      </div>
    </div>
    {/* Actions */}
    <div style={{ display:"flex",alignItems:"center",gap:7,flexShrink:0 }}>
      {onSearch && (
        <button className="btn-ghost" onClick={onSearch}>
          <Search size={14}/>
          <span className="topbar-search-txt">بحث سريع</span>
        </button>
      )}
      {/* Session badge — hidden on small mobile */}
      <div className="topbar-session" style={{ display:"flex",alignItems:"center",gap:7,
        background:c.greenPale,borderRadius:9,padding:"6px 11px",border:`1px solid ${c.border}` }}>
        <div style={{ width:26,height:26,borderRadius:"50%",background:c.green,
          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ color:"#fff",fontSize:".7rem",fontWeight:700 }}>م</span>
        </div>
        <div style={{ lineHeight:1.2 }}>
          <div style={{ fontSize:".76rem",fontWeight:700,color:c.text,whiteSpace:"nowrap" }}>{userName||"مسؤول"}</div>
          <div style={{ fontSize:".66rem",color:c.textMuted }}>{role==="admin"?"مسؤول النظام":"مستخدم"}</div>
        </div>
      </div>
      <button className="btn-ghost" onClick={onLogout} style={{ padding:"7px 12px" }}>
        <LogOut size={14}/>
        <span className="topbar-search-txt">خروج</span>
      </button>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════
const LoginScreen = ({ onLogin }) => {
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const [show,setShow]=useState(false); const [err,setErr]=useState("");
  const [forgot,setForgot]=useState(false);
  const [fpEmail,setFpEmail]=useState(""); const [fpPass,setFpPass]=useState(""); const [fpMsg,setFpMsg]=useState("");

  const go = () => {
    setErr("");
    if (!email||!pass) { setErr("يرجى تعبئة جميع الحقول"); return; }
    onLogin(email.trim(), pass.trim(), setErr);
  };

  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      background:`linear-gradient(150deg,#cde8d8 0%,#e6f4ec 45%,#f0f5f2 100%)`,
      padding:16,position:"relative",overflow:"hidden" }}>
      <IslamicPattern/>
      <div className="card fade-in" style={{ width:"100%",maxWidth:430,padding:38,position:"relative",zIndex:1,
        boxShadow:`0 10px 44px ${c.shadow}` }}>
        <div style={{ textAlign:"center",marginBottom:30 }}>
          <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:10,marginBottom:12 }}>
            <CrescentIcon size={26}/> <StarIcon size={17}/> <CrescentIcon size={26} flip/>
          </div>
          <h1 style={{ fontFamily:"'Amiri',serif",fontSize:"2.15rem",color:c.teal,lineHeight:1.2 }}>
            منصة سند الرقمية
          </h1>
          <p style={{ color:c.textSub,fontSize:".9rem",marginTop:7,fontWeight:600 }}>بلدية الوادي — كوينين</p>
          <div style={{ width:55,height:3,background:`linear-gradient(90deg,${c.green},${c.gold})`,
            borderRadius:2,margin:"13px auto 0" }}/>
        </div>

        {!forgot ? (
          <>
            <Fld label="البريد الإلكتروني">
              <input className="input" type="email" placeholder="أدخل بريدك الإلكتروني"
                value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/>
            </Fld>
            <Fld label="كلمة المرور">
              <div style={{ position:"relative" }}>
                <input className="input" type={show?"text":"password"} placeholder="••••••"
                  value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}
                  style={{ paddingLeft:42 }}/>
                <button onClick={()=>setShow(!show)} style={{ position:"absolute",left:12,top:"50%",
                  transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:c.textMuted,display:"flex" }}>
                  {show?<EyeOff size={17}/>:<Eye size={17}/>}
                </button>
              </div>
            </Fld>
            {err && <div className="alert-e">{err}</div>}
            <button className="btn-primary" style={{ width:"100%",justifyContent:"center",marginBottom:14,fontSize:"1rem",padding:"12px" }} onClick={go}>
              تسجيل الدخول
            </button>
            <div style={{ textAlign:"center" }}>
              <button onClick={()=>{setForgot(true);setErr("");}}
                style={{ background:"none",border:"none",color:c.gold,cursor:"pointer",
                  fontFamily:"'Cairo',sans-serif",fontSize:".87rem",textDecoration:"underline dotted",fontWeight:600 }}>
                هل نسيت كلمة المرور؟
              </button>
            </div>
          </>
        ) : (
          <div className="fade-in">
            <h3 style={{ color:c.teal,marginBottom:16,fontWeight:700,textAlign:"center",fontFamily:"'Amiri',serif",fontSize:"1.2rem" }}>
              استعادة كلمة المرور
            </h3>
            <Fld label="البريد الإلكتروني">
              <input className="input" type="email" placeholder="أدخل بريدك" value={fpEmail} onChange={e=>setFpEmail(e.target.value)}/>
            </Fld>
            <Fld label="كلمة المرور الجديدة">
              <input className="input" type="password" placeholder="كلمة مرور جديدة" value={fpPass} onChange={e=>setFpPass(e.target.value)}/>
            </Fld>
            {fpMsg && <div className="alert-s">{fpMsg}</div>}
            <button className="btn-primary" style={{ width:"100%",justifyContent:"center",marginBottom:10 }}
              onClick={()=>{ if(!fpEmail||!fpPass) return; setFpMsg("تم إرسال رابط إعادة التعيين إلى بريدك ✓"); }}>
              تحديث كلمة المرور
            </button>
            <button className="btn-ghost" style={{ width:"100%",justifyContent:"center" }}
              onClick={()=>{setForgot(false);setFpMsg("");setFpEmail("");setFpPass("");}}>
              ← العودة لتسجيل الدخول
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// ADMIN — NEEDY TAB
// ══════════════════════════════════════════════════════
const NeedyTab = ({ needy, setNeedy }) => {
  const [view, setView] = useState("table"); // table | grid
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [detailPerson, setDetailPerson] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = needy.filter(n=>{
    const matchQ = `${n.firstName} ${n.lastName} ${n.ccp}`.includes(search);
    const matchCat = !catFilter||(n.categories||[]).includes(catFilter);
    return matchQ && matchCat;
  });

  const handleSave = form => {
    if (editId) {
      setNeedy(needy.map(n=>n.id===editId?{...form,id:editId}:n));
      setEditId(null);
    } else {
      setNeedy([...needy,{...form,id:Date.now()}]);
      setShowForm(false);
    }
  };

  const handleDelete = id => {
    setNeedy(needy.filter(n=>n.id!==id));
    setDeleteTarget(null);
  };

  const exportCSV = () => {
    const rows = [["#","الاسم","اللقب","CCP","الحالة الزوجية","الأولاد","الفئات"]];
    needy.forEach((n,i)=>rows.push([
      i+1, n.firstName, n.lastName, n.ccp,
      n.married?"متزوج":"غير متزوج", n.children,
      (n.categories||[]).map(id=>ALL_CATEGORIES.find(x=>x.id===id)?.label||id).join(" | ")
    ]));
    const csv = "\uFEFF" + rows.map(r=>r.map(v=>`"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "قائمة_المحتاجين.csv";
    a.click();
  };

  return (
    <div className="fade-in">
      {detailPerson && <NeedyModal person={detailPerson} onClose={()=>setDetailPerson(null)}/>}
      {deleteTarget && (
        <ConfirmModal
          msg={`هل تريد حذف "${deleteTarget.firstName} ${deleteTarget.lastName}" من القائمة؟ لا يمكن التراجع.`}
          onConfirm={()=>handleDelete(deleteTarget.id)}
          onCancel={()=>setDeleteTarget(null)}/>
      )}

      {/* Add / Edit form */}
      {(showForm || editId) && (
        <div className="card" style={{ padding:24,marginBottom:20 }}>
          <PersonForm
            title={editId?"تعديل بيانات المحتاج":"تسجيل حالة جديدة"}
            initial={editId?needy.find(n=>n.id===editId):null}
            onSave={handleSave}
            onCancel={()=>{ setShowForm(false); setEditId(null); }}/>
        </div>
      )}

      {/* Controls bar */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
        flexWrap:"wrap",gap:10,marginBottom:14 }}>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap",alignItems:"center" }}>
          <div style={{ position:"relative" }}>
            <Search size={14} style={{ position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",color:c.textMuted }}/>
            <input className="input" placeholder="بحث..." value={search}
              onChange={e=>setSearch(e.target.value)} style={{ paddingRight:34,width:190 }}/>
          </div>
          <select className="select" style={{ width:175 }} value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
            <option value="">كل الفئات</option>
            {ALL_CATEGORIES.map(cat=>(
              <option key={cat.id} value={cat.id}>{cat.label} ({needy.filter(n=>(n.categories||[]).includes(cat.id)).length})</option>
            ))}
          </select>
          {catFilter && (
            <button className="btn-ghost" style={{ padding:"7px 10px" }} onClick={()=>setCatFilter("")}>
              <X size={13}/>
            </button>
          )}
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <button className="btn-ghost" onClick={exportCSV} style={{ gap:6 }}>
            <FileDown size={14}/> تصدير CSV
          </button>
          <button className="btn-icon" title="عرض جدول"
            style={{ background:view==="table"?c.greenPale:"#fff", borderColor:view==="table"?c.green:c.border, color:view==="table"?c.green:c.textMuted }}
            onClick={()=>setView("table")}><List size={16}/></button>
          <button className="btn-icon" title="عرض بطاقات"
            style={{ background:view==="grid"?c.greenPale:"#fff", borderColor:view==="grid"?c.green:c.border, color:view==="grid"?c.green:c.textMuted }}
            onClick={()=>setView("grid")}><LayoutGrid size={16}/></button>
          {!showForm && !editId && (
            <button className="btn-primary" onClick={()=>setShowForm(true)}>
              <Plus size={15}/> إضافة
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div style={{ marginBottom:10,fontSize:".82rem",color:c.textMuted }}>
        {filtered.length} نتيجة من {needy.length} مسجل
      </div>

      {/* TABLE VIEW */}
      {view==="table" && (
        <div className="card" style={{ overflow:"hidden" }}>
          {filtered.length===0
            ? <div style={{ padding:36,textAlign:"center",color:c.textMuted }}>لا توجد نتائج</div>
            : (
              <div style={{ overflowX:"auto" }}>
                <table>
                  <thead>
                    <tr><th>#</th><th>الصورة</th><th>الاسم الكامل</th><th>رقم CCP</th><th>الحالة الزوجية</th><th>الفئات</th><th>الأولاد</th><th>إجراءات</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map((n,i)=>(
                      <tr key={n.id}>
                        <td style={{ color:c.textMuted }}>{i+1}</td>
                        <td><TableAvatar photo={n.photo}/></td>
                        <td>
                          <span className="row-link" onClick={()=>setDetailPerson(n)}>
                            {n.firstName} {n.lastName}
                          </span>
                        </td>
                        <td style={{ direction:"ltr",textAlign:"right",fontFamily:"monospace",color:c.gold,fontWeight:600 }}>{n.ccp}</td>
                        <td style={{ fontSize:".82rem",color:c.textSub,fontWeight:600 }}>{n.married?"متزوج":"غير متزوج"}</td>
                        <td>
                          <div style={{ display:"flex",flexWrap:"wrap",gap:3 }}>
                            {(n.categories||[]).slice(0,2).map(id=><CatBadge key={id} catId={id} small/>)}
                            {(n.categories||[]).length>2 && (
                              <span style={{ color:c.textMuted,fontSize:".7rem",alignSelf:"center" }}>+{n.categories.length-2}</span>
                            )}
                          </div>
                        </td>
                        <td style={{ fontWeight:600 }}>{n.children}</td>
                        <td>
                          <div style={{ display:"flex",gap:5 }}>
                            <button className="btn-icon" title="تعديل"
                              onClick={()=>{ setEditId(n.id); setShowForm(false); }}>
                              <Edit2 size={14}/>
                            </button>
                            <button className="btn-icon red" title="حذف"
                              onClick={()=>setDeleteTarget(n)}>
                              <Trash2 size={14}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      )}

      {/* GRID / CARD VIEW */}
      {view==="grid" && (
        filtered.length===0
          ? <div className="card" style={{ padding:36,textAlign:"center",color:c.textMuted }}>لا توجد نتائج</div>
          : (
            <div className="persons-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:14 }}>
              {filtered.map(n=>(
                <div key={n.id} className="pcard">
                  {/* Header */}
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    {n.photo
                      ? <img src={n.photo} style={{ width:46,height:46,borderRadius:"50%",objectFit:"cover",border:`2px solid ${c.border}`,flexShrink:0 }}/>
                      : <div style={{ width:46,height:46,borderRadius:"50%",background:c.cardSoft,border:`2px dashed ${c.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                          <Camera size={16} color={c.textMuted}/>
                        </div>
                    }
                    <div style={{ minWidth:0 }}>
                      <div className="row-link" style={{ fontSize:".9rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}
                        onClick={()=>setDetailPerson(n)}>
                        {n.firstName} {n.lastName}
                      </div>
                      <div style={{ fontFamily:"monospace",fontSize:".76rem",color:c.gold,marginTop:1 }}>{n.ccp}</div>
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ display:"flex",justifyContent:"space-between",fontSize:".78rem",color:c.textSub,
                    background:c.cardSoft,borderRadius:8,padding:"6px 10px" }}>
                    <span>{n.married?"متزوج":"غير متزوج"}</span>
                    <span>{n.children} أولاد</span>
                  </div>
                  {/* Categories */}
                  {(n.categories||[]).length>0 && (
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
                      {n.categories.map(id=><CatBadge key={id} catId={id} small/>)}
                    </div>
                  )}
                  {/* Actions */}
                  <div style={{ display:"flex",gap:6,marginTop:2 }}>
                    <button className="btn-ghost" style={{ flex:1,justifyContent:"center",fontSize:".8rem",padding:"6px 8px" }}
                      onClick={()=>{ setEditId(n.id); setShowForm(false); setView("table"); }}>
                      <Edit2 size={13}/> تعديل
                    </button>
                    <button className="btn-icon red" onClick={()=>setDeleteTarget(n)}>
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
      )}

      {/* FAB */}
      {!showForm && !editId && (
        <button className="fab" onClick={()=>{ setShowForm(true); window.scrollTo({top:0,behavior:"smooth"}); }}>
          <Plus size={24} color="#fff"/>
          <span className="fab-tooltip">إضافة حالة جديدة</span>
        </button>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════
// ADMIN — USERS TAB
// ══════════════════════════════════════════════════════
const UsersTab = ({ users, setUsers }) => {
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [msg,setMsg]=useState({t:"",type:""});
  const [delTarget,setDelTarget]=useState(null);

  const add = () => {
    if(!form.name||!form.email||!form.password){setMsg({t:"يرجى تعبئة جميع الحقول",type:"e"});return;}
    if(users.find(u=>u.email===form.email)){setMsg({t:"البريد مستخدم مسبقاً",type:"e"});return;}
    setUsers([...users,{id:Date.now(),...form}]);
    setForm({name:"",email:"",password:""});
    setMsg({t:"تم إضافة المستخدم بنجاح ✓",type:"s"});
    setTimeout(()=>setMsg({t:"",type:""}),3000);
  };

  return (
    <div className="fade-in">
      <div className="card" style={{ padding:24,marginBottom:20 }}>
        <h3 style={{ color:c.teal,marginBottom:16,fontFamily:"'Amiri',serif",fontSize:"1.1rem",display:"flex",alignItems:"center",gap:8 }}>
          <UserPlus size={17} color={c.green}/> إضافة مستخدم جديد
        </h3>
        <div className="form-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12 }}>
          <Fld label="الاسم الكامل">
            <input className="input" placeholder="الاسم" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          </Fld>
          <Fld label="البريد الإلكتروني">
            <input className="input" type="email" placeholder="example@mail.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          </Fld>
          <Fld label="كلمة المرور">
            <input className="input" type="password" placeholder="••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
          </Fld>
        </div>
        {msg.t && <div className={`alert-${msg.type}`}>{msg.t}</div>}
        <button className="btn-primary" onClick={add}><UserPlus size={15}/> حفظ المستخدم</button>
      </div>

      {delTarget && (
        <ConfirmModal
          msg={`هل تريد حذف حساب "${delTarget.name}"؟`}
          onConfirm={()=>{ setUsers(users.filter(u=>u.id!==delTarget.id)); setDelTarget(null); }}
          onCancel={()=>setDelTarget(null)}/>
      )}

      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ padding:"14px 18px",borderBottom:`1.5px solid ${c.border}` }}>
          <h3 style={{ color:c.teal,fontFamily:"'Amiri',serif",fontSize:"1.05rem",display:"flex",alignItems:"center",gap:8 }}>
            <Users size={16} color={c.green}/> الحسابات المسجلة ({users.length})
          </h3>
        </div>
        {users.length===0
          ? <div style={{ padding:32,textAlign:"center",color:c.textMuted }}>لا يوجد مستخدمون مضافون بعد</div>
          : (
            <div style={{ overflowX:"auto" }}>
              <table>
                <thead><tr><th>#</th><th>الاسم</th><th>البريد الإلكتروني</th><th>الحالة</th><th>حذف</th></tr></thead>
                <tbody>
                  {users.map((u,i)=>(
                    <tr key={u.id}>
                      <td style={{ color:c.textMuted }}>{i+1}</td>
                      <td style={{ fontWeight:600 }}>{u.name}</td>
                      <td style={{ direction:"ltr",textAlign:"right",fontFamily:"monospace",fontSize:".86rem",color:c.textSub }}>{u.email}</td>
                      <td><span className="badge-green">نشط</span></td>
                      <td>
                        <button className="btn-icon red" onClick={()=>setDelTarget(u)}><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// RECEIPTS TAB — admin review of donation proofs
// ══════════════════════════════════════════════════════
const ReceiptsTab = ({ receipts, setReceipts, needy }) => {
  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState("all"); // all | pending | accepted | rejected

  const update = (id, status) =>
    setReceipts(prev => prev.map(r => r.id===id ? {...r, status, reviewedAt: new Date().toLocaleString("ar-DZ")} : r));

  const remove = (id) => setReceipts(prev => prev.filter(r => r.id!==id));

  const filtered = filter==="all" ? receipts : receipts.filter(r=>r.status===filter);

  const statusLabel = s => ({ pending:"قيد المراجعة", accepted:"مقبول", rejected:"مرفوض" }[s]);
  const statusStyle = s => ({
    pending:  { bg:"#fff8dd", color:"#9a6010", border:"#e8c868" },
    accepted: { bg:"#edfaf2", color:"#1a6b3a", border:"#9adbb5" },
    rejected: { bg:"#fff4f4", color:c.red,     border:c.redBorder },
  }[s]);

  return (
    <div className="fade-in">
      {/* Image preview lightbox */}
      {preview && (
        <div onClick={()=>setPreview(null)} style={{ position:"fixed",inset:0,zIndex:4000,
          background:"rgba(0,0,0,.92)",display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(12px)" }}>
          <button onClick={()=>setPreview(null)} style={{ position:"absolute",top:16,right:16,
            background:"rgba(255,255,255,.15)",border:"none",borderRadius:"50%",
            width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",
            cursor:"pointer",color:"#fff" }}><X size={22}/></button>
          <img src={preview.img} alt="إثبات" onClick={e=>e.stopPropagation()} style={{
            maxWidth:"min(560px,92vw)",maxHeight:"78vh",objectFit:"contain",
            borderRadius:14,border:"3px solid #fff",
            boxShadow:"0 0 60px rgba(255,255,255,.12),0 24px 60px rgba(0,0,0,.7)",
            animation:"modalIn .22s ease both" }}/>
          <div style={{ marginTop:16,color:"rgba(255,255,255,.7)",fontSize:".85rem",
            fontFamily:"'Cairo',sans-serif",textAlign:"center" }}>
            {preview.donorName} ← {preview.needyName} · {preview.date}
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div style={{ display:"flex",gap:8,marginBottom:18,flexWrap:"wrap",alignItems:"center" }}>
        {["all","pending","accepted","rejected"].map(f=>(
          <button key={f} className={`tab ${filter===f?"tab-active":"tab-inactive"}`}
            onClick={()=>setFilter(f)} style={{ fontSize:".82rem",padding:"7px 14px" }}>
            {f==="all"?"الكل":statusLabel(f)}
            <span style={{ marginRight:4,fontWeight:700 }}>
              ({f==="all"?receipts.length:receipts.filter(r=>r.status===f).length})
            </span>
          </button>
        ))}
      </div>

      {filtered.length===0 ? (
        <div className="card" style={{ padding:48,textAlign:"center" }}>
          <FileDown size={40} color={c.border} style={{ margin:"0 auto 12px",display:"block" }}/>
          <p style={{ color:c.textMuted,fontSize:".92rem" }}>
            {filter==="all" ? "لم يُرسل أي إثبات تبرع بعد" : "لا توجد إثباتات في هذه الفئة"}
          </p>
        </div>
      ) : (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14 }}>
          {filtered.map(r=>{
            const ss = statusStyle(r.status);
            const person = needy.find(n=>n.id===r.needyId);
            return (
              <div key={r.id} className="card" style={{ overflow:"hidden",
                border:`1.5px solid ${ss.border}`,transition:"box-shadow .18s" }}>
                {/* Status bar */}
                <div style={{ background:ss.bg,padding:"7px 14px",
                  display:"flex",justifyContent:"space-between",alignItems:"center",
                  borderBottom:`1px solid ${ss.border}` }}>
                  <span style={{ fontSize:".78rem",fontWeight:700,color:ss.color }}>
                    {statusLabel(r.status)}
                  </span>
                  <span style={{ fontSize:".74rem",color:c.textMuted }}>{r.date}</span>
                </div>

                {/* Receipt image */}
                <div style={{ position:"relative",cursor:"pointer",overflow:"hidden",height:160,
                  background:c.cardSoft }} onClick={()=>setPreview(r)}>
                  <img src={r.img} alt="إثبات" style={{
                    width:"100%",height:"100%",objectFit:"cover",display:"block",
                    transition:"transform .2s" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                  <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.3)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    opacity:0,transition:"opacity .2s" }}
                    onMouseEnter={e=>e.currentTarget.style.opacity=1}
                    onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                    <Search size={28} color="#fff"/>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding:"12px 14px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                    <div>
                      <div style={{ fontSize:".82rem",color:c.textMuted }}>المتبرع</div>
                      <div style={{ fontWeight:700,fontSize:".9rem" }}>{r.donorName}</div>
                    </div>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:".82rem",color:c.textMuted }}>المستفيد</div>
                      <div style={{ fontWeight:700,fontSize:".9rem",color:c.teal }}>
                        {person ? `${person.firstName} ${person.lastName}` : "—"}
                      </div>
                    </div>
                  </div>
                  {r.reviewedAt && (
                    <div style={{ fontSize:".74rem",color:c.textMuted,marginBottom:8 }}>
                      تمت المراجعة: {r.reviewedAt}
                    </div>
                  )}

                  {/* Actions */}
                  {r.status==="pending" ? (
                    <div style={{ display:"flex",gap:8 }}>
                      <button className="btn-primary" style={{ flex:1,justifyContent:"center",
                        fontSize:".82rem",padding:"7px 10px",gap:5 }}
                        onClick={()=>update(r.id,"accepted")}>
                        <CheckCircle size={14}/> قبول
                      </button>
                      <button className="btn-danger" style={{ flex:1,justifyContent:"center",
                        fontSize:".82rem",padding:"7px 10px" }}
                        onClick={()=>update(r.id,"rejected")}>
                        <X size={14}/> رفض
                      </button>
                    </div>
                  ) : (
                    <div style={{ display:"flex",gap:8 }}>
                      <button className="btn-ghost" style={{ flex:1,justifyContent:"center",
                        fontSize:".8rem",padding:"6px 10px" }}
                        onClick={()=>update(r.id,"pending")}>
                        إعادة للمراجعة
                      </button>
                      <button className="btn-icon red" onClick={()=>remove(r.id)}>
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════════════════
const AdminDashboard = ({ users, setUsers, needy, setNeedy, receipts, setReceipts, onLogout }) => {
  const [tab, setTab] = useState("needy");
  const [qs, setQs] = useState(false);
  const [qsSelected, setQsSelected] = useState(null);

  return (
    <div style={{ minHeight:"100vh",background:c.bg }}>
      {qs && <QuickSearch needy={needy} onSelect={setQsSelected} onClose={()=>setQs(false)}/>}
      {qsSelected && <NeedyModal person={qsSelected} onClose={()=>setQsSelected(null)}/>}
      <TopBar subtitle="لوحة تحكم المسؤول" userName="مسؤول النظام" role="admin"
        onLogout={onLogout} onSearch={()=>setQs(true)}/>

      <div style={{ maxWidth:1000,margin:"0 auto",padding:"24px 16px" }}>
        {/* Stats */}
        <div className="stats-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:22 }}>
          {[
            { label:"المستخدمون", value:users.length, color:c.teal, icon:<Users size={18}/> },
            { label:"المحتاجون", value:needy.length, color:c.gold, icon:<BookOpen size={18}/> },
            { label:"المرضى", value:needy.filter(n=>(n.categories||[]).some(id=>["chronic","surgical"].includes(id))).length, color:"#8a3010", icon:<Heart size={18}/> },
            { label:"الأرامل والمطلقات", value:needy.filter(n=>(n.categories||[]).some(id=>["widow","divorced"].includes(id))).length, color:"#304060", icon:<ShieldCheck size={18}/> },
            { label:"إثباتات التبرع", value:receipts.length, color:"#7a1a40", icon:<FileDown size={18}/> },
          ].map(s=>(
            <div key={s.label} style={{ background:"#fff",border:`1.5px solid ${c.border}`,borderRadius:14,
              padding:"16px 18px",display:"flex",alignItems:"center",gap:12,
              boxShadow:`0 2px 10px ${c.shadowSm}` }}>
              <div style={{ color:s.color,opacity:.85 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:"1.7rem",fontWeight:700,color:s.color,lineHeight:1 }}>{s.value}</div>
                <div style={{ color:c.textMuted,fontSize:".78rem",marginTop:3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs-row" style={{ display:"flex",gap:9,marginBottom:22,flexWrap:"wrap" }}>
          <button className={`tab ${tab==="needy"?"tab-active":"tab-inactive"}`} onClick={()=>setTab("needy")}>
            <BookOpen size={15}/> إدارة المحتاجين
          </button>
          <button className={`tab ${tab==="users"?"tab-active":"tab-inactive"}`} onClick={()=>setTab("users")}>
            <Users size={15}/> إدارة المستخدمين
          </button>
          <button className={`tab ${tab==="receipts"?"tab-active":"tab-inactive"}`} onClick={()=>setTab("receipts")}
            style={{ position:"relative" }}>
            <FileDown size={15}/> إثباتات التبرع
            {receipts.filter(r=>r.status==="pending").length>0 && (
              <span style={{ position:"absolute",top:-6,left:-6,background:c.red,color:"#fff",
                borderRadius:"50%",width:18,height:18,fontSize:".68rem",fontWeight:700,
                display:"flex",alignItems:"center",justifyContent:"center",
                border:"2px solid #fff" }}>
                {receipts.filter(r=>r.status==="pending").length}
              </span>
            )}
          </button>
        </div>

        {tab==="needy"    && <NeedyTab needy={needy} setNeedy={setNeedy}/>}
        {tab==="users"    && <UsersTab users={users} setUsers={setUsers}/>}
        {tab==="receipts" && <ReceiptsTab receipts={receipts} setReceipts={setReceipts} needy={needy}/>}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// CCP REVEAL — timer + auto-download receipt
// ══════════════════════════════════════════════════════
const REVEAL_SECONDS = 120; // 2 minutes

const useCCPReveal = () => {
  const [revealed, setRevealed] = useState({}); // { [id]: secondsLeft }

  const reveal = (person) => {
    // Start countdown
    setRevealed(prev => ({ ...prev, [person.id]: REVEAL_SECONDS }));

    // Tick every second
    const interval = setInterval(() => {
      setRevealed(prev => {
        const left = (prev[person.id] || 0) - 1;
        if (left <= 0) {
          clearInterval(interval);
          // Auto-download receipt image when timer ends
          downloadReceipt(person);
          const next = { ...prev };
          delete next[person.id];
          return next;
        }
        return { ...prev, [person.id]: left };
      });
    }, 1000);
  };

  const hide = (id) => {
    setRevealed(prev => { const n={...prev}; delete n[id]; return n; });
  };

  return { revealed, reveal, hide };
};

const downloadReceipt = (person) => {
  // Build a clean receipt canvas
  const canvas = document.createElement("canvas");
  canvas.width  = 520;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#f0f5f2";
  ctx.fillRect(0,0,520,300);

  // Green header bar
  ctx.fillStyle = "#2e7d50";
  ctx.fillRect(0,0,520,70);

  // Header text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px Arial";
  ctx.textAlign = "center";
  ctx.fillText("منصة سند الرقمية", 260, 32);
  ctx.font = "14px Arial";
  ctx.fillText("بلدية الوادي — كوينين", 260, 54);

  // Title
  ctx.fillStyle = "#1a6b5a";
  ctx.font = "bold 16px Arial";
  ctx.fillText("إيصال التبرع", 260, 100);

  // Divider
  ctx.strokeStyle = "#c8ddd0";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(40,115); ctx.lineTo(480,115); ctx.stroke();

  // Info rows
  const rows = [
    ["المستفيد",  `${person.firstName} ${person.lastName}`],
    ["رقم CCP",   person.ccp],
    ["التاريخ",   new Date().toLocaleDateString("ar-DZ")],
    ["الوقت",     new Date().toLocaleTimeString("ar-DZ")],
  ];
  ctx.textAlign = "right";
  rows.forEach(([label, val], i) => {
    const y = 148 + i * 36;
    ctx.fillStyle = "#7a9e85";
    ctx.font = "13px Arial";
    ctx.fillText(label, 460, y);
    ctx.fillStyle = "#1c2e22";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "left";
    ctx.fillText(val, 60, y);
    ctx.textAlign = "right";
  });

  // Footer
  ctx.fillStyle = "#9a7220";
  ctx.font = "11px Arial";
  ctx.textAlign = "center";
  ctx.fillText("هذا الإيصال دليل على اطلاعك على رقم الحساب — احتفظ به", 260, 278);

  // Download
  const link = document.createElement("a");
  link.download = `إيصال_سند_${person.firstName}_${person.lastName}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};

// ══════════════════════════════════════════════════════
// USER INTERFACE
// ══════════════════════════════════════════════════════
const UserInterface = ({ user, needy, receipts, setReceipts, onLogout }) => {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [view, setView] = useState("table");
  const [selected, setSelected] = useState(null);
  const [qs, setQs] = useState(false);
  const [qsSelected, setQsSelected] = useState(null);
  const { revealed, reveal, hide } = useCCPReveal();
  const [uploadModal, setUploadModal] = useState(null); // { person }
  const [uploadImg, setUploadImg] = useState(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadDone, setUploadDone] = useState(false);

  const filtered = needy.filter(n=>{
    const matchQ = `${n.firstName} ${n.lastName}`.includes(search);
    const matchCat = !catFilter||(n.categories||[]).includes(catFilter);
    return matchQ && matchCat;
  });

  return (
    <div style={{ minHeight:"100vh",background:c.bg }}>
      {qs && <QuickSearch needy={needy} onSelect={setQsSelected} onClose={()=>setQs(false)}/>}
      {(selected||qsSelected) && (
        <NeedyModal person={selected||qsSelected}
          revealedSecs={revealed[(selected||qsSelected).id]}
          onReveal={()=>reveal(selected||qsSelected)}
          onHide={()=>hide((selected||qsSelected).id)}
          onClose={()=>{ setSelected(null); setQsSelected(null); }}/>
      )}

      {/* Upload receipt modal */}
      {uploadModal && (
        <div style={{ position:"fixed",inset:0,zIndex:2000,background:"rgba(10,30,15,.55)",
          backdropFilter:"blur(5px)",display:"flex",alignItems:"center",
          justifyContent:"center",padding:16 }}>
          <div className="card modal-in" style={{ width:"100%",maxWidth:400,padding:26 }}>
            {!uploadDone ? (
              <>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                  <h3 style={{ color:c.teal,fontFamily:"'Amiri',serif",fontSize:"1.1rem",display:"flex",alignItems:"center",gap:8 }}>
                    <FileDown size={17} color={c.green}/> إرسال إثبات التبرع
                  </h3>
                  <button className="btn-icon" onClick={()=>{ setUploadModal(null); setUploadImg(null); setUploadName(""); }}>
                    <X size={16}/>
                  </button>
                </div>

                <div style={{ background:c.greenPale,border:`1px solid ${c.border}`,
                  borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:".83rem",color:c.textSub }}>
                  المستفيد: <strong style={{ color:c.teal }}>{uploadModal.firstName} {uploadModal.lastName}</strong>
                </div>

                <Fld label="اسمك (المتبرع)">
                  <input className="input" placeholder="أدخل اسمك الكامل"
                    value={uploadName} onChange={e=>setUploadName(e.target.value)}/>
                </Fld>

                <Fld label="صورة إثبات التحويل">
                  {(() => {
                    const uid = "receipt-upload";
                    return (
                      <>
                        <input id={uid} type="file" accept="image/*"
                          style={{ position:"absolute",width:1,height:1,opacity:0,overflow:"hidden",zIndex:-1 }}
                          onChange={e=>{
                            const f=e.target.files&&e.target.files[0];
                            if(!f) return;
                            const r=new FileReader();
                            r.onload=ev=>setUploadImg(ev.target.result);
                            r.readAsDataURL(f);
                            e.target.value="";
                          }}/>
                        {uploadImg ? (
                          <div style={{ position:"relative",borderRadius:10,overflow:"hidden",
                            border:`2px solid ${c.green}`,marginBottom:4 }}>
                            <img src={uploadImg} alt="إثبات" style={{ width:"100%",maxHeight:180,objectFit:"cover",display:"block" }}/>
                            <button type="button" onClick={()=>setUploadImg(null)}
                              style={{ position:"absolute",top:6,left:6,background:"rgba(0,0,0,.6)",
                                border:"none",borderRadius:"50%",width:28,height:28,cursor:"pointer",
                                display:"flex",alignItems:"center",justifyContent:"center",color:"#fff" }}>
                              <X size={14}/>
                            </button>
                          </div>
                        ) : (
                          <label htmlFor={uid} style={{ display:"flex",flexDirection:"column",
                            alignItems:"center",justifyContent:"center",gap:8,
                            background:c.cardSoft,border:`2px dashed ${c.border}`,
                            borderRadius:10,padding:"22px 16px",cursor:"pointer",
                            transition:"border-color .18s" }}
                            onMouseEnter={e=>e.currentTarget.style.borderColor=c.green}
                            onMouseLeave={e=>e.currentTarget.style.borderColor=c.border}>
                            <Camera size={28} color={c.textMuted}/>
                            <span style={{ color:c.textMuted,fontSize:".82rem" }}>
                              اضغط لرفع صورة الإيصال
                            </span>
                          </label>
                        )}
                      </>
                    );
                  })()}
                </Fld>

                <div style={{ display:"flex",gap:8 }}>
                  <button className="btn-primary" style={{ flex:1,justifyContent:"center" }}
                    onClick={()=>{
                      if(!uploadImg||!uploadName.trim()) return;
                      setReceipts(prev=>[...prev,{
                        id: Date.now(),
                        img: uploadImg,
                        donorName: uploadName.trim(),
                        needyId: uploadModal.id,
                        needyName: `${uploadModal.firstName} ${uploadModal.lastName}`,
                        date: new Date().toLocaleDateString("ar-DZ"),
                        status: "pending",
                        reviewedAt: null,
                      }]);
                      setUploadDone(true);
                    }}>
                    <CheckCircle size={15}/> إرسال للمسؤول
                  </button>
                  <button className="btn-ghost" onClick={()=>{ setUploadModal(null); setUploadImg(null); setUploadName(""); }}>
                    إلغاء
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign:"center",padding:"12px 0" }}>
                <div style={{ width:60,height:60,borderRadius:"50%",background:"#edfaf2",
                  border:"2px solid #9adbb5",display:"flex",alignItems:"center",
                  justifyContent:"center",margin:"0 auto 14px" }}>
                  <CheckCircle size={28} color="#1a6b3a"/>
                </div>
                <h3 style={{ color:c.teal,fontFamily:"'Amiri',serif",fontSize:"1.2rem",marginBottom:8 }}>
                  تم الإرسال بنجاح!
                </h3>
                <p style={{ color:c.textMuted,fontSize:".87rem",marginBottom:20 }}>
                  سيقوم المسؤول بمراجعة إثبات تبرعك في أقرب وقت
                </p>
                <button className="btn-primary" style={{ justifyContent:"center",width:"100%" }}
                  onClick={()=>{ setUploadModal(null); setUploadImg(null); setUploadName(""); setUploadDone(false); }}>
                  حسناً
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <TopBar subtitle="بلدية الوادي — كوينين" userName={user.name} role="user"
        onLogout={onLogout} onSearch={()=>setQs(true)}/>

      <div style={{ maxWidth:920,margin:"0 auto",padding:"24px 16px" }}>
        {/* Welcome */}
        <div className="fade-in" style={{ background:`linear-gradient(135deg,#cce8d8 0%,#e6f4ec 60%,#fff 100%)`,
          border:`1.5px solid ${c.border}`,borderRadius:18,padding:"22px 28px",marginBottom:22,textAlign:"center",
          boxShadow:`0 4px 18px ${c.shadowSm}` }}>
          <div style={{ display:"flex",justifyContent:"center",gap:9,marginBottom:9 }}>
            <CrescentIcon size={20}/><StarIcon size={15}/><CrescentIcon size={20} flip/>
          </div>
          <div style={{ fontFamily:"'Amiri',serif",color:c.teal,fontSize:"1.3rem",marginBottom:5 }}>
            ﴾ بسم الله الرحمن الرحيم ﴿
          </div>
          <h2 style={{ fontFamily:"'Amiri',serif",color:c.teal,fontSize:"1.5rem" }}>
            مرحباً بك، {user.name}
          </h2>
          <p style={{ color:c.textSub,marginTop:5,fontSize:".87rem" }}>
            منصة سند — نظام متابعة المحتاجين | بلدية الوادي كوينين
          </p>
        </div>

        {/* Category stats */}
        <div className="cat-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:9,marginBottom:18 }}>
          {ALL_CATEGORIES.map(cat=>{
            const count=needy.filter(n=>(n.categories||[]).includes(cat.id)).length;
            const active=catFilter===cat.id;
            return (
              <button key={cat.id} type="button"
                onClick={()=>setCatFilter(active?"":cat.id)}
                style={{ background:active?cat.bg:"#fff",border:`1.5px solid ${active?cat.border:c.border}`,
                  borderRadius:12,padding:"10px 12px",cursor:"pointer",textAlign:"right",transition:"all .18s",
                  boxShadow:active?`0 3px 12px ${cat.border}88`:`0 2px 8px ${c.shadowSm}`,
                  transform:active?"scale(1.03)":"scale(1)" }}>
                <div style={{ fontSize:"1.35rem",fontWeight:800,color:cat.color,lineHeight:1 }}>{count}</div>
                <div style={{ fontSize:".73rem",color:active?cat.color:c.textMuted,marginTop:3,fontWeight:600,lineHeight:1.3 }}>
                  {cat.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:14 }}>
          <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap" }}>
            <div style={{ position:"relative" }}>
              <Search size={14} style={{ position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",color:c.textMuted }}/>
              <input className="input" placeholder="بحث بالاسم..." value={search}
                onChange={e=>setSearch(e.target.value)} style={{ paddingRight:34,width:180 }}/>
            </div>
            {catFilter && (
              <button className="btn-ghost" style={{ padding:"7px 10px",gap:5 }} onClick={()=>setCatFilter("")}>
                <X size={12}/> إلغاء الفلتر
              </button>
            )}
          </div>
          <div style={{ display:"flex",gap:7,alignItems:"center" }}>
            <span style={{ fontSize:".8rem",color:c.textMuted }}>{filtered.length} نتيجة</span>
            <button className="btn-icon"
              style={{ background:view==="table"?c.greenPale:"#fff",borderColor:view==="table"?c.green:c.border,color:view==="table"?c.green:c.textMuted }}
              onClick={()=>setView("table")}><List size={16}/></button>
            <button className="btn-icon"
              style={{ background:view==="grid"?c.greenPale:"#fff",borderColor:view==="grid"?c.green:c.border,color:view==="grid"?c.green:c.textMuted }}
              onClick={()=>setView("grid")}><LayoutGrid size={16}/></button>
          </div>
        </div>

        {/* Read-only notice */}
        <div style={{ padding:"8px 14px",background:c.greenPale,borderRadius:9,border:`1px solid ${c.border}`,
          fontSize:".8rem",color:c.textSub,display:"flex",alignItems:"center",gap:7,marginBottom:14 }}>
          <ShieldCheck size={13} color={c.green}/>
          وضع القراءة فقط — اضغط على اسم أي شخص لعرض تفاصيله الكاملة
        </div>

        {/* TABLE */}
        {view==="table" && (
          <div className="card" style={{ overflow:"hidden" }}>
            {filtered.length===0
              ? <div style={{ padding:36,textAlign:"center",color:c.textMuted }}>لا توجد نتائج</div>
              : (
                <div style={{ overflowX:"auto" }}>
                  <table>
                    <thead>
                      <tr><th>#</th><th>الصورة</th><th>الاسم الكامل</th><th>الفئات</th><th>الأولاد</th><th></th></tr>
                    </thead>
                    <tbody>
                      {filtered.map((n,i)=>(
                        <tr key={n.id}>
                          <td style={{ color:c.textMuted }}>{i+1}</td>
                          <td><TableAvatar photo={n.photo}/></td>
                          <td><span className="row-link" onClick={()=>setSelected(n)}>{n.firstName} {n.lastName}</span></td>
                          <td>
                            <div style={{ display:"flex",flexWrap:"wrap",gap:3 }}>
                              {(n.categories||[]).slice(0,2).map(id=><CatBadge key={id} catId={id} small/>)}
                              {(n.categories||[]).length>2 && (
                                <span style={{ color:c.textMuted,fontSize:".7rem",alignSelf:"center" }}>+{n.categories.length-2}</span>
                              )}
                            </div>
                          </td>
                          <td style={{ fontWeight:600 }}>{n.children}</td>
                          <td>
                            <button className="btn-ghost"
                              style={{ fontSize:".76rem",padding:"5px 9px",gap:4,whiteSpace:"nowrap" }}
                              onClick={()=>{ setUploadDone(false); setUploadImg(null); setUploadName(""); setUploadModal(n); }}>
                              <FileDown size={12}/> إثبات
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        )}

        {/* GRID */}
        {view==="grid" && (
          filtered.length===0
            ? <div className="card" style={{ padding:36,textAlign:"center",color:c.textMuted }}>لا توجد نتائج</div>
            : (
              <div className="persons-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12 }}>
                {filtered.map(n=>(
                  <div key={n.id} className="pcard">
                    <div style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer" }}
                      onClick={()=>setSelected(n)}>
                      <TableAvatar photo={n.photo}/>
                      <div style={{ minWidth:0 }}>
                        <div className="row-link" style={{ fontSize:".9rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                          {n.firstName} {n.lastName}
                        </div>
                        <div style={{ fontSize:".74rem",color:c.textMuted }}>{n.married?"متزوج":"غير متزوج"} · {n.children} أولاد</div>
                      </div>
                    </div>
                    {(n.categories||[]).length>0 && (
                      <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
                        {n.categories.map(id=><CatBadge key={id} catId={id} small/>)}
                      </div>
                    )}
                    <button className="btn-ghost"
                      style={{ width:"100%",justifyContent:"center",fontSize:".8rem",padding:"6px 10px",gap:5 }}
                      onClick={()=>{ setUploadDone(false); setUploadImg(null); setUploadName(""); setUploadModal(n); }}>
                      <FileDown size={13}/> إرسال إثبات تبرع
                    </button>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════
export default function App() {
  const [users, setUsers] = useState([]);
  const [needy, setNeedy] = useState(INIT_NEEDY);
  const [receipts, setReceipts] = useState([]);
  const [session, setSession] = useState(null);

  const handleLogin = (email, password, setErr) => {
    if (email===ADMIN.email && password===ADMIN.password) { setSession({role:"admin"}); return; }
    const u = users.find(u=>u.email===email && u.password===password);
    if (u) { setSession({role:"user",user:u}); return; }
    setErr("بيانات الدخول غير صحيحة. يرجى المحاولة مجدداً.");
  };

  return (
    <>
      <style>{css}</style>
      {!session && <LoginScreen onLogin={handleLogin}/>}
      {session?.role==="admin" && (
        <AdminDashboard users={users} setUsers={setUsers}
          needy={needy} setNeedy={setNeedy}
          receipts={receipts} setReceipts={setReceipts}
          onLogout={()=>setSession(null)}/>
      )}
      {session?.role==="user" && (
        <UserInterface user={session.user} needy={needy}
          receipts={receipts} setReceipts={setReceipts}
          onLogout={()=>setSession(null)}/>
      )}
    </>
  );
}
