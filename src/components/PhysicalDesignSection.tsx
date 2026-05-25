import React from 'react';
import { Cpu, Zap, Layers } from 'lucide-react';

export const PhysicalDesignSection: React.FC = () => {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <Layers className="text-purple-400" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-slate-100">Domain 1: Physical Design</h2>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500 mb-2">
              High-Speed MIPI D-PHY RX Subsystem
            </h3>
            <p className="text-slate-400 font-medium">Role: Physical Design Engineer</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full">
              28-nm High-Performance Mobile Node
            </span>
            <span className="text-slate-500">1.8 V / Up to 10 Gbps</span>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed mb-8">
          Executed the physical integration and floorplanning strategy for a 4-lane MIPI D-PHY receiver subsystem. 
          Driven by strict signal integrity targets, analog-to-digital noise isolation, and rigid power delivery constraints 
          for high-bandwidth mobile and automotive applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-purple-400" size={20} />
              <h4 className="font-semibold text-slate-200">Macro Architecture</h4>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
              <li><strong>D-PHY RX Digital Core:</strong> Deserialization & protocol decoding</li>
              <li><strong>Analog I/O Ring:</strong> ESD protection & signal interfacing</li>
              <li><strong>High-Speed Clock PLL:</strong> 0-270° quadrature phase generation</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="text-purple-400" size={20} />
              <h4 className="font-semibold text-slate-200">Floorplanning</h4>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
              <li>Peripheral anchor for High-Speed I/O traces</li>
              <li>Tight abutment of Clock PLL & RX Core</li>
              <li>5 μm geometric keep-out moats for isolation</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-purple-400" size={20} />
              <h4 className="font-semibold text-slate-200">Power Integrity (PDN)</h4>
            </div>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
              <li>Isolated 1.8V analog / 0.9V digital rails</li>
              <li>Strict routing resistance caps (&lt;0.1 Ω)</li>
              <li>Transient clamp proximity optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
