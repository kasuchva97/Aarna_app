import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { speakText } from '../utils/audio';

const PoemViewer = ({ poemId, onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const poems = {
        // Telugu Poems
        'chandamama': {
            title: 'చందమామ',
            language: 'telugu',
            content: `చందమామ దూరంగా ఉన్నావు ఎందుకు?
చిన్న పిల్లలకోసం దిగి రాకు!
రాత్రి అంతా వెలుగు ఇవ్వావు,
తెల్లవారుఝామున దాక్కుంటావు.

వెండి వెలుగుతో మెరుస్తున్నావు,
చిన్న నక్షత్రాలతో ఆడుకుంటున్నావు.
ఆకాశంలో ఎత్తుగా కూర్చున్నావు,
మా కలల్లోకి వచ్చి వెళ్తున్నావు.`,
            meaning: 'అర్థం: ఈ కవిత చంద్రుడి అందం గురించి చెబుతుంది. చంద్రుడు ఎందుకు దూరంగా ఉంటాడో, అతను రాత్రి వేళ ఎలా వెలుగు ఇస్తాడో చిన్న పిల్లలకు తెలియజేస్తుంది.',
            illustration: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78'
        },
        'nani-pillalu': {
            title: 'నాని పిల్లలు',
            language: 'telugu',
            content: `నాని పిల్లలు ఆట ఆడుతున్నారు,
చిన్న చేతుల్తో తాళి కొట్టుకుంటున్నారు.
నవ్వుల్తో నిండిన ముఖాలు,
ఆనందంతో చేస్తున్న వింతలు.

అమ్మ చేసిన లాలి పాట విని,
తల్లి ప్రేమలో మునిగి తేలి,
కళ్లు మూసుకుని నిద్రపోతున్నారు,
కలల రాజ్యంలోకి వెళ్తున్నారు.`,
            meaning: 'అర్థం: ఈ కవిత చిన్న పిల్లల అమాయకత్వం గురించి చెబుతుంది. వారు ఎలా ఆట ఆడతారో, తల్లుల ప్రేమను ఎలా అనుభవిస్తారో తెలియజేస్తుంది.',
            illustration: 'https://images.unsplash.com/photo-1544776527-0818bd051bec'
        },
        'pakshulu': {
            title: 'పక్షులు',
            language: 'telugu',
            content: `పక్షులు ఆకాశంలో ఎగురుతున్నాయి,
తమ అందమైన రెక్కలతో ఎగురుతున్నాయి.
ఉదయం పాటతో నిద్ర లేపుతాయి,
సంతోషంగా కబుర్లు చెబుతాయి.

రంగు రంగుల ఈకలతో మురిపిస్తాయి,
చెట్ల కొమ్మలపై సేద తీరుతాయి.
స్వేచ్ఛగా, ఆనందంగా ఎగురుతూ,
మనసుకు సంతోషం కలుగుతుంది.`,
            meaning: 'అర్థం: ఈ కవిత పక్షుల అందం మరియు స్వేచ్ఛ గురించి వివరిస్తుంది. పక్షులు ఉదయం ఎలా పాడుతాయి మరియు వాటి రంగుల ఈకలు ఎలా ఉంటాయో చూపిస్తుంది.',
            illustration: 'https://images.unsplash.com/photo-1444464666168-49b626f8660e'
        },
        'pushpalu': {
            title: 'పుష్పాలు',
            language: 'telugu',
            content: `పుష్పాలు తోటలో ఎంతో అందం,
వాటి సువాసన మనసుకు ఎంతో ఆనందం.
ఎర్రని, పసుపు, కలువ, గులాబీ,
కన్నులకు ఎంతో మధురమైనవి.

తేనెటీగలు వాటి చుట్టూ తిరుగుతాయి,
తమ రెక్కలతో మధురం తాగుతాయి.
పుష్పాలు మనకి ఎన్నో నేర్పుతాయి,
జీవితంలో ఎంతో ఆనందాన్ని ఇస్తాయి.`,
            meaning: 'అర్థం: ఈ కవిత పూల అందం మరియు సువాసన గురించి చెబుతుంది. పూలు ఎలా ఆనందాన్ని ఇస్తాయో మరియు తేనెటీగలు వాటి చుట్టూ ఎలా తిరుగుతాయో చూపిస్తుంది.',
            illustration: 'https://images.unsplash.com/photo-1490750967868-88cb44cb2754'
        },
        'vana-jeevulu': {
            title: 'వన జీవులు',
            language: 'telugu',
            content: `వనంలో జీవులు ఎన్నో ఎన్నో,
సింహం గర్జన, పులి పరుగులు ఎన్నో.
కోతులు చెట్ల నుండి దూకుతున్నాయి,
ఏనుగులు గుంపుగా నడుస్తున్నాయి.

నక్కలు రాత్రి వేళ అరుస్తున్నాయి,
దుప్పులు పొదల్లో ఆడుతున్నాయి.
ప్రకృతిలో వీటి ఆటలు అందం,
అడవిలో జీవించడం వాటికెంతో బలం.`,
            meaning: 'అర్థం: ఈ కవిత అడవి జంతువుల స్వేచ్ఛాయుత జీవితం గురించి చెబుతుంది. వివిధ రకాల జంతువులు అడవిలో విలక్షణంగా ఎలా జీవిస్తాయో వివరిస్తుంది.',
            illustration: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735'
        },
        'varshalu': {
            title: 'వర్షాలు',
            language: 'telugu',
            content: `కారు మేఘాలు ఆకాశంలో,
చల్లని గాలులు భూతలంలో.
చినుకులు నేలకు పడుతున్నాయ్,
మట్టి వాసనతో మురిసిపోతున్నాయ్.

పచ్చని చెట్లు ఆనందిస్తున్నాయ్,
వాగులు వంకలు ఉరకలేస్తున్నాయ్.
పిల్లలు వానలో ఆడుతున్నాయ్,
జీవరాశులన్నీ పచ్చగా ఉంటున్నాయ్.`,
            meaning: 'అర్థం: ఈ కవిత వర్షం పడినప్పుడు ప్రకృతిలో వచ్చే మార్పులు మరియు ఆనందం గురించి వివరిస్తుంది. నేల మీద వర్షపు చుక్కల వల్ల పెరిగే మట్టి వాసన ఆకట్టుకుంటుంది.',
            illustration: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0'
        },

        // English Poems
        'twinkle-star': {
            title: 'Twinkle Twinkle Little Star',
            language: 'english',
            content: `Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a diamond in the sky.

Twinkle, twinkle, little star,
How I wonder what you are!

When the blazing sun is gone,
When he nothing shines upon,
Then you show your little light,
Twinkle, twinkle, all the night.`,
            meaning: 'Meaning: This classic nursery rhyme expresses wonder about stars. It teaches children to observe and appreciate the beauty of nature, especially the night sky filled with twinkling stars that look like diamonds.',
            illustration: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78'
        },
        'wheels-bus': {
            title: 'The Wheels on the Bus',
            language: 'english',
            content: `The wheels on the bus go round and round,
Round and round, round and round,
The wheels on the bus go round and round,
All through the town!

The wipers on the bus go swish, swish, swish,
Swish, swish, swish, swish, swish, swish,
The wipers on the bus go swish, swish, swish,
All through the town!

The horn on the bus goes beep, beep, beep,
Beep, beep, beep, beep, beep, beep,
The horn on the bus goes beep, beep, beep,
All through the town!`,
            meaning: 'Meaning: This fun song helps children learn about different parts of a bus and their sounds. It encourages movement and helps develop motor skills through actions that match the words.',
            illustration: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
        },
        'old-macdonald': {
            title: 'Old MacDonald Had a Farm',
            language: 'english',
            content: `Old MacDonald had a farm,
E-I-E-I-O.
And on that farm he had a cow,
E-I-E-I-O.
With a moo moo here,
And a moo moo there,
Here a moo, there a moo,
Everywhere a moo moo.
Old MacDonald had a farm,
E-I-E-I-O.

And on that farm he had a pig,
E-I-E-I-O...`,
            meaning: 'Meaning: This lively song introduces farm animals and the sounds they make, helping young ones practice memory and vocalizing various fun animal noises.',
            illustration: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30'
        },
        'humpty-dumpty': {
            title: 'Humpty Dumpty',
            language: 'english',
            content: `Humpty Dumpty sat on a wall,
Humpty Dumpty had a great fall;
All the king's horses and all the king's men
Couldn't put Humpty together again.`,
            meaning: 'Meaning: A classic rhyme about a fragile egg named Humpty. It metaphorically states that some things, once broken, cannot easily be put back together even by the strongest people.',
            illustration: 'https://images.unsplash.com/photo-1582215701449-36631ad1cc2e'
        },
        'mary-lamb': {
            title: 'Mary Had a Little Lamb',
            language: 'english',
            content: `Mary had a little lamb,
Its fleece was white as snow,
And everywhere that Mary went,
The lamb was sure to go.

It followed her to school one day,
Which was against the rule,
It made the children laugh and play,
To see a lamb at school.`,
            meaning: 'Meaning: The story highlights the strong bond between a young girl and her pet lamb, showcasing affection, loyalty, and the innocent surprise of bringing a pet into a school.',
            illustration: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73'
        },
        'baa-black-sheep': {
            title: 'Baa Baa Black Sheep',
            language: 'english',
            content: `Baa, baa, black sheep,
Have you any wool?
Yes, sir, yes, sir,
Three bags full;
One for the master,
And one for the dame,
And one for the little boy
Who lives down the lane.`,
            meaning: 'Meaning: A timeless nursery rhyme that brings imagery of rural life, sharing, and understanding where our warm wool clothes come from and the joy in generously providing for others.',
            illustration: 'https://images.unsplash.com/photo-1511252195979-4d6f851f5c6b'
        }
    };

    const poem = poems[poemId];

    if (!poem) return null;

    const toggleAudio = () => {
        if (isPlaying) {
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            const lang = poem.language === 'telugu' ? 'te-IN' : 'en-US';
            const utterance = speakText(poem.content, lang);
            if (utterance) {
                utterance.onend = () => setIsPlaying(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <Button onClick={onBack} className="mr-4 bg-white hover:bg-gray-100 text-purple-700 border-2 border-purple-300">
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Back
                    </Button>
                    <div className="flex-1 text-center pr-8">
                        <h1 className="text-3xl font-bold text-purple-700">{poem.title}</h1>
                    </div>
                </div>

                <Card className="max-w-3xl mx-auto p-8 shadow-2xl bg-white">
                    <div className="space-y-8">
                        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border-4 border-purple-100">
                            <img
                                src={poem.illustration}
                                alt={poem.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex justify-center mb-6">
                            <Button
                                onClick={toggleAudio}
                                className={`flex items-center space-x-2 px-8 py-4 rounded-full text-lg font-bold transition-all ${isPlaying
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200 border-2 border-red-300'
                                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
                                    }`}
                            >
                                {isPlaying ? (
                                    <>
                                        <VolumeX className="w-6 h-6" />
                                        <span>Stop Reading</span>
                                    </>
                                ) : (
                                    <>
                                        <Volume2 className="w-6 h-6" />
                                        <span>Read Aloud</span>
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="bg-purple-50 p-8 rounded-2xl border-2 border-purple-100 relative">
                            <div className="absolute top-4 left-4 text-4xl opacity-20 text-purple-600">"</div>
                            <div className="absolute bottom-4 right-4 text-4xl opacity-20 text-purple-600">"</div>
                            <pre className={`whitespace-pre-wrap text-center text-xl leading-loose font-medium ${poem.language === 'telugu' ? 'font-[\'Noto_Sans_Telugu\'] text-purple-800' : 'text-purple-800'
                                }`}>
                                {poem.content}
                            </pre>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400 mt-8">
                            <p className="text-lg text-blue-800 italic">
                                {poem.meaning}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PoemViewer;
