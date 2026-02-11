import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import { useChat } from './hooks/useChat';
import AlmaTag from './assets/Alma_White_Tag_XL.png';

function App() {
  const { messages, isLoading, sendMessage, resetSession } = useChat();

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center overflow-hidden p-4">
      {/* Global Header */}
      <div className="flex-none justify-center mb-6">
         <img src={AlmaTag} alt="ALMATIQ" className="h-32 object-contain" />
      </div>

      <div className="w-full max-w-[1400px] flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel - Dark Card */}
        <div className="lg:w-[40%] w-full h-1/3 lg:h-full">
           <LeftPanel />
        </div>

        {/* Chat Panel - Dark Card */}
        <div className="lg:w-[60%] w-full h-2/3 lg:h-full bg-[#0a0a0a] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <ChatPanel 
            messages={messages} 
            isLoading={isLoading} 
            onSendMessage={sendMessage} 
            onClear={resetSession}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
