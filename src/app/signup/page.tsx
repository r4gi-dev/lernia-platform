"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Chrome, Terminal } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // エラーメッセージ用
  const [isSubmitted, setIsSubmitted] = useState(false); // メール登録後の表示切替用
  const supabase = createClientComponentClient();

  // メールとパスワードでサインアップする関数
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // 古いエラーをクリア

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // ユーザー登録後、このURLにリダイレクトして認証を完了させる
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      // パスワードが短いなど、Supabaseからのエラーをユーザーに表示
      if (error.message.includes("short")) {
        setError("パスワードは6文字以上で設定してください。");
      } else {
        setError("エラーが発生しました。もう一度お試しください。");
      }
      console.error("Sign up error:", error.message);
    } else {
      // 成功したら、確認メールの送信を知らせる画面に切り替える
      setIsSubmitted(true);
    }
  };

  // Googleでサインインする関数
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  // メール登録が完了し、isSubmittedがtrueになったら、このUIを表示
  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>ありがとうございます！</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>あと一歩です</AlertTitle>
              <AlertDescription>
                登録いただいたメールアドレス (<span className="font-bold">{email}</span>) に確認メールを送信しました。
                メール内のリンクをクリックして、登録を完了してください。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 通常時のサインアップフォーム
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Lernia</CardTitle>
          <CardDescription>
            新しいアカウントを作成してビジネスを始めましょう
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="6文字以上"
                required
                minLength={6}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              無料で始める
            </Button>
            
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  または
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              type="button"
            >
              <Chrome className="mr-2 h-4 w-4" />
              Googleで登録
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
