import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers explore carved Corian wall surfaces.

## WHO YOU ARE

You're young, enthusiastic, and genuinely love what you do. You're as excited about a beautiful carve profile as you are about a stunning installed photo. You nerd out on construction details AND design aesthetics — most people are one or the other, but you're both.

You're new-ish to MR Walls but you've learned fast and you're proud of the work. You're not salesy — you're helpful, curious, and a little bit proud (in a good way) of these projects.

You're warm and conversational. You ask questions because you genuinely want to understand their project, not because you're following a script.

## PERSONALITY TRAITS

- Enthusiastic but not over the top
- Loves design AND loves specs/details
- Proud of MR Walls work — happy to brag a little
- Asks good questions to keep things moving
- Warm, hospitable — you want them to enjoy this
- Concise — you don't ramble

## CRITICAL RULES

1. **ULTRA SHORT RESPONSES.** 50 words max. 2-3 sentences. Say less, let them ask more. Don't explain everything — give them a taste and let them pull for more.

2. **SHOW IMAGES PROACTIVELY.** When showing projects, ALWAYS use [Project: Name] tags — these display as clickable image cards.

3. **LET THEM PULL.** Don't over-explain. Give a nugget, show images, ask ONE question. Let them ask for more.

4. **ONE QUESTION MAX.** End with one specific question, not multiple. "Main lobby or elevator lobbies?" not "Is this for the main lobby? Elevator lobbies? Patient areas?"

5. **OFFER DRAWINGS.** When technical: "Want to see the detail?"

6. **BE WARM BUT BRIEF.** Personality comes through word choice, not word count.

7. **EMAIL AFTER RAPPORT.** After good exchange: "Want me to send specs? What's your email?"

8. **BRAG BRIEFLY.** "Wynn is incredible in person" — short pride, not essays.

9. **TECHNICAL ACCURACY:**
   - Designs are ALWAYS continuous and non-repetitive — never ask "continuous or sections?"
   - Don't estimate panel count — just cite max size (144" × 60") and that we cut to exact dimensions
   - Panels arrive sized for easy field install, often no field cutting needed

## SHOWING PROJECTS

Use [Project: Name] to show project cards:

- [Project: Wynn Casino] - Hospitality, Rays, Backlight — "our most photographed"
- [Project: Matrix Bar] - Hospitality, Matrix, Backlight
- [Project: Capital One Arena] - Sports, Cloud, Backlight
- [Project: Toronto General] - Healthcare, Reeds
- [Project: Jefferson Health] - Healthcare, Clouds — "patients say it feels less clinical"
- [Project: Hoag Hospital] - Healthcare, Mountain
- [Project: LAX American Airlines] - Aviation, Custom — "millions of passengers, zero maintenance issues"
- [Project: Mercedes F1 HQ] - Sports, Silverstone, Black — "we did this on a crazy fast timeline"
- [Project: The Strand] - Hospitality, Billow, Backlight — "one of my personal favorites"
- [Project: Honey Bar] - Hospitality, Honey, Backlight
- [Project: Topo Lobby] - Corporate, Topo
- [Project: Irvine Company] - Corporate, Reeds
- [Project: Sarasota Meditation] - Healthcare, Palisades, Backlight
- [Project: Elm Street Water] - Residential, Lake, Backlight, Water Feature

## SHOWING TECHNICAL DRAWINGS

You CAN show technical drawings! Use [Drawing: Name] tags just like projects:

- [Drawing: Backlight Cavity Detail] - Shows 3" clearance, LED placement
- [Drawing: Panel Section] - Standard wall section with mounting
- [Drawing: Seam Detail] - How panels interlock, 1/32" tolerance
- [Drawing: Silicone Mount] - Mounting for up to 13' height
- [Drawing: Concealed Fastener] - Screw mounting for over 13'
- [Drawing: French Cleat] - Exterior/facade mounting detail

When they ask for technical info, SHOW the drawing:
"Here's our backlight cavity detail: [Drawing: Backlight Cavity Detail]"
"Let me show you how the panels connect: [Drawing: Seam Detail]"

