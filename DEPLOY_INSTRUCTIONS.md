# 🚀 배포 가이드

## ✅ 빌드 완료!

빌드가 성공적으로 완료되었습니다.
- 빌드 디렉토리: `dist/`
- 빌드 크기: ~196 KB (gzip: ~61 KB)

---

## 방법 1: Vercel로 배포 (추천) ⭐

### npx로 바로 배포 (전역 설치 불필요)

```bash
cd /Users/isc010250/Desktop/wireframe
npx vercel
```

**프롬프트에 따라 진행:**
1. 로그인 (브라우저가 자동으로 열립니다)
2. 프로젝트 설정 확인
3. 배포 완료! 🎉

**프로덕션 배포:**
```bash
npx vercel --prod
```

### GitHub 연동 (자동 배포)

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

3. **자동 배포 활성화:**
   - 이후 `main` 브랜치에 푸시할 때마다 자동 배포됩니다!

---

## 방법 2: Netlify로 배포

### 드래그 앤 드롭 (가장 빠름)

1. **빌드 확인:**
```bash
npm run build
```

2. **Netlify Drop 사용:**
   - https://app.netlify.com/drop 접속
   - `dist` 폴더를 드래그 앤 드롭
   - 배포 완료! 🎉

### Netlify CLI

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

---

## 방법 3: GitHub Pages

1. **vite.config.ts 수정:**
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // GitHub 저장소 이름으로 변경
  // ...
})
```

2. **빌드 및 배포:**
```bash
npm run build
npx gh-pages -d dist
```

---

## 현재 설정

✅ **빌드 설정:**
- 빌드 명령어: `npm run build`
- 출력 디렉토리: `dist`
- SPA 라우팅: `vercel.json`, `netlify.toml` 설정 완료

✅ **배포 준비:**
- 모든 파일이 빌드되었습니다
- 배포 설정 파일이 생성되었습니다
- 바로 배포 가능합니다!

---

## 다음 단계

1. **Vercel로 배포하려면:**
```bash
npx vercel
```

2. **GitHub에 푸시하고 자동 배포하려면:**
   - GitHub 저장소 생성
   - 프로젝트 푸시
   - Vercel 웹사이트에서 연동

3. **배포 완료 후:**
   - 배포된 URL에서 앱 확인
   - 도메인 설정 (선택사항)
   - 환경 변수 설정 (필요시)

---

## 문제 해결

### 빌드 오류
```bash
npm run build
```

### 라우팅 문제
React Router를 사용하므로 모든 경로가 `index.html`로 리다이렉트되어야 합니다.
- Vercel: `vercel.json` 파일이 자동으로 처리
- Netlify: `netlify.toml` 파일이 자동으로 처리

### 배포 후 404 오류
SPA 라우팅 설정을 확인하세요. `vercel.json` 또는 `netlify.toml` 파일이 올바르게 설정되어 있는지 확인합니다.

