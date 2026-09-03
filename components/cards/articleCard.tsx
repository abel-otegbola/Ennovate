'use client'
import { ArticleContext } from "@/context/articleContext";
import { Article } from "@/interface/article";
import { Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { User } from "@/interface/auth";

export default function ArticleCard({ article }: { article: Article }) {
  const { getAuthorInfo } = useContext(ArticleContext);
  const [authorInfo, setAuthorInfo] = useState<User | null>(null);

  useEffect(() => {
    if(article.authorId) {
      getAuthorInfo(article.authorId).then(info => {
        if (info) {
          setAuthorInfo(info);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.authorId]);

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-500/[0.05]">
      <div className="flex gap-4 text-[12px] opacity-[0.6]">
        <span>{authorInfo?.fullname}</span>
        <span>{(article.publishedAt).toLocaleDateString()}</span>
      </div>
      <h2 className="text-lg font-semibold">{article.title}</h2>
      <p className="opacity-[0.6]">{article.excerpt}</p>
      <div className="flex gap-2 mt-2">
        <button className="px-4 py-2 rounded-lg bg-primary text-white text-[12px]"><Heart /> {article.likes}</button>
        <button className="px-4 py-2 rounded-lg border border-gray-500/[0.2] text-[12px]">Save</button>
      </div>
    </div>
  )
}