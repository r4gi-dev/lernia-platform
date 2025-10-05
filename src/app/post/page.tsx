"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "@uiw/react-md-editor/markdown-editor.css";

// MarkdownエディタはSSR非対応なのでdynamic import
const MdEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => ({ default: mod.default })), { ssr: false });


export default function CreatePostPage() {
  const supabase = createClientComponentClient();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // タグ追加
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  // 投稿処理
  const handlePost = async () => {
    setIsPosting(true);
    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        tags,
        created_at: new Date(),
      },
    ]);
    setIsPosting(false);

    if (error) alert(error.message);
    else alert("投稿しました！");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-4">新規投稿</h1>

      {/* タイトル */}
      <Input
        placeholder="タイトルを入力..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* タグ */}
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
        <Input
          placeholder="タグを入力して Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>

      {/* Markdownエディタ */}
      <MdEditor
        value={content}
        onChange={(val) => setContent(val || "")}
        data-color-mode="light"
        height={600}
      />

      <Button onClick={handlePost} disabled={isPosting}>
        {isPosting ? "投稿中..." : "投稿する"}
      </Button>
    </div>
  );
}
