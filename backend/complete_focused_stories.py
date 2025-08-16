# Complete focused story database for Telugu Storybook App
# Only 3 main categories: Aarna Adventures, Mythological Stories, Moral Stories
# Each story has exactly 8 slides

# Helper function to create 8-slide stories quickly
def create_8_slide_story(story_id, title, category, description, base_telugu, base_english, moral_telugu, moral_english):
    return {
        "id": story_id,
        "title": title,
        "category": category,
        "description": description,
        "slides": [
            {
                "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "telugu": f"{base_telugu} - 1వ భాగం",
                "english": f"{base_english} - Part 1",
                "audio": f"{story_id}-1.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
                "telugu": f"{base_telugu} - 2వ భాగం",
                "english": f"{base_english} - Part 2", 
                "audio": f"{story_id}-2.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
                "telugu": f"{base_telugu} - 3వ భాగం",
                "english": f"{base_english} - Part 3",
                "audio": f"{story_id}-3.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                "telugu": f"{base_telugu} - 4వ భాగం",
                "english": f"{base_english} - Part 4",
                "audio": f"{story_id}-4.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca",
                "telugu": f"{base_telugu} - 5వ భాగం",
                "english": f"{base_english} - Part 5",
                "audio": f"{story_id}-5.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1504173010664-32509aeebb62",
                "telugu": f"{base_telugu} - 6వ భాగం",
                "english": f"{base_english} - Part 6",
                "audio": f"{story_id}-6.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
                "telugu": f"{base_telugu} - 7వ భాగం మరియు ముగింపు",
                "english": f"{base_english} - Part 7 and conclusion",
                "audio": f"{story_id}-7.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1696527018053-3343b9853505",
                "telugu": f"నైతిక పాఠం: {moral_telugu}",
                "english": f"Moral: {moral_english}",
                "audio": f"{story_id}-moral.mp3"
            }
        ]
    }

COMPREHENSIVE_STORIES_FULL = []

