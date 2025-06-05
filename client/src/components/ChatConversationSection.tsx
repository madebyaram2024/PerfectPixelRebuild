import { useState, useEffect, useRef } from 'react';

export default function ChatConversationSection() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      text: 'But what about hosting? Don\'t I need to pay monthly for that?',
      time: '2:18 PM'
    },
    {
      id: 6,
      sender: 'perfectpixel',
      text: 'Great question! You have options: 1) Host it yourself (you own the files), 2) Use our hosting for $24.99/month, or 3) Use free hosting like Netlify or Vercel.',
      time: '2:18 PM'
    },
    {
      id: 7,
      sender: 'customer',
      text: 'Wait, so I actually own the website files? Not just rent them?',
      time: '2:19 PM'
    },
    {
      id: 8,
      sender: 'perfectpixel',
      text: 'Exactly! You get the complete source code, all images, everything. It\'s yours forever. No vendor lock-in.',
      time: '2:19 PM'
    },
    {
      id: 9,
      sender: 'customer',
      text: 'That\'s amazing! Can you add online ordering to my bakery site?',
      time: '2:20 PM'
    },
    {
      id: 10,
      sender: 'perfectpixel',
      text: 'Absolutely! E-commerce with shopping cart, payments, and order management is available as an add-on for $149.',
      time: '2:21 PM'
    },
    {
      id: 11,
      sender: 'customer',
      text: 'So the total would be $348 for a complete online bakery with shopping?',
      time: '2:22 PM'
    },
    {
      id: 12,
      sender: 'perfectpixel',
      text: 'Correct! $199 base website + $149 e-commerce = $348 total. No hidden fees, no surprises.',
      time: '2:22 PM'
    },
    {
      id: 13,
      sender: 'customer',
      text: 'This seems too good to be true. Other companies want $2000+ for this...',
      time: '2:23 PM'
    },
    {
      id: 14,
      sender: 'perfectpixel',
      text: 'We use AI to streamline our process and pass the savings to you. Plus, we want to help small businesses succeed online!',
      time: '2:24 PM'
    },
    {
      id: 15,
      sender: 'customer',
      text: 'Do you have examples of bakery websites you\'ve built?',
      time: '2:25 PM'
    },
    {
      id: 16,
      sender: 'perfectpixel',
      text: 'Of course! Check our portfolio section above. We\'ve done sites for restaurants, retail stores, service businesses, and more.',
      time: '2:25 PM'
    },
    {
      id: 17,
      sender: 'customer',
      text: 'How long does it actually take?',
      time: '2:26 PM'
    },
    {
      id: 18,
      sender: 'perfectpixel',
      text: '7 days guaranteed. We use AI to speed up the design process, but every site is custom-built by real developers and reviewed by humans.',
      time: '2:26 PM'
    },
    {
      id: 19,
      sender: 'customer',
      text: 'Alright, you\'ve convinced me. How do I get started?',
      time: '2:27 PM'
    },
    {
      id: 20,
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

  // Auto scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages, isMinimized]);

  return (
    <>
      {/* Bottom Right Chat Phone */}
      <div className="hidden xl:block fixed right-8 bottom-8 z-40">
        <div className={`w-72 bg-black rounded-[2.5rem] p-2 shadow-2xl transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[520px]'
        }`}>
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
            {/* Phone Header with Minimize Button */}
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
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200 transition-colors text-lg font-bold"
              >
                {isMinimized ? '□' : '−'}
              </button>
            </div>

            {/* Chat Messages - Only show when not minimized */}
            {!isMinimized && (
              <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
                {messages.slice(0, visibleMessages).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-xs rounded-xl p-3 shadow-sm ${
                      message.sender === 'customer' 
                        ? 'bg-primary text-white rounded-br-sm' 
                        : 'bg-white text-gray-800 rounded-bl-sm'
                    }`}>
                      <p className="text-xs leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'customer' ? 'text-white/70' : 'text-gray-500'
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
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat Input - Only show when not minimized */}
            {!isMinimized && (
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
            )}
          </div>
        </div>

        {/* Restart Button - Only show when not minimized */}
        {!isMinimized && (
          <div className="mt-3 text-center">
            <button 
              onClick={() => setVisibleMessages(0)}
              className="text-primary hover:text-primary/80 text-xs font-medium bg-white rounded-full px-3 py-1 shadow-sm"
            >
              ↻ Restart
            </button>
          </div>
        )}
      </div>

      {/* Mobile Section - Remove the large black section */}
      <section className="py-16 bg-muted/50 xl:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Real Customer Conversation</h2>
            <p className="text-muted-foreground">
              See how we help small businesses get professional websites at unbeatable prices
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.slice(0, 6).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs rounded-lg p-3 ${
                    message.sender === 'customer' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'customer' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                See the full conversation and get started today!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-lg font-bold transition-colors">
                  Get My Site for $199
                </button>
                <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition-colors">
                  Chat with Us Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}