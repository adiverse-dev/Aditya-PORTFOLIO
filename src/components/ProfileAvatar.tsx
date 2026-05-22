import { useState } from 'react'

interface ProfileAvatarProps {
  className?: string
  size?: 'md' | 'lg'
}

export default function ProfileAvatar({ className = '', size = 'lg' }: ProfileAvatarProps) {
  const [imgError, setImgError] = useState(false)
  const dim = size === 'lg' ? 'h-48 w-48 md:h-56 md:w-56' : 'h-32 w-32'

  return (
    <div className={`profile-avatar ${dim} ${className}`}>
      <div className="profile-avatar__ring" />
      {!imgError ? (
        <img
          src="/profile.svg"
          alt="Aditya Singh"
          className="profile-avatar__img"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="profile-avatar__fallback">
          <span className="font-display text-5xl font-semibold text-white">AS</span>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
            Full-Stack · AI
          </span>
        </div>
      )}
      <span className="profile-avatar__badge">Available</span>
    </div>
  )
}
