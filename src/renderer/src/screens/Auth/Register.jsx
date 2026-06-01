import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [gymName, setGymName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex h-screen bg-black items-center justify-center">
      <div className="w-full max-w-md px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300
                     transition-colors mb-8 font-rajdhani tracking-widest uppercase text-sm"
        >
          <ArrowLeft size={16} /> Back to Login
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/30
                          flex items-center justify-center">
            <Zap size={20} className="text-yellow-400" />
          </div>
          <h1 className="font-orbitron text-white font-bold text-2xl tracking-widest">
            SETUP GYM
          </h1>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Gym Name', placeholder: 'My Gym', value: gymName, onChange: setGymName },
            { label: 'Admin Email', placeholder: 'admin@mygym.com', value: email, onChange: setEmail },
            { label: 'Password', placeholder: '••••••••', value: password, onChange: setPassword, type: 'password' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block font-rajdhani text-zinc-500 text-xs
                                tracking-widest uppercase mb-2">
                {field.label}
              </label>
              <input
                type={field.type || 'text'}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white/3 border border-white/8
                           font-rajdhani text-white text-base outline-none
                           placeholder:text-zinc-700 focus:border-yellow-500/40
                           transition-all"
              />
            </div>
          ))}

          <button
            className="w-full py-4 rounded-xl font-orbitron font-bold text-sm
                       tracking-widest text-black bg-yellow-400 hover:bg-yellow-300
                       transition-all mt-2"
            onClick={() => navigate('/')}
          >
            CREATE GYM
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;