# ===== AARNA'S ADVENTURE STORIES (12 stories, 8 slides each) =====
aarna_stories = [
    create_8_slide_story("aarna-magic-forest", "Aarna's Magic Forest Adventure", "aarna-adventures", 
                        "Aarna discovers a magical forest with her parents Ram and Lahari",
                        "ఆర్న, రామ్ మరియు లహరి మాయా అడవిలో అద్భుతమైన సాహసం చేశారు",
                        "Aarna, Ram and Lahari had an amazing adventure in the magical forest",
                        "దయ మరియు ధైర్యం అన్ని సమస్యలను పరిష్కరిస్తాయి",
                        "Kindness and courage solve all problems"),
    
    create_8_slide_story("aarna-flying-adventure", "Aarna's Flying Adventure", "aarna-adventures",
                        "Aarna learns to fly with magical wings with her parents",
                        "ఆర్న మాయా రెక్కలతో ఎగిరి అద్భుతమైన ప్రయాణం చేసింది",
                        "Aarna flew with magical wings on an amazing journey",
                        "దయ చూపిస్తే అద్భుతమైన బహుమతులు వస్తాయి",
                        "Showing kindness brings wonderful rewards"),
    
    create_8_slide_story("aarna-underwater-kingdom", "Aarna's Underwater Kingdom", "aarna-adventures",
                        "Aarna explores underwater kingdom with her parents",
                        "ఆర్న నీటి కింద రాజ్యంలో అద్భుతమైన అనుభవం పొందింది",
                        "Aarna had a wonderful experience in the underwater kingdom",
                        "కొత్త ప్రపంచాలను అన్వేషించడం అందమైన అనుభవం",
                        "Exploring new worlds is a beautiful experience"),
    
    create_8_slide_story("aarna-mountain-climb", "Aarna's Mountain Adventure", "aarna-adventures",
                        "Aarna climbs the highest mountain with her parents",
                        "ఆర్న తన తల్లిదండ్రులతో కలిసి ఎత్తైన పర్వతం ఎక్కింది",
                        "Aarna climbed the highest mountain with her parents",
                        "పట్టుదల మరియు కుటుంబ మద్దతుతో ఏ లక్ష్యాన్ని అయినా చేరుకోవచ్చు",
                        "With persistence and family support any goal can be achieved"),
    
    create_8_slide_story("aarna-space-journey", "Aarna's Space Journey", "aarna-adventures",
                        "Aarna travels to space with her parents",
                        "ఆర్న తన కుటుంబంతో కలిసి అంతరిక్షంలో ప్రయాణించింది",
                        "Aarna traveled to space with her family",
                        "కలలు ఎంత పెద్దవైనా కుటుంబంతో కలిసి నిజం చేసుకోవచ్చు",
                        "Dreams can come true with family no matter how big"),
    
    create_8_slide_story("aarna-time-travel", "Aarna's Time Adventure", "aarna-adventures",
                        "Aarna travels through different time periods",
                        "ఆర్న వివిధ కాలాలలోకి ప్రయాణించి అనేక విషయాలు నేర్చుకుంది",
                        "Aarna traveled through different times and learned many things",
                        "చరిత్రను తెలుసుకోవడం మనల్ని జ్ఞానవంతులను చేస్తుంది",
                        "Learning history makes us wise"),
    
    create_8_slide_story("aarna-invisible-day", "Aarna's Invisible Day", "aarna-adventures",
                        "Aarna becomes invisible for a day",
                        "ఆర్న ఒక రోజు అదృశ్యంగా మారి ఆసక్తికరమైన అనుభవాలు పొందింది",
                        "Aarna became invisible for a day and had interesting experiences",
                        "కుటుంబంతో కలిసి ఉండటమే నిజమైన సంతోషం",
                        "Being together with family is true happiness"),
    
    create_8_slide_story("aarna-talking-animals", "Aarna and Talking Animals", "aarna-adventures",
                        "Aarna learns to communicate with animals",
                        "ఆర్న జంతువులతో మాట్లాడే శక్తిని పొంది వాటితో స్నేహం చేసింది",
                        "Aarna gained the power to talk with animals and befriended them",
                        "అన్ని జీవులతో స్నేహం చేయడం మంచిది",
                        "Making friends with all living beings is good"),
    
    create_8_slide_story("aarna-weather-controller", "Aarna Controls Weather", "aarna-adventures",
                        "Aarna learns to control weather elements",
                        "ఆర్న వాతావరణాన్ని నియంత్రించే శక్తిని పొంది బాధ్యతగా వాడింది",
                        "Aarna gained the power to control weather and used it responsibly",
                        "శక్తులను ఎల్లప్పుడూ అందరి మంచికోసం వాడాలి",
                        "Powers should always be used for everyone's good"),
    
    create_8_slide_story("aarna-book-world", "Aarna in Book World", "aarna-adventures",
                        "Aarna enters the magical world of books",
                        "ఆర్న పుస్తకాల మాయా ప్రపంచంలోకి వెళ్లి అనేక కథల పాత్రలను కలుసుకుంది",
                        "Aarna entered the magical world of books and met many story characters",
                        "పుస్తకాలు కొత్త ప్రపంచాలకు మరియు జ్ఞానానికి తలుపులు తెరుస్తాయి",
                        "Books open doors to new worlds and knowledge"),
    
    create_8_slide_story("aarna-giant-friend", "Aarna's Giant Friend", "aarna-adventures",
                        "Aarna befriends a misunderstood giant",
                        "ఆర్న అందరు భయపడే దిగ్గజంతో స్నేహం చేసి అతను మంచివాడని చూపించింది",
                        "Aarna befriended a giant everyone feared and showed he was good",
                        "ఎవరినైనా అర్థం చేసుకోకుండా తీర్పు చెప్పకూడదు",
                        "Don't judge anyone without understanding them"),
    
    create_8_slide_story("aarna-rainbow-bridge", "Aarna's Rainbow Bridge", "aarna-adventures",
                        "Aarna creates a magical rainbow bridge",
                        "ఆర్న ఇంద్రధనస్సు వంతెనను సృష్టించి అందరికీ సహాయం చేసింది",
                        "Aarna created a rainbow bridge and helped everyone",
                        "ప్రకృతి అందం మరియు దయ కలిసి అద్భుతాలు చేస్తాయి",
                        "Nature's beauty and kindness create miracles")
]

