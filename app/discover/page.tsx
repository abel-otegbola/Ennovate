'use client';
import ArticleCard from "@/components/cards/articleCard";
import { ArticleContext } from "@/context/articleContext";
import { useContext, useEffect, useState } from "react"

function DiscoverPage() {
  const [active, setActive] = useState("For you")
  const { articles, getArticles } = useContext(ArticleContext);

  useEffect(() => {
    getArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex lg:flex-row flex-col gap-4 md:px-4 h-full">
          <div className="lg:w-[65%] w-full p-4 mt-4 flex flex-col gap-4 mb-6 md:rounded-lg">
            <div>
              <h1 className="text-2xl font-medium mb-2">Discover</h1>
              <p className="opacity-[0.6]">New articles for you</p>
            </div>

            <div className="flex gap-4 w-full border-b border-gray-500/[0.2] text-[14px]">
              {
                ["For you", "Popular"].map(tab => (
                  <button 
                    onClick={() => setActive(tab)} 
                    key={tab}
                    className={`py-4 cursor-pointer border-b ${active === tab ? "border-primary font-medium" : "border-transparent opacity-50"}`}
                  >{tab}</button>
                ))
              }
            </div>

            {
              articles.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default DiscoverPage