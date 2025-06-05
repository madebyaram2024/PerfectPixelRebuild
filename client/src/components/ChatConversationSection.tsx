import { useState, useEffect } from 'react';

export default function ChatConversationSection() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  const messages = [
    {
      id: 1,
      sender: 'customer',
      text: 'Hi! I own a small bakery in Glendale and desperately need a professional website. Can you help?',
      time: '2:15 PM'
    },
    {
      id: 2,
      sender: 'perfectpixel',
      text: 'Absolutely! I\'d love to help your bakery succeed online. We create beautiful 5-page websites for just $199.',
      time: '2:16 PM'
    },
    {
      id: 3,
      sender: 'customer',
      text: 'That sounds too good to be true... what\'s the catch? Is there a monthly fee?',
      time: '2:17 PM'
    },
    {
      id: 4,
      sender: 'perfectpixel',
      text: 'No catch! $199 is the complete price. You own all the files and can download everything. No monthly subscription required.',
      time: '2:17 PM'
    },
    {
      id: 5,
      sender: 'customer',
      text: 'But I need customers to order cakes online. Can you add a shopping cart?',
      time: '2:18 PM'
    },
    {
      id: 6,
      sender: 'perfectpixel',
      text: 'Great question! We offer an e-commerce add-on for $149 that includes a full shopping cart, payment processing, and we\'ll set up your first 3 products for free.',
      time: '2:19 PM'
    },
    {
      id: 7,
      sender: 'customer',
      text: 'So website + shopping cart would be $348 total?',
      time: '2:20 PM'
    },
    {
      id: 8,
      sender: 'perfectpixel',
      text: 'Exactly! $199 for the website + $149 for e-commerce = $348 total. Compare that to agencies charging $3000-5000 for the same thing.',
      time: '2:20 PM'
    },
    {
      id: 9,
      sender: 'customer',
      text: 'How do I know you\'re not some scam? This pricing seems impossible.',
      time: '2:21 PM'
    },
    {
      id: 10,
      sender: 'perfectpixel',
      text: 'I completely understand your skepticism! We\'re a new company building our portfolio. Instead of spending thousands on advertising, we\'re passing those savings to clients like you.',
      time: '2:22 PM'
    },
    {
      id: 11,
      sender: 'customer',
      text: 'What about hosting? That\'s usually where companies get you with hidden costs.',
      time: '2:23 PM'
    },
    {
      id: 12,
      sender: 'perfectpixel',
      text: 'Total transparency: You can host anywhere you want since you own the files. We offer hosting at $24.99/month, but it\'s completely optional.',
      time: '2:23 PM'
    },
    {
      id: 13,
      sender: 'perfectpixel',
      text: 'Our hosting includes everything - security, backups, updates, SSL certificate. With other hosts, you\'d need to set all that up yourself.',
      time: '2:24 PM'
    },
    {
      id: 14,
      sender: 'customer',
      text: 'Can I see examples of your work first?',
      time: '2:25 PM'
    },
    {
      id: 15,
      sender: 'perfectpixel',
      text: 'Of course! Check our portfolio section above. We\'ve done sites for restaurants, retail stores, service businesses, and more.',
      time: '2:25 PM'
    },
    {
      id: 16,
      sender: 'customer',
      text: 'How long does it actually take?',
      time: '2:26 PM'
    },
    {
      id: 17,
      sender: 'perfectpixel',
      text: '7 days guaranteed. We use AI to speed up the design process, but every site is custom-built by real developers and reviewed by humans.',
      time: '2:26 PM'
    },
    {
      id: 18,
      sender: 'customer',
      text: 'Alright, you\'ve convinced me. How do I get started?',
      time: '2:27 PM'
    },
    {
      id: 19,
      sender: 'perfectpixel',
      text: 'Perfect! Just click "Get My Site for $199" below. We\'ll send you a questionnaire, and your bakery will be online in 7 days!',
      time: '2:27 PM'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev < messages.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="relative min-h-screen">
      {/* Right Side Sticky Phone - Starts from top */}
      <div className="hidden xl:block fixed right-8 top-24 z-40">
        <div className="w-72 h-[520px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
            {/* Phone Header */}
            <div className="bg-primary px-3 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">PP</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">PerfectPixel AI</div>
                  <div className="text-white/80 text-xs">Online now</div>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
              {messages.slice(0, visibleMessages).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-xl text-xs leading-relaxed ${
                      message.sender === 'customer'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      message.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              
              {visibleMessages < messages.length && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-xl rounded-bl-sm p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 rounded-full px-3 py-2 border">
                  <span className="text-gray-400 text-xs">Type a message...</span>
                </div>
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-3 text-center">
          <button 
            onClick={() => setVisibleMessages(0)}
            className="text-primary hover:text-primary/80 text-xs font-medium bg-white rounded-full px-3 py-1 shadow-sm"
          >
            ↻ Restart
          </button>
        </div>
      </div>

      {/* Mobile Section */}
      <section className="py-16 bg-muted/50 xl:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Real <span className="text-primary">Conversations</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See how we help businesses like yours get professional websites at unbeatable prices
            </p>
          </div>

          <div className="mx-auto w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
              <div className="bg-primary px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">PP</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">PerfectPixel AI</div>
                    <div className="text-white/80 text-xs">Online now</div>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>

              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.slice(0, visibleMessages).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'customer'
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-gray-200 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                {visibleMessages < messages.length && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 rounded-2xl rounded-bl-md p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-white rounded-full px-4 py-2 border">
                    <span className="text-gray-400 text-sm">Type a message...</span>
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setVisibleMessages(0)}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              ↻ Restart Conversation
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-semibold mb-4">
              Ready to start your own conversation?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 rounded-lg font-bold">
                Get Your Website for $199
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition-colors">
                Chat with Us Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}