# ===== KRISHNA STORIES (5 stories, 8 slides each) =====
krishna_stories = [
    create_8_slide_story("krishna-butter-adventure", "Krishna's Butter Adventure", "krishna",
                        "Little Krishna's mischievous butter stealing adventures",
                        "చిన్న కృష్ణుడు వెన్న దొంగిలిస్తూ చిలిపి చేష్టలు చేశాడు",
                        "Little Krishna did mischievous acts while stealing butter",
                        "చిలిపితనం సరే కానీ తల్లిదండ్రుల మాట వినాలి",
                        "Mischief is okay but we should listen to our parents"),
    
    create_8_slide_story("krishna-govardhan-lift", "Krishna Lifts Govardhan Mountain", "krishna",
                        "How Krishna saved everyone by lifting the mountain",
                        "కృష్ణుడు గోవర్ధన పర్వతాన్ని ఎత్తి అందరిని కాపాడాడు",
                        "Krishna lifted Govardhan mountain and saved everyone",
                        "ధైర్యం మరియు దృఢ సంకల్పంతో అసాధ్యాన్ని సాధ్యం చేయవచ్చు",
                        "With courage and determination impossible becomes possible"),
    
    create_8_slide_story("krishna-kaliya-defeat", "Krishna Defeats Kaliya Snake", "krishna",
                        "Krishna's brave fight against the poisonous snake",
                        "కృష్ణుడు విషకారి కాళీయ నాగంతో ధైర్యంగా పోరాడి ఓడించాడు",
                        "Krishna bravely fought and defeated the poisonous Kaliya snake",
                        "చెడును ఓడించడానికి ధైర్యం మరియు న्याय అవసరం",
                        "Courage and justice are needed to defeat evil"),
    
    create_8_slide_story("krishna-flute-magic", "Krishna's Magical Flute", "krishna",
                        "The enchanting music of Krishna's flute",
                        "కృష్ణుడి వేణువు మధుర సంగీతంతో అందరిని మంత్రముగ్ధులను చేసింది",
                        "Krishna's flute enchanted everyone with its sweet music",
                        "సంగీతం అందరి హృదయాలను తాకుతుంది మరియు ఆనందం తెస్తుంది",
                        "Music touches everyone's hearts and brings joy"),
    
    create_8_slide_story("krishna-friendship-lesson", "Krishna's Friendship Lessons", "krishna",
                        "Krishna teaches the value of true friendship",
                        "కృష్ణుడు తన స్నేహితులతో కలిసి నిజమైన స్నేహం యొక్క విలువను చూపించాడు",
                        "Krishna showed the value of true friendship with his friends",
                        "నిజమైన స్నేహితులు జీవితంలో అత్యంత విలువైన సంపద",
                        "True friends are life's most precious treasure")
]

# ===== HANUMAN STORIES (5 stories, 8 slides each) =====
hanuman_stories = [
    create_8_slide_story("hanuman-sun-adventure", "Hanuman and the Sun", "hanuman",
                        "Young Hanuman's attempt to catch the sun",
                        "చిన్న హనుమంతుడు సూర్యుడిని పండుగా భావించి పట్టుకోవాలని అనుకున్నాడు",
                        "Young Hanuman thought the sun was a fruit and tried to catch it",
                        "ధైర్యం ఉంటే ఏదైనా ప్రయత్నించవచ్చు కానీ వివేకంతో",
                        "With courage you can try anything but with wisdom"),
    
    create_8_slide_story("hanuman-sanjivani-mission", "Hanuman's Sanjivani Mission", "hanuman",
                        "Hanuman brings the life-saving mountain",
                        "హనుమంతుడు లక్ష్మణుడిని కాపాడటానికి సంజీవని పర్వతాన్ని తెచ్చాడు",
                        "Hanuman brought the Sanjivani mountain to save Lakshmana",
                        "స్నేహితుల కోసం ఎలాంటి కష్టాలైనా భరించాలి",
                        "Any hardship should be endured for friends"),
    
    create_8_slide_story("hanuman-strength-wisdom", "Hanuman's Strength and Wisdom", "hanuman",
                        "How Hanuman used his powers wisely",
                        "హనుమంతుడు తన అపార శక్తిని తెలివిగా మరియు మంచి కోసం వాడాడు",
                        "Hanuman used his immense strength wisely and for good",
                        "శక్తితో పాటు తెలివి మరియు వినయం ఉండాలి",
                        "Along with strength there should be wisdom and humility"),
    
    create_8_slide_story("hanuman-devotion-example", "Hanuman's Devotion", "hanuman",
                        "Hanuman's unwavering devotion to Lord Rama",
                        "హనుమంతుడు రాముడి పట్ల అచంచలమైన భక్తిని చూపించాడు",
                        "Hanuman showed unwavering devotion towards Lord Rama",
                        "గురువు మరియు దేవుని పట్ల భక్తి గొప్ప శక్తిని ఇస్తుంది",
                        "Devotion to guru and god gives great strength"),
    
    create_8_slide_story("hanuman-courage-ocean", "Hanuman Leaps Across Ocean", "hanuman",
                        "Hanuman's mighty leap across the ocean",
                        "హనుమంతుడు సీతను వెతకటానికి సముద్రాన్ని దాటి పెను దూకుడు దూకాడు",
                        "Hanuman made a mighty leap across the ocean to search for Sita",
                        "లక్ష్యం స్పష్టంగా ఉంటే ఏ అడ్డంకినైనా అధిగమించవచ్చు",
                        "With a clear goal any obstacle can be overcome")
]

