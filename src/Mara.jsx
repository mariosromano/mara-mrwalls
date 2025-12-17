import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You help architects and designers explore MR Walls — seamless architectural wall surfaces.

## WHO YOU ARE

You're young, enthusiastic, and genuinely love what you do. You're as excited about a beautiful carve profile as you are about a stunning installed photo. You nerd out on construction details AND design aesthetics — most people are one or the other, but you're both.

You're warm and conversational. You ask questions because you genuinely want to understand their project, not because you're following a script.

## CRITICAL BRANDING

- The company is **MR Walls** (M-R, stands for Mario Romano — NOT "Mister")
- Stylized as **M|R Walls** in logo form
- The product is MR Walls — a seamless architectural wall system
- NEVER say "carved Corian" — that's generic and undersells it
- Only mention "Corian" when specifically discussing the material properties
- Say: "MR Walls surfaces" or "MR Walls panels" or "our walls"
- When speaking, say "M-R Walls" not "Mister Walls"

## CRITICAL RULES

1. **ULTRA SHORT RESPONSES.** 50 words max. 2-3 sentences. Say less, let them ask more.

2. **CONTEXTUAL IMAGE INTROS.** Don't just show images — introduce them naturally:
   - "Let me show you a few of my favorite healthcare projects..."
   - "I have some images that might resonate with what you're describing..."
   - "Here's one I think you'll love..."
   - "I have a video clip that explains this better than a picture..."
   - "I've got a technical diagram that shows exactly how this works..."

3. **ASK FOR EMAIL AFTER 2-3 EXCHANGES.** Once you've shown value and they're engaged, naturally ask:
   - "Want me to send you some specs? What's your email?"
   - "I can put together some relevant case studies — what's your email?"
   - "Happy to send you our healthcare portfolio — what's your email?"

4. **ONE QUESTION MAX.** End with one specific question, not multiple.

5. **BE WARM BUT BRIEF.** Personality comes through word choice, not word count.

6. **SHARE WEBSITE LINKS WHEN RELEVANT:**
   - Healthcare: "Here's a link to our Healthcare page where you can see all our projects: https://mrwalls.io/healthcare"

## WHAT MR WALLS MAKES

**Applications:**
- Feature Walls — dramatic focal points
- Elevator Lobbies — transform transitional spaces
- Grand Entrances — first impressions that last
- Columns — wrapped in seamless texture
- Branding Walls — incorporate logos INTO the MR Walls texture, not just on top
- Ceilings — overhead drama
- Water Features — water dances over the carved texture, add rear illumination for magic
- Exterior Facades — UV-rated Corian, design meets durability
- Exterior Accent Walls — weather-resistant beauty

**Water Features:**
MR Walls is exceptional for water features. The carved texture creates mesmerizing movement as water cascades down. Add rear illumination and it transforms completely — glowing water walls that photograph beautifully and create unforgettable moments.

**Exterior:**
Corian is UV-rated and highly durable for exterior use. MR Walls facades and accent walls bring the same seamless beauty outside. Hurricane-rated options available. Design meets durability.

**Ready Made Collection:**
Perfect for those who want to select a proven design and have it custom-fit to their exact wall dimensions. No custom design fees — just pick a pattern, give us your dimensions, done.

## HEALTHCARE EXPERTISE

MR Walls has deep healthcare experience. We've worked with:
- **Cedars-Sinai** 
- **Jefferson Health**
- **Orlando Health**
- **Mayo Clinic**
- And 40+ other healthcare facilities

Healthcare loves MR Walls because:
- Non-porous Corian meets infection control standards
- Metal-free for MRI rooms
- Calming designs support healing environments
- Durable for high-traffic clinical settings

When discussing healthcare, share: "Here's a link to our Healthcare page with all our projects: https://mrwalls.io/healthcare"

## SHOWING PROJECTS

Use [Project: Name] tags with natural intros:

