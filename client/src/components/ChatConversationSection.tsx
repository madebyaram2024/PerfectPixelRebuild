import { useState, useEffect } from 'react';

export default function ChatConversationSection() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  const messages = [
    {
      id: 1,
      sender: 'customer',
      text: 'Hi, I have a bakery in Glendale CA. Could you help me make a professional website?',
      time: '2:15 PM'
    },
    {
      id: 2,
      sender: 'perfectpixel',
      text: 'Of course! It would be my pleasure. Just choose the new build option for $199 and we\'ll create a beautiful 5-page website for your bakery.',
      time: '2:16 PM'
    },
    {
      id: 3,
      sender: 'customer',
      text: 'OK, but I want to know how much is it really going to cost me?',
      time: '2:17 PM'
    },
    {
      id: 4,
      sender: 'perfectpixel',
      text: '$199 - that\'s our complete price. No hidden fees, no surprises.',
      time: '2:17 PM'
    },
    {
      id: 5,
      sender: 'customer',
      text: 'Why so cheap? How do you make money with that?',
      time: '2:18 PM'
    },
    {
      id: 6,
      sender: 'perfectpixel',
      text: 'Right now we\'re building our portfolio and earning trust. Rather than charging more and paying big companies to advertise us, we\'re giving those savings directly to our clients!',
      time: '2:19 PM'
    },
    {
      id: 7,
      sender: 'customer',
      text: 'OK, I see. Is this one of those monthly subscription models then?',
      time: '2:20 PM'
    },
    {
      id: 8,
      sender: 'perfectpixel',
      text: 'Actually no! With us you own your files - you can download everything and use it with your own hosting company.',
      time: '2:21 PM'
    },
    {
      id: 9,
      sender: 'perfectpixel',
      text: 'We do offer a hosting package at $24.99/month - it\'s our everything package, but you don\'t have to use it.',
      time: '2:21 PM'
    },
    {
      id: 10,
      sender: 'customer',
      text: 'What\'s the difference with your hosting?',
      time: '2:22 PM'
    },
    {
      id: 11,
      sender: 'perfectpixel',
      text: 'You\'ll pay for web hosting anywhere you go. With us, we take care of everything so your site loads perfectly. With another provider, you\'d have to set that up yourself or hire someone to do it.',
      time: '2:23 PM'
    },
    {
      id: 12,
      sender: 'customer',
      text: 'That sounds perfect! How do I get started?',
      time: '2:24 PM'
    },
    {
      id: 13,
      sender: 'perfectpixel',
      text: 'Just click "Get My Site for $199" and we\'ll have your bakery website live in 7 days! 🎉',
      time: '2:24 PM'
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
    }, 1500);

    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Real <span className="text-primary">Conversations</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how we help businesses like yours get professional websites at unbeatable prices
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Description */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">See How Easy It Is</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Watch a real conversation between one of our clients and our team. This bakery owner in Glendale got exactly what they needed - a professional website with no hidden costs and complete ownership of their files.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold">Transparent Pricing</h4>
                  <p className="text-muted-foreground">$199 for a complete 5-page website. No hidden fees.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold">You Own Everything</h4>
                  <p className="text-muted-foreground">Download your files and use any hosting provider you want.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold">Optional Hosting</h4>
                  <p className="text-muted-foreground">$24.99/month for managed hosting, or use your own.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sticky Phone */}
          <div className="lg:sticky lg:top-8">
            {/* Phone Mockup */}
            <div className="mx-auto w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
                {/* Phone Header */}
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

                {/* Chat Messages */}
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

                {/* Chat Input */}
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

            {/* Restart Button */}
            <div className="mt-6 text-center">
              <button 
                onClick={() => setVisibleMessages(0)}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                ↻ Restart Conversation
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
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
  );
}