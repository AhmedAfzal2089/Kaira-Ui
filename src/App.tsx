import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import { useChat } from './hooks/useChat';
import AlmaTag from './assets/Alma_White_Tag_XL.png';

function App() {
  const { messages, isLoading, sendMessage, resetSession } = useChat();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-4">
      {/* Global Header */}
      <div className="flex justify-center mb-8">
         <img src={AlmaTag} alt="ALMATIQ" className="h-40 object-contain" />
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
