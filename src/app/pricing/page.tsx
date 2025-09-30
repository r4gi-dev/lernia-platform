"use client"

import { Check, Github, Twitter, Linkedin } from "lucide-react"
import Link from 'next/link'

const plans = [
  {
    name: "Free",
    price: "¥0",
    description: "まずは無料で試したい方向け",
    features: [
      "学習ノート投稿",
      "他ユーザーの記事閲覧",
      "チャット受信（返信可能）",
    ],
    cta: "無料で始める",
    highlight: false,
  },
  {
    name: "Plus",
    price: "¥980/月",
    description: "学びと交流を強化したい方向け",
    features: [
      "Freeの全機能",
      "チャットの発信（エンジニア同士）",
      "プロフィール拡張",
    ],
    cta: "Plusに登録",
    highlight: true,
  },
  {
    name: "Pro",
    price: "¥2,980/月",
    description: "企業とのつながりを重視したい方向け",
    features: [
      "Plusの全機能",
      "企業へのメッセージ発信",
      "キャリアサポート機能",
    ],
    cta: "Proに登録",
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          料金プラン
        </h1>
        <p className="text-lg text-gray-600">
          自分にあったプランを選んで、学びとキャリアを広げましょう
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-lg p-8 border ${
              plan.highlight
                ? "border-indigo-600 bg-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-gray-600 mt-2">{plan.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-gray-900">
                {plan.price}
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-left">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                plan.highlight
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
