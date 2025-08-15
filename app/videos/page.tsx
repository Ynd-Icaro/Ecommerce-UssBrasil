'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Video {
  id: string
  title: string
  description: string
  src: string
  thumbnail: string
  category: string
  duration: string
  isNew?: boolean
}
     
const videos: Video[] = [
  {
    id: 'iphone-video',
    title: 'iPhone 16 Pro',
    description: 'Descubra o novo iPhone 16 Pro com chip A18 Pro, sistema de câmera Pro e a maior bateria já vista em um iPhone Pro.',
    src: '/Videos/IphoneVideo.mp4',
    thumbnail: '/Produtos/Apple/Iphone 16 Pro.png',
    category: 'iPhone',
    duration: '2:30',
    isNew: true
  },
  {
    id: 'macbook-video',
    title: 'MacBook Pro M3',
    description: 'O MacBook Pro mais poderoso de todos os tempos, agora com chip M3 para performance extraordinária.',
    src: '/Videos/Macs Video.mp4',
    thumbnail: '/Produtos/Apple/Macbook Pro.png',
    category: 'Mac',
    duration: '1:45'
  },
  {
    id: 'ipad-video',
    title: 'iPad Pro',
    description: 'O iPad mais avançado já criado, perfeito para criatividade e produtividade.',
    src: '/Videos/IpadVideo.mp4',
    thumbnail: '/Produtos/Apple/Ipad Pro.png',
    category: 'iPad',
    duration: '2:15'
  },
  {
    id: 'airpods-video',
    title: 'AirPods Pro 2ª Geração',
    description: 'Experimente o som com qualidade cinematográfica e cancelamento de ruído ativo.',
    src: '/Videos/AirPods Video.webm',
    thumbnail: '/Produtos/Apple/Airpods Pro 2.png',
    category: 'AirPods',
    duration: '1:30'
  },
  {
    id: 'apple-watch-video',
    title: 'Apple Watch Ultra 2',
    description: 'O Apple Watch mais resistente e avançado para suas aventuras extremas.',
    src: '/Videos/Apple Watch.mp4',
    thumbnail: '/Produtos/Apple/Apple Watch Ultra 2.png',
    category: 'Apple Watch',
    duration: '2:00'
  }
]

const categories = ['Todos', 'iPhone', 'Mac', 'iPad', 'AirPods', 'Apple Watch']

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const filteredVideos = selectedCategory === 'Todos' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory)

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00CED1] to-[#20B2AA] bg-clip-text text-transparent mb-4">
            Vídeos dos Produtos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nossos produtos Apple através de vídeos demonstrativos de alta qualidade
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-[#00CED1] hover:text-[#00CED1]'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  {/* Video Player */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    {playingVideo === video.id ? (
                      <video
                        autoPlay
                        controls
                        className="w-full h-full object-cover"
                        onEnded={() => setPlayingVideo(null)}
                      >
                        <source src={video.src} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    ) : (
                      <>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button
                            size="lg"
                            onClick={() => handlePlayVideo(video.id)}
                            className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300"
                          >
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </Button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">
                            {video.duration}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white border-0">
                            {video.category}
                          </Badge>
                        </div>
                        {video.isNew && (
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-red-500 text-white border-0 animate-pulse">
                              Novo
                            </Badge>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00CED1] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-[#00CED1] to-[#20B2AA] border-0 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Gostou do que viu?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Explore nossa coleção completa de produtos Apple e encontre o produto perfeito para você.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  asChild
                  className="bg-white text-[#00CED1] hover:bg-gray-100"
                >
                  <a href="/products">
                    Ver Todos os Produtos
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-[#00CED1]"
                >
                  <a href="/contato">
                    Falar com Especialista
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