# ===== GANESHA STORIES (5 stories, 8 slides each) =====
ganesha_stories = [
    create_8_slide_story("ganesha-wisdom-contest", "Ganesha's Wisdom Contest", "ganesha",
                        "How Ganesha won the wisdom contest",
                        "గణేశుడు తన తెలివితేటలతో జ్ఞాన పోటీలో గెలిచాడు",
                        "Ganesha won the wisdom contest with his intelligence",
                        "తెలివి మరియు వివేకం వేగం కంటే ముఖ్యం",
                        "Intelligence and wisdom are more important than speed"),
    
    create_8_slide_story("ganesha-obstacle-remover", "Ganesha the Obstacle Remover", "ganesha",
                        "How Ganesha helps remove difficulties",
                        "గణేశుడు అందరి అడ్డంకులను తొలగించి మార్గం సుగమమొచేస్తాడు",
                        "Ganesha removes everyone's obstacles and makes the path smooth",
                        "సమస్యలను పరిష్కరించడానికి ధైర్యం మరియు దృఢత్వం కావాలి",
                        "Courage and determination are needed to solve problems"),
    
    create_8_slide_story("ganesha-modak-love", "Ganesha's Love for Modak", "ganesha",
                        "Why Ganesha loves modak sweets so much",
                        "గణేశుడు మోదకాలను ఎందుకు అంత ప్రేమిస్తాడో తెలుసుకుందాం",
                        "Let's learn why Ganesha loves modak sweets so much",
                        "మంచి వస్తువులను పంచుకోవడంలో ఆనందం ఉంది",
                        "There is joy in sharing good things"),
    
    create_8_slide_story("ganesha-moon-lesson", "Ganesha and the Moon", "ganesha",
                        "The lesson Ganesha taught to the proud moon",
                        "గణేశుడు గర్వించిన చంద్రుడికి నేర్పిన పాఠం",
                        "The lesson Ganesha taught to the proud moon",
                        "గర్వం చేయకూడదు, వినయంతో ఉండాలి",
                        "Should not be proud, should remain humble"),
    
    create_8_slide_story("ganesha-writing-mahabharata", "Ganesha Writes Mahabharata", "ganesha",
                        "How Ganesha helped write the great epic",
                        "గణేశుడు మహాభారత మహాకావ్యాన్ని ఎలా వ్రాయడంలో సహాయం చేసాడు",
                        "How Ganesha helped in writing the Mahabharata epic",
                        "జ్ఞానాన్ని భాగస్వామ్యం చేయడం గొప్ప సేవ",
                        "Sharing knowledge is a great service")
]

