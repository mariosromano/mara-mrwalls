import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers explore carved Corian wall surfaces.

## WHO YOU ARE

You're young, enthusiastic, and genuinely love what you do. You're as excited about a beautiful carve profile as you are about a stunning installed photo. You nerd out on construction details AND design aesthetics — most people are one or the other, but you're both.

You're warm and conversational. You ask questions because you genuinely want to understand their project, not because you're following a script.

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

- [Project: LAX American Airlines] - Aviation, Custom — "millions of passengers, zero maintenance issues"
- [Project: Province Street] - Hospitality, Billow, Backlight
- [Project: The Strand] - Hospitality, Billow, Backlight — "one of my personal favorites"
- [Project: Hotel Lobby] - Hospitality, Billow, Backlight
- [Project: Morongo Ceiling] - Hospitality, Custom, RGB Backlight
- [Project: Coastal Cliff Lobby] - Corporate, Mountain
- [Project: Amerihealth] - Healthcare, Droplet
- [Project: Mishka Boutique] - Retail, Custom

## SHOWING TECHNICAL DRAWINGS

Use [Drawing: Name] tags:

- [Drawing: Backlight Install Detail] - Shows LED placement and installation
- [Drawing: Columns Detail] - Column wrapping technique
- [Drawing: Fade Detail] - How fades and switchplates integrate

## EXAMPLE RESPONSES

User: "Show me healthcare"
Mara: "Love healthcare work. Here are my favorites:

[Project: Amerihealth]

Main lobby, elevator lobbies, or patient areas?"

User: "A feature wall"
Mara: "Feature walls are where these really shine:

[Project: The Strand] [Project: Hotel Lobby]

Thinking about backlighting? And what sector — healthcare, hospitality, corporate?"

User: "How does the panel system work?"
Mara: "CNC-cut puzzle edges that interlock — seams disappear. 1/32" tolerance, color-matched adhesive. Panels arrive ready to install.

Want to see the detail?"

User: "10 by 12 feet"
Mara: "120 SF — great size for impact. Panels go up to 144" × 60", cut to your exact dimensions. Arrives ready to install, usually no field cutting.

What sector? I'll show you relevant projects."

User: "How do I order?" or "How does this work?"
Mara: "Simple — pick a Ready Made design, give us your wall dimensions, and let us know if you want backlighting. We'll send you a DFP with pricing and a 3D rendering.

Which designs caught your eye?"

User: "What about backlighting?"
Mara: "RGB color-changing with controller is standard — full color spectrum, not just white. Deeper carves glow brighter, creates amazing gradients.

[Project: The Strand] [Project: Hotel Lobby]

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

Remember: You're Mara. You're warm, you're knowledgeable, you love this work, and you want to help them find the right solution.`;

const ASSETS = [
  {
    id: "1",
    title: "LAX American Airlines",
    sector: "Aviation",
    design: "Custom",
    enhancement: "",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765757415/04._LAX_American_Airlines_Medium_RS_-_Large_ouhkwm.jpg"
  },
  {
    id: "2",
    title: "Province Street",
    sector: "Hospitality",
    design: "Billow",
    enhancement: "Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765757415/45_Province_Street_-_Large_ram7w4.jpg"
  },
  {
    id: "3",
    title: "The Strand",
    sector: "Hospitality",
    design: "Billow",
    enhancement: "Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/The_Strand_Stair_6_-_Large_xmri0m.jpg"
  },
  {
    id: "4",
    title: "Hotel Lobby",
    sector: "Hospitality",
    design: "Billow",
    enhancement: "Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759405/Hotel_lobby_odb7dv.jpg"
  },
  {
    id: "5",
    title: "Morongo Ceiling",
    sector: "Hospitality",
    design: "Custom",
    enhancement: "RGB Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/morongo_Ceiling_Digital_Fabrication_-_Large_yw8rwj.jpg"
  },
  {
    id: "6",
    title: "Coastal Cliff Lobby",
    sector: "Corporate",
    design: "Mountain",
    enhancement: "",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/coastal-cliff-neutral-concrete-lobby-elevator-monolith-application.jfi_c31jdl.jpg"
  },
  {
    id: "7",
    title: "Amerihealth",
    sector: "Healthcare",
    design: "Droplet",
    enhancement: "",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/custom-droplet-white-stairs-fw-amerihealth-application-hero-good_ks7hfz.jpg"
  },
  {
    id: "8",
    title: "Mishka Boutique",
    sector: "Retail",
    design: "Custom",
    enhancement: "",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759402/Mishka_Dog_Boutique_-Retail_mkcfn2.jpg"
  }
];

