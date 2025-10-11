'use client'

import { useState } from 'react'
import { BookOpen, Users, MessageCircle, TrendingUp, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="bg-[#1b263b]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-500">Lernia</h1>
            <nav className="hidden md:flex space-x-4">
              <Link href="/search" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                🔍 検索
              </Link>
              <Link href="/about" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </Link>
              <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                ログイン
              </Link>
              <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                新規登録
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          エンジニアが <span className="text-indigo-500">学び、成長する</span> 場所
        </h1>
        <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
          ITエンジニアが知識・技術をアウトプットし、仲間と学び合うプラットフォーム
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-flex items-center transition-colors">
            今すぐ始める
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="#features" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
            詳しく見る
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-400">学習 × キャリア × コミュニティ</h2>
          <p className="text-lg text-indigo-200">エンジニアの成長を支援する3つの柱</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            { icon: BookOpen, title: '学習アウトプット', desc: '技術ノートやTipsを投稿し、学習記録を残せます' },
            { icon: Users, title: 'コミュニティ', desc: '他のエンジニアとつながり、知識を共有できます' },
            { icon: MessageCircle, title: 'チャット機能', desc: 'エンジニア同士でリアルタイムにコミュニケーション' },
            { icon: TrendingUp, title: 'キャリア支援', desc: '企業とのマッチングやキャリア相談が可能' },
          ].map((f, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-[#1b263b] hover:bg-[#334155] transition-colors">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">{f.title}</h3>
              <p className="text-indigo-200">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Early Access */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">なぜLerniaなのか？</h2>
            <div className="space-y-4 text-lg text-indigo-200">
              <p>現代のITエンジニアには、技術の習得だけでなく、アウトプットし、コミュニティと共に成長する力が求められます。</p>
              <p>Lerniaは「Learn（学ぶ）」と「-ia（場所）」を組み合わせた造語で、エンジニアが継続的に学び、成長できる場所を提供します。</p>
              <p>単なる学習SNSではなく、キャリアとコミュニティを結びつける新しいプラットフォームを目指しています。</p>
            </div>
          </div>
          <div className="bg-[#1b263b] p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-indigo-400">早期アクセス登録</h3>
            <p className="text-indigo-200 mb-6">Lerniaのローンチ情報をいち早くお届けします</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレスを入力"
                className="w-full px-4 py-3 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-[#0f172a] text-white"
                required
              />
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                登録する
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b263b] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">Lernia</h3>
              <p className="text-indigo-200 mb-4">エンジニアが学び、成長する場所</p>
              <div className="flex space-x-4">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="text-indigo-200 hover:text-indigo-400 transition-colors">
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-indigo-400">プロダクト</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><Link href="/features" className="hover:text-indigo-400 transition-colors">機能</Link></li>
                <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors">料金</Link></li>
                <li><Link href="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-indigo-400">会社</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">について</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">プライバシー</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-700 mt-8 pt-8 text-center text-indigo-200">
            <p>&copy; 2025 Lernia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}