import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import { useChat } from './hooks/useChat';
import AlmaTag from './assets/Alma_White_Tag_XL.png';

function App() {
  const { messages, isLoading, sendMessage, resetSession } = useChat();

  return (
    <div className="min-h-[100dvh] w-screen bg-black flex flex-col items-center p-4 md:p-6 lg:padding-8 lg:h-screen lg:overflow-hidden">
      {/* Global Header */}
      <div className="flex-none justify-center mb-6 lg:mb-8">
         <img src={AlmaTag} alt="ALMATIQ" className="h-16 md:h-20 lg:h-32 object-contain" />
      </div>

      <div className="w-full max-w-[1400px] flex-1 flex flex-col lg:flex-row gap-6 lg:min-h-0 pb-4">
        
        {/* Left Panel - Dark Card */}
        {/* On mobile: Auto height to fit content. On desktop: Full height. */}
        <div className="w-full lg:w-[40%] flex-none lg:flex-auto lg:h-full">
           <LeftPanel />
        </div>

        {/* Chat Panel - Dark Card */}
        {/* On mobile: Fixed height for chat area (e.g. 80vh) so it's usable. On desktop: Full height. */}
        <div className="w-full lg:w-[60%] h-[80vh] lg:h-full bg-[#0a0a0a] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
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