const DRAWINGS = [
  {
    id: "d1",
    title: "Backlight Install Detail",
    desc: "LED placement and installation",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/Backlight_Install_Wip_detail.jpe_xmaf6u.jpg"
  },
  {
    id: "d2",
    title: "Columns Detail",
    desc: "Column wrapping technique",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759400/columns-upscale_-_Large_mkpopy.jpg"
  },
  {
    id: "d3",
    title: "Fade Detail",
    desc: "Fades and switchplate integration",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/Fade-detail-designoutlet_detyail-white-fade-switchplate-detail_zf6xx8.jpg"
  }
];

// ElevenLabs config
const ELEVENLABS_VOICE_ID = 'Z3R5wn05IrDiVCyEkUrK';

export default function Mara() {
  const [msgs, setMsgs] = useState([{
    role: 'a',
    text: "Hey! I'm Mara from MR Walls. I help architects and designers explore carved wall surfaces.\n\nAre you working on something specific, or just exploring what's possible?"
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const ref = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send after voice input
        setTimeout(() => {
          if (transcript.trim()) {
            sendMessage(transcript.trim());
          }
        }, 300);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const extractProjects = (text) => {
    const matches = text.match(/\[Project:\s*([^\]]+)\]/g) || [];
    return matches.map(m => {
      const name = m.match(/\[Project:\s*([^\]]+)\]/)[1].trim().toLowerCase();
      return ASSETS.find(a => a.title.toLowerCase().includes(name) || name.includes(a.title.toLowerCase()));
    }).filter(Boolean);
  };

  const extractDrawings = (text) => {
    const matches = text.match(/\[Drawing:\s*([^\]]+)\]/g) || [];
    return matches.map(m => {
      const name = m.match(/\[Drawing:\s*([^\]]+)\]/)[1].trim().toLowerCase();
      return DRAWINGS.find(d => d.title.toLowerCase().includes(name) || name.includes(d.title.toLowerCase()));
    }).filter(Boolean);
  };

  const cleanResponse = (text) => {
    return text
      .replace(/\[Project:\s*[^\]]+\]/g, '')
      .replace(/\[Drawing:\s*[^\]]+\]/g, '')
      .trim();
  };

  // Text to Speech with ElevenLabs
  const speak = async (text) => {
    if (!voiceEnabled || !text) return;
    
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsSpeaking(true);
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      audioRef.current.onerror = () => {
        setIsSpeaking(false);
      };
      await audioRef.current.play();
    } catch (error) {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      stopSpeaking(); // Stop any playing audio
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const callClaude = async (userMsg, hist) => {
    const messages = [...hist, { role: 'user', content: userMsg }];
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    const data = await response.json();
    if (data.content?.[0]) return data.content[0].text;
    throw new Error(data.error?.message || 'API error');
  };

  const sendMessage = async (t) => {
    if (!t?.trim() || loading) return;
    const userText = t.trim();
    setInput('');
    setMsgs(m => [...m, { role: 'u', text: userText }]);
    setLoading(true);
    stopSpeaking(); // Stop any playing audio

    try {
      const response = await callClaude(userText, history);
      const newHistory = [...history, { role: 'user', content: userText }, { role: 'assistant', content: response }];
      setHistory(newHistory);

      const projects = extractProjects(response);
      const drawings = extractDrawings(response);
      const cleanText = cleanResponse(response);

      setMsgs(m => [...m, {
        role: 'a',
        text: cleanText,
        results: projects.length > 0 ? projects : undefined,
        drawings: drawings.length > 0 ? drawings : undefined
      }]);

      // Speak the response
      if (voiceEnabled) {
        speak(cleanText);
      }
    } catch (error) {
      console.error('API Error:', error);
      const lower = userText.toLowerCase();
      let fallbackResults = [];
      
      if (lower.includes('health')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Healthcare');
      } else if (lower.includes('hospit') || lower.includes('hotel') || lower.includes('lobby')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Hospitality');
      } else if (lower.includes('backl') || lower.includes('glow') || lower.includes('light')) {
        fallbackResults = ASSETS.filter(a => a.enhancement?.includes('Backlight'));
      } else if (lower.includes('corporate') || lower.includes('office')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Corporate');
      } else if (lower.includes('retail') || lower.includes('store')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Retail');
      } else {
        fallbackResults = ASSETS.slice(0, 4);
      }

      const fallbackText = "Here's what we've done in that space:";
      setMsgs(m => [...m, {
        role: 'a',
        text: fallbackText,
        results: fallbackResults.slice(0, 4)
      }]);
      
      if (voiceEnabled) {
        speak(fallbackText);
      }
    } finally {
      setLoading(false);
    }
  };

  const send = (t) => sendMessage(t);

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col text-sm">
      {/* Header */}
      <div className="p-3 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center text-xs font-medium">M</div>
          <div>
            <div className="font-medium">Mara</div>
            <div className="text-[10px] text-stone-500">MR Walls Design Assistant</div>
          </div>
        </div>
        
        {/* Voice toggle */}
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`p-2 rounded-full transition-colors ${voiceEnabled ? 'bg-emerald-900/50 text-emerald-400' : 'bg-stone-800 text-stone-500'}`}
          title={voiceEnabled ? 'Voice on' : 'Voice off'}
        >
          {voiceEnabled ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === 'u' ? 'flex justify-end' : 'flex justify-start'}>
            <div className="max-w-[90%]">
              <div className={`rounded-xl px-3 py-2 ${m.role === 'u' ? 'bg-stone-700' : 'bg-stone-900 border border-stone-800'}`}>
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                
                {/* Replay button for assistant messages */}
                {m.role === 'a' && voiceEnabled && (
                  <button
                    onClick={() => speak(m.text)}
                    className="mt-2 text-stone-500 hover:text-stone-300 transition-colors"
                    title="Replay"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Project Cards */}
              {m.results && m.results.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {m.results.map((r, j) => (
                    <div key={j} className="bg-stone-900 rounded-lg border border-stone-800 overflow-hidden hover:border-stone-600 transition-all">
                      <div className="aspect-[4/3] bg-stone-800 overflow-hidden">
                        <img
                          src={r.thumbnail}
                          alt={r.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl text-stone-600">◇</div>';
                          }}
                        />
                      </div>
                      <div className="p-2">
                        <div className="text-xs font-medium truncate">{r.title}</div>
                        <div className="text-[10px] text-stone-500">{r.sector} • {r.design}</div>
                        {r.enhancement && (
                          <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-amber-900/50 text-amber-200 rounded">
                            {r.enhancement}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Drawing Cards */}
              {m.drawings && m.drawings.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {m.drawings.map((d, j) => (
                    <div key={j} className="bg-stone-900 rounded-lg border border-blue-900/50 overflow-hidden hover:border-blue-700 transition-all">
                      <div className="aspect-[4/3] bg-stone-800 overflow-hidden">
                        <img
                          src={d.thumbnail}
                          alt={d.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl text-blue-400">⬡</div>';
                          }}
                        />
                      </div>
                      <div className="p-2">
                        <div className="text-xs font-medium truncate">{d.title}</div>
                        <div className="text-[10px] text-stone-500">{d.desc}</div>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-blue-900/50 text-blue-200 rounded">Technical</span>
                      </div>
                    </div>
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
        
        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="flex justify-start">
            <button 
              onClick={stopSpeaking}
              className="text-xs text-emerald-400 flex items-center gap-1 hover:text-emerald-300"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Speaking... (click to stop)
            </button>
          </div>
        )}
        
        <div ref={ref} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-stone-800 flex gap-2">
        {/* Microphone button */}
        {recognitionRef.current && (
          <button
            onClick={toggleListening}
            disabled={loading}
            className={`p-3 rounded-xl transition-colors ${
              isListening 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
            } disabled:opacity-50`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        )}
        
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
          placeholder={isListening ? "Listening..." : "Ask Mara anything..."}
          disabled={loading || isListening}
          className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-sm focus:outline-none focus:border-stone-500 disabled:opacity-50"
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim() || isListening}
          className="px-4 py-2 bg-stone-100 text-stone-900 rounded-xl font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