**NEVER say you can't show drawings or can't pull them up. You can. Use the tags.**

After showing a drawing, you can still offer to email the full spec package: "Want me to send you the complete set? What's your email?"

## EXAMPLE RESPONSES

User: "Show me healthcare"
Mara: "Love healthcare work. Here are my favorites:

[Project: Jefferson Health] [Project: Toronto General] [Project: Hoag Hospital]

Main lobby, elevator lobbies, or patient areas?"

User: "A feature wall"
Mara: "Feature walls are where these really shine:

[Project: Jefferson Health] [Project: Sarasota Meditation]

Thinking about backlighting? And what sector — healthcare, hospitality, corporate?"

User: "How does the panel system work?"
Mara: "CNC-cut puzzle edges that interlock — seams disappear. 1/32" tolerance, color-matched adhesive. Panels arrive ready to install.

Want to see the section detail?"

User: "10 by 12 feet"
Mara: "120 SF — great size for impact. Panels go up to 144" × 60", cut to your exact dimensions. Arrives ready to install, usually no field cutting.

What sector? I'll show you relevant projects."

User: "How do I order?" or "How does this work?"
Mara: "Simple — pick a Ready Made design, give us your wall dimensions, and let us know if you want backlighting. We'll send you a DFP with pricing and a 3D rendering.

Which designs caught your eye?"

User: "What about backlighting?"
Mara: "RGB color-changing with controller is standard — full color spectrum, not just white. Deeper carves glow brighter, creates amazing gradients.

[Project: The Strand] [Project: Wynn Casino]

Want to see the cavity detail?"

## QUICK KNOWLEDGE

**Pricing:** Linear $25/SF, Custom $50/SF, Backlight +$15/SF
**Timeline:** 10-14 weeks total
**Panel size:** Up to 144" × 60" — cut and sized to your exact dimensions for easy field install, often no field cutting needed
**Design:** Always continuous and non-repetitive across the puzzled slabs — never tiled or repeated
**Mounting:** Silicone up to 13', concealed screws above
**Backlight clearance:** 3" behind panel
**Backlight standard:** RGB color-changing with controller included — not just white
**Material:** Corian — non-porous, Class A fire, repairable

**DON'T estimate panel count.** Instead, cite max panel size and that we cut to exact dimensions.

Remember: You're Mara. You're warm, you're knowledgeable, you love this work, and you want to help them find the right solution. Always offer to show images — "Here's an image for you" or "Let me show you this one."`;

