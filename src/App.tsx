import { useState } from 'react'
import { Flame, Trophy, Wallet } from 'lucide-react'
import { useAppKit } from '@reown/appkit/react'

// Mock challenges data
const CHALLENGES = [
  { id: 1, name: '30 Days of Code', staked: 500, active: 124, fee: 5 },
  { id: 2, name: 'Morning Jog (5km)', staked: 1200, active: 85, fee: 10 },
  { id: 3, name: 'Read 20 Pages', staked: 300, active: 200, fee: 2 },
]

function App() {
  const { open } = useAppKit()
  const [activeTab, setActiveTab] = useState<'challenges' | 'dashboard'>('challenges')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              STX Streaks
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('challenges')}
              className={`text-sm font-medium transition-colors ${activeTab === 'challenges' ? 'text-orange-400' : 'text-slate-400 hover:text-white'}`}
            >
              Explore Challenges
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-orange-400' : 'text-slate-400 hover:text-white'}`}
            >
              My Dashboard
            </button>
          </nav>

          <div className="flex items-center gap-4">
             {/* Using standard button that triggers AppKit modal */}
             <button 
               onClick={() => open()}
               className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-all text-sm font-medium"
             >
               <Wallet className="w-4 h-4" />
               Connect Wallet
             </button>
             {/* Alternatively use the web component if configured: <appkit-button /> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {activeTab === 'challenges' ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-12">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                Commit to <span className="text-orange-500">Excellence</span>.
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Stake STX on your goals. Maintain your streak to keep your stake and earn rewards from those who quit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CHALLENGES.map((challenge) => (
                <div key={challenge.id} className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all hover:shadow-2xl hover:shadow-orange-500/10">
                  <div className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-white">{challenge.fee} STX</span>
                    <span className="text-slate-500 text-sm">stake</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Active Streaks</span>
                      <span className="text-white font-medium">{challenge.active}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Pooled</span>
                      <span className="text-white font-medium">{challenge.staked} STX</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all active:scale-95">
                    Start Streak
                  </button>
                </div>
              ))}
            </div>
            
             {/* Stats Section */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 border-t border-slate-800 pt-16">
                <div className="text-center p-6 bg-slate-900/50 rounded-2xl">
                    <div className="text-4xl font-black text-white mb-2">12.5k</div>
                    <div className="text-slate-400 uppercase text-xs font-bold tracking-wider">Total STX Staked</div>
                </div>
                <div className="text-center p-6 bg-slate-900/50 rounded-2xl">
                    <div className="text-4xl font-black text-orange-500 mb-2">84%</div>
                    <div className="text-slate-400 uppercase text-xs font-bold tracking-wider">Success Rate</div>
                </div>
                 <div className="text-center p-6 bg-slate-900/50 rounded-2xl">
                    <div className="text-4xl font-black text-white mb-2">452</div>
                    <div className="text-slate-400 uppercase text-xs font-bold tracking-wider">Active Users</div>
                </div>
             </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
             <h2 className="text-2xl font-bold mb-8">My Dashboard</h2>
             
             {/* Empty State Mock */}
             <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No active streaks</h3>
                <p className="text-slate-400 mb-6">You haven't joined any challenges yet.</p>
                <button 
                  onClick={() => setActiveTab('challenges')}
                  className="px-6 py-2 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-colors"
                >
                    Browse Challenges
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
