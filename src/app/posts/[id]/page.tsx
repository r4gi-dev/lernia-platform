"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "@/styles/markdown.css";

export default function PostDetailPage() {
  const { id } = useParams();
  const supabase = createClientComponentClient();
  const [post, setPost] = useState<{
    id: string;
    title: string;
    content: string;
    created_at: string;
    user_id: string;
    tags?: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id, supabase]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <p className="text-lg animate-pulse">読み込み中...</p>
      </div>
    );

  if (!post)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p className="text-lg font-semibold">投稿が見つかりません</p>
      </div>
    );

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* タイトル */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900">
        {post.title}
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        投稿日: {new Date(post.created_at).toLocaleString("ja-JP")}
      </p>

      {/* タグ */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Markdown 本文 */}
      <div className="markdown-body prose prose-invert max-w-full">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
