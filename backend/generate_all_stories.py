#!/usr/bin/env python3
"""
Generate all missing stories for the Telugu Storybook App
This script creates comprehensive story data for all categories
"""

import json

# Base story template
def create_story(story_id, title, category, description, telugu_text, english_text, moral_telugu, moral_english):
    return {
        "id": story_id,
        "title": title,
        "category": category,
        "description": description,
        "slides": [
            {
                "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "telugu": telugu_text,
                "english": english_text,
                "audio": f"{story_id}-1.mp3"
            },
            {
                "image": "https://images.unsplash.com/photo-1696527018053-3343b9853505", 
                "telugu": f"నైతిక పాఠం: {moral_telugu}",
                "english": f"Moral: {moral_english}",
                "audio": f"{story_id}-moral.mp3"
            }
        ]
    }

# Aarna Stories (12 stories) - Already complete
aarna_stories = [
    create_story("aarna-magic-forest", "Aarna's Magic Forest", "aarna-adventures", "Magical forest adventure", "ఆర్న మాయా అడవిలో సాహసం చేసింది.", "Aarna had adventure in magic forest.", "ధైర్యం మరియు దయ మహాశక్తి.", "Courage and kindness are powerful."),
    create_story("aarna-flying-adventure", "Aarna's Flying Adventure", "aarna-adventures", "Flying with magical wings", "ఆర్న మాయా రెక్కలతో ఎగిరింది.", "Aarna flew with magical wings.", "దయ అద్భుత బహుమతులు తెస్తుంది.", "Kindness brings wonderful rewards."),
    create_story("aarna-underwater-kingdom", "Aarna's Underwater Kingdom", "aarna-adventures", "Underwater adventure", "ఆర్న నీటి కింద రాజ్యంలో సాహసం చేసింది.", "Aarna adventured in underwater kingdom.", "కొత్త ప్రపంచాలను అన్వేషించడం అందం.", "Exploring new worlds is beautiful."),
    create_story("aarna-mountain-climb", "Aarna's Mountain Adventure", "aarna-adventures", "Mountain climbing", "ఆర్న పర్వతాలను ఎక్కింది.", "Aarna climbed mountains.", "పట్టుదలతో లక్ష్యాలు చేరుకోవచ్చు.", "Goals can be achieved with persistence."),
    create_story("aarna-space-journey", "Aarna's Space Journey", "aarna-adventures", "Space travel", "ఆర్న అంతరిక్షంలో ప్రయాణించింది.", "Aarna traveled in space.", "కలలు ఎంత పెద్దవైనా నిజం చేసుకోవచ్చు.", "Dreams can come true no matter how big."),
    create_story("aarna-time-travel", "Aarna's Time Adventure", "aarna-adventures", "Time travel", "ఆర్న కాలయానంలో వెళ్లింది.", "Aarna traveled through time.", "చరిత్రను తెలుసుకోవడం జ్ఞానం.", "Knowing history brings wisdom."),
    create_story("aarna-invisible-day", "Aarna's Invisible Day", "aarna-adventures", "Becoming invisible", "ఆర్న అదృశ్యంగా మారింది.", "Aarna became invisible.", "కుటుంబంతో ఉండటమే నిజమైన సంతోషం.", "Being with family is true happiness."),
    create_story("aarna-talking-animals", "Aarna and Talking Animals", "aarna-adventures", "Speaking with animals", "ఆర్న జంతువులతో మాట్లాడింది.", "Aarna talked with animals.", "అన్ని జీవులతో స్నేహం చేయడం మంచిది.", "Befriending all beings is good."),
    create_story("aarna-weather-controller", "Aarna Controls Weather", "aarna-adventures", "Controlling weather", "ఆర్న వాతావరణాన్ని నియంత్రించింది.", "Aarna controlled weather.", "శక్తులను బాధ్యతగా వాడాలి.", "Powers should be used responsibly."),
    create_story("aarna-book-world", "Aarna in Book World", "aarna-adventures", "Entering books", "ఆర్న పుస్తక ప్రపంచంలో వెళ్లింది.", "Aarna entered book world.", "పుస్తకాలు కొత్త ప్రపంచాలకు తీసుకెళ్తాయి.", "Books take us to new worlds."),
    create_story("aarna-giant-friend", "Aarna's Giant Friend", "aarna-adventures", "Befriending a giant", "ఆర్న దిగ్గజంతో స్నేహం చేసింది.", "Aarna befriended a giant.", "అర్థం చేసుకుని స్నేహం చేయాలి.", "Understand and make friends."),
    create_story("aarna-rainbow-bridge", "Aarna's Rainbow Bridge", "aarna-adventures", "Rainbow bridge", "ఆర్న ఇంద్రధనస్సు వంతెన చేసింది.", "Aarna made rainbow bridge.", "ప్రకృతి అందం ఆనందం ఇస్తుంది.", "Nature's beauty brings joy.")
]

