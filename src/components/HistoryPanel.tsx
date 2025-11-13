import { useState } from 'react'
import { History, Team } from '../types/order'

interface HistoryPanelProps {
  orderId: string
  histories: History[]
  onAddHistory: (content: string, mentionedTeams: Team[], images?: string[]) => void
  teams: Team[]
}

export default function HistoryPanel({ histories, onAddHistory, teams }: HistoryPanelProps) {
  const [content, setContent] = useState('')
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([])
  const [images, setImages] = useState<string[]>([])
  const [, setImageFiles] = useState<File[]>([])

  const handleTeamToggle = (team: Team) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter(t => t !== team))
      // 텍스트에서도 제거
      setContent(content.replace(new RegExp(`@${team}\\s*`, 'g'), '').trim())
    } else {
      setSelectedTeams([...selectedTeams, team])
      // 텍스트에 추가
      if (content.trim() && !content.includes(`@${team}`)) {
        setContent(content + ` @${team}`)
      } else if (!content.includes(`@${team}`)) {
        setContent(`@${team}`)
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    
    // 모든 이미지를 읽어서 base64로 변환
    const promises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string)
          } else {
            reject(new Error('Failed to read file'))
          }
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    })
    
    Promise.all(promises).then(imageDataUrls => {
      setImages(prev => [...prev, ...imageDataUrls])
      setImageFiles(prev => [...prev, ...files])
    }).catch(error => {
      console.error('Error reading images:', error)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim() || images.length > 0) {
      // 텍스트에서 자동으로 팀 맨션 추출
      const mentionedInText: Team[] = teams.filter(team => 
        content.includes(`@${team}`)
      )
      const allMentionedTeams = Array.from(new Set([...selectedTeams, ...mentionedInText]))
      onAddHistory(content || '(이미지만 업로드됨)', allMentionedTeams, images)
      setContent('')
      setSelectedTeams([])
      setImages([])
      setImageFiles([])
      // 파일 입력 리셋
      const fileInput = document.getElementById('image-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    }
  }

  const formatContent = (text: string, mentionedTeams: Team[]) => {
    let formatted = text
    mentionedTeams.forEach(team => {
      formatted = formatted.replace(
        new RegExp(`@${team}`, 'g'),
        `<span class="text-blue-600 font-semibold">@${team}</span>`
      )
    })
    return formatted
  }

  return (
    <div className="bg-white rounded-lg shadow flex flex-col" style={{ height: 'calc(100vh - 12rem)' }}>
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">주문 히스토리</h2>
      </div>

      {/* 히스토리 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {histories.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">히스토리가 없습니다.</p>
        ) : (
          histories.map((history) => (
            <div key={history.id} className="border-l-2 border-blue-500 pl-4 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{history.createdBy}</span>
                <span className="text-xs text-gray-500">{history.createdAt}</span>
              </div>
              <p 
                className="text-sm text-gray-700 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(history.content, history.mentionedTeams as Team[]) 
                }}
              />
              {history.mentionedTeams.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {(history.mentionedTeams as Team[]).map(team => (
                    <span
                      key={team}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                    >
                      @{team}
                    </span>
                  ))}
                </div>
              )}
              {history.images && history.images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {history.images.map((image, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-24 object-cover rounded border border-gray-200"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 히스토리 작성 폼 */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              팀 맨션
            </label>
            <div className="flex flex-wrap gap-2">
              {teams.map(team => (
                <button
                  key={team}
                  type="button"
                  onClick={() => handleTeamToggle(team)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedTeams.includes(team)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  @{team}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="히스토리를 입력하세요..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이미지 업로드
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {images.map((image, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-20 object-cover rounded border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!content.trim() && images.length === 0}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            히스토리 기록
          </button>
        </form>
      </div>
    </div>
  )
}

