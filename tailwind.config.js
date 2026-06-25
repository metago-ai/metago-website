/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* —— 背景层 —— */
        'bg-deep': '#080c14',
        'bg-card': '#0d1219',
        'bg-elevated': '#111824',

        /* —— 生命色（Life）—— 薄荷青系 */
        'life-bright': '#5eead4',
        'life': '#06b6d4',

        /* —— 进化色（Evolution）—— 琥珀金系 */
        'evo-bright': '#fbbf24',
        'evo': '#f97316',

        /* —— 治理色（Governance）—— 靛紫系 */
        'gov-bright': '#a5b4fc',
        'gov': '#818cf8',

        /* —— 文字层（语义别名，用于 Tailwind class 调用）—— */
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',

        /* —— 兼容旧引用（保留以减少破坏性改动，重定向到生命色）—— */
        'accent-blue': '#06b6d4',
        'accent-purple': '#818cf8',
        'accent-green': '#5eead4',
        'accent-red': '#f97316',
      },
      fontFamily: {
        'display': ['Space Grotesk', '思源黑体', 'sans-serif'],
        'body': ['Inter', '思源黑体', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'lg': '24px',
        'md': '16px',
        'sm': '10px',
        'xs': '6px',
      },
      boxShadow: {
        'life-glow': '0 0 30px rgba(94, 234, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)',
        'card-hover': '0 20px 40px -12px rgba(6, 182, 212, 0.15), 0 0 60px -20px rgba(94, 234, 212, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out both',
        'blur-in': 'blurIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'breathe': 'breathe 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite alternate',
        'spin-slow': 'spinSlow 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(12px)', transform: 'translateY(20px)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        breathe: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.97' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(94, 234, 212, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(94, 234, 212, 0.5)' },
        },
        spinSlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
