'use client'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Article } from '../interface/article'
import { User } from '../interface/auth'
import { db } from '../firebase/firebase'

type ArticleInput = Omit<Article, 'id'>
type ArticleUpdate = Partial<ArticleInput>

interface ArticleContextValue {
  articles: Article[]
  loading: boolean
  error: string | null
  createArticle: (article: ArticleInput) => Promise<Article>
  getArticles: () => Promise<Article[]>
  getArticle: (id: string) => Promise<Article | null>
  getAuthorInfo: (authorId: string) => Promise<User | null>
  updateArticle: (id: string, article: ArticleUpdate) => Promise<void>
  deleteArticle: (id: string) => Promise<void>
}

const articlesCollection = collection(db, 'articles')

const normalizeDate = (value: unknown): Date => {
  if (value instanceof Timestamp) {
    return value.toDate()
  }

  if (value instanceof Date) {
    return value
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value)
  }

  return new Date(0)
}

const toArticle = (id: string, data: DocumentData): Article => ({
  ...data,
  id,
  publishedAt: normalizeDate(data.publishedAt),
  updatedAt: normalizeDate(data.updatedAt),
}) as Article

export const ArticleContext = createContext<ArticleContextValue>({
  articles: [],
  loading: false,
  error: null,
  createArticle: async () => {
    throw new Error('ArticleProvider is missing')
  },
  getArticles: async () => {
    throw new Error('ArticleProvider is missing')
  },
  getArticle: async () => {
    throw new Error('ArticleProvider is missing')
  },
  getAuthorInfo: async () => {
    throw new Error('ArticleProvider is missing')
  },
  updateArticle: async () => {
    throw new Error('ArticleProvider is missing')
  },
  deleteArticle: async () => {
    throw new Error('ArticleProvider is missing')
  },
})

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'An unexpected error occurred'

export function ArticleProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createArticle = async (article: ArticleInput) => {
    setLoading(true)
    setError(null)

    try {
      const articleReference = await addDoc(articlesCollection, article)
      const createdArticle = { ...article, id: articleReference.id }
      setArticles((currentArticles) => [...currentArticles, createdArticle])
      return createdArticle
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getArticles = async () => {
    setLoading(true)
    setError(null)

    try {
      const snapshot = await getDocs(articlesCollection)
      const fetchedArticles = snapshot.docs.map((article) =>
        toArticle(article.id, article.data()),
      )
      setArticles(fetchedArticles)
      return fetchedArticles
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getArticle = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const snapshot = await getDoc(doc(db, 'articles', id))
      if (!snapshot.exists()) {
        return null
      }

      return toArticle(snapshot.id, snapshot.data())
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getAuthorInfo = async (authorId: string) => {
    setLoading(true)
    setError(null)

    try {
      const snapshot = await getDoc(doc(db, 'users', authorId))
      if (!snapshot.exists()) {
        return null
      }

      return {
        ...snapshot.data(),
        id: snapshot.id,
      } as User
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateArticle = async (id: string, article: ArticleUpdate) => {
    setLoading(true)
    setError(null)

    try {
      await updateDoc(doc(db, 'articles', id), article)
      setArticles((currentArticles) =>
        currentArticles.map((currentArticle) =>
          currentArticle.id === id
            ? { ...currentArticle, ...article }
            : currentArticle,
        ),
      )
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      await deleteDoc(doc(db, 'articles', id))
      setArticles((currentArticles) =>
        currentArticles.filter((article) => article.id !== id),
      )
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <ArticleContext.Provider
      value={{
        articles,
        loading,
        error,
        createArticle,
        getArticles,
        getArticle,
        getAuthorInfo,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  )
}

export const useArticles = () => useContext(ArticleContext)

export default ArticleProvider
