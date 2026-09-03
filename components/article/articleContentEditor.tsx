'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ChevronDown,
  ChevronUp,
  Code2,
  Film,
  ImageIcon,
  Link2,
  Plus,
  Quote,
  Trash2,
  Type,
} from 'lucide-react'
import { useRef, useState } from 'react'
import Image from 'next/image'

export type ArticleContentBlock =
  | { id: string; type: 'text'; text: string }
  | { id: string; type: 'image'; url: string; alt: string; caption: string }
  | { id: string; type: 'video'; url: string; caption: string }
  | { id: string; type: 'link'; label: string; url: string }
  | { id: string; type: 'quote'; text: string; attribution: string }
  | { id: string; type: 'code'; language: string; code: string }

const blockOptions = [
  { type: 'text', label: 'Text', icon: Type },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'video', label: 'Video', icon: Film },
  { type: 'link', label: 'Link', icon: Link2 },
  { type: 'quote', label: 'Quote', icon: Quote },
  { type: 'code', label: 'Code', icon: Code2 },
] as const

const createBlock = (type: ArticleContentBlock['type'], id: string): ArticleContentBlock => {
  if (type === 'image') return { id, type, url: '', alt: '', caption: '' }
  if (type === 'video') return { id, type, url: '', caption: '' }
  if (type === 'link') return { id, type, label: '', url: '' }
  if (type === 'quote') return { id, type, text: '', attribution: '' }
  if (type === 'code') return { id, type, language: 'javascript', code: '' }
  return { id, type, text: '' }
}

interface ArticleContentEditorProps {
  blocks: ArticleContentBlock[]
  onChange: (blocks: ArticleContentBlock[]) => void
}

export default function ArticleContentEditor({ blocks, onChange }: ArticleContentEditorProps) {
  const [showBlockMenu, setShowBlockMenu] = useState(false)
  const blockId = useRef(1)

  const updateBlock = (id: string, changes: Partial<ArticleContentBlock>) => {
    onChange(blocks.map((block) => (block.id === id ? { ...block, ...changes } as ArticleContentBlock : block)))
  }

  const removeBlock = (id: string) => {
    if (blocks.length === 1) return
    onChange(blocks.filter((block) => block.id !== id))
  }

  const moveBlock = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= blocks.length) return
    const nextBlocks = [...blocks]
    const [movedBlock] = nextBlocks.splice(index, 1)
    nextBlocks.splice(nextIndex, 0, movedBlock)
    onChange(nextBlocks)
  }

  const addBlock = (type: ArticleContentBlock['type']) => {
    blockId.current += 1
    onChange([...blocks, createBlock(type, `${type}-${blockId.current}`)])
    setShowBlockMenu(false)
  }

  return (
    <section className="space-y-4" aria-labelledby="content-editor-heading">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Article body</p>
        </div>
        <div className="relative">
          <Button type="button" variant="outline" size="xs" onClick={() => setShowBlockMenu((open) => !open)}>
            <Plus /> Add block
          </Button>
          {showBlockMenu && (
            <div className="absolute right-0 top-11 z-10 grid w-52 gap-1 rounded-md border bg-background p-2 shadow-lg">
              {blockOptions.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => addBlock(type)}
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <article key={block.id} className="rounded-md border bg-card p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{block.type}</span>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="icon-xs" aria-label="Move block up" disabled={index === 0} onClick={() => moveBlock(index, -1)}>
                  <ChevronUp />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs" aria-label="Move block down" disabled={index === blocks.length - 1} onClick={() => moveBlock(index, 1)}>
                  <ChevronDown />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs" aria-label="Remove block" disabled={blocks.length === 1} onClick={() => removeBlock(block.id)}>
                  <Trash2 />
                </Button>
              </div>
            </div>

            {block.type === 'text' && (
              <textarea
                value={block.text}
                onChange={(event) => updateBlock(block.id, { text: event.target.value })}
                placeholder="Write the next part of your story..."
                className="min-h-32 w-full resize-y bg-transparent text-base leading-7 outline-none placeholder:text-muted-foreground"
              />
            )}

            {block.type === 'image' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Input value={block.url} onChange={(event) => updateBlock(block.id, { url: event.target.value })} placeholder="Image URL" aria-label="Image URL" />
                <Input value={block.alt} onChange={(event) => updateBlock(block.id, { alt: event.target.value })} placeholder="Alt text" aria-label="Image alt text" />
                <Input className="sm:col-span-2" value={block.caption} onChange={(event) => updateBlock(block.id, { caption: event.target.value })} placeholder="Caption (optional)" aria-label="Image caption" />
                {block.url && <Image src={block.url} alt={block.alt} className="aspect-video w-full rounded-md object-cover sm:col-span-2" />}
              </div>
            )}

            {block.type === 'video' && (
              <div className="grid gap-3">
                <Input value={block.url} onChange={(event) => updateBlock(block.id, { url: event.target.value })} placeholder="Video URL" aria-label="Video URL" />
                <Input value={block.caption} onChange={(event) => updateBlock(block.id, { caption: event.target.value })} placeholder="Caption (optional)" aria-label="Video caption" />
                {block.url && <video src={block.url} controls className="aspect-video w-full rounded-md bg-black" />}
              </div>
            )}

            {block.type === 'link' && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Input value={block.label} onChange={(event) => updateBlock(block.id, { label: event.target.value })} placeholder="Link text" aria-label="Link text" />
                <Input value={block.url} onChange={(event) => updateBlock(block.id, { url: event.target.value })} placeholder="https://example.com" aria-label="Link URL" />
              </div>
            )}

            {block.type === 'quote' && (
              <div className="grid gap-3">
                <textarea value={block.text} onChange={(event) => updateBlock(block.id, { text: event.target.value })} placeholder="Add a meaningful quote..." aria-label="Quote text" className="min-h-24 w-full resize-y bg-transparent text-lg italic leading-7 outline-none placeholder:text-muted-foreground" />
                <Input value={block.attribution} onChange={(event) => updateBlock(block.id, { attribution: event.target.value })} placeholder="Attribution (optional)" aria-label="Quote attribution" />
              </div>
            )}

            {block.type === 'code' && (
              <div className="grid gap-3">
                <Input value={block.language} onChange={(event) => updateBlock(block.id, { language: event.target.value })} placeholder="Language" aria-label="Code language" />
                <textarea value={block.code} onChange={(event) => updateBlock(block.id, { code: event.target.value })} placeholder="Paste code here..." aria-label="Code" className="min-h-32 w-full resize-y rounded-md bg-muted p-3 font-mono text-sm outline-none" />
              </div>
            )}
          </article>
        ))}
      </div>

      <button type="button" className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary" onClick={() => addBlock('text')}>
        <Plus size={16} /> Continue writing
      </button>
    </section>
  )
}
