"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Markdown を安全に抜粋する
function getExcerptMarkdown(content: string, length = 150) {
  const plainText = content.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  return plainText.length > length ? plainText.slice(0, length) + "…" : plainText;
}

export default function SearchPage() {
  const [posts, setPosts] = useState<
    { id: string; title: string; content: string; created_at: string }[]
  >([]);
  const [query, setQuery] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setPosts(data);
    };
    fetchPosts();
  }, [supabase]);

  // 検索フィルター
  const filteredPosts = posts.filter(
    (posts) =>
      posts.title.toLowerCase().includes(query.toLowerCase()) ||
      posts.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">投稿検索</h1>

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードで検索..."
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center py-10 text-gray-500">投稿が見つかりません。</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block border rounded-lg p-4 hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <div className="text-gray-700 prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {getExcerptMarkdown(post.content, 150)}
                </ReactMarkdown>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                投稿日: {new Date(post.created_at).toLocaleString("ja-JP")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
