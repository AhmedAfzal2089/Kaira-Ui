import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, sendMessage, resetSession } = useChat();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-8">
      {/* Global Header */}
      <div className="text-center mb-8">
         <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">ALMATIQ</h1>
         <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide">AI-Powered Muscle Recovery Assistant</p>
      </div>

      <div className="w-full max-w-[1400px] h-[80vh] flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel - White Card */}
        <div className="lg:w-[40%] w-full h-1/3 lg:h-full">
           <LeftPanel onResetSession={resetSession} />
        </div>

        {/* Chat Panel - Dark Card */}
        <div className="lg:w-[60%] w-full h-2/3 lg:h-full bg-[#0a0a0a] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <ChatPanel 
            messages={messages} 
            isLoading={isLoading} 
            onSendMessage={sendMessage} 
          />
        </div>

      </div>
    </div>
  );
}

export default App;