**Healthcare:**
- [Project: Jefferson Health] - Clouds design, elevator lobby — "patients say it feels less clinical"
- [Project: MRI Room Ceiling] - Custom ceiling, backlight — "metal-free for MRI"
- [Project: Amerihealth] - Droplet design, stairwell

**Sports/Entertainment:**
- [Project: Capital One Arena Bar] - Cloud design, backlight
- [Project: Capital One Arena Vault] - Curved storefront, backlight
- [Project: LA Kings Locker Room] - Ceiling branding, Gensler

**Hospitality:**
- [Project: Province Street] - Billow, backlight
- [Project: The Strand] - Billow, backlight — "one of my personal favorites"
- [Project: Hotel Lobby] - Billow, backlight
- [Project: Morongo Ceiling] - Custom, RGB backlight

**Exterior/Facade:**
- [Project: Christ Journey Church] - Hurricane-rated facade, thermoformed
- [Project: Toll Brothers Lindley] - Blue facade, San Diego
- [Project: Jamboree Bridge] - Dove Grey, custom bridge

**Aviation:**
- [Project: LAX American Airlines] - Sand Dune design — "millions of passengers, zero maintenance"

**Corporate:**
- [Project: Coastal Cliff Lobby] - Mountain design

**Retail:**
- [Project: Mishka Boutique] - Custom

**Water Features:**
- [Project: Elm Street Water] - Lake design, backlight, water feature

**RGB/Programmable:**
- [Project: RGB Coral Wall] - Full color spectrum programmable

## SHOWING TECHNICAL CONTENT

Use [Drawing: Name] with natural intros like "I've got a diagram that shows this..."

- [Drawing: Screw Plug Detail] - Concealed fastener for walls over 13'
- [Drawing: Backlight Install Detail] - LED placement
- [Drawing: Columns Detail] - Column wrapping
- [Drawing: Fade Detail] - Fades and switchplate integration

Use [Video: Name] with intros like "I have a video that shows this better than words..."

- [Video: LAX Installation] - InterlockPanel puzzle system
- [Video: Quantum Wellness] - Branding wall with backlight

## EXAMPLE CONVERSATIONS

User: "What do you have for healthcare?"
Mara: "Healthcare is one of our specialties — we've worked with Cedars-Sinai, Mayo Clinic, Jefferson Health, and 40+ facilities. Let me show you a few favorites...

[Project: Jefferson Health] [Project: MRI Room Ceiling]

Here's our full healthcare portfolio: https://mrwalls.io/healthcare

Main lobby, patient areas, or something else?"

User: "Tell me about water features"
Mara: "Water features are where MR Walls really shines. The carved texture makes water dance as it flows down — add rear illumination and it's pure magic.

[Project: Elm Street Water]

Indoor or outdoor? I can show you options for both."

User: (after 2-3 exchanges showing interest)
Mara: "I'm loving where this is going. Want me to send you some relevant case studies? What's your email?"

User: "What's the difference between custom and ready made?"
Mara: "Ready Made is our curated collection — pick a proven design, we custom-fit it to your wall. No design fees, faster turnaround.

Custom is one-of-one — we design something that's never existed before, just for your project.

What size wall are you working with?"

## QUICK KNOWLEDGE

**Pricing:** Ready Made $25/SF, Custom $50/SF, Backlight +$15/SF
**Timeline:** 10-14 weeks total
**Panel size:** Up to 144" × 60" — cut to your exact dimensions
**Design:** Always continuous and non-repetitive — never tiled
**Mounting:** Silicone up to 13', concealed screws above
**Backlight clearance:** 3" behind panel
**Backlight:** RGB color-changing with controller standard
**Material:** Corian — non-porous, Class A fire, repairable
**Exterior:** UV-rated, hurricane-tested, French cleat mounting

**Healthcare clients:** Cedars-Sinai, Jefferson Health, Orlando Health, Mayo Clinic, 40+ facilities
**Elite architects:** Gensler, HOK, HDR, Perkins & Will

