"use client";

import { Check } from "lucide-react";

const features = [
  {
    title: "知識をアウトプット",
    description: "エンジニアが自分の知識や技術を整理・発信し、ポートフォリオとしても活用できます。",
  },
  {
    title: "学び合いの場",
    description: "他のエンジニアから学び、質問や回答を通じてスキルを高めることができます。",
  },
  {
    title: "企業・仲間とつながる",
    description: "企業からのメッセージや、仲間との交流を通じてキャリアの幅を広げられます。",
  },
  {
    title: "学習 × キャリア × コミュニティ",
    description: "この3つを軸に成長をサポートするハブとなるプラットフォームです。",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* キャッチコピー */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ITエンジニアが <br />
            <span className="text-blue-600">学び・成長し・つながる</span> 場所
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            自分の知識・技術をアウトプットし、他のエンジニアと学び合い、<br />
            企業や仲間とつながることを支援するプラットフォーム。<br />
            「学習 × キャリア × コミュニティ」のハブを目指します。
          </p>
        </div>

        {/* 機能一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow p-8 hover:shadow-lg transition"
            >
              <Check className="text-green-500 mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
