# 배포 가이드

## 빠른 배포 방법

### 방법 1: Vercel (가장 쉬움) ⭐ 추천

#### 옵션 A: npx 사용 (전역 설치 불필요)

1. **프로젝트 디렉토리에서 실행:**
```bash
cd /Users/isc010250/Desktop/wireframe
npx vercel
```

2. **프롬프트에 따라 진행:**
   - 로그인 (브라우저가 열립니다)
   - 프로젝트 설정 확인
   - 배포 완료!

3. **프로덕션 배포:**
```bash
npx vercel --prod
```

#### 옵션 B: GitHub 연동 (자동 배포)

1. **GitHub에 프로젝트 푸시:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Vercel 웹사이트에서:**
   - https://vercel.com 접속
   - GitHub로 로그인
   - "New Project" 클릭
   - GitHub 저장소 선택
   - 자동으로 설정 감지됨
   - "Deploy" 클릭

3. **자동 배포:**
   - 이후 `main` 브랜치에 푸시할 때마다 자동 배포됩니다!

### 방법 2: Netlify

#### 옵션 A: 드래그 앤 드롭 (가장 빠름)

1. **빌드 실행:**
```bash
npm run build
```

2. **Netlify Drop 사용:**
   - https://app.netlify.com/drop 접속
   - `dist` 폴더를 드래그 앤 드롭
   - 배포 완료!

#### 옵션 B: Netlify CLI

1. **npx로 배포:**
```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

### 방법 3: GitHub Pages

1. **vite.config.ts 수정:**
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // GitHub 저장소 이름
  // ...
})
```

2. **빌드 및 배포:**
```bash
npm run build
npx gh-pages -d dist
```

## 현재 빌드 상태

✅ 빌드 성공
- 빌드 명령어: `npm run build`
- 출력 디렉토리: `dist`
- 빌드된 파일 크기:
  - index.html: 0.46 kB
  - CSS: 15.33 kB (gzip: 3.60 kB)
  - JS: 195.74 kB (gzip: 61.19 kB)

## 배포 설정 파일

- `vercel.json`: Vercel SPA 라우팅 설정
- `netlify.toml`: Netlify SPA 라우팅 설정

## 문제 해결

### 빌드 오류
```bash
npm run build
```
오류를 확인하고 수정한 후 다시 빌드합니다.

### 라우팅 문제
React Router를 사용하므로 모든 경로가 `index.html`로 리다이렉트되어야 합니다.
- Vercel: `vercel.json` 파일이 자동으로 처리
- Netlify: `netlify.toml` 파일이 자동으로 처리