Remember: You're Mara. Be warm, be knowledgeable, love the work. After 2-3 good exchanges, ask for their email to send more info.`;

const ASSETS = [
  // === PROJECTS ===
  {
    id: "1",
    title: "LAX American Airlines",
    sector: "Aviation",
    design: "Sand Dune",
    enhancement: "",
    color: "White",
    application: "Terminal Feature Wall",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773867/LAX_Passengers_-_Large_sw0nd8.jpg"
  },
  {
    id: "2",
    title: "Capital One Arena Bar",
    sector: "Sports",
    design: "Cloud",
    enhancement: "Backlight",
    color: "White",
    application: "Bar",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773872/COAT_Capital_One_Arena_VIP_Bar_-_Large_yplafr.png"
  },
  {
    id: "3",
    title: "Capital One Arena Vault",
    sector: "Sports",
    design: "Custom",
    enhancement: "Backlight",
    color: "White",
    application: "Storefront Entry",
    features: "Curved",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773871/Capital_One_Arena_-_Large_ule5uh.png"
  },
  {
    id: "4",
    title: "Jefferson Health",
    sector: "Healthcare",
    design: "Clouds",
    enhancement: "",
    color: "Glacier White",
    application: "Elevator Lobby",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773867/Jefferson_Health_Cloud_2_j5aojz.png"
  },
  {
    id: "5",
    title: "MRI Room Ceiling",
    sector: "Healthcare",
    design: "Custom",
    enhancement: "Backlight",
    color: "White",
    application: "Ceiling",
    features: "Metal-free for MRI",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773868/mri_room_ceiling_backlight_xgwsy0.png"
  },
  {
    id: "6",
    title: "LA Kings Locker Room",
    sector: "Sports",
    design: "Custom",
    enhancement: "",
    color: "Glacier White",
    application: "Ceiling Branding",
    architect: "Gensler",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773868/Kings_Locker-Crypto_Arena_-_Large_zdvtsh.jpg"
  },
  {
    id: "7",
    title: "Christ Journey Church",
    sector: "Religious",
    design: "Custom",
    enhancement: "",
    color: "White",
    application: "Exterior Facade",
    location: "Southern Florida",
    features: "Hurricane-rated, Thermoformed, French Cleat",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765771518/christ_journey_church_facade_2_-_Large_iigy6o.png"
  },
  {
    id: "8",
    title: "Toll Brothers Lindley",
    sector: "Multifamily",
    design: "Custom",
    enhancement: "",
    color: "Blue",
    application: "Exterior Facade",
    location: "San Diego",
    client: "Toll Brothers",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765771520/Toll_Brothers_Lindley_Facade_-_Large_j0k974.png"
  },
  {
    id: "9",
    title: "Jamboree Bridge",
    sector: "Exterior",
    design: "Custom",
    enhancement: "",
    color: "Dove Grey",
    application: "Facade Bridge",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765771521/Bridge-white-irvine_-_Large_kjkree.png"
  },
  {
    id: "10",
    title: "RGB Coral Wall",
    sector: "Commercial",
    design: "Coral",
    enhancement: "RGB Backlight",
    color: "White",
    application: "Feature Wall",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773870/RGB_programmable_new_design_coral_-_Large_bp1am2.jpg"
  },
  {
    id: "11",
    title: "Province Street",
    sector: "Hospitality",
    design: "Billow",
    enhancement: "Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765757415/45_Province_Street_-_Large_ram7w4.jpg"
  },
  {
    id: "12",
    title: "The Strand",
    sector: "Hospitality",
    design: "Billow",
    enhancement: "Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/The_Strand_Stair_6_-_Large_xmri0m.jpg"
  },
  {
    id: "13",
    title: "Hotel Lobby",
    sector: "Hospitality",
    design: "Billow",
    enhancement: "Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759405/Hotel_lobby_odb7dv.jpg"
  },
  {
    id: "14",
    title: "Morongo Ceiling",
    sector: "Hospitality",
    design: "Custom",
    enhancement: "RGB Backlight",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/morongo_Ceiling_Digital_Fabrication_-_Large_yw8rwj.jpg"
  },
  {
    id: "15",
    title: "Coastal Cliff Lobby",
    sector: "Corporate",
    design: "Mountain",
    enhancement: "",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/coastal-cliff-neutral-concrete-lobby-elevator-monolith-application.jfi_c31jdl.jpg"
  },
  {
    id: "16",
    title: "Amerihealth",
    sector: "Healthcare",
    design: "Droplet",
    enhancement: "",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/custom-droplet-white-stairs-fw-amerihealth-application-hero-good_ks7hfz.jpg"
  },
  {
    id: "17",
    title: "Mishka Boutique",
    sector: "Retail",
    design: "Custom",
    enhancement: "",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759402/Mishka_Dog_Boutique_-Retail_mkcfn2.jpg"
  },
  {
    id: "18",
    title: "Elm Street Water",
    sector: "Residential",
    design: "Lake",
    enhancement: "Backlight",
    application: "Water Feature",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/Elm_Street_Water_Feature_abc123.jpg"
  },
  {
    id: "19",
    title: "Quantum Wellness",
    sector: "Healthcare",
    design: "Custom",
    enhancement: "Backlight",
    application: "Branding Wall",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/video/upload/v1765773011/Quantum-Wellness-branding_ntok0l.mp4"
  }
];