# Krishna Stories (12 stories)
krishna_stories = [
    create_story("krishna-butter", "Krishna and Butter", "krishna", "Butter adventures", "కృష్ణుడు వెన్న తిన్నాడు.", "Krishna ate butter.", "తల్లిదండ్రుల మాట వినాలి.", "Listen to parents."),
    create_story("krishna-govardhan", "Krishna Lifts Mountain", "krishna", "Lifting Govardhan", "కృష్ణుడు పర్వతాన్ని ఎత్తాడు.", "Krishna lifted mountain.", "ధైర్యంతో అసాధ్యం సాధ్యం.", "With courage impossible becomes possible."),
    create_story("krishna-kaliya", "Krishna and Kaliya Snake", "krishna", "Defeating the snake", "కృష్ణుడు కాళీయ నాగంతో పోరాడాడు.", "Krishna fought Kaliya snake.", "చెడును ఓడించాలి.", "Evil must be defeated."),
    create_story("krishna-cowherd", "Krishna the Cowherd", "krishna", "With the cows", "కృష్ణుడు ఆవులను మేపాడు.", "Krishna grazed cows.", "జంతువులను ప్రేమించాలి.", "Love animals."),
    create_story("krishna-flute", "Krishna's Magic Flute", "krishna", "Playing flute", "కృష్ణుడు వేణువు వాయించాడు.", "Krishna played flute.", "సంగీతం అందరినీ సంతోషపెడుతుంది.", "Music makes everyone happy."),
    create_story("krishna-radha", "Krishna and Radha", "krishna", "Friendship with Radha", "కృష్ణుడు రాధతో స్నేహం చేసాడు.", "Krishna befriended Radha.", "నిజమైన స్నేహం విలువైనది.", "True friendship is precious."),
    create_story("krishna-peacock", "Krishna and Peacock", "krishna", "With peacocks", "కృష్ణుడు నెమళ్లతో ఆడాడు.", "Krishna played with peacocks.", "ప్రకృతితో స్నేహం చేయాలి.", "Be friends with nature."),
    create_story("krishna-mother", "Krishna and Mother", "krishna", "With mother Yashoda", "కృష్ణుడు తల్లిని ప్రేమించాడు.", "Krishna loved his mother.", "తల్లిని గౌరవించాలి.", "Respect mother."),
    create_story("krishna-friends", "Krishna and Friends", "krishna", "Playing with friends", "కృష్ణుడు స్నేహితులతో ఆడాడు.", "Krishna played with friends.", "స్నేహితులు విలువైనవారు.", "Friends are precious."),
    create_story("krishna-river", "Krishna and River", "krishna", "By the river", "కృష్ణుడు నదితీరంలో ఆడాడు.", "Krishna played by river.", "నీరు జీవానికి అవసరం.", "Water is essential for life."),
    create_story("krishna-dancing", "Krishna's Dance", "krishna", "Joyful dancing", "కృష్ణుడు ఆనందంగా నృత్యం చేసాడు.", "Krishna danced joyfully.", "ఆనందం పంచుకోవాలి.", "Share happiness."),
    create_story("krishna-stars", "Krishna and Stars", "krishna", "Watching stars", "కృష్ణుడు నక్షత్రాలను చూశాడు.", "Krishna watched stars.", "కలలు కనడం మంచిది.", "Dreaming is good.")
]