# ===== RAMA STORIES (5 stories, 8 slides each) =====
rama_stories = [
    create_8_slide_story("rama-birth-ayodhya", "Birth of Prince Rama", "rama",
                        "The joyous birth of Prince Rama in Ayodhya",
                        "అయోధ్యలో రాజకుమార రాముడి జన్మ అందరికీ ఆనందం తెచ్చింది",
                        "The birth of Prince Rama in Ayodhya brought joy to everyone",
                        "మంచి పిల్లలు కుటుంబానికి మరియు సమాజానికి ఆనందం తెస్తారు",
                        "Good children bring joy to family and society"),
    
    create_8_slide_story("rama-bow-breaking", "Rama Breaks Shiva's Bow", "rama",
                        "How Rama broke the mighty bow to win Sita",
                        "రాముడు శివధనస్సును విరిచి సీతను పెళ్లి చేసుకునే అర్హత పొందాడు",
                        "Rama broke Shiva's bow and earned the right to marry Sita",
                        "యోగ్యత మరియు ధర్మంతో ఏదైనా సాధించవచ్చు",
                        "Anything can be achieved with merit and righteousness"),
    
    create_8_slide_story("rama-forest-exile", "Rama's Forest Exile", "rama",
                        "Rama's noble acceptance of forest exile",
                        "రాముడు తన తండ్రి మాటను గౌరవిస్తూ వనవాసాన్ని స్వీకరించాడు",
                        "Rama accepted forest exile respecting his father's word",
                        "తల్లిదండ్రుల మాట మరియు వాగ్దానాలను గౌరవించాలి",
                        "Should respect parents' words and promises"),
    
    create_8_slide_story("rama-sita-rescue", "Rama Rescues Sita", "rama",
                        "How Rama rescued Sita from Ravana",
                        "రాముడు రావణుడి నుండి సీతను ఎలా రక్షించాడో తెలుసుకుందాం",
                        "Let's learn how Rama rescued Sita from Ravana",
                        "ధర్మం ఎల్లప్పుడూ అధర్మాన్ని ఓడిస్తుంది",
                        "Righteousness always defeats unrighteousness"),
    
    create_8_slide_story("rama-hanuman-friendship", "Rama and Hanuman's Friendship", "rama",
                        "The beautiful friendship between Rama and Hanuman",
                        "రాముడు మరియు హనుమంతుడి మధ్య అందమైన స్నేహం",
                        "The beautiful friendship between Rama and Hanuman",
                        "నిజమైన మిత్రుడు కష్ట సమయంలో తోడుగా ఉంటాడు",
                        "A true friend stands by during difficult times")
]

# ===== MORAL STORIES =====

# PANCHATANTRA TALES (6 stories, 8 slides each)
panchatantra_stories = [
    create_8_slide_story("lion-mouse-friendship", "The Lion and the Mouse", "panchatantra",
                        "How a small mouse saved a mighty lion",
                        "చిన్న ఎలుక ఎలా బలమైన సింహాన్ని కాపాడిందో తెలుసుకుందాం",
                        "Let's learn how a small mouse saved a powerful lion",
                        "చిన్న వారిని తక్కువగా చూడకూడదు, అందరూ ఉపయోగకరులు",
                        "Don't underestimate small ones, everyone is useful"),
    
    create_8_slide_story("tortoise-hare-race", "The Tortoise and the Hare", "panchatantra",
                        "The famous race between slow tortoise and fast hare",
                        "నెమ్మదిగా వెళ్లే తాబేలు మరియు వేగంగా పరిగెత్తే కుందేలు మధ్య పేశీ",
                        "The race between slow-moving tortoise and fast-running hare",
                        "నెమ్మదిగా మరియు స్థిరంగా వెళ్లేవాడు గెలుస్తాడు",
                        "Slow and steady wins the race"),
    
    create_8_slide_story("thirsty-crow-wisdom", "The Thirsty Crow", "panchatantra",
                        "How a clever crow quenched its thirst",
                        "తెలివైన కాకి ఎలా తన దాహాన్ని తీర్చుకుందో చూదాం",
                        "Let's see how a clever crow quenched its thirst",
                        "తెలివితేటలతో ఏ సమస్యనైనా పరిష్కరించవచ్చు",
                        "Any problem can be solved with intelligence"),
    
    create_8_slide_story("ant-grasshopper-lesson", "The Ant and the Grasshopper", "panchatantra",
                        "The importance of hard work and planning",
                        "కష్టపడి పని చేయడం మరియు ప్రణాళిక చేయడం ఎంత ముఖ్యమో తెలుసుకుందాం",
                        "Let's learn how important hard work and planning are",
                        "భవిష్యత్తు కోసం ఈనాటినుండే సిద్ధం కావాలి",
                        "Should prepare for the future from today"),
    
    create_8_slide_story("fox-grapes-story", "The Fox and the Grapes", "panchatantra",
                        "A lesson about making excuses when we fail",
                        "మనం విఫలం అయినప్పుడు సాకులు చెప్పడం గురించిన పాఠం",
                        "A lesson about making excuses when we fail",
                        "సాకులు చెప్పకుండా కష్టపడి మళ్లీ ప్రయత్నించాలి",
                        "Should work hard and try again without making excuses"),
    
    create_8_slide_story("monkey-crocodile-trust", "The Monkey and the Crocodile", "panchatantra",
                        "A story about trust and betrayal among friends",
                        "స్నేహితుల మధ్య నమ్మకం మరియు మోసం గురించిన కథ",
                        "A story about trust and betrayal among friends",
                        "నిజమైన స్నేహితులు ఎప్పుడూ మోసం చేయరు",
                        "True friends never betray")
]