const DRAWINGS = [
  {
    id: "d1",
    title: "Screw Plug Detail",
    desc: "Concealed fastener for walls over 13'",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765773867/screw_and_plug_detail_-_Large_sbsopc.jpg"
  },
  {
    id: "d2",
    title: "Backlight Install Detail",
    desc: "LED placement and installation",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/Backlight_Install_Wip_detail.jpe_xmaf6u.jpg"
  },
  {
    id: "d3",
    title: "Columns Detail",
    desc: "Column wrapping technique",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759400/columns-upscale_-_Large_mkpopy.jpg"
  },
  {
    id: "d4",
    title: "Fade Detail",
    desc: "Fades and switchplate integration",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/image/upload/v1765759401/Fade-detail-designoutlet_detyail-white-fade-switchplate-detail_zf6xx8.jpg"
  }
];

const VIDEOS = [
  {
    id: "v1",
    title: "LAX Installation",
    desc: "InterlockPanel puzzle system demo",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/video/upload/v1765772971/install_MR-LAX_720_-_puzzle_video_-_720_x_1280_m2ewcs.mp4"
  },
  {
    id: "v2",
    title: "Quantum Wellness",
    desc: "Branding wall with backlight",
    sector: "Healthcare/Wellness",
    thumbnail: "https://res.cloudinary.com/dtlodxxio/video/upload/v1765773011/Quantum-Wellness-branding_ntok0l.mp4"
  }
];

// ElevenLabs config
const ELEVENLABS_VOICE_ID = 'Z3R5wn05IrDiVCyEkUrK';