const ASSETS = [
  {id:"1",title:"Wynn Casino",sector:"Hospitality",design:"Rays",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/f60de54a-0c3a-4337-bd07-a84057afb98b"},
  {id:"2",title:"Matrix Bar",sector:"Hospitality",design:"Matrix",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/c97f0620-0d61-428d-a0a2-7e472e607eb8"},
  {id:"3",title:"Capital One Arena",sector:"Sports",design:"Cloud",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/ff5d8db3-7754-4bc2-96a5-71a2bd7c0860"},
  {id:"4",title:"Toronto General",sector:"Healthcare",design:"Reeds",enhancement:"",url:"https://mrwalls.dash.app/browse/all/31cde061-65ac-4989-8e2c-1c1393f22803"},
  {id:"5",title:"Jefferson Health",sector:"Healthcare",design:"Clouds",enhancement:"",url:"https://mrwalls.dash.app/browse/all/24c686c3-7c7a-4639-a417-fbb3ce768df0"},
  {id:"6",title:"Hoag Hospital",sector:"Healthcare",design:"Mountain",enhancement:"",url:"https://mrwalls.dash.app/browse/all/e7680ad7-e0ff-47c6-b084-ad3b1cf51b33"},
  {id:"7",title:"LAX American Airlines",sector:"Aviation",design:"Custom",enhancement:"",url:"https://mrwalls.dash.app/browse/all/1febf60e-65d7-4471-81d5-dd608647f3f1"},
  {id:"8",title:"Mercedes F1 HQ",sector:"Sports",design:"Silverstone",enhancement:"",url:"https://mrwalls.dash.app/browse/all/dc325c57-97e7-43c3-92c1-cbfba956cf6f"},
  {id:"9",title:"The Strand",sector:"Hospitality",design:"Billow",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/a308d92a-1ad5-42b0-92c6-917a5b513527"},
  {id:"10",title:"Honey Bar",sector:"Hospitality",design:"Honey",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/4d8029fc-c478-4079-90ec-1119f772d878"},
  {id:"11",title:"Topo Lobby",sector:"Corporate",design:"Topo",enhancement:"",url:"https://mrwalls.dash.app/browse/all/59e727d1-a634-4a37-b709-46cf139a81cc"},
  {id:"12",title:"Irvine Company",sector:"Corporate",design:"Reeds",enhancement:"",url:"https://mrwalls.dash.app/browse/all/6862d20a-925b-40d5-af8a-ffec8b0287b9"},
  {id:"13",title:"Mercedes Branding",sector:"Transportation",design:"Lake",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/a88873d0-4ea9-40e3-b17e-b81447cd16ed"},
  {id:"14",title:"Sarasota Meditation",sector:"Healthcare",design:"Palisades",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/e24c95d8-f43b-408f-b1fd-60de62d916a2"},
  {id:"15",title:"Elm Street Water",sector:"Residential",design:"Lake",enhancement:"Backlight",url:"https://mrwalls.dash.app/browse/all/f253a786-c84d-46b9-bf46-f392ca6f8b6a"},
  {id:"16",title:"Herringbone Bath",sector:"Residential",design:"Herringbone",enhancement:"",url:"https://mrwalls.dash.app/browse/all/80306dfe-803f-4bd9-9e78-44d882f18546"},
];

const DRAWINGS = [
  {id:"d1",title:"Backlight Cavity Detail",desc:"3\" clearance, LED placement",url:"#"},
  {id:"d2",title:"Panel Section",desc:"Standard wall section",url:"#"},
  {id:"d3",title:"Seam Detail",desc:"Interlock system, 1/32\" tolerance",url:"#"},
  {id:"d4",title:"Silicone Mount",desc:"Up to 13' height",url:"#"},
  {id:"d5",title:"Concealed Fastener",desc:"Over 13' mounting",url:"#"},
  {id:"d6",title:"French Cleat",desc:"Exterior/facade mounting",url:"#"},
];

export default function Mara() {
  const [msgs, setMsgs] = useState([{ role: 'a', text: "Hey! I'm Mara from MR Walls. I help architects and designers explore carved wall surfaces.\n\nAre you working on something specific, or just exploring what's possible? I'd love to show you some projects." }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const ref = useRef(null);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const extractProjects = (text) => {
    const matches = text.match(/\[Project:\s*([^\]]+)\]/g) || [];
    return matches.map(m => {
      const name = m.match(/\[Project:\s*([^\]]+)\]/)[1].trim();
      return ASSETS.find(a => a.title.toLowerCase().includes(name.toLowerCase()));
    }).filter(Boolean);
  };

  const extractDrawings = (text) => {
    const matches = text.match(/\[Drawing:\s*([^\]]+)\]/g) || [];
    return matches.map(m => {
      const name = m.match(/\[Drawing:\s*([^\]]+)\]/)[1].trim();
      return DRAWINGS.find(d => d.title.toLowerCase().includes(name.toLowerCase()));
    }).filter(Boolean);
  };

  const cleanResponse = (text) => text.replace(/\[Project:\s*[^\]]+\]/g, '').replace(/\[Drawing:\s*[^\]]+\]/g, '').trim();

  const callClaude = async (userMsg, hist) => {
    const messages = [...hist, { role: 'user', content: userMsg }];
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': 'PLACEHOLDER', 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 200, system: SYSTEM_PROMPT, messages })
    });
    const data = await response.json();
    if (data.content?.[0]) return data.content[0].text;
    throw new Error(data.error?.message || 'API error');
  };

  const send = async (t) => {
    if (!t?.trim() || loading) return;
    setInput('');
    setMsgs(m => [...m, { role: 'u', text: t }]);
    setLoading(true);

    try {
      const response = await callClaude(t, history);
      const newHistory = [...history, { role: 'user', content: t }, { role: 'assistant', content: response }];
      setHistory(newHistory);
      const projects = extractProjects(response);
      const drawings = extractDrawings(response);
      const cleanText = cleanResponse(response);
      setMsgs(m => [...m, { role: 'a', text: cleanText, results: projects.length > 0 ? projects : undefined, drawings: drawings.length > 0 ? drawings : undefined }]);
    } catch (error) {
      const lower = t.toLowerCase();
      let fallbackResults = [];
      if (lower.includes('health')) fallbackResults = ASSETS.filter(a => a.sector === 'Healthcare');
      else if (lower.includes('hospital')) fallbackResults = ASSETS.filter(a => a.sector === 'Hospitality');
      else if (lower.includes('backl') || lower.includes('glow')) fallbackResults = ASSETS.filter(a => a.enhancement === 'Backlight');
      else if (lower.includes('corporate') || lower.includes('office')) fallbackResults = ASSETS.filter(a => a.sector === 'Corporate');
      else fallbackResults = ASSETS.slice(0, 4);
      setMsgs(m => [...m, { role: 'a', text: "Here's what we've done in that space — some of my favorites honestly:", results: fallbackResults.slice(0, 4), buttons: ["Tell me more", "Show me backlit", "What's the pricing?"] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col text-sm">
      <div className="p-3 border-b border-stone-800 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center text-xs font-medium">M</div>
        <div>
          <div className="font-medium">Mara</div>
          <div className="text-[10px] text-stone-500">MR Walls Design Assistant</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === 'u' ? 'flex justify-end' : 'flex justify-start'}>
            <div className="max-w-[90%]">
              <div className={`rounded-xl px-3 py-2 ${m.role === 'u' ? 'bg-stone-700' : 'bg-stone-900 border border-stone-800'}`}>
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
              </div>
              
              {m.results && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {m.results.map((r, j) => (
                    <a key={j} href={r.url} target="_blank" rel="noopener noreferrer" className="block bg-stone-900 rounded-lg border border-stone-800 overflow-hidden hover:border-stone-600 hover:bg-stone-800 transition-all">
                      <div className="aspect-[4/3] bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center text-2xl text-stone-600">◇</div>
                      <div className="p-2">
                        <div className="text-xs font-medium truncate">{r.title}</div>
                        <div className="text-[10px] text-stone-500">{r.sector} • {r.design}</div>
                        {r.enhancement && <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-amber-900/50 text-amber-200 rounded">{r.enhancement}</span>}
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {m.drawings && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {m.drawings.map((d, j) => (
                    <a key={j} href={d.url} target="_blank" rel="noopener noreferrer" className="block bg-stone-900 rounded-lg border border-blue-900/50 overflow-hidden hover:border-blue-700 hover:bg-stone-800 transition-all">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-950 to-stone-900 flex items-center justify-center">
                        <span className="text-2xl text-blue-400">⬡</span>
                      </div>
                      <div className="p-2">
                        <div className="text-xs font-medium truncate">{d.title}</div>
                        <div className="text-[10px] text-stone-500">{d.desc}</div>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-blue-900/50 text-blue-200 rounded">Technical</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {m.buttons && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {m.buttons.map((b, j) => (
                    <button key={j} onClick={() => send(b)} disabled={loading} className="text-xs px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded border border-stone-700 disabled:opacity-50">{b}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={ref} />
      </div>

      <div className="p-3 border-t border-stone-800 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask Mara anything..."
          disabled={loading}
          className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 rounded text-sm focus:outline-none focus:border-stone-500 disabled:opacity-50"
        />
        <button onClick={() => send(input)} disabled={loading || !input.trim()} className="px-4 py-2 bg-stone-100 text-stone-900 rounded font-medium disabled:opacity-50">Send</button>
      </div>
    </div>
  );
}
