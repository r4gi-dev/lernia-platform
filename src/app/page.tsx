"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Github, Twitter, Linkedin } from "lucide-react";

interface Post {
  id: string;
  title: string;
  created_at?: string;
  views?: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
}

export default function HomePage() {
  const supabase = createClientComponentClient();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: recent } = await supabase
        .from("posts")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      const { data: popular } = await supabase
        .from("posts")
        .select("id, title, views")
        .order("views", { ascending: false })
        .limit(5);

      const { data: eventData } = await supabase
        .from("events")
        .select("id, title, date")
        .order("date", { ascending: false })
        .limit(5);

      setRecentPosts(recent ?? []);
      setPopularPosts(popular ?? []);
      setEvents(eventData ?? []);
    };
    fetchData();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-[#0d1b2a] text-[#e2e8f0]">
      {/* Header */}
      <header className="bg-[#1b263b]/80 backdrop-blur-md border-b border-[#334155] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-400">Lernia</h1>
            <nav className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/search"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white transition-colors px-4 py-2 rounded-md text-sm font-medium"
                >
                  🔍 検索
                </Link>
                <Link
                  href="/about"
                  className="text-[#e2e8f0] hover:text-indigo-400 transition-colors px-3 py-2 text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="/login"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  className="border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-[#0d1b2a] px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  新規登録
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* コンテンツ */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        {/* 最近の投稿 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">📰 最近の投稿</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {recentPosts.map((post) => (
              <Card key={post.id} className="bg-[#1b263b] border-[#334155] hover:border-indigo-400 transition-colors">
                <CardHeader>
                  <Link href={`/posts/${post.id}`}>
                    <h3 className="text-lg font-semibold hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                </CardHeader>
                <CardContent className="text-sm text-gray-400">
                  {post.created_at &&
                    new Date(post.created_at).toLocaleDateString("ja-JP")}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 人気の記事 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">🔥 人気の記事</h2>
          <ul className="space-y-3">
            {popularPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.id}`}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {post.title}
                </Link>
                <span className="ml-2 text-gray-400 text-sm">
                  {post.views ?? 0} views
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* イベント */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">🎉 イベント情報</h2>
          <div className="space-y-3">
            {events.length > 0 ? (
              events.map((event) => (
                <Card
                  key={event.id}
                  className="bg-[#1b263b] border-[#334155] hover:border-indigo-400 transition-colors"
                >
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                  </CardHeader>
                  <CardContent className="text-gray-400 text-sm">
                    開催日:{" "}
                    {event.date
                      ? new Date(event.date).toLocaleDateString("ja-JP")
                      : ""}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-400">現在イベントはありません。</p>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1b263b] text-[#e2e8f0] py-12 mt-10 border-t border-[#334155]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">Lernia</h3>
              <p className="text-gray-400 mb-4">エンジニアが学び、成長する場所</p>
              <div className="flex space-x-4">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">プロダクト</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-indigo-400 transition-colors">機能</Link></li>
                <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors">料金</Link></li>
                <li><Link href="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">会社</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">について</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">プライバシー</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#334155] mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Lernia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
