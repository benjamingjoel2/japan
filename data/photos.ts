// Photo library: maps each image slot's subject (see Media.subject) to an Unsplash photo.
// Edit by hand to swap a picture. Photos are used under the Unsplash License
// (https://unsplash.com/license) and hotlinked from Unsplash's CDN. To use your own photography,
// set `src` on the media item instead; it takes precedence.

export type Photo = { photo: string; alt: string; photographer: string };

export const photos: Record<string, Photo> = {
  // destination:tokyo
  "Narrow lane in Yanaka at 7am, potted plants outside a wooden house, a bicycle leaning on the wall": { photo: 'photo-1712189777547-a717b9e3498e', alt: "Narrow Tokyo back lane lined with potted plants and a parked bicycle", photographer: "mos design" },
  // destination:kyoto
  "Light through maple leaves, Tōfuku-ji, 7am": { photo: 'photo-1593765257879-76c7e24f84a9', alt: "Sunlight glowing through red and orange maple leaves", photographer: "Bbb xzh" },
  // destination:nara
  "Stone lanterns covered in moss along the approach to Kasuga Taisha, early morning mist": { photo: 'photo-1767314049495-d85444741302', alt: "Row of moss-topped stone lanterns along a shrine approach", photographer: "Alex Wicks" },
  // destination:kanazawa
  "Rope supports on pine trees in Kenroku-en after fresh snow, grey morning": { photo: 'photo-1773910355314-55204cc7b0ee', alt: "Pine trees with yukitsuri rope supports reflected in a garden pond", photographer: "Juan Lagunas" },
  // destination:takayama-alps
  "Steam rising from an outdoor bath under snow-dusted cedars, the Alps behind, dusk": { photo: 'photo-1745395602855-edd5232e3445', alt: "Snow-covered wooden onsen inns lit up at night", photographer: "Chen Li" },
  // destination:hakone-fuji
  "Mount Fuji at first light above Lake Shōji, mist on the water, a single rowboat": { photo: 'photo-1557160619-022267aac8c6', alt: "Snow-capped Mount Fuji above a calm lake with a small boat", photographer: "Gregoire Jeanneau" },
  // destination:kiso-valley
  "Stone path through cedar forest on the Nakasendō between Magome and Tsumago, autumn morning": { photo: 'photo-1702662661527-25ad66f96e7b', alt: "Cobbled stone path winding through a cedar forest", photographer: "JP Sheard" },
  // destination:koyasan
  "Lantern-lit path among moss-covered gravestones and tall cedars at Okunoin, dusk": { photo: 'photo-1772251366055-1b24bd313969', alt: "Wooden steps through a dark, mossy graveyard of old stone monuments", photographer: "Ryo Harianto" },
  // destination:kumano-kodo
  "Mossy stone steps under tall cedars on the Nakahechi trail, soft rain": { photo: 'photo-1638941898135-3313187f99e0', alt: "Mossy stone steps climbing through a cedar forest", photographer: "Susann Schuster" },
  // destination:naoshima
  "Calm Inland Sea at dusk from a Naoshima beach, small islands in silhouette": { photo: 'photo-1741786215271-8c55ad5ed59b', alt: "Calm sea at dusk with island silhouettes on the horizon", photographer: "wwonderlust.com" },
  // destination:hiroshima-miyajima
  "The torii of Itsukushima Shrine at high tide, early evening, lanterns lit on the shore": { photo: 'photo-1632058344149-a63558efd5fe', alt: "The great torii of Itsukushima standing in the water at dusk", photographer: "MARIOLA GROBELSKA" },
  // destination:hokkaido
  "Outdoor bath in heavy snowfall, birch trees behind, steam and blue evening light": { photo: 'photo-1761929586535-589bc67b34a2', alt: "Snow falling on a roofed outdoor hot spring at blue hour", photographer: "hiding ninja" },
  // destination:okinawa
  "Sand street on Taketomi between coral stone walls and red-tiled roofs, evening": { photo: 'photo-1583827260547-96b01fbf44b9', alt: "Red-tiled roofs of a Taketomi village under summer clouds", photographer: "Hiroko Yoshii" },
  // destination:kyushu
  "Lanterns along the river in Kurokawa onsen at night, steam and wooden inns": { photo: 'photo-1706017595998-91459e6bfd4e', alt: "Wooden onsen inns above a river lit with lanterns at dusk", photographer: "Nichika Sakurai" },
  // stay:yuzuriha:0
  "Tatami room opening onto a small moss garden, paper screens half open, morning light": { photo: 'photo-1780239570942-5658737e90d3', alt: "Tatami room with open shoji looking onto a garden", photographer: "Umanoide" },
  // stay:yuzuriha:1
  "Seasonal kaiseki course on lacquer trays, a single maple leaf as garnish": { photo: 'photo-1740982931610-9309b6e88f30', alt: "Japanese multi-course meal of sashimi and small dishes on a dark table", photographer: "Zion C" },
  // stay:kinari-machiya:0
  "Lattice front of a Kyoto townhouse at dusk, a paper lantern lit by the door": { photo: 'photo-1771877538970-a8273438df6b', alt: "Wooden lattice entrance of a traditional townhouse lit by a lamp at night", photographer: "Chrishaun Byrom" },
  // stay:kinari-machiya:1
  "Small courtyard garden with stone basin and camellia, seen from the engawa": { photo: 'photo-1765637846804-a105087fad2d', alt: "Stone water basin with a bamboo spout in a garden", photographer: "Nhi Ly" },
  // stay:hoshi-no-in:0
  "Monk sweeping a raked gravel garden at dawn, temple hall behind, cedar mist": { photo: 'photo-1730312095282-614da37d448c', alt: "Raked gravel and moss garden with a maple on a foggy day", photographer: "Richard Hedrick" },
  // stay:hoshi-no-in:1
  "Shōjin ryōri on red lacquer trays: sesame tofu, tempura, pickles": { photo: 'photo-1547559101-69ffc8762cb2', alt: "Simple Japanese meal of rice, soup and vegetables on a wooden tray", photographer: "Takafumi Yamashita" },
  // stay:kumo-no-yu:0
  "Private stone bath on a wooden veranda, cedars and snow beyond, steam at dusk": { photo: 'photo-1773423386572-4ad451dc6c26', alt: "Wood-panelled private bath with a window onto a snowy landscape", photographer: "Clay Banks" },
  // stay:kumo-no-yu:1
  "River fish grilling on skewers around a sunken irori hearth": { photo: 'photo-1785594023808-ca9f3cfa9e71', alt: "Skewered river fish grilling over hot coals", photographer: "Diana Bondarenko" },
  // stay:shirakaba:0
  "Outdoor bath set in a snowbank, birch trunks behind, falling snow at blue hour": { photo: 'photo-1708630283392-678476d547f8', alt: "Wooden hot tub set in deep snow with forested hills behind", photographer: "Barnabas Davoti" },
  // stay:shirakaba:1
  "Hot-pot bubbling on a table by a frosted window": { photo: 'photo-1682496178113-6275890f1fd7', alt: "Steaming hot pot of vegetables and broth on a table burner", photographer: "You Le" },
  // stay:sumi-house:0
  "Charred cedar facade on a narrow Tokyo street at dusk, warm light from a window": { photo: 'photo-1774177873629-4174653c2f5b', alt: "Dark weathered timber facade with two small windows", photographer: "Yanhao Fang" },
  // stay:sumi-house:1
  "Hotel room with plaster walls, low oak bed and a window onto tiled roofs": { photo: 'photo-1783014619882-0e9ee99f0a20', alt: "Minimal bedroom with a low wooden bed, white linen and a warm lamp", photographer: "Stephen Pontes" },
  // stay:nagi:0
  "Cypress bath on a balcony above a forested gorge, morning steam": { photo: 'photo-1783094724116-ff5f8362a581', alt: "Round wooden soaking tub on a bamboo-screened deck above green forest", photographer: "Kris Tian" },
  // stay:nagi:1
  "Ryokan room at night, futon laid out, paper lamp, rain on the window": { photo: 'photo-1753021366304-bba1d015947f', alt: "Futon with white bedding in a dim tatami room with shoji and a ceramic jar in the alcove", photographer: "sandy" },
  // stay:tsuta-machiya:0
  "Wooden townhouse with red ivy on the side wall, autumn morning, Kanazawa": { photo: 'photo-1684695414975-2f14316c70e8', alt: "Lane of old wooden townhouses with a red-lacquered wall in Kanazawa", photographer: "Artem Shuba" },
  // stay:tsuta-machiya:1
  "Tatami room with a lacquer tray in the alcove, gold-leaf door pull catching light": { photo: 'photo-1753552502151-93914d36ecf2', alt: "Tatami room with a tokonoma alcove holding a hanging scroll and a bonsai", photographer: "Jens F" },
  // stay:shiosai:0
  "Long window onto a calm Inland Sea at dusk, linen bed in the foreground": { photo: 'photo-1786343453509-391ec6cd3225', alt: "Futon beneath a window looking out over a calm bay with small islands", photographer: "Fidel Fernando" },
  // stay:shiosai:1
  "Bicycles leaning on a concrete wall in morning sun, sea behind": { photo: 'photo-1690813818666-a620b875cb16', alt: "Bicycle parked by a harbour fence with the sea and breakwater beyond", photographer: "Tunafish" },
  // stay:hinoki-juku:0
  "Wooden post-town inn at dusk, lanterns lit, stone path in front": { photo: 'photo-1771773563156-2f32863f2c7c', alt: "Traditional wooden inn at dusk with glowing lanterns and lit windows", photographer: "Mateo Krossler" },
  // stay:hinoki-juku:1
  "Trout grilling around a sunken hearth, smoke and lamplight": { photo: 'photo-1746173898835-0685992f8880', alt: "Old farmhouse interior with an irori hearth and shafts of light through smoke", photographer: "Gabrigel" },
  // journey:kyoto-nara-slowly
  "Light through maple leaves on the wooden bridge at Tōfuku-ji, 7am, no people": { photo: 'photo-1766569590212-c90427762f69', alt: "Kyoto temple garden in autumn, red maples around a pond and stone bridge", photographer: "Dmitri Zotov" },
  // journey:the-old-roads
  "Moss-covered stone steps through tall cedar on the Kumano Kodo, morning mist": { photo: 'photo-1638941898135-3313187f99e0', alt: "Moss-covered stone steps climbing through tall cedar forest on the Kumano Kodo", photographer: "Susann Schuster" },
  // journey:art-islands-inland-sea
  "Calm Inland Sea at dusk from Naoshima, small islands fading in layers": { photo: 'photo-1786177475782-a94444e3c13b', alt: "Calm, hazy Inland Sea with a distant conical island and layered islands", photographer: "Ziv Tsau" },
  // journey:blossom-season
  "Weeping cherry over a still garden pond, Kyoto, soft morning light": { photo: 'photo-1777648921946-06870206787c', alt: "Byodo-in temple hall reflected in its pond, with weeping cherries in bloom", photographer: "Ryan Moorhouse" },
  // journey:autumn-in-the-alps
  "Golden larch and snow-dusted Hotaka peaks above the Azusa River, Kamikōchi, early morning": { photo: 'photo-1731614046129-273e33741d3c', alt: "Golden autumn larches below the rugged Hotaka peaks above the Azusa River, Kamikochi", photographer: "mahiru dake" },
  // journey:snow-and-onsen
  "Steam rising from an outdoor onsen under snow-laden birch trees, blue hour": { photo: 'photo-1761929586535-589bc67b34a2', alt: "Snow-capped roof over an outdoor hot spring at blue hour, lamps glowing", photographer: "hiding ninja" },
  // journey:first-time-done-well
  "Empty vermilion gates at Fushimi Inari, 6:30am, soft light": { photo: 'photo-1697238151322-a2c8164f1e5e', alt: "Empty tunnel of vermilion torii gates at Fushimi Inari", photographer: "Mario Häfliger" },
  // journey:craft-japan
  "Potter’s hands shaping a bowl on a wheel, wet clay, window light": { photo: 'photo-1507022787381-b30170b5ebf4', alt: "Potter's clay-covered hand shaping a pot on a spinning wheel", photographer: "ritesh singh" },
  // faq:0:0
  "Shinkansen gliding past rice fields, early summer": { photo: 'photo-1777026050794-a5e4ef7cd254', alt: "Shinkansen bullet train speeding past with Mount Fuji behind, motion blur", photographer: "Spenser Sembrat" },
  // faq:0:1
  "Suitcase with a courier tag at a ryokan entrance": { photo: 'photo-1790328604071-b481a1102592', alt: "Wooden sliding doors at a traditional inn entrance reflecting a courtyard garden", photographer: "Kouji Tsuru" },
  // faq:1:0
  "Paper train tickets and a timetable on a station bench": { photo: 'photo-1772616370524-4739cf5cff6d', alt: "Quiet rural station platform with tracks curving into misty countryside", photographer: "Tsuyoshi Kozu" },
  // faq:1:1
  "Local two-carriage train crossing a river valley in autumn": { photo: 'photo-1769645406832-b79bc284b264', alt: "Small local train passing through a hillside of red and orange autumn trees", photographer: "Hat Trick" },
  // faq:2:0
  "Row of shoes neatly lined up at a genkan step": { photo: 'photo-1786343453482-631b8dde86c9', alt: "Shoes lined up on the wooden step of a traditional Japanese entryway", photographer: "Fidel Fernando" },
  // faq:2:1
  "Quiet train carriage, morning light through the window": { photo: 'photo-1775799237678-a360c066e63a', alt: "View of the sea through a train window from a quiet carriage", photographer: "realfish" },
  // faq:3:0
  "Innkeeper bowing at a doorway as guests leave, morning": { photo: 'photo-1760243875137-16143b2761ee', alt: "Entrance of a traditional Japanese inn with white noren curtains", photographer: "PJH" },
  // faq:3:1
  "Small wrapped gift on a lacquer tray": { photo: 'photo-1791620050914-9822a7a1eb46', alt: "Colourful wagashi sweets on a patterned dish over red lacquer", photographer: "Supradoc" },
  // faq:4:0
  "Private wooden onsen tub on a balcony overlooking a valley": { photo: 'photo-1785057707880-777f72acea8f', alt: "Bather seen from behind in a wooden tub on a balcony overlooking hills and sea", photographer: "Loris Boulinguez" },
  // faq:4:1
  "Steam over an outdoor stone bath, early evening": { photo: 'photo-1734244362947-749db3efc7b7', alt: "Steam rising from a milky outdoor stone bath beside wooden pavilions", photographer: "Kouji Tsuru" },
  // faq:5:0
  "Shōjin ryōri vegetarian temple meal on red lacquer trays": { photo: 'photo-1569912815867-5580004c13a2', alt: "Japanese meal on a dark tray with a red lacquer bowl, teapot and lidded boxes", photographer: "Richard Iwaki" },
  // faq:5:1
  "Hand-written allergy card beside a bowl of rice": { photo: 'photo-1680137248876-6ad53db8caef', alt: "A white bowl of rice on a dark wooden table", photographer: "Seiya Maeda" },
  // faq:6:0
  "Coins in a small wooden tray at a shop counter": { photo: 'photo-1638879706487-646f8631b0a2', alt: "Japanese yen coins resting on a banknote", photographer: "Franck V." },
  // faq:6:1
  "Convenience store glowing at night on a quiet street": { photo: 'photo-1716947375981-73b1b0886a71', alt: "A FamilyMart convenience store glowing on a dark, empty street at night", photographer: "Frank Huang" },
  // faq:7:0
  "Phone showing a map, held on a forest trail": { photo: 'photo-1604357209793-fca5dca89f97', alt: "A hand holding a phone showing a map on a forest road in autumn", photographer: "Tamas Tuzes-Katai" },
  // faq:7:1
  "Window seat on a train, phone and a cup of tea on the tray": { photo: 'photo-1635934901493-f45dd956d4b6', alt: "Mount Fuji framed by a train window above fields and houses", photographer: "Yu" },
  // faq:8:0
  "Single cherry tree in blossom beside a farmhouse, early morning": { photo: 'photo-1680789593983-b4c663aae931', alt: "A single cherry tree in full blossom beside rural farmhouses", photographer: "あま あわれ" },
  // faq:8:1
  "Snow on a thatched roof, Hokkaido or the Alps, blue hour": { photo: 'photo-1644836512182-977899856efe', alt: "Snow-laden thatched gassho farmhouse reflected in a pond", photographer: "Hyungman Jeon" },
  // faq:9:0
  "Empty torii path at dawn, light mist": { photo: 'photo-1763092806297-b2ea9763f118', alt: "A weathered wooden torii gate standing in thick fog", photographer: "Sudhan Chitgopkar" },
  // faq:9:1
  "Quiet side street in Kyoto, wooden facades, early morning": { photo: 'photo-1784863086592-c607144c57a8', alt: "A quiet, curving street lined with traditional wooden houses", photographer: "PJH" },
  // faq:10:0
  "Passport and boarding pass on a wooden table, morning light": { photo: 'photo-1454496406107-dc34337da8d6', alt: "A passport resting on a boarding pass", photographer: "Nicole Geri" },
  // faq:10:1
  "Aircraft wing over Mount Fuji in winter": { photo: 'photo-1712986909414-51c06991384a', alt: "An aircraft wing above the clouds with snow-capped Mount Fuji beyond", photographer: "Matt Mutlu" },
  // faq:11:0
  "Child feeding deer in a park in Nara, morning": { photo: 'photo-1771600129053-81725e13bae9', alt: "A young spotted deer eating from an outstretched hand in a park", photographer: "Jivan Garcha" },
  // faq:11:1
  "Family in yukata walking an onsen town street at dusk": { photo: 'photo-1644413600587-cdd220fa24f1', alt: "A figure in yukata walking past lit shopfronts on an onsen-town street at night", photographer: "Roméo A." },
  // faq:12:0
  "Calendar and fountain pen on a desk beside a cup of green tea": { photo: 'photo-1675453988015-304184957af2', alt: "A notebook, pen and cup of green tea on a wooden desk", photographer: "Kawê Rodrigues" },
  // faq:12:1
  "Hand-written journey plan in a notebook, pressed maple leaf": { photo: 'photo-1603217661507-748a59f8bc69', alt: "A red maple leaf resting on the pages of an open book", photographer: "Lan Gao" },
  // quote
  "Older woman in a muted kimono arranging a single camellia in an alcove, soft window light": { photo: 'photo-1599031425762-838bd43d4f66', alt: "A spare ikebana arrangement of branches in a ceramic vase on a wooden shelf", photographer: "五玄土 ORIENTO" },
  // kyoto-week:day1
  "Tatami room opening onto a moss garden, late afternoon light, a cup of tea on the floor": { photo: 'photo-1785641891348-bb5704866af3', alt: "A tatami room opening onto a lush green moss garden", photographer: "Zion C" },
  // kyoto-week:day2
  "Empty wooden bridge at Tōfuku-ji, 6:45am, maple canopy, soft mist": { photo: 'photo-1610238115511-81be15284155', alt: "A covered wooden walkway framed by vivid autumn maples in a Kyoto temple garden", photographer: "Samuel Berner" },
  // kyoto-week:day3
  "Deep green moss garden at Sanzen-in, Ōhara, small stone jizō figures, overcast morning": { photo: 'photo-1508384429315-7cf06f2792bb', alt: "Small stone jizo figures nestled in deep green moss at Sanzen-in", photographer: "Jordy Meow" },
  // kyoto-week:day4
  "Wooden lattice front of a Kyoto machiya at dusk, a paper lantern lit by the door": { photo: 'photo-1786561210585-b64186edaa63', alt: "A narrow stone lane at night leading to a wooden doorway with a lantern, Kyoto", photographer: "Stefan Szankowski" },
  // kyoto-week:day5
  "Thatched roofs along a quiet lane in Saga-Toriimoto, autumn afternoon": { photo: 'photo-1766201479573-0871ef24b180', alt: "A thatched roof rising behind blazing red autumn maples", photographer: "Dat Tran" },
  // kyoto-week:day6
  "Deer resting on grass in Nara Park at first light, temple roof behind": { photo: 'photo-1791433238077-67f23b33651e', alt: "A spotted deer resting on a stone wall before a great temple roof in Nara", photographer: "Wenhao Ruan" },
  // kyoto-week:day7
  "Ancient wooden pagoda at Hōryū-ji against a pale morning sky": { photo: 'photo-1653966237558-56e964d33f5d', alt: "An ancient unpainted wooden five-storey pagoda among tall cedars", photographer: "Dennis Peterson" },
  // included:Private guides
  "Guide and traveller on a moss path, Ōhara, early morning": { photo: 'photo-1790138779621-ee88b532506b', alt: "Two people seen from behind walking a shaded forest path in Nara", photographer: "Martin Makaryan" },
  // included:Seasonal dining
  "Chef placing a bamboo shoot dish on a cypress counter, Kyoto": { photo: 'photo-1783192485626-bebb12b2f24a', alt: "A chef's hands preparing food on a pale wooden counter", photographer: "Stephen Pontes" },
  // included:Tea & craft
  "Hands whisking matcha in a rough ceramic bowl, tatami room": { photo: 'photo-1759933164283-ab161f34bd02', alt: "Hands whisking bright green matcha in a rustic ceramic bowl", photographer: "adrien lopes" },
  // included:Onsen
  "Steam rising from an outdoor stone bath at dusk, cedar forest": { photo: 'photo-1761929586535-589bc67b34a2', alt: "Covered outdoor hot spring bath in snow at dusk, lamps glowing", photographer: "hiding ninja" },
  // included:Luggage forwarding
  "Traveller with a light daypack on an empty rural platform, Kiso Valley": { photo: 'photo-1788508601000-81e5c175cf60', alt: "A quiet rural train platform with fallen leaves beside a wooden house", photographer: "Jong Hyuk Lee" },
  // included:Your specialist on call
  "Phone resting on a ryokan writing desk beside a paper lantern": { photo: 'photo-1759310708340-90eba93e94e4', alt: "Traditional Japanese room with a hanging paper lantern, low desk and garden view", photographer: "5010" },
  // ryokan:Arrival
  "Shoji sliding open onto a garden from a tatami room, late afternoon": { photo: 'photo-1682787283049-d37de81646b4', alt: "Tatami room with lattice doors open onto a garden, late sun across the mats", photographer: "Mmoka ." },
  // ryokan:The bath
  "Outdoor stone bath at dusk, steam against dark cedars": { photo: 'photo-1707327085506-c4f31c951a1a', alt: "Steaming wooden bath lit by warm lamps at night", photographer: "hyun kim" },
  // ryokan:Kaiseki
  "Kaiseki course on lacquer and ceramic, autumn leaf garnish, low light": { photo: 'photo-1766582931800-fd79665257fa', alt: "A ryokan kaiseki dinner: sashimi, chawanmushi and small seasonal dishes", photographer: "Yosuke Ota" },
  // ryokan:Futon
  "Futon laid on tatami under a paper lamp, night": { photo: 'photo-1754668122695-7b32062f339f', alt: "Futon laid out in a traditional Japanese room under a round paper lamp", photographer: "sandy" },
  // ryokan:Morning
  "Morning mist over a ryokan garden, stone lantern, wet moss": { photo: 'photo-1779681359835-efafd4690cd9', alt: "Stone lantern among pines and shrubs in a soft, overcast Japanese garden", photographer: "Maria Maraboli" },
  // team:Aiko Morimoto
  "Woman in a linen jacket on a temple veranda, northern Kyoto, soft morning light": { photo: 'photo-1768967550282-1219315d67ac', alt: "Wooden temple veranda overlooking green maples", photographer: "Tiange Xiang" },
  // team:Kenta Hayashi
  "Man standing in a narrow lane of wooden teahouses, Kanazawa, overcast": { photo: 'photo-1767951446064-efd2bbaff037', alt: "Narrow stone-paved lane between old wooden teahouses", photographer: "Ale" },
  // team:Mayumi Tanaka
  "Woman with a walking stick on mossy stone steps among tall cedars": { photo: 'photo-1783936122316-b4373e84c70a', alt: "Moss-edged stone steps climbing through a sunlit cedar forest", photographer: "Red Shuheart" },
  // team:Hannah Clarke
  "Woman at a desk with a paper map of Japan and a ceramic cup, London window light": { photo: 'photo-1516546453174-5e1098a4b4af', alt: "Hands with a pen, notebook, coloured pencils and glasses over a paper city map", photographer: "oxana v" },
  // team:Shota Ishikawa
  "Man pouring sake at a cedar counter, small Tokyo bar, warm evening light": { photo: 'photo-1663870316273-48b6058e712d', alt: "Warmly lit bar shelves lined with sake bottles above a wooden counter", photographer: "Yosuke Ota" },
  // component
  "Maple canopy, Kyoto, early morning": { photo: 'photo-1638360450571-ae436de8f33e', alt: "Red and green maple leaves backlit against a bright sky", photographer: "yamasa-n" },
  // component
  "Lanterns lit along a ryokan entrance at dusk, rain on stone": { photo: 'photo-1780748804695-f73b50d47642', alt: "Traditional entrance with noren and glowing lanterns over a wet stone path at night", photographer: "PJH" },
  // component
  "Mountain temple veranda in morning mist, Kōyasan": { photo: 'photo-1766586591422-deae3b8d217c', alt: "Old Japanese temple among misty trees", photographer: "Yosuke Ota" },
  // component
  "Walking a cedar path on the Kumano Kodo, morning mist": { photo: 'photo-1783841480031-0e93c7c0d908', alt: "Stone stairs climbing through tall cedars in morning fog", photographer: "Jeffrey" },
  // component
  "Guide and guest crossing a stone bridge, Nakasendō, autumn": { photo: 'photo-1670942174064-b615b24d9672', alt: "Wet stone street of wooden post-town houses with autumn trees and misty hills", photographer: "Rory McKeever" },
  // component
  "Machiya lattice at dusk, Kyoto": { photo: 'photo-1718621339279-b9eb50e6e194', alt: "Kyoto machiya with wooden lattice and lit noren doorway at dusk", photographer: "Viviana Nysaether" },
  // component
  "Tatami room opening onto a moss garden, sliding doors drawn back": { photo: 'photo-1569415097250-f2911a7ad61f', alt: "Tatami room open onto a green moss garden, a figure seated at the edge seen from behind", photographer: "Hideki Nishiyama" },
  // component
  "A gardener sweeping moss under maples, Kyoto, 6:50am": { photo: 'photo-1758432169225-216a407c181f', alt: "Small figure working in a Japanese garden among old trees", photographer: "PJH" },
  // component
  "Light through maple leaves, Kyoto, 7am": { photo: 'photo-1670598669307-bcbad6b83727', alt: "Sunlight glowing through red Japanese maple leaves", photographer: "Yuka Tanaka" },
  // component
  "Komorebi: light through maple leaves onto a moss garden, Kyoto, early morning": { photo: 'photo-1745387932185-c8aea68dedbc', alt: "Dappled sunlight on a moss garden beneath trees", photographer: "Syadza Salsabyla" },
  // journal
  "Your First Night in a Ryokan": { photo: 'photo-1759310706740-e486ec5622c9', alt: "Dark ryokan room with a paper lantern and shoji open onto a garden", photographer: "5010" },
  // journal
  "Kyoto Without the Crowds": { photo: 'photo-1786551282761-21192624460e', alt: "Empty wooden walkway beside a moss garden and temple pavilion, Kyoto", photographer: "Stefan Szankowski" },
  // journal
  "Japan’s 72 Seasons, Explained": { photo: 'photo-1784639446645-db40ff7191a4', alt: "Narrow river lined with cherry blossoms and old buildings", photographer: "Ana Ku" },
  // journal
  "Walking the Kumano Kodo": { photo: 'photo-1745405797061-9c0ffd94a905', alt: "Path through a tall cedar forest with dappled light", photographer: "Michael Bai" },
};