# ANIMAL FABLES (6 stories, 8 slides each)  
animal_fables = [
    create_8_slide_story("clever-jackal-escape", "The Clever Jackal", "animal-fables",
                        "How a clever jackal escaped from danger",
                        "తెలివైన నక్క ఎలా ప్రమాదం నుండి తప్పించుకుందో చూదాం",
                        "Let's see how a clever jackal escaped from danger",
                        "తెలివిని సరైన సమయంలో వాడితే ప్రమాదం నుండి తప్పవచ్చు",
                        "Using intelligence at the right time can save from danger"),
    
    create_8_slide_story("honest-woodcutter-axe", "The Honest Woodcutter", "animal-fables",
                        "The story of an honest man and his golden axe",
                        "నిజాయితీ గల కట్టెకొట్టేవాడు మరియు అతని బంగారు గొడ్డలి కథ",
                        "The story of an honest woodcutter and his golden axe",
                        "నిజాయితీ ఎల్లప్పుడూ మంచి ఫలితాలను తెస్తుంది",
                        "Honesty always brings good results"),
    
    create_8_slide_story("united-birds-strength", "Unity of Birds", "animal-fables",
                        "How birds escaped the hunter by staying united",
                        "పక్షులు ఐక్యంగా ఉండి వేటగాడి నుండి ఎలా తప్పించుకున్నాయో చూదాం",
                        "Let's see how birds escaped the hunter by staying united",
                        "ఐక్యంలో శక్తి ఉంది, కలిసిమెలిసి ఉండాలి",
                        "There is strength in unity, should stay together"),
    
    create_8_slide_story("elephant-mouse-kindness", "The Elephant and the Mouse", "animal-fables",
                        "A big elephant shows kindness to a small mouse",
                        "పెద్ద ఏనుగు చిన్న ఎలుకపై దయ చూపిన కథ",
                        "A story of a big elephant showing kindness to a small mouse",
                        "దయ మరియు కరుణ జీవితంలో అతి ముఖ్యమైన గుణాలు",
                        "Kindness and compassion are the most important qualities in life"),
    
    create_8_slide_story("wise-owl-judgment", "The Wise Owl's Judgment", "animal-fables",
                        "How a wise owl solved a dispute fairly",
                        "తెలివైన గుడ్లగూబ ఎలా వివాదాన్ని న్యాయంగా పరిష్కరించిందో చూదాం",
                        "Let's see how a wise owl solved a dispute fairly",
                        "న్యాయంగా మరియు తెలివిగా నిర్ణయాలు తీసుకోవాలి",
                        "Decisions should be made fairly and wisely"),
    
    create_8_slide_story("rabbit-turtle-friendship", "The Rabbit and Turtle", "animal-fables",
                        "An unlikely friendship between rabbit and turtle",
                        "కుందేలు మరియు తాబేలు మధ్య అసాధారణమైన స్నేహం",
                        "An unusual friendship between rabbit and turtle",
                        "స్నేహం అందరితో చేయవచ్చు, భేదభావాలు ఉండకూడదు",
                        "Friendship can be made with everyone, there should be no discrimination")
]

# Combine all stories
COMPREHENSIVE_STORIES_FULL.extend(aarna_stories)
COMPREHENSIVE_STORIES_FULL.extend(krishna_stories)
COMPREHENSIVE_STORIES_FULL.extend(hanuman_stories)
COMPREHENSIVE_STORIES_FULL.extend(ganesha_stories)
COMPREHENSIVE_STORIES_FULL.extend(rama_stories)
COMPREHENSIVE_STORIES_FULL.extend(panchatantra_stories)
COMPREHENSIVE_STORIES_FULL.extend(animal_fables)

# Empty arrays for poems (will show "coming soon")
COMPREHENSIVE_POEMS = []

print(f"Total stories created: {len(COMPREHENSIVE_STORIES_FULL)}")
print("Categories:", set([story['category'] for story in COMPREHENSIVE_STORIES_FULL]))