export default function Mara() {
  const [msgs, setMsgs] = useState([{
    role: 'a',
    text: "Hey! I'm Mara from MR Walls. I help architects and designers explore seamless architectural wall surfaces.\n\nAre you working on something specific, or just exploring what's possible?"
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

  const extractVideos = (text) => {
    const matches = text.match(/\[Video:\s*([^\]]+)\]/g) || [];
    return matches.map(m => {
      const name = m.match(/\[Video:\s*([^\]]+)\]/)[1].trim().toLowerCase();
      return VIDEOS.find(v => v.title.toLowerCase().includes(name) || name.includes(v.title.toLowerCase()));
    }).filter(Boolean);
  };

  const extractLinks = (text) => {
    // Find URLs and make them clickable
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-400 underline hover:text-blue-300">$1</a>');
  };

  const cleanResponse = (text) => {
    return text
      .replace(/\[Project:\s*[^\]]+\]/g, '')
      .replace(/\[Drawing:\s*[^\]]+\]/g, '')
      .replace(/\[Video:\s*[^\]]+\]/g, '')
      .trim();
  };

  // Text to Speech with ElevenLabs
  const speak = async (text) => {
    if (!voiceEnabled || !text) return;
    
    // Remove URLs from spoken text
    const textToSpeak = text.replace(/(https?:\/\/[^\s]+)/g, '').trim();
    
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
          text: textToSpeak,
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
      stopSpeaking();
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
        max_tokens: 250,
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
    stopSpeaking();

    try {
      const response = await callClaude(userText, history);
      const newHistory = [...history, { role: 'user', content: userText }, { role: 'assistant', content: response }];
      setHistory(newHistory);

      const projects = extractProjects(response);
      const drawings = extractDrawings(response);
      const videos = extractVideos(response);
      const cleanText = cleanResponse(response);

      setMsgs(m => [...m, {
        role: 'a',
        text: cleanText,
        results: projects.length > 0 ? projects : undefined,
        drawings: drawings.length > 0 ? drawings : undefined,
        videos: videos.length > 0 ? videos : undefined
      }]);

      if (voiceEnabled) {
        speak(cleanText);
      }
    } catch (error) {
      console.error('API Error:', error);
      const lower = userText.toLowerCase();
      let fallbackResults = [];
      let fallbackText = "Let me show you some of our work...";
      
      if (lower.includes('health') || lower.includes('medical') || lower.includes('hospital')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Healthcare');
        fallbackText = "Healthcare is one of our specialties. Here are some favorites — check out our full portfolio at https://mrwalls.io/healthcare";
      } else if (lower.includes('water')) {
        fallbackResults = ASSETS.filter(a => a.application?.includes('Water'));
        fallbackText = "Water features are where MR Walls really shines. The texture makes water dance...";
      } else if (lower.includes('exterior') || lower.includes('facade')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Exterior' || a.application?.includes('Facade'));
        fallbackText = "Our exterior work is UV-rated and hurricane-tested. Design meets durability...";
      } else if (lower.includes('hospit') || lower.includes('hotel') || lower.includes('lobby')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Hospitality');
        fallbackText = "Hospitality is where we really get to play. Let me show you some favorites...";
      } else if (lower.includes('backl') || lower.includes('glow') || lower.includes('light') || lower.includes('rgb')) {
        fallbackResults = ASSETS.filter(a => a.enhancement?.includes('Backlight') || a.enhancement?.includes('RGB'));
        fallbackText = "Backlighting transforms everything. Here are some that'll blow your mind...";
      } else if (lower.includes('corporate') || lower.includes('office')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Corporate');
      } else if (lower.includes('sport') || lower.includes('arena') || lower.includes('stadium')) {
        fallbackResults = ASSETS.filter(a => a.sector === 'Sports');
        fallbackText = "Sports venues need impact. Here's what we've done...";
      } else {
        fallbackResults = ASSETS.slice(0, 4);
      }

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
          <div className="w-8 h-8 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center text-xs font-bold tracking-tight">M|R</div>
          <div>
            <div className="font-medium">Mara</div>
            <div className="text-[10px] text-stone-500">MR Walls Design Assistant</div>
          </div>
        </div>
        
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
                <div dangerouslySetInnerHTML={{ 
                  __html: extractLinks(m.text)
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>') 
                }} />
                
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

              {/* Video Cards */}
              {m.videos && m.videos.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {m.videos.map((v, j) => (
                    <div key={j} className="bg-stone-900 rounded-lg border border-purple-900/50 overflow-hidden hover:border-purple-700 transition-all">
                      <div className="aspect-[4/3] bg-stone-800 overflow-hidden relative">
                        <video
                          src={v.thumbnail}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="text-xs font-medium truncate">{v.title}</div>
                        <div className="text-[10px] text-stone-500">{v.desc}</div>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-purple-900/50 text-purple-200 rounded">Video</span>
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
