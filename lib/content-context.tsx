'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, type ContentRow } from './supabase';

type ContentMap = Record<string, Record<string, string>>;

const ContentContext = createContext<ContentMap>({});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({});

  useEffect(() => {
    supabase.from('nifty_and_co_content').select('*').then(({ data }) => {
      if (!data) return;
      const map: ContentMap = {};
      (data as ContentRow[]).forEach(r => {
        if (!map[r.section]) map[r.section] = {};
        map[r.section][r.key] = r.value;
      });
      setContent(map);
    });
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(section: string, key: string, fallback = ''): string {
  const ctx = useContext(ContentContext);
  return ctx[section]?.[key] ?? fallback;
}