# Hanuman Stories (12 stories)
hanuman_stories = [
    create_story("hanuman-sun", "Hanuman and Sun", "hanuman", "Trying to eat sun", "హనుమంతుడు సూర్యుడిని తినాలని అనుకున్నాడు.", "Hanuman wanted to eat the sun.", "ధైర్యం ఉంటే ఏదైనా సాధ్యం.", "With courage anything is possible."),
    create_story("hanuman-sanjivani", "Hanuman Brings Medicine", "hanuman", "Bringing healing mountain", "హనుమంతుడు మందు కోసం పర్వతాన్ని తెచ్చాడు.", "Hanuman brought mountain for medicine.", "స్నేహితులకు సహాయం చేయాలి.", "Help friends in need."),
    create_story("hanuman-strength", "Hanuman's Strength", "hanuman", "Showing great strength", "హనుమంతుడు గొప్ప బలవంతుడు.", "Hanuman was very strong.", "శక్తిని మంచికోసం వాడాలి.", "Use strength for good."),
    create_story("hanuman-leap", "Hanuman's Great Leap", "hanuman", "Jumping across ocean", "హనుమంతుడు సముద్రం దాటి దూకాడు.", "Hanuman leaped across ocean.", "నమ్మకంతో అంతా సాధ్యం.", "With faith everything is possible."),
    create_story("hanuman-tail", "Hanuman's Burning Tail", "hanuman", "Tail catches fire", "హనుమంతుడి తోక మంటలు అవ్వబెట్టాడు.", "Hanuman's tail caught fire.", "కోపాన్ని శక్తిగా మార్చాలి.", "Turn anger into strength."),
    create_story("hanuman-devotion", "Hanuman's Devotion", "hanuman", "Devotion to Rama", "హనుమంతుడు రాముడిని భక్తితో పూజించాడు.", "Hanuman worshipped Rama with devotion.", "భక్తి గొప్ప శక్తి.", "Devotion is great power."),
    create_story("hanuman-mountain", "Hanuman Carries Mountain", "hanuman", "Carrying mountain", "హనుమంతుడు పర్వతాన్ని మోసుకున్నాడు.", "Hanuman carried the mountain.", "సేవ చేయడం గొప్పది.", "Service is great."),
    create_story("hanuman-wisdom", "Hanuman's Wisdom", "hanuman", "Showing wisdom", "హనుమంతుడు తెలివిగా సమస్యలు పరిష్కరించాడు.", "Hanuman wisely solved problems.", "తెలివితో పని చేయాలి.", "Work with wisdom."),
    create_story("hanuman-courage", "Hanuman's Courage", "hanuman", "Being courageous", "హనుమంతుడు ధైర్యంగా పోరాడాడు.", "Hanuman fought courageously.", "ధైర్యం గొప్ప గుణం.", "Courage is a great quality."),
    create_story("hanuman-humility", "Hanuman's Humility", "hanuman", "Being humble", "హనుమంతుడు వినయంతో ఉన్నాడు.", "Hanuman was humble.", "వినయం గొప్ప శక్తి.", "Humility is great strength."),
    create_story("hanuman-loyalty", "Hanuman's Loyalty", "hanuman", "Being loyal", "హనుమంతుడు రాముడికి నమ్మకంగా ఉన్నాడు.", "Hanuman was loyal to Rama.", "నమ్మకం విలువైనది.", "Loyalty is precious."),
    create_story("hanuman-prayer", "Hanuman's Prayer", "hanuman", "Praying devotedly", "హనుమంతుడు భక్తితో ప్రార్థన చేసాడు.", "Hanuman prayed devotedly.", "ప్రార్థన మనస్సును శుద్ధి చేస్తుంది.", "Prayer purifies the mind.")
]

# Generate all stories
all_stories = []
all_stories.extend(aarna_stories)
all_stories.extend(krishna_stories)
all_stories.extend(hanuman_stories)

print(f"Generated {len(all_stories)} stories")
print("Sample story:", json.dumps(all_stories[0], indent=2))