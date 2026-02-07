export type Mood = 'romantic' | 'cute' | 'funny' | 'emotional'

export interface MessageTemplate {
  id: string
  mood: Mood
  template: string
  category: string
}

export const messageTemplates: MessageTemplate[] = [
  // Romantic messages
  { id: 'r1', mood: 'romantic', template: 'My dearest {partnerName}, every moment with you feels like a beautiful dream. You are my heart\'s desire, now and forever. With all my love, {yourName}', category: 'love' },
  { id: 'r2', mood: 'romantic', template: '{partnerName}, you are the poetry my heart writes when words fail me. I love you more than stars love the night sky. Forever yours, {yourName}', category: 'poetic' },
  { id: 'r3', mood: 'romantic', template: 'To my {partnerName}: In a world of billions, my heart chose you. You are my soulmate, my best friend, my everything. Love always, {yourName}', category: 'soulmate' },
  { id: 'r4', mood: 'romantic', template: '{partnerName}, with you, I\'ve found a love that I never knew existed. You complete me in ways I never thought possible. Eternally yours, {yourName}', category: 'deep' },
  { id: 'r5', mood: 'romantic', template: 'My beloved {partnerName}, you are the sunrise that brightens my every morning and the moon that lights up my nights. All my love, {yourName}', category: 'nature' },
  { id: 'r6', mood: 'romantic', template: '{partnerName}, if I had to choose between breathing and loving you, I would use my last breath to say I love you. Forever, {yourName}', category: 'intense' },
  { id: 'r7', mood: 'romantic', template: 'To the love of my life, {partnerName}: You make my heart skip beats, my mind race, and my soul sing. I am completely yours. - {yourName}', category: 'passionate' },
  { id: 'r8', mood: 'romantic', template: '{partnerName}, our love story is my favorite. Every chapter with you is more beautiful than the last. Can\'t wait for our forever. Love, {yourName}', category: 'story' },
  { id: 'r9', mood: 'romantic', template: 'My darling {partnerName}, you are not just my Valentine, you are my everyday. My heart belongs to you. With deepest love, {yourName}', category: 'commitment' },
  { id: 'r10', mood: 'romantic', template: '{partnerName}, falling in love with you was the best thing that ever happened to me. You are my destiny. Yours completely, {yourName}', category: 'destiny' },
  { id: 'r11', mood: 'romantic', template: 'Sweet {partnerName}, your love is like oxygen to my soul. I cannot imagine a world without you in it. All my heart, {yourName}', category: 'essential' },
  { id: 'r12', mood: 'romantic', template: '{partnerName}, you are the melody to my heart\'s song, the rhyme to my poetry. I love you infinitely. - {yourName}', category: 'musical' },
  { id: 'r13', mood: 'romantic', template: 'To my precious {partnerName}: Every love song makes sense when I think of you. You are my forever Valentine. Adoringly, {yourName}', category: 'songs' },
  { id: 'r14', mood: 'romantic', template: '{partnerName}, in your eyes, I found my home. In your heart, I found my love. In you, I found my everything. - {yourName}', category: 'home' },
  { id: 'r15', mood: 'romantic', template: 'My {partnerName}, you are the missing piece I never knew I needed. Together, we are complete. Forever and always, {yourName}', category: 'complete' },
  { id: 'r16', mood: 'romantic', template: '{partnerName}, they say love is blind, but with you, I see everything clearly. You are my vision of perfection. Love, {yourName}', category: 'clarity' },
  { id: 'r17', mood: 'romantic', template: 'Dearest {partnerName}, if loving you is wrong, I never want to be right. You are my beautiful addiction. Passionately, {yourName}', category: 'addiction' },
  { id: 'r18', mood: 'romantic', template: '{partnerName}, you are the reason I believe in magic. Your love has transformed my world. Enchanted by you, {yourName}', category: 'magic' },
  { id: 'r19', mood: 'romantic', template: 'My angel {partnerName}, heaven must be missing you because you bring paradise to my life every day. Devotedly, {yourName}', category: 'heaven' },
  { id: 'r20', mood: 'romantic', template: '{partnerName}, in the arithmetic of love, one plus one equals everything, and two minus one equals nothing. I need you. - {yourName}', category: 'math' },
  { id: 'r21', mood: 'romantic', template: 'My {partnerName}, you are the reason I wake up with a smile and go to sleep with gratitude. You are my blessing. Forever, {yourName}', category: 'gratitude' },
  { id: 'r22', mood: 'romantic', template: '{partnerName}, in a world full of temporary things, you are my forever. I choose you today, tomorrow, and always. - {yourName}', category: 'forever' },

  // Cute messages
  { id: 'c1', mood: 'cute', template: 'Hey {partnerName}! 🐻 You\'re the peanut butter to my jelly, and I can\'t imagine my sandwich without you! Hugs, {yourName}', category: 'food' },
  { id: 'c2', mood: 'cute', template: '{partnerName}, if you were a vegetable, you\'d be a cute-cumber! 🥒 Just wanted you to know you make my heart smile. - {yourName}', category: 'puns' },
  { id: 'c3', mood: 'cute', template: 'Boop! 👆 Just wanted to remind you, {partnerName}, that you\'re the cutest human I know. Sending you all the cuddles! - {yourName}', category: 'playful' },
  { id: 'c4', mood: 'cute', template: '{partnerName}! 🌸 You light up my world like nobody else. The way you smile gets me overwhelmed! Your biggest fan, {yourName}', category: 'admiration' },
  { id: 'c5', mood: 'cute', template: 'Hey cutie pie {partnerName}! 🥧 Just a reminder that you\'re sweeter than any dessert. Save some sweetness for me! - {yourName}', category: 'sweet' },
  { id: 'c6', mood: 'cute', template: '{partnerName}, you\'re like a teddy bear - warm, cuddly, and I want to squeeze you forever! 🧸 Huggles, {yourName}', category: 'cuddly' },
  { id: 'c7', mood: 'cute', template: 'Psst... {partnerName}! 🌈 Just wanted to say you\'re rainbow-levels of amazing. Stay magical! - Your {yourName}', category: 'magical' },
  { id: 'c8', mood: 'cute', template: '{partnerName}! 🦋 You give me butterflies every time I see you. Is it legal to be this adorable? - {yourName}', category: 'butterflies' },
  { id: 'c9', mood: 'cute', template: 'To my little sunshine {partnerName} ☀️: You brighten every day just by existing. Keep being your awesome self! - {yourName}', category: 'sunshine' },
  { id: 'c10', mood: 'cute', template: '{partnerName}, if cuteness was a crime, you\'d get a life sentence! 🚔 Guilty of stealing my heart. - {yourName}', category: 'crime' },
  { id: 'c11', mood: 'cute', template: 'Hey {partnerName}! 🐾 You had me at hello, and now I\'m completely paw-sitively in love with you! - {yourName}', category: 'pets' },
  { id: 'c12', mood: 'cute', template: '{partnerName}! 🍪 Are you a cookie? Because you\'re sweet, irresistible, and I want more of you! - {yourName}', category: 'cookies' },
  { id: 'c13', mood: 'cute', template: 'Knock knock, {partnerName}! 🚪 Who\'s there? Adore. Adore who? I adore you more than anything! - {yourName}', category: 'jokes' },
  { id: 'c14', mood: 'cute', template: '{partnerName}, you\'re like wifi - I feel connected to you everywhere I go! 📶 Best connection ever. - {yourName}', category: 'tech' },
  { id: 'c15', mood: 'cute', template: 'Hey {partnerName}! 🌟 You\'re not just a star, you\'re the whole galaxy to me. Shine on, beautiful! - {yourName}', category: 'stars' },
  { id: 'c16', mood: 'cute', template: '{partnerName}! 🧁 Life is sweet, but you make it even sweeter. You\'re my favorite flavor! - {yourName}', category: 'cupcake' },
  { id: 'c17', mood: 'cute', template: 'To {partnerName} 🐙: You\'ve got my heart wrapped up in eight arms of love. You\'re octo-mazing! - {yourName}', category: 'ocean' },
  { id: 'c18', mood: 'cute', template: '{partnerName}! 🎈 You make my heart float like a balloon. Don\'t ever let me come down! - {yourName}', category: 'balloons' },
  { id: 'c19', mood: 'cute', template: 'Hey {partnerName}! 🌻 You\'re my sunshine, my only sunshine. You make me happy when skies are gray! - {yourName}', category: 'flower' },
  { id: 'c20', mood: 'cute', template: '{partnerName}, you\'re like a favorite song - I want to play you on repeat forever! 🎵 - {yourName}', category: 'music' },
  { id: 'c21', mood: 'cute', template: 'Hey {partnerName}! 🍰 You\'re sweeter than cake, cuter than kittens, and I\'m totally obsessed! - {yourName}', category: 'obsessed' },
  { id: 'c22', mood: 'cute', template: '{partnerName}! 💫 You make my heart do the happy dance every single day! Keep being amazing! - {yourName}', category: 'dance' },

  // Funny messages
  { id: 'f1', mood: 'funny', template: '{partnerName}, I love you more than pizza, and that\'s saying something! 🍕 You\'re my extra cheese. - {yourName}', category: 'pizza' },
  { id: 'f2', mood: 'funny', template: 'Hey {partnerName}! Are you a parking ticket? Because you\'ve got FINE written all over you! 🎫 - Your smooth operator, {yourName}', category: 'pickup' },
  { id: 'f3', mood: 'funny', template: '{partnerName}, I\'d share my food with you. Yes, EVEN my fries. That\'s how much I love you. 🍟 - {yourName}', category: 'fries' },
  { id: 'f4', mood: 'funny', template: 'Dear {partnerName}, roses are red, violets are blue, I\'m not great at poems, but dang you\'re cute! - {yourName}', category: 'poem' },
  { id: 'f5', mood: 'funny', template: '{partnerName}! You\'re the avocado to my toast. 🥑 Expensive, trendy, and I simply can\'t get enough! - {yourName}', category: 'avocado' },
  { id: 'f6', mood: 'funny', template: 'Hey {partnerName}, I love you with all my butt. I would say heart, but my butt is bigger! 🍑 - {yourName}', category: 'cheeky' },
  { id: 'f7', mood: 'funny', template: '{partnerName}, you\'re like my phone charger - I\'d die without you! 🔋 (Okay, maybe a bit dramatic) - {yourName}', category: 'charger' },
  { id: 'f8', mood: 'funny', template: 'To {partnerName}: They say nothing lasts forever. Will you be my nothing? 😂 Cheesy but true! - {yourName}', category: 'forever' },
  { id: 'f9', mood: 'funny', template: '{partnerName}, are you made of copper and tellurium? Because you\'re Cu-Te! 🔬 Nerdy love, {yourName}', category: 'science' },
  { id: 'f10', mood: 'funny', template: 'Hey {partnerName}! I think you\'re suffering from a lack of vitamin ME! 💊 Doctor\'s orders: more {yourName} time!', category: 'vitamin' },
  { id: 'f11', mood: 'funny', template: '{partnerName}, I love you even when I\'m hangry. That\'s true love right there! 😤❤️ - {yourName}', category: 'hangry' },
  { id: 'f12', mood: 'funny', template: 'To {partnerName}: Are you a bank loan? Because you\'ve got my interest! 💰 - Your investor, {yourName}', category: 'finance' },
  { id: 'f13', mood: 'funny', template: '{partnerName}! On a scale of 1 to 10, you\'re a 9 and I\'m the 1 you need! 🔢 Math checks out. - {yourName}', category: 'numbers' },
  { id: 'f14', mood: 'funny', template: 'Hey {partnerName}, do you have a map? I keep getting lost in your eyes! 🗺️ (And also I\'m bad with directions) - {yourName}', category: 'lost' },
  { id: 'f15', mood: 'funny', template: '{partnerName}, you\'re hotter than the bottom of my laptop! 💻🔥 And that thing gets REALLY hot. - {yourName}', category: 'laptop' },
  { id: 'f16', mood: 'funny', template: 'Dear {partnerName}: I love you like Kanye loves Kanye. And that\'s a LOT of love! - {yourName}', category: 'kanye' },
  { id: 'f17', mood: 'funny', template: '{partnerName}! If you were a triangle, you\'d be acute one! 📐 Geometry never looked so good. - {yourName}', category: 'geometry' },
  { id: 'f18', mood: 'funny', template: 'Hey {partnerName}, are you a magician? Because whenever I look at you, everyone else disappears! 🎩✨ - {yourName}', category: 'magic' },
  { id: 'f19', mood: 'funny', template: '{partnerName}, I\'m no photographer, but I can definitely picture us together! 📸 - Your paparazzi, {yourName}', category: 'photo' },
  { id: 'f20', mood: 'funny', template: 'To {partnerName}: You\'re like a dictionary - you add meaning to my life! 📚 (And I need help spelling) - {yourName}', category: 'dictionary' },
  { id: 'f21', mood: 'funny', template: '{partnerName}, I love you more than my phone battery loves charging! 🔋 (And that\'s saying A LOT) - {yourName}', category: 'battery' },
  { id: 'f22', mood: 'funny', template: 'Hey {partnerName}! Are you Wi-Fi? Because I\'m feeling a connection! 📶 (And I can\'t get enough of you) - {yourName}', category: 'wifi' },

  // Emotional messages
  { id: 'e1', mood: 'emotional', template: 'My dearest {partnerName}, you came into my life and made everything make sense. I cannot imagine a single day without you. With tears of joy, {yourName}', category: 'grateful' },
  { id: 'e2', mood: 'emotional', template: '{partnerName}, before you, I didn\'t know what true love meant. Now I understand why every love song was written. Forever grateful, {yourName}', category: 'understanding' },
  { id: 'e3', mood: 'emotional', template: 'To my {partnerName}: You healed parts of me I didn\'t even know were broken. Your love saved me. With all my heart, {yourName}', category: 'healing' },
  { id: 'e4', mood: 'emotional', template: '{partnerName}, they say home is where the heart is. My heart is with you, so you are my home. Always and forever, {yourName}', category: 'home' },
  { id: 'e5', mood: 'emotional', template: 'My beloved {partnerName}, loving you has made me a better person. Thank you for choosing me every single day. Eternally yours, {yourName}', category: 'growth' },
  { id: 'e6', mood: 'emotional', template: '{partnerName}, when I count my blessings, I count you twice. You are the greatest gift life has given me. With love, {yourName}', category: 'blessing' },
  { id: 'e7', mood: 'emotional', template: 'To my rock, {partnerName}: Through every storm, you held my hand. Through every joy, you celebrated with me. I love you. - {yourName}', category: 'support' },
  { id: 'e8', mood: 'emotional', template: '{partnerName}, my heart aches when we\'re apart and soars when we\'re together. You are my everything. Deeply yours, {yourName}', category: 'longing' },
  { id: 'e9', mood: 'emotional', template: 'Dear {partnerName}, I fall in love with you more every day. Each moment with you is a treasure I hold dear. All my love, {yourName}', category: 'daily' },
  { id: 'e10', mood: 'emotional', template: '{partnerName}, you saw me at my worst and loved me anyway. That kind of love is rare and precious. Forever thankful, {yourName}', category: 'acceptance' },
  { id: 'e11', mood: 'emotional', template: 'My sweet {partnerName}, your love is the reason I believe in miracles. You are my answered prayer. With deepest love, {yourName}', category: 'miracle' },
  { id: 'e12', mood: 'emotional', template: '{partnerName}, I never knew my heart had so much room until you filled it with your love. Overwhelmed with joy, {yourName}', category: 'heart' },
  { id: 'e13', mood: 'emotional', template: 'To {partnerName}: When life gets hard, your love is my strength. When days are dark, your smile is my light. Always, {yourName}', category: 'strength' },
  { id: 'e14', mood: 'emotional', template: '{partnerName}, the thought of growing old with you fills me with so much happiness. I can\'t wait for our forever. Lovingly, {yourName}', category: 'future' },
  { id: 'e15', mood: 'emotional', template: 'My precious {partnerName}, you understand me in ways no one else does. With you, I can be completely myself. Soul connected, {yourName}', category: 'understanding' },
  { id: 'e16', mood: 'emotional', template: '{partnerName}, loving you taught me what it means to put someone else\'s happiness before my own. You are my priority. - {yourName}', category: 'selfless' },
  { id: 'e17', mood: 'emotional', template: 'Dear {partnerName}, in your arms, I found peace. In your eyes, I found love. In you, I found home. Completely yours, {yourName}', category: 'peace' },
  { id: 'e18', mood: 'emotional', template: '{partnerName}, thank you for being patient with me, for understanding me, for loving me unconditionally. I am blessed. - {yourName}', category: 'thanks' },
  { id: 'e19', mood: 'emotional', template: 'My love {partnerName}, words will never be enough to express how much you mean to me. You are my world. Infinitely, {yourName}', category: 'infinite' },
  { id: 'e20', mood: 'emotional', template: '{partnerName}, every tear, every smile, every moment with you has been worth it. I would choose you again and again. - {yourName}', category: 'choice' },
  { id: 'e21', mood: 'emotional', template: 'My {partnerName}, your love has taught me that the best things in life aren\'t things at all - they\'re moments with you. Gratefully, {yourName}', category: 'moments' },
  { id: 'e22', mood: 'emotional', template: '{partnerName}, I never knew what completeness felt like until you came into my life. You are my missing piece. - {yourName}', category: 'complete' },
]

export function generateMessage(yourName: string, partnerName: string, mood: Mood): string {
  const moodMessages = messageTemplates.filter(m => m.mood === mood)
  const randomIndex = Math.floor(Math.random() * moodMessages.length)
  const template = moodMessages[randomIndex]
  
  return template.template
    .replace(/{yourName}/g, yourName)
    .replace(/{partnerName}/g, partnerName)
}

export function getRandomMessages(yourName: string, partnerName: string, mood: Mood, count: number = 3): string[] {
  const moodMessages = messageTemplates.filter(m => m.mood === mood)
  const shuffled = [...moodMessages].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  
  return selected.map(template => 
    template.template
      .replace(/{yourName}/g, yourName)
      .replace(/{partnerName}/g, partnerName)
  )
}
