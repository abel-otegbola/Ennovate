'use client'

import ArticleContentEditor, { ArticleContentBlock } from '@/components/article/articleContentEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArticleContext } from '@/context/articleContext'
import { AuthContext } from '@/context/useAuth'
import { Check, ChevronLeftIcon, Loader, Send } from 'lucide-react'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const initialBlocks: ArticleContentBlock[] = [{ id: 'text-1', type: 'text', text: '' }]

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function WritePage() {
  const { user } = useContext(AuthContext)
  const { createArticle } = useContext(ArticleContext)
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [category, setCategory] = useState('Engineering')
  const [tags, setTags] = useState('')
  const [blocks, setBlocks] = useState<ArticleContentBlock[]>(initialBlocks)
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) {
      setMessage('Sign in before publishing an article.')
      return
    }
    if (!title.trim()) {
      setMessage('Add a title before saving your article.')
      return
    }

    setSaving(true)
    setMessage('')
    try {
      await createArticle({
        authorId: user.id,
        title: title.trim(),
        slug: slugify(title),
        excerpt: excerpt.trim(),
        content: JSON.stringify(blocks),
        coverImage: coverImage.trim(),
        category: category.trim(),
        tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        status,
        views: 0,
        likes: 0,
        publishedAt: status === 'published' ? new Date() : new Date(0),
        updatedAt: new Date(),
      })
      router.push('/discover')
    } catch {
      setMessage('Your article could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen md:px-8 px-4 py-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-input/[0.4] pb-2">
          <div className="flex items-center gap-4">
            <Link href="/discover" aria-label="Back to discover" className="">
              <ChevronLeftIcon size={16} strokeWidth={1} />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">New Article</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant={status === 'draft' ? 'secondary' : 'ghost'} size="xs" onClick={() => setStatus('draft')}><Check /> Save draft</Button>
            <Button type="button" variant={status === 'published' ? 'secondary' : 'ghost'} size="xs" onClick={() => setStatus('published')}><Send /> Publish</Button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-8">
            <section className="space-y-5">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" aria-label="Article title" className="h-auto border-0 border-b border-input rounded-none px-0 text-3xl font-semibold shadow-none focus-visible:ring-0 sm:text-5xl" />
              <label htmlFor='title' className="opacity-50 mb-2 block">Excerpt</label>
              <textarea value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="Write a short introduction for readers..." aria-label="Article excerpt" className="min-h-20 w-full px-3 py-2 rounded resize-y bg-transparent border border-input leading-7 text-muted-foreground outline-none placeholder:text-muted-foreground" />
            </section>
            <ArticleContentEditor blocks={blocks} onChange={setBlocks} />
          </div>

          <aside className="h-fit space-y-5 rounded-md border bg-background p-5 lg:sticky lg:top-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Article details</p>
            </div>
            <label className="grid gap-2 text-sm font-medium">Cover image URL<Input value={coverImage} onChange={(event) => setCoverImage(event.target.value)} placeholder="https://..." /></label>
            <label className="grid gap-2 text-sm font-medium">Category<Input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Engineering" /></label>
            <label className="grid gap-2 text-sm font-medium">Tags<Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="design, systems, career" /></label>
            {coverImage && <Image src={coverImage} alt="Cover preview" width={2000} height={300} className="aspect-video w-full rounded-md object-cover" />}
            <div className="border-t pt-4 text-sm text-muted-foreground">
              <p>Publishing as</p>
              <p className="mt-1 font-medium text-foreground">{user?.fullname || user?.email || 'Guest writer'}</p>
            </div>
            {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
            <Button type="submit" size="xs" className="w-full" disabled={saving || !user}>
              {saving ? <Loader className="animate-spin" /> : status === 'published' ? 'Publish article' : 'Save draft'}
            </Button>
          </aside>
        </div>
      </form>
    </main>
  )
}
