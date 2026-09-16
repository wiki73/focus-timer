'use client'; // Обязательно, так как мы используем хуки

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Наши базовые цитаты
const DEFAULT_QUOTES = [
  'Держи фокус. Большие цели строятся из 5-минутных отрезков.',
  'Внимание — это твоя главная валюта прямо сейчас.',
  'Не отвлекайся. Ты уже делаешь прогресс.',
  'Сконцентрируйся на одном действии.',
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('user_quotes');

    if (saved) {
      setQuotes(JSON.parse(saved));
    } else {
      localStorage.setItem('user_quotes', JSON.stringify(DEFAULT_QUOTES));
      setQuotes(DEFAULT_QUOTES);
    }
  }, []); 
  return (
    <main className='min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4 text-white'>
      <div className='w-full max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col gap-6'>
        
        <header className='flex justify-between items-center border-b border-slate-800 pb-4'>
          <h1 className='text-2xl font-extrabold'>Мои цитаты</h1>
          
          <Link 
            href='/' 
            className='px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition'
          >
            ← Назад к таймеру
          </Link>
        </header>

        <ul className='flex flex-col gap-3'>
          {quotes.length === 0 ? (
            <li className='text-center text-slate-500 py-4'>Нет цитат</li>
          ) : (
            quotes.map((quote, index) => (
              <li 
                key={index} 
                className='p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl text-slate-300 italic text-sm'
              >
                «{quote}»
              </li>
            ))
          )}
        </ul>
        
      </div>
    </main>
  );
}