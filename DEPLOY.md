# 배포 가이드

이 프로젝트는 Vite + React로 구성된 SPA (Single Page Application)입니다.

## 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 배포 방법

### 1. Vercel (추천)

가장 간단하고 빠른 배포 방법입니다.

#### 방법 A: Vercel CLI 사용

1. Vercel CLI 설치:
```bash
npm i -g vercel
```

2. 배포:
```bash
vercel
```

3. 프로덕션 배포:
```bash
vercel --prod
```

#### 방법 B: GitHub 연동

1. GitHub에 프로젝트를 푸시합니다.
2. [Vercel](https://vercel.com)에 로그인합니다.
3. "New Project"를 클릭합니다.
4. GitHub 저장소를 선택합니다.
5. 자동으로 설정이 감지되므로 "Deploy"를 클릭합니다.

Vercel은 자동으로:
- 빌드 명령어: `npm run build`
- 출력 디렉토리: `dist`
- SPA 라우팅 설정 (`vercel.json`)

### 2. Netlify

#### 방법 A: Netlify CLI 사용

1. Netlify CLI 설치:
```bash
npm i -g netlify-cli
```

2. 배포:
```bash
netlify deploy
```

3. 프로덕션 배포:
```bash
netlify deploy --prod
```

#### 방법 B: 드래그 앤 드롭

1. `npm run build`를 실행하여 `dist` 폴더를 생성합니다.
2. [Netlify Drop](https://app.netlify.com/drop)에 접속합니다.
3. `dist` 폴더를 드래그 앤 드롭합니다.

#### 방법 C: GitHub 연동

1. GitHub에 프로젝트를 푸시합니다.
2. [Netlify](https://netlify.com)에 로그인합니다.
3. "Add new site" > "Import an existing project"를 클릭합니다.
4. GitHub 저장소를 선택합니다.
5. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. "Deploy site"를 클릭합니다.

### 3. GitHub Pages

1. `vite.config.ts`에 base 경로 추가:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. GitHub Actions를 사용한 자동 배포 설정:

`.github/workflows/deploy.yml` 파일 생성:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 환경 변수

필요한 경우 `.env` 파일을 생성하고 환경 변수를 설정할 수 있습니다.

## 문제 해결

### SPA 라우팅 문제

React Router를 사용하는 경우, 모든 경로가 `index.html`로 리다이렉트되어야 합니다.
- Vercel: `vercel.json` 파일이 자동으로 처리합니다.
- Netlify: `netlify.toml` 파일이 자동으로 처리합니다.
- GitHub Pages: GitHub Actions 설정이 필요합니다.

### 빌드 오류

TypeScript 오류가 발생하는 경우:
```bash
npm run build
```

오류를 확인하고 수정한 후 다시 빌드합니